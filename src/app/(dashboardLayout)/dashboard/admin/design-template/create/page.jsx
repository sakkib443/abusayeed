'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FiArrowLeft, FiSave, FiLoader, FiPlus, FiTrash2,
  FiImage, FiLayers, FiEdit3, FiAlertCircle,
} from 'react-icons/fi';
import Link from 'next/link';
import { API_URL } from '@/config/api';
import { useTheme } from '@/providers/ThemeProvider';

// Simplified schema — a design is just images + title + category.
const designTemplateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  status: z.enum(['pending', 'approved', 'rejected', 'draft']),
});

function CreateDesignTemplateContent() {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [categories, setCategories] = useState([]);
  const [serverErrors, setServerErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const editId = searchParams.get('edit');
  const isEditMode = !!editId;

  const { register, control, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(designTemplateSchema),
    defaultValues: {
      title: '',
      category: '',
      images: [''],
      status: 'approved',
    },
  });

  const imageFields = useFieldArray({ control, name: 'images' });
  const images = watch('images');

  const hasError = (f) => !!errors[f] || !!serverErrors[f];
  const getError = (f) => errors[f]?.message || serverErrors[f] || '';

  // Load categories for the select
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      try {
        let res = await fetch(`${API_URL}/categories/admin/all?type=design-template`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        let data = await res.json();
        if (!data.data || data.data.length === 0) {
          res = await fetch(`${API_URL}/categories/admin/all`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          data = await res.json();
        }
        setCategories(data.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // In edit mode, load the existing design
  useEffect(() => {
    if (!isEditMode || !editId) return;
    const token = localStorage.getItem('token');
    const fetchTemplate = async () => {
      setFetchingData(true);
      try {
        const res = await fetch(`${API_URL}/design-templates/${editId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.data) {
          const sw = data.data;
          reset({
            title: sw.title || '',
            category: sw.category?._id || sw.category || '',
            images: sw.images?.length ? sw.images : [''],
            status: sw.status || 'approved',
          });
        }
      } catch (err) {
        console.error('Failed to fetch template:', err);
      } finally {
        setFetchingData(false);
      }
    };
    fetchTemplate();
  }, [isEditMode, editId, reset]);

  const onSubmit = async (values) => {
    setLoading(true);
    setServerErrors({});
    setGeneralError('');

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const payload = {
      title: values.title,
      category: values.category,
      images: values.images.filter((i) => i && i.trim() !== ''),
      status: values.status,
      author: user._id,
    };

    try {
      const url = isEditMode
        ? `${API_URL}/design-templates/admin/managed/${editId}`
        : `${API_URL}/design-templates/admin`;
      const method = isEditMode ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.ok) {
        alert(isEditMode ? 'Design updated successfully!' : 'Design created successfully!');
        router.push('/dashboard/admin/design-template');
      } else {
        if (result.errorSources && Array.isArray(result.errorSources)) {
          const newErrors = {};
          result.errorSources.forEach((err) => { if (err.path) newErrors[err.path] = err.message; });
          setServerErrors(newErrors);
          setGeneralError('Please fix the highlighted fields below');
        } else {
          setGeneralError(result.message || 'An unknown error occurred');
        }
        console.error('Server error:', result);
      }
    } catch (error) {
      setGeneralError('Network error - please check your connection');
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (f) => {
    const error = hasError(f);
    return `w-full px-3 py-2.5 rounded-md border ${error
      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 ring-1 ring-red-500'
      : isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-gray-200 bg-white text-gray-800'
      } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition-colors`;
  };
  const labelStyle = (f) => `block text-xs font-medium ${hasError(f) ? 'text-red-500' : isDark ? 'text-slate-400' : 'text-gray-600'} mb-1.5`;
  const cardClass = `${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} p-5 rounded-md border`;

  if (fetchingData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="animate-spin text-blue-500 mx-auto mb-3" size={32} />
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Loading design data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${cardClass}`}>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/admin/design-template" className={`p-2 rounded-md ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-colors`}>
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
              {isEditMode ? <FiEdit3 className="text-blue-500" size={18} /> : <FiLayers className="text-blue-500" size={18} />}
              {isEditMode ? 'Edit Design' : 'Create Design'}
            </h1>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              {isEditMode ? 'Update this design' : 'Add a new design'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/dashboard/admin/design-template')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? <FiLoader className="animate-spin" size={16} /> : <FiSave size={16} />}
            {loading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {generalError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 flex items-start gap-3">
          <FiAlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
          <p className="text-sm font-medium text-red-800 dark:text-red-200">{generalError}</p>
        </div>
      )}

      {/* Form */}
      <form className="space-y-6">
        {/* Title + Category + Status */}
        <div className={`${cardClass} space-y-4`}>
          <div>
            <label className={labelStyle('title')}>Design Name *</label>
            <input
              {...register('title')}
              placeholder="e.g. Modern Business Card"
              className={inputStyle('title')}
            />
            {(errors.title || serverErrors.title) && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle size={12} /> {getError('title')}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle('category')}>Category *</label>
              <select {...register('category')} className={inputStyle('category')}>
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              {(errors.category || serverErrors.category) && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle size={12} /> {getError('category')}</p>
              )}
            </div>
            <div>
              <label className={labelStyle('status')}>Status</label>
              <select {...register('status')} className={inputStyle('status')}>
                <option value="approved">Live / Approved</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className={cardClass}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
              <FiImage size={16} className="text-rose-500" /> Design Images *
            </h2>
            <button type="button" onClick={() => imageFields.append('')} className="text-xs text-blue-500 hover:underline flex items-center gap-1">
              <FiPlus size={12} /> Add
            </button>
          </div>

          <div className="space-y-3">
            {imageFields.fields.map((field, idx) => (
              <div key={field.id} className="flex gap-2 items-start">
                {/* preview thumb */}
                <div className={`w-14 h-14 shrink-0 rounded-md overflow-hidden border ${isDark ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-gray-50'} flex items-center justify-center`}>
                  {images?.[idx] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={images[idx]} alt="" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  ) : (
                    <FiImage className="text-slate-400" size={18} />
                  )}
                </div>
                <input {...register(`images.${idx}`)} className={inputStyle('images')} placeholder="https://image-url..." />
                {imageFields.fields.length > 1 && (
                  <button type="button" onClick={() => imageFields.remove(idx)} className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {(errors.images || serverErrors.images) && (
            <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><FiAlertCircle size={12} /> {getError('images')}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default function CreateDesignTemplatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="animate-spin text-blue-500 mx-auto mb-3" size={32} />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <CreateDesignTemplateContent />
    </Suspense>
  );
}
