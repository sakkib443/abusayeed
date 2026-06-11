"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { fetchDesignTemplates, fetchDesignCategories } from "@/redux/designTemplateSlice";
import ProductCard from "@/components/sheard/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const DigitalAssets = () => {
  const dispatch = useDispatch();
  const { items: templates = [], categories = [], loading } = useSelector((state) => state.designTemplates);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchDesignCategories());
    dispatch(fetchDesignTemplates({ limit: 6 }));
  }, [dispatch]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    dispatch(fetchDesignTemplates(categoryId === "all" ? { limit: 6 } : { category: categoryId, limit: 6 }));
  };

  const filterCats = categories.filter((c) => c.type === "design-template");

  const pill = (active) =>
    `px-5 py-2.5 rounded-full text-[12px] font-semibold transition-colors ${
      active
        ? "bg-[#0182E6] text-white"
        : isDark
        ? "bg-white/5 text-gray-400 hover:bg-white/10"
        : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-100"
    }`;

  return (
    <section className={`py-20 md:py-24 transition-colors duration-500 ${isDark ? "bg-[#0a0a0a]" : "bg-[#f8fafc]"}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 text-[#0182E6] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-[#F78F18]" />
            {language === "bn" ? "ডিজিটাল অ্যাসেটস" : "Digital Assets"}
            <span className="w-8 h-px bg-[#F78F18]" />
          </div>
          <h2 className={`text-3xl md:text-[40px] font-heading font-bold tracking-tight leading-[1.15] ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
            {language === "bn" ? "প্রফেশনাল ওয়ার্কফ্লো বুস্ট করুন" : "Boost your professional workflow"}
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          <button onClick={() => handleCategoryChange("all")} className={pill(activeCategory === "all")}>
            {language === "bn" ? "সবগুলো" : "All"}
          </button>
          {filterCats.map((cat) => (
            <button key={cat._id} onClick={() => handleCategoryChange(cat._id)} className={pill(activeCategory === cat._id)}>
              {language === "bn" ? cat.nameBn : cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <div key={i} className={`animate-pulse rounded-2xl h-[360px] ${isDark ? "bg-white/5" : "bg-slate-200/60"}`} />
                ))
              : templates.map((template) => (
                  <motion.div
                    key={template._id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={template} type="design-template" />
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>

        {!loading && templates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400">{language === "bn" ? "এই ক্যাটাগরিতে কোনো অ্যাসেট নেই।" : "No assets found in this category."}</p>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            href="/design-template"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#0182E6] text-white text-[14px] font-semibold hover:bg-[#0065c5] transition-colors"
          >
            {language === "bn" ? "সব অ্যাসেট দেখুন" : "View all assets"}
            <LuArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DigitalAssets;
