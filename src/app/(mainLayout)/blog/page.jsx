"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuBookOpen, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { API_BASE_URL } from "@/config/api";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import AmbientBg from "@/components/Home/AmbientBg";
import BlogCard from "@/components/sheard/BlogCard";
import { FALLBACK_BLOGS } from "@/data/fallbackBlogs";

export default function BlogPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isBn = language === "bn";
  const bn = isBn ? "hind-siliguri" : "";

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/blogs?status=published&page=${currentPage}&limit=9`);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data || []);
          setTotalPages(data.meta?.totalPages || 1);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  const posts = blogs.length > 0 ? blogs : FALLBACK_BLOGS;
  const usingFallback = blogs.length === 0;

  return (
    <main className="min-h-screen bg-white dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-[#003ECB] selection:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 dark:border-white/5 py-16 md:py-20">
        <AmbientBg />
        <div className="container relative z-10 mx-auto px-6 max-w-7xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-5 bg-[#003ECB]/10 text-[#003ECB] ${bn}`}>
            <LuBookOpen size={14} />
            {isBn ? "ব্লগ" : "Blog"}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className={`text-3xl md:text-5xl font-heading font-black tracking-tight leading-[1.1] ${bn}`}>
            {isBn ? <>জ্ঞান ও <span className="text-[#003ECB]">অনুপ্রেরণা</span></> : <>Knowledge &amp; <span className="text-[#003ECB]">Inspiration</span></>}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className={`mt-4 text-[15px] md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed ${bn}`}>
            {isBn
              ? "ডিজাইন, ক্রিয়েটিভিটি ও ক্যারিয়ার নিয়ে আমাদের সেরা লেখাগুলো পড়ুন।"
              : "Read our best articles about design, creativity and career growth."}
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`animate-pulse rounded-2xl h-[420px] ${isDark ? "bg-white/5" : "bg-slate-100"}`} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((blog, i) => (
                  <BlogCard key={blog._id || blog.slug} blog={blog} index={i} />
                ))}
              </div>

              {/* Pagination (only for real, multi-page results) */}
              {!usingFallback && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2.5 mt-14">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all disabled:opacity-40 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-[#003ECB] hover:text-[#003ECB]"
                  >
                    <LuChevronLeft size={18} />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-11 h-11 rounded-xl font-bold text-sm transition-all ${
                        currentPage === page
                          ? "bg-[#003ECB] text-white shadow-lg shadow-[#003ECB]/25"
                          : "border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-[#003ECB] hover:text-[#003ECB]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all disabled:opacity-40 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-[#003ECB] hover:text-[#003ECB]"
                  >
                    <LuChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
