"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight, LuCalendar, LuClock } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

// Normalises both real API blogs and fallback sample blogs.
export default function BlogCard({ blog, index = 0 }) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isBn = language === "bn";
  const bn = isBn ? "hind-siliguri" : "";

  const accent = blog.color || "#003ECB";
  const title = isBn ? blog.titleBn || blog.title : blog.title;
  const excerpt =
    (isBn ? blog.excerptBn || blog.excerpt : blog.excerpt) ||
    blog.summary ||
    blog.shortDescription ||
    (isBn ? "আমাদের সর্বশেষ আপডেট ও ইন্ডাস্ট্রি ইনসাইট পড়ুন।" : "Read the latest update and industry insights.");
  const thumb = blog.thumbnail || blog.image || "/cat_graphic.png";
  const catName =
    blog.category?.name ||
    (typeof blog.category === "string" ? blog.category : null) ||
    (isBn ? "আর্টিকেল" : "Article");
  const author =
    blog.author?.name ||
    (blog.author?.firstName ? `${blog.author.firstName} ${blog.author.lastName || ""}`.trim() : null) ||
    (typeof blog.author === "string" ? blog.author : null) ||
    "Md. Abu Sayeed";
  const href = `/blog/${blog.slug}`;
  const date = blog.createdAt || blog.publishedAt;
  let fmtDate = "";
  try {
    if (date) fmtDate = new Date(date).toLocaleDateString(isBn ? "bn-BD" : "en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { /* ignore */ }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 ${
        isDark
          ? "bg-[#111] border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40"
          : "bg-white border-slate-100 hover:shadow-[0_20px_50px_rgba(2,6,23,0.10)]"
      }`}
    >
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
        <img src={thumb} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm"
          style={{ background: `${accent}e6` }}
        >
          {catName}
        </span>
      </Link>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-3">
          {fmtDate && (
            <span className="inline-flex items-center gap-1.5">
              <LuCalendar size={12} style={{ color: accent }} /> {fmtDate}
            </span>
          )}
          {blog.readingTime ? (
            <span className="inline-flex items-center gap-1.5">
              <LuClock size={12} style={{ color: accent }} /> {blog.readingTime} {isBn ? "মিনিট" : "min read"}
            </span>
          ) : null}
        </div>

        <Link href={href}>
          <h3 className={`text-[17px] font-bold leading-snug line-clamp-2 mb-2.5 transition-colors group-hover:text-[#003ECB] ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
            {title}
          </h3>
        </Link>

        <p className={`text-[13.5px] leading-relaxed line-clamp-2 mb-5 ${isDark ? "text-slate-400" : "text-slate-500"} ${bn}`}>
          {excerpt}
        </p>

        <div className={`mt-auto pt-4 flex items-center justify-between border-t ${isDark ? "border-white/8" : "border-slate-100"}`}>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0" style={{ background: accent }}>
              {author.charAt(0)}
            </span>
            <span className="text-[12px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">{author}</span>
          </div>
          <Link href={href} className="group/r inline-flex items-center gap-1 text-[12px] font-bold" style={{ color: accent }}>
            {isBn ? "বিস্তারিত" : "Read more"}
            <LuArrowRight size={13} className="group-hover/r:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
