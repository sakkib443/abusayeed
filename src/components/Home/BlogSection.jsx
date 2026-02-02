"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/redux/blogSlice";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { LuArrowUpRight, LuCalendar, LuArrowRight } from "react-icons/lu";

const BlogSection = () => {
    const dispatch = useDispatch();
    const { blogList = [], loading } = useSelector((state) => state.blogs);
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        dispatch(fetchBlogs({ limit: 3 }));
    }, [dispatch]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <section className={`py-20 transition-colors duration-700 overflow-hidden relative ${isDark ? "bg-[#020202]" : "bg-white"}`}>

            {/* Background Aesthetic Elements */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none opacity-20 ${isDark ? "bg-purple-900/40" : "bg-purple-100"}`} />
            <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none opacity-20 ${isDark ? "bg-blue-900/40" : "bg-blue-100"}`} />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-[#003ECB] font-normal text-[10px] uppercase tracking-[0.4em] mb-5"
                        >
                            <span className="w-12 h-[1px] bg-[#003ECB]" />
                            {language === 'bn' ? 'আমাদের ব্লগ' : 'Latest Articles'}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className={`text-[40px] font-heading font-normal tracking-tight leading-[1.1] ${isDark ? "text-white" : "text-slate-900"} ${bengaliClass}`}
                        >
                            {language === 'bn'
                                ? 'সর্বশেষ সংবাদ ও নিবন্ধ'
                                : 'Insights & resources for designers'}
                        </motion.h2>
                    </div>

                    <Link href="/blogs">
                        <motion.button
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-[10px] font-normal uppercase tracking-[0.2em] text-slate-500 hover:text-[#003ECB] transition-colors py-2 border-b border-transparent hover:border-[#003ECB]"
                        >
                            <span>{language === 'bn' ? 'সবগুলো দেখুন' : 'View All Posts'}</span>
                            <LuArrowUpRight size={14} />
                        </motion.button>
                    </Link>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className={`animate-pulse rounded-md aspect-[16/12] ${isDark ? "bg-white/5" : "bg-slate-100"}`} />
                        ))
                    ) : (
                        blogList.slice(0, 3).map((blog, index) => (
                            <motion.article
                                key={blog._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group"
                            >
                                <div className="relative h-full flex flex-col">

                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-slate-100 dark:bg-zinc-900 shadow-sm group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700">
                                        <Link href={`/blogs/slug/${blog.slug}`}>
                                            <Image
                                                src={blog.thumbnail || blog.image || "/images/placeholder.png"}
                                                alt={blog.title}
                                                fill
                                                className="object-cover transition-transform duration-[2s] group-hover:scale-110 group-hover:rotate-1"
                                            />
                                        </Link>

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <div className="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-md">
                                                <span className="text-[8px] font-normal text-white uppercase tracking-widest">
                                                    {blog.category?.name || 'Article'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hover Arrow */}
                                        <div className="absolute bottom-4 right-4 z-20 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <Link
                                                href={`/blogs/slug/${blog.slug}`}
                                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-lg hover:bg-[#003ECB] hover:text-white transition-colors"
                                            >
                                                <LuArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="mt-6 px-1 flex flex-col gap-3">
                                        {/* Date */}
                                        <div className="flex items-center gap-2">
                                            <LuCalendar size={12} className="text-[#003ECB]" />
                                            <p className="text-[10px] text-slate-400 font-normal uppercase tracking-[0.15em]">
                                                {formatDate(blog.createdAt)}
                                            </p>
                                        </div>

                                        {/* Title */}
                                        <Link href={`/blogs/slug/${blog.slug}`}>
                                            <h4 className={`text-lg font-normal leading-tight transition-colors group-hover:text-[#003ECB] ${isDark ? "text-white" : "text-slate-900"} ${bengaliClass} line-clamp-2`}>
                                                {blog.title}
                                            </h4>
                                        </Link>

                                        {/* Summary */}
                                        <p className={`text-[15px] leading-relaxed line-clamp-2 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                            {blog.summary || blog.shortDescription || "Read the latest update about our activities and industry insights."}
                                        </p>

                                        {/* Author */}
                                        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                                <Image
                                                    src={blog.author?.profileImage || "/images/placeholder.png"}
                                                    alt={blog.author?.name || "Author"}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="text-[11px] font-normal text-slate-500">
                                                {language === 'bn' ? 'লিখেছেন' : 'By'} <span className={`${isDark ? "text-white" : "text-slate-700"}`}>{blog.author?.name || "Abu Sayeed"}</span>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </motion.article>
                        ))
                    )}
                </div>

            </div>
        </section>
    );
};

export default BlogSection;
