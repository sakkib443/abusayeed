"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { fetchBlogs } from "@/redux/blogSlice";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import AmbientBg from "@/components/Home/AmbientBg";
import BlogCard from "@/components/sheard/BlogCard";
import { FALLBACK_BLOGS } from "@/data/fallbackBlogs";

const BlogSection = () => {
  const dispatch = useDispatch();
  const { blogList = [], loading } = useSelector((state) => state.blogs);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";

  useEffect(() => {
    dispatch(fetchBlogs({ limit: 3 }));
  }, [dispatch]);

  const posts = blogList && blogList.length > 0 ? blogList.slice(0, 3) : FALLBACK_BLOGS.slice(0, 3);

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 transition-colors duration-500 ${isDark ? "bg-[#050505]" : "bg-[#f8fafc]"}`}>
      <AmbientBg flip />
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[#0182E6] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
              <span className="w-8 h-px bg-[#F78F18]" />
              {language === "bn" ? "আমাদের ব্লগ" : "Latest Articles"}
            </div>
            <h2 className={`text-3xl md:text-[40px] font-heading font-bold tracking-tight leading-[1.15] ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
              {language === "bn" ? "ডিজাইনারদের জন্য নতুন লেখা" : "Insights & resources for designers"}
            </h2>
          </div>
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 text-[13px] font-semibold transition-colors ${isDark ? "text-gray-300 hover:text-[#003ECB]" : "text-slate-600 hover:text-[#003ECB]"}`}
          >
            {language === "bn" ? "সব পোস্ট" : "View all posts"}
            <LuArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className={`animate-pulse rounded-2xl h-[420px] ${isDark ? "bg-white/5" : "bg-slate-200/60"}`} />
              ))
            : posts.map((blog, i) => <BlogCard key={blog._id || blog.slug} blog={blog} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
