"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuChevronDown, LuPenTool, LuLayoutDashboard, LuMegaphone,
  LuPlay, LuPrinter, LuImage, LuMousePointer2, LuShapes,
} from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { API_URL } from "@/config/api";
import AmbientBg from "@/components/Home/AmbientBg";

// Map the backend `icon` string → a Lucide icon component (falls back to LuShapes).
const ICONS = {
  LuPenTool, LuLayoutDashboard, LuMegaphone, LuPlay,
  LuPrinter, LuImage, LuMousePointer2, LuShapes,
};
const iconFor = (name, size = 30) => {
  const Icon = ICONS[name] || LuShapes;
  return <Icon size={size} strokeWidth={1.5} />;
};

// Fallback parents (mirror the backend set) — used only if the API is unreachable.
const fallbackCategories = [
  { _id: "f1", name: "Brand Identity", name_bn: "ব্র্যান্ড আইডেন্টিটি", slug: "brand-identity", icon: "LuPenTool" },
  { _id: "f2", name: "UI/UX Design", name_bn: "ইউআই/ইউএক্স ডিজাইন", slug: "ui-ux-design", icon: "LuLayoutDashboard" },
  { _id: "f3", name: "Social Media", name_bn: "সোশ্যাল মিডিয়া", slug: "social-media", icon: "LuMegaphone" },
  { _id: "f4", name: "Video & Motion", name_bn: "ভিডিও ও মোশন", slug: "video-motion", icon: "LuPlay" },
  { _id: "f5", name: "Print Design", name_bn: "প্রিন্ট ডিজাইন", slug: "print-design", icon: "LuPrinter" },
  { _id: "f6", name: "Illustration", name_bn: "ইলাস্ট্রেশন", slug: "illustration", icon: "LuImage" },
];

const CategoryShowcase = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";

  const [categories, setCategories] = useState(fallbackCategories);

  // Pull parent categories from the backend (same source as the header nav).
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch(`${API_URL}/categories?type=design-template&limit=100`);
        const data = await res.json();
        if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
          const parents = data.data
            .filter((c) => c.isParent)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .slice(0, 6); // keep it clean — 6 cards across
          if (parents.length > 0) setCategories(parents);
        }
      } catch {
        setCategories(fallbackCategories);
      }
    };
    fetchCats();
  }, []);

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 transition-colors duration-500 ${isDark ? "bg-[#050505]" : "bg-white"}`}>
      <AmbientBg />
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">

        {/* Centered heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12 md:mb-14">
          <h2 className={`text-3xl md:text-[40px] font-heading font-bold tracking-tight leading-[1.15] ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
            {language === "bn" ? "আমাদের ডিজাইন ক্যাটাগরি" : "Our design categories"}
          </h2>
        </motion.div>

        {/* Icon-card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat._id || cat.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Link
                href={`/category/${cat.slug}`}
                className={`group flex flex-col items-center justify-center text-center gap-4 px-3 py-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "bg-[#0c0c0c] border-white/10 hover:border-[#003ECB]/50"
                    : "bg-white border-slate-200 hover:border-[#003ECB]/40 hover:shadow-[0_12px_30px_rgba(0,62,203,0.10)]"
                }`}
              >
                <span className={`transition-colors duration-300 ${isDark ? "text-slate-400 group-hover:text-[#3365f5]" : "text-slate-500 group-hover:text-[#003ECB]"}`}>
                  {iconFor(cat.icon, 32)}
                </span>
                <h3 className={`text-[13px] md:text-sm font-semibold leading-tight transition-colors ${
                  isDark ? "text-slate-200 group-hover:text-white" : "text-slate-800 group-hover:text-[#003ECB]"
                } ${bn}`}>
                  {language === "bn" ? cat.name_bn || cat.name : cat.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* See all categories */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex justify-center mt-12">
          <Link
            href="/design-template"
            className={`group inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors ${bn} ${isDark ? "text-[#3365f5] hover:text-white" : "text-[#003ECB] hover:text-[#002da3]"}`}
          >
            {language === "bn" ? "সব ক্যাটাগরি দেখুন" : "See all categories"}
            <LuChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default CategoryShowcase;
