"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesData } from "@/redux/CourseSlice";
import { fetchCategories, setSelectedCategories } from "@/redux/categorySlice";
import Link from "next/link";
import CourseCard from "@/components/sheard/CourseCard";
import {
  LuSearch,
  LuGrid3X3,
  LuChevronDown,
  LuLayoutGrid,
  LuStar,
  LuBookOpen,
  LuFilter
} from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

// Loading fallback component
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div key={i} className="animate-pulse bg-slate-50 dark:bg-white/5 rounded-3xl h-[400px]"></div>
    ))}
  </div>
);

const FilterDropdown = ({ label, value, options, stateKey, icon: Icon, onSelect, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-[12px] font-medium transition-all ${isOpen
          ? "border-[#003ECB] text-[#003ECB] bg-[#003ECB]/5"
          : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-slate-300 dark:hover:border-white/20"
          }`}
      >
        {Icon && <Icon size={14} />}
        <span>{label}: {selectedOption?.label}</span>
        <LuChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-52 bg-white dark:bg-[#111] rounded-xl shadow-2xl border border-slate-100 dark:border-white/10 z-50 p-2"
          >
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-[12px] transition-all ${value === opt.id
                  ? "bg-[#003ECB] text-white"
                  : "text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CourseContent = () => {
  const dispatch = useDispatch();
  const { courses = [], loading } = useSelector((state) => state.courses || {});
  const { items: categories = [], selectedCategories = [] } = useSelector((state) => state.categories || {});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const { language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  useEffect(() => {
    dispatch(fetchCoursesData());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    if (!course) return false;

    // Type filter
    const rawType = course?.courseType || course?.type || course?.mode || "";
    const cType = rawType.toString().toLowerCase();
    const typeMatch = selectedType === "all" || cType === selectedType.toLowerCase();

    // Category filter
    let categoryMatch = true;
    if (selectedCategory !== "all") {
      const catName = typeof course.category === 'object' ? course.category.name : course.category;
      categoryMatch = catName === selectedCategory;
    }

    // Rating filter
    const ratingMatch = selectedRating === "all" || (course.averageRating >= parseFloat(selectedRating));

    // Price filter
    let priceMatch = true;
    if (selectedPrice !== "all") {
      const price = course.price || 0;
      if (selectedPrice === "free") priceMatch = price === 0;
      else if (selectedPrice === "paid") priceMatch = price > 0;
      else if (selectedPrice === "0-500") priceMatch = price >= 0 && price <= 500;
      else if (selectedPrice === "500-1000") priceMatch = price > 500 && price <= 1000;
      else if (selectedPrice === "1000+") priceMatch = price > 1000;
    }

    // Search filter
    const q = (searchQuery || "").trim().toLowerCase();
    const searchMatch = q === "" ||
      (course.title && course.title.toLowerCase().includes(q)) ||
      (course.technology && course.technology.toLowerCase().includes(q));

    return typeMatch && categoryMatch && ratingMatch && priceMatch && searchMatch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'rating') return (b.averageRating || 5) - (a.averageRating || 5);
    return 0;
  });

  const categoryOptions = [
    { id: 'all', label: language === 'bn' ? 'সব ক্যাটাগরি' : 'All Categories' },
    ...categories.filter(c => c.name !== 'All').map(c => ({
      id: c.name,
      label: c.name
    }))
  ];

  const typeOptions = [
    { id: 'all', label: language === 'bn' ? 'সব ধরণের' : 'All Types' },
    { id: 'Online', label: language === 'bn' ? 'অনলাইন' : 'Online' },
    { id: 'Offline', label: language === 'bn' ? 'অফলাইন' : 'Offline' },
    { id: 'Recorded', label: language === 'bn' ? 'রেকর্ডেড' : 'Recorded' }
  ];

  const ratingOptions = [
    { id: 'all', label: language === 'bn' ? "সব রেটিং" : "All Ratings" },
    { id: '4.5', label: "4.5 & up" },
    { id: '4', label: "4.0 & up" },
    { id: '3', label: "3.0 & up" }
  ];

  const priceOptions = [
    { id: 'all', label: language === 'bn' ? "সব প্রাইস" : "All Prices" },
    { id: 'free', label: language === 'bn' ? "ফ্রি" : "Free" },
    { id: '0-500', label: "0 - ৳500" },
    { id: '500-1000', label: "৳500 - ৳1000" },
    { id: '1000+', label: "৳1000+" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020202]">
      {/* Header Section */}
      {/* Premium Heading Section */}
      <header className="pt-6 pb-8 bg-white dark:bg-[#020202]">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="max-w-2xl text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-[#003ECB] font-normal text-[10px] uppercase tracking-[0.4em] mb-5"
              >
                <span className="w-12 h-[1px] bg-[#003ECB]" />
                {language === 'bn' ? 'এডভান্সড ট্রেনিং' : 'Advanced Training'}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-4xl md:text-5xl font-heading font-normal tracking-tight leading-[1.1] text-slate-900 dark:text-white ${bengaliClass}`}
              >
                {language === 'bn'
                  ? 'আপনার পেশাদারী দক্ষতা বৃদ্ধির ট্রেনীং কোর্স'
                  : 'Boost Your Professional Academy Skills'}
              </motion.h2>
            </div>

            <div className="relative w-full md:w-80 group">
              <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003ECB] transition-colors" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'সার্চ করুন...' : 'Search training...'}
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
            <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <FilterDropdown
                label={language === 'bn' ? "ক্যাটাগরি" : "Category"}
                value={selectedCategory}
                options={categoryOptions}
                onSelect={setSelectedCategory}
                language={language}
              />
              <FilterDropdown
                label={language === 'bn' ? "টাইপ" : "Type"}
                value={selectedType}
                options={typeOptions}
                onSelect={setSelectedType}
                language={language}
              />
              <FilterDropdown
                label={language === 'bn' ? "রেটিং" : "Rating"}
                value={selectedRating}
                icon={LuStar}
                options={ratingOptions}
                onSelect={setSelectedRating}
                language={language}
              />
              <FilterDropdown
                label={language === 'bn' ? "প্রাইস" : "Price"}
                value={selectedPrice}
                options={priceOptions}
                onSelect={setSelectedPrice}
                language={language}
              />
            </div>

            {/* Right Side: Sort & View Toggle */}
            <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto">
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-slate-400 whitespace-nowrap">{language === 'bn' ? "সর্ট করুন:" : "Sort by:"}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-[12px] font-medium text-slate-600 dark:text-gray-300 outline-none cursor-pointer hover:text-[#003ECB] transition-colors"
                >
                  <option value="default" className="dark:bg-[#111]">Default</option>
                  <option value="price-low" className="dark:bg-[#111]">Price: Low to High</option>
                  <option value="price-high" className="dark:bg-[#111]">Price: High to Low</option>
                  <option value="rating" className="dark:bg-[#111]">Best Rating</option>
                </select>
              </div>

              <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-[#003ECB] text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-white"}`}
                >
                  <LuLayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-[#003ECB] text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-white"}`}
                >
                  <LuGrid3X3 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="pb-24 pt-4">
        <div className="container mx-auto px-4 lg:px-16">
          {loading ? (
            <LoadingSkeleton />
          ) : sortedCourses.length === 0 ? (
            <div className="text-center py-24">
              <LuBookOpen className="mx-auto text-slate-200 mb-6" size={64} />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Courses found</h3>
              <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          ) : (
            <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {sortedCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  view={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
                .font-script {
                    font-family: 'Dancing Script', cursive;
                }
            `}</style>
    </div>
  );
};

const CoursePage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#300000]/30 border-t-[#300000] rounded-full animate-spin"></div>
      </div>
    }>
      <CourseContent />
    </Suspense>
  );
};

export default CoursePage;
