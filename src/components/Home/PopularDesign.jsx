"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { fetchDesignTemplates } from "@/redux/designTemplateSlice";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import ProductCard from "@/components/sheard/ProductCard";
import DesignPreviewModal from "@/components/sheard/DesignPreviewModal";

const PopularDesign = () => {
  const dispatch = useDispatch();
  const { items: templates = [], loading } = useSelector((state) => state.designTemplates);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";
  const [activeTemplate, setActiveTemplate] = React.useState(null);

  useEffect(() => {
    dispatch(fetchDesignTemplates({ limit: 6 }));
  }, [dispatch]);

  return (
    <>
    {activeTemplate && (
      <DesignPreviewModal template={activeTemplate} onClose={() => setActiveTemplate(null)} />
    )}
    <section className={`py-20 md:py-24 transition-colors duration-500 ${isDark ? "bg-[#0a0a0a]" : "bg-[#f8fafc]"}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[#0182E6] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
              <span className="w-8 h-px bg-[#F78F18]" />
              {language === "bn" ? "জনপ্রিয় টেমপ্লেট" : "Popular Templates"}
            </div>
            <h2 className={`text-3xl md:text-[40px] font-heading font-bold tracking-tight leading-[1.15] ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
              {language === "bn" ? "প্রফেশনাল ডিজাইন টেমপ্লেট" : "Professional design templates"}
            </h2>
          </div>
          <Link
            href="/design-template"
            className={`inline-flex items-center gap-2 text-[13px] font-semibold transition-colors ${isDark ? "text-gray-300 hover:text-[#0182E6]" : "text-slate-600 hover:text-[#0182E6]"}`}
          >
            {language === "bn" ? "সবগুলো দেখুন" : "Explore all"}
            <LuArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div key={i} className={`animate-pulse rounded-2xl aspect-[16/12] ${isDark ? "bg-white/5" : "bg-slate-200/60"}`} />
              ))
            : templates.slice(0, 6).map((item) => (
                <ProductCard key={item._id} product={item} type="design-template" onCardClick={() => setActiveTemplate(item)} />
              ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default PopularDesign;
