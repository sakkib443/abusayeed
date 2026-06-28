"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuChevronRight, LuPackage, LuArrowLeft } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { API_URL } from "@/config/api";

const DesignTemplateDetails = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isBn = language === "bn";
  const bn = isBn ? "hind-siliguri" : "";

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/design-templates/${id}`);
        const data = await res.json();
        if (data.success && data.data) setItem(data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#003ECB]/20 border-t-[#003ECB] rounded-full animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center px-6">
        <div className="text-center">
          <LuPackage className="mx-auto text-slate-300 mb-5" size={48} />
          <h1 className={`text-2xl font-heading font-black mb-3 ${bn}`}>{isBn ? "ডিজাইন পাওয়া যায়নি" : "Design not found"}</h1>
          <Link href="/design-template" className="inline-flex items-center gap-2 text-[#003ECB] font-bold text-sm">
            <LuArrowLeft size={16} /> {isBn ? "সব ডিজাইন" : "Browse all designs"}
          </Link>
        </div>
      </div>
    );
  }

  const images = item.images?.length ? item.images : [item.image || "/cat_graphic.png"];
  const catName = item.category?.name || "Design";

  return (
    <main className="min-h-screen bg-white dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-[#003ECB] selection:text-white">
      <div className="container mx-auto px-6 max-w-4xl py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-slate-400 mb-8 flex-wrap">
          <Link href="/" className="hover:text-[#003ECB]">{isBn ? "হোম" : "Home"}</Link>
          <LuChevronRight size={13} />
          <Link href="/design-template" className="hover:text-[#003ECB]">{isBn ? "ডিজাইন" : "Design"}</Link>
          <LuChevronRight size={13} />
          <span className="text-slate-600 dark:text-slate-300 font-medium line-clamp-1">{item.title}</span>
        </nav>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
          <img src={images[activeImg]} alt={item.title} className="w-full max-h-[70vh] object-contain" />
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-4 flex-wrap justify-center">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-[#003ECB]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Category + Name */}
        <div className="text-center mt-8">
          <span className="inline-block px-3 py-1 rounded-full bg-[#003ECB]/10 text-[#003ECB] text-[11px] font-bold uppercase tracking-wider mb-3">
            {catName}
          </span>
          <h1 className={`text-2xl md:text-3xl font-heading font-black leading-tight ${bn}`}>{item.title}</h1>
        </div>
      </div>
    </main>
  );
};

export default DesignTemplateDetails;
