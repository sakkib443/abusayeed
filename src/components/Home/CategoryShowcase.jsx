"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const categories = [
  { en: "Graphic Design", bn: "গ্রাফিক ডিজাইন", image: "/cat_graphic.png", slug: "graphic-design" },
  { en: "UI/UX Design", bn: "ইউআই/ইউএক্স ডিজাইন", image: "/cat_uiux.png", slug: "ui-ux-design" },
  { en: "Premium Templates", bn: "প্রিমিয়াম টেমপ্লেট", image: "/cat_templates.png", slug: "templates" },
  { en: "Content Creation", bn: "কন্টেন্ট ক্রিয়েশন", image: "/cat_content.png", slug: "content" },
];

const CategoryShowcase = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";

  return (
    <section className={`py-20 md:py-24 transition-colors duration-500 ${isDark ? "bg-[#050505]" : "bg-white"}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[#0182E6] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
              <span className="w-8 h-px bg-[#F78F18]" />
              {language === "bn" ? "জনপ্রিয় ক্যাটাগরি" : "Popular Categories"}
            </div>
            <h2 className={`text-3xl md:text-[40px] font-heading font-bold tracking-tight leading-[1.15] ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
              {language === "bn" ? "ক্যাটাগরি অনুযায়ী দেখুন" : "Explore by category"}
            </h2>
          </div>
          <Link
            href="/design-template"
            className={`inline-flex items-center gap-2 text-[13px] font-semibold transition-colors ${isDark ? "text-gray-300 hover:text-[#0182E6]" : "text-slate-600 hover:text-[#0182E6]"}`}
          >
            {language === "bn" ? "সব ক্যাটাগরি" : "All categories"}
            <LuArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/design-template?category=${cat.slug}`}
                className={`group relative block aspect-[4/5] rounded-2xl overflow-hidden border ${isDark ? "border-white/10" : "border-gray-100"}`}
              >
                <img
                  src={cat.image}
                  alt={cat.en}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between">
                  <h3 className="text-white font-semibold text-[15px] md:text-base drop-shadow">
                    {language === "bn" ? cat.bn : cat.en}
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <LuArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
