"use client";
import { API_URL } from '@/config/api';
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import {
    LuPalette,
    LuSearch,
    LuGrid3X3,
    LuChevronDown,
    LuLayoutGrid,
    LuFilter,
    LuStar
} from "react-icons/lu";
import ProductCard from "@/components/sheard/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const DesignTemplateContent = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get('category');

    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "all");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedRating, setSelectedRating] = useState("all");
    const [selectedPrice, setSelectedPrice] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [view, setView] = useState("grid");
    const [templates, setTemplates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openFilter, setOpenFilter] = useState(null); // To track which dropdown is open


    // Fetch design templates from API with filter params
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoading(true);
                let query = `limit=50&sortBy=${sortBy}`;
                if (selectedCategory !== "all") query += `&category=${selectedCategory}`;
                if (selectedType !== "all") query += `&templateType=${selectedType}`;
                if (selectedRating !== "all") query += `&minRating=${selectedRating}`;
                if (selectedPrice !== "all") {
                    if (selectedPrice === "free") query += `&minPrice=0&maxPrice=0`;
                    else if (selectedPrice === "0-500") query += `&minPrice=0&maxPrice=500`;
                    else if (selectedPrice === "500-1000") query += `&minPrice=500&maxPrice=1000`;
                    else if (selectedPrice === "1000+") query += `&minPrice=1000`;
                }

                const res = await fetch(`${API_URL}/design-templates?${query}`);
                const data = await res.json();
                if (data.success) {
                    setTemplates(data.data || []);
                }
            } catch (error) {
                console.error('Error fetching templates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, [selectedCategory, selectedType, selectedRating, selectedPrice, sortBy]);

    // Update selected category when URL changes
    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [categoryFromUrl]);

    // Initial fetch for categories
    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await fetch(`${API_URL}/categories?type=design-template`);
                const data = await res.json();
                if (data.success && data.data) {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCats();
    }, []);

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = (template.title || template.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" ||
            template.category?._id === selectedCategory ||
            template.category === selectedCategory;

        const matchesType = selectedType === "all" || template.accessType === selectedType;

        const matchesRating = selectedRating === "all" || (template.rating >= parseFloat(selectedRating));

        let matchesPrice = true;
        if (selectedPrice !== "all") {
            const price = template.offerPrice || template.price || 0;
            if (selectedPrice === "free") matchesPrice = price === 0;
            else if (selectedPrice === "paid") matchesPrice = price > 0;
            else if (selectedPrice === "0-500") matchesPrice = price >= 0 && price <= 500;
            else if (selectedPrice === "500-1000") matchesPrice = price > 500 && price <= 1000;
            else if (selectedPrice === "1000+") matchesPrice = price > 1000;
        }

        return matchesSearch && matchesCategory && matchesType && matchesRating && matchesPrice;
    }).sort((a, b) => {
        if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
        if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
    });

    const FilterDropdown = ({ label, value, options, stateKey, icon: Icon }) => {
        const isOpen = openFilter === stateKey;
        const selectedOption = options.find(opt => opt.id === (value?._id || value));

        return (
            <div className="relative">
                <button
                    onClick={() => setOpenFilter(isOpen ? null : stateKey)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-[12px] font-medium transition-all ${openFilter === stateKey
                        ? "border-[#003ECB] text-[#003ECB] bg-[#003ECB]/5"
                        : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-slate-300 dark:hover:border-white/20"
                        }`}
                >
                    {Icon && <Icon size={14} />}
                    <span>{label}: {selectedOption?.label || (value === 'all' ? (language === 'bn' ? 'সব' : 'All') : '')}</span>
                    <LuChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setOpenFilter(null)} />
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className={`absolute top-full left-0 mt-2 w-48 rounded-xl border p-2 z-50 shadow-2xl bg-white dark:bg-[#111] border-slate-100 dark:border-white/10`}
                            >
                                {options.map((opt) => (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (stateKey === 'category') setSelectedCategory(opt.id);
                                            if (stateKey === 'type') setSelectedType(opt.id);
                                            if (stateKey === 'rating') setSelectedRating(opt.id);
                                            if (stateKey === 'price') setSelectedPrice(opt.id);
                                            setOpenFilter(null);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-[12px] transition-all relative z-30 ${value === opt.id
                                            ? "bg-[#003ECB] text-white"
                                            : "text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/5"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#020202]">
            {/* Premium Heading Section */}
            <header className="pt-6 pb-8 bg-white dark:bg-[#020202]">
                <div className="container mx-auto px-6 max-w-[1600px]">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 text-[#003ECB] font-normal text-[10px] uppercase tracking-[0.4em] mb-5"
                            >
                                <span className="w-12 h-[1px] bg-[#003ECB]" />
                                {language === 'bn' ? 'ডিজিটাল অ্যাসেটস' : 'Digital Assets'}
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-4xl md:text-5xl font-heading font-normal tracking-tight leading-[1.1] text-slate-900 dark:text-white ${bengaliClass}`}
                            >
                                {language === 'bn'
                                    ? 'আপনার পেশাদারী কাজের গতি বাড়িয়ে তুলুন'
                                    : 'Boost Your Professional Workflow'}
                            </motion.h2>
                        </div>

                        <div className="relative w-full md:w-80 group">
                            <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003ECB] transition-colors" size={16} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={language === 'bn' ? 'সার্চ করুন...' : 'Search designs...'}
                                className="w-full pl-11 pr-5 py-3.5 bg-slate-50 dark:bg-white/5 border border-transparent rounded-xl text-sm outline-none focus:bg-white dark:focus:bg-white/10 focus:border-[#003ECB]/30 focus:shadow-lg focus:shadow-[#003ECB]/5 transition-all transition-all"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Sticky Filter Bar */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#020202]/80 backdrop-blur-xl border-y border-slate-100 dark:border-white/5 py-4">
                <div className="container mx-auto px-6 max-w-[1600px]">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Left Side: Dropdown Filters */}
                        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <FilterDropdown
                                label={language === 'bn' ? "ক্যাটাগরি" : "Category"}
                                value={selectedCategory}
                                stateKey="category"
                                options={[
                                    { id: 'all', label: language === 'bn' ? "সব ক্যাটাগরি" : "All Categories" },
                                    ...categories.map(c => ({ id: c._id, label: language === 'bn' ? (c.name_bn || c.name) : c.name }))
                                ]}
                            />
                            <FilterDropdown
                                label={language === 'bn' ? "টাইপ" : "Type"}
                                value={selectedType}
                                stateKey="type"
                                options={[
                                    { id: 'all', label: language === 'bn' ? "সবগুলো" : "All Types" },
                                    { id: 'paid', label: language === 'bn' ? "প্রিমিয়াম" : "Premium" },
                                    { id: 'free', label: language === 'bn' ? "ফ্রি" : "Free" }
                                ]}
                            />
                            <FilterDropdown
                                label={language === 'bn' ? "রেটিং" : "Rating"}
                                value={selectedRating}
                                stateKey="rating"
                                icon={LuStar}
                                options={[
                                    { id: 'all', label: language === 'bn' ? "সব রেটিং" : "All Ratings" },
                                    { id: '4.5', label: "4.5 & up" },
                                    { id: '4', label: "4.0 & up" },
                                    { id: '3', label: "3.0 & up" }
                                ]}
                            />
                            <FilterDropdown
                                label={language === 'bn' ? "প্রাইস" : "Price"}
                                value={selectedPrice}
                                stateKey="price"
                                options={[
                                    { id: 'all', label: language === 'bn' ? "সব প্রাইস" : "All Prices" },
                                    { id: 'free', label: language === 'bn' ? "ফ্রি" : "Free" },
                                    { id: '0-500', label: "0 - ৳500" },
                                    { id: '500-1000', label: "৳500 - ৳1000" },
                                    { id: '1000+', label: "৳1000+" }
                                ]}
                            />
                        </div>

                        {/* Right Side: Sort & View */}
                        <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto">
                            <div className="flex items-center gap-3">
                                <span className="text-[12px] text-slate-400 whitespace-nowrap">{language === 'bn' ? "সর্ট করুন:" : "Sort by:"}</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-transparent text-[12px] font-medium text-slate-600 dark:text-gray-300 outline-none cursor-pointer hover:text-[#003ECB] transition-colors"
                                >
                                    <option value="newest" className="dark:bg-[#111]">Newest</option>
                                    <option value="price-low" className="dark:bg-[#111]">Price: Low to High</option>
                                    <option value="price-high" className="dark:bg-[#111]">Price: High to Low</option>
                                    <option value="rating" className="dark:bg-[#111]">Best Rating</option>
                                </select>
                            </div>

                            <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setView('grid')}
                                    className={`p-2 rounded-lg transition-all ${view === 'grid' ? "bg-[#003ECB] text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-white"}`}
                                >
                                    <LuLayoutGrid size={18} />
                                </button>
                                <button
                                    onClick={() => setView('list')}
                                    className={`p-2 rounded-lg transition-all ${view === 'list' ? "bg-[#003ECB] text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-white"}`}
                                >
                                    <LuGrid3X3 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid - 4 Columns Desktop */}
            <main className="py-12">
                <div className="container mx-auto px-6 max-w-[1600px]">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="animate-pulse bg-slate-50 dark:bg-white/5 rounded-md aspect-[16/10]"></div>
                                    <div className="h-3 bg-slate-50 dark:bg-white/5 rounded w-1/2 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    ) : filteredTemplates.length === 0 ? (
                        <div className="text-center py-32">
                            <LuPalette className="mx-auto text-slate-200 mb-6" size={48} />
                            <h3 className="text-lg font-normal text-slate-800 dark:text-white mb-2">No templates found</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                            {filteredTemplates.map((template) => (
                                <ProductCard
                                    key={template._id}
                                    product={template}
                                    type="design-template"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const DesignTemplatePage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#003ECB]/20 border-t-[#003ECB] rounded-full animate-spin" />
                    <p className="text-slate-500 animate-pulse font-medium">Loading templates...</p>
                </div>
            </div>
        }>
            <DesignTemplateContent />
        </Suspense>
    );
};

export default DesignTemplatePage;
