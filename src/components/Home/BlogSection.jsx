"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowRight, LuCalendar } from "react-icons/lu";
import { fetchBlogs } from "@/redux/blogSlice";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <section className={`py-20 md:py-24 transition-colors duration-500 ${isDark ? "bg-[#050505]" : "bg-[#f8fafc]"}`}>
      <div className="container mx-auto px-6 max-w-7xl">
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
            href="/blogs"
            className={`inline-flex items-center gap-2 text-[13px] font-semibold transition-colors ${isDark ? "text-gray-300 hover:text-[#0182E6]" : "text-slate-600 hover:text-[#0182E6]"}`}
          >
            {language === "bn" ? "সব পোস্ট" : "View all posts"}
            <LuArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className={`animate-pulse rounded-2xl aspect-[16/12] ${isDark ? "bg-white/5" : "bg-slate-200/60"}`} />
              ))
            : blogList.slice(0, 3).map((blog, index) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group flex flex-col"
                >
                  <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl border ${isDark ? "border-white/10 bg-zinc-900" : "border-gray-100 bg-slate-100"}`}>
                    <Link href={`/blogs/slug/${blog.slug}`}>
                      <Image
                        src={blog.thumbnail || blog.image || "/images/placeholder.png"}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[10px] font-semibold text-white uppercase tracking-wider">
                        {blog.category?.name || "Article"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                      <LuCalendar size={12} className="text-[#F78F18]" />
                      {formatDate(blog.createdAt)}
                    </div>
                    <Link href={`/blogs/slug/${blog.slug}`}>
                      <h3 className={`text-lg font-semibold leading-snug transition-colors group-hover:text-[#0182E6] line-clamp-2 ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-[14px] leading-relaxed line-clamp-2 text-slate-500">
                      {blog.summary || blog.shortDescription || "Read the latest update about our activities and industry insights."}
                    </p>
                    <div className={`flex items-center gap-3 pt-4 mt-1 border-t ${isDark ? "border-white/5" : "border-slate-200"}`}>
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={blog.author?.profileImage || "/images/placeholder.png"}
                          alt={blog.author?.name || "Author"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[12px] text-slate-500">
                        {language === "bn" ? "লিখেছেন" : "By"}{" "}
                        <span className={isDark ? "text-white" : "text-slate-700"}>{blog.author?.name || "Abu Sayeed"}</span>
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
