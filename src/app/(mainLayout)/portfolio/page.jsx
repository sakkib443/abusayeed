"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LuSearch } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { API_URL } from "@/config/api";
import DesignPreviewModal from "@/components/sheard/DesignPreviewModal";

const PortfolioPage = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bn = language === "bn" ? "hind-siliguri" : "";

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTemplate, setActiveTemplate] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [tplRes, catRes] = await Promise.all([
                    fetch(`${API_URL}/design-templates?limit=100`),
                    fetch(`${API_URL}/categories?type=design-template`),
                ]);
                const tplData = await tplRes.json();
                const catData = await catRes.json();
                if (tplData.success) setItems(tplData.data || []);
                if (catData.success) setCategories(catData.data || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const filtered = items.filter((item) => {
        const matchCat =
            selectedCategory === "all" ||
            item.category?._id === selectedCategory ||
            item.category === selectedCategory;
        const matchSearch = (item.title || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <>
        {activeTemplate && (
            <DesignPreviewModal
                template={activeTemplate}
                onClose={() => setActiveTemplate(null)}
            />
        )}
        <div className={`min-h-screen ${isDark ? "bg-[#020202]" : "bg-white"}`}>
            {/* Hero */}
            <header className="pt-16 pb-14 border-b border-slate-100 dark:border-white/5">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 text-[#003ECB] text-[10px] uppercase tracking-[0.4em] mb-5"
                    >
                        <span className="w-12 h-[1px] bg-[#003ECB]" />
                        {language === "bn" ? "আমাদের কাজ" : "Our Work"}
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className={`text-4xl md:text-5xl font-heading font-normal tracking-tight leading-[1.1] text-slate-900 dark:text-white ${bn}`}
                        >
                            {language === "bn" ? "পোর্টফোলিও" : "Portfolio"}
                        </motion.h1>

                        <div className="relative w-full md:w-72 group">
                            <LuSearch
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003ECB] transition-colors"
                                size={16}
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={language === "bn" ? "খুঁজুন..." : "Search..."}
                                className="w-full pl-11 pr-5 py-3.5 bg-slate-50 dark:bg-white/5 border border-transparent rounded-xl text-sm outline-none focus:bg-white dark:focus:bg-white/10 focus:border-[#003ECB]/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Category pills */}
                    {categories.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap gap-2 mt-10"
                        >
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${
                                    selectedCategory === "all"
                                        ? "bg-[#003ECB] text-white"
                                        : isDark
                                        ? "bg-white/5 text-slate-400 hover:bg-white/10"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                {language === "bn" ? "সব" : "All"}
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat._id}
                                    onClick={() => setSelectedCategory(cat._id)}
                                    className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${
                                        selectedCategory === cat._id
                                            ? "bg-[#003ECB] text-white"
                                            : isDark
                                            ? "bg-white/5 text-slate-400 hover:bg-white/10"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    {language === "bn" ? cat.name_bn || cat.name : cat.name}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>
            </header>

            {/* Grid */}
            <main className="py-16">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[4/3] rounded-2xl bg-slate-100 dark:bg-white/5 mb-4" />
                                    <div className="h-3 w-1/2 rounded bg-slate-100 dark:bg-white/5" />
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="py-32 text-center text-slate-400">
                            {language === "bn" ? "কিছু পাওয়া যায়নি" : "No items found"}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((item, idx) => {
                                const img = item.images?.[0] || item.image || "/cat_graphic.png";
                                const title = item.title || item.name || "Untitled";
                                const catName =
                                    language === "bn"
                                        ? item.category?.name_bn || item.category?.name || item.templateType || "Design"
                                        : item.category?.name || item.templateType || "Design";

                                return (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                                        className="group"
                                    >
                                        <button
                                            onClick={() => setActiveTemplate(item)}
                                            className="block w-full text-left"
                                        >
                                            {/* Image */}
                                            <div className="overflow-hidden mb-3">
                                                <img
                                                    src={img}
                                                    alt={title}
                                                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                />
                                            </div>

                                            {/* Title */}
                                            <p className={`text-[13px] font-medium leading-snug line-clamp-1 transition-colors group-hover:text-[#003ECB] ${
                                                isDark ? "text-slate-300" : "text-slate-700"
                                            } ${bn}`}>
                                                {title}
                                            </p>
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
        </>
    );
};

export default PortfolioPage;
