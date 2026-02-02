"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDesignTemplates, fetchDesignCategories } from "@/redux/designTemplateSlice";
import ProductCard from "@/components/sheard/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { LuSparkles, LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";

const DigitalAssets = () => {
    const dispatch = useDispatch();
    const { items: templates = [], categories = [], loading } = useSelector((state) => state.designTemplates);
    const { language, t } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeCategory, setActiveCategory] = useState("all");

    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        dispatch(fetchDesignCategories());
        dispatch(fetchDesignTemplates({ limit: 6 }));
    }, [dispatch]);

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        dispatch(fetchDesignTemplates({ category: categoryId, limit: 6 }));
    };

    return (
        <section className="py-16 bg-[#fafafa] dark:bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Header - Same as PopularDesign */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-[#003ECB] font-normal text-[10px] uppercase tracking-[0.4em] mb-5"
                        >
                            <span className="w-12 h-[1px] bg-[#003ECB]" />
                            {language === 'bn' ? 'ডিজিটাল অ্যাসেটস' : 'Digital Assets'}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className={`text-[40px] font-heading font-normal tracking-tight leading-[1.1] ${isDark ? "text-white" : "text-slate-900"
                                } ${bengaliClass}`}
                        >
                            {language === 'bn'
                                ? 'প্রফেশনাল ওয়ার্কফ্লো বুস্ট করুন'
                                : 'Boost Your Professional Workflow'}
                        </motion.h2>
                    </div>

                    <Link href="/design-template">
                        <motion.button
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-700 hover:text-[#003ECB] transition-colors py-2 border-b border-gray-300 hover:border-[#003ECB]"
                        >
                            <span>{language === 'bn' ? 'সবগুলো দেখুন' : 'View All'}</span>
                            <LuArrowUpRight size={14} />
                        </motion.button>
                    </Link>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <button
                        onClick={() => handleCategoryChange("all")}
                        className={`px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm ${activeCategory === "all"
                            ? "bg-[#003ECB] text-white shadow-lg shadow-[#003ECB]/20"
                            : "bg-white dark:bg-white/5 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/10"
                            }`}
                    >
                        {language === 'bn' ? 'সবগুলো' : 'ALL'}
                    </button>

                    {categories
                        .filter(cat => cat.type === 'design-template')
                        .map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() => handleCategoryChange(cat._id)}
                                className={`px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm ${activeCategory === cat._id
                                    ? "bg-[#003ECB] text-white shadow-lg shadow-[#003ECB]/20"
                                    : "bg-white dark:bg-white/5 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/10"
                                    }`}
                            >
                                {language === 'bn' ? cat.nameBn : cat.name}
                            </button>
                        ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            // Skeletons
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-white dark:bg-white/5 rounded-3xl h-[400px]"></div>
                            ))
                        ) : (
                            templates.map((template) => (
                                <motion.div
                                    key={template._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard product={template} type="design-template" />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* No Templates Message */}
                {!loading && templates.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400">No assets found in this category.</p>
                    </div>
                )}
            </div>


        </section>
    );
};

export default DigitalAssets;
