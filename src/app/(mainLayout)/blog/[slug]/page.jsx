"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowLeft, LuArrowRight, LuCalendar, LuClock, LuBookOpen } from "react-icons/lu";
import { API_BASE_URL } from "@/config/api";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { getFallbackBlogBySlug } from "@/data/fallbackBlogs";

export default function SingleBlogPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isBn = language === "bn";
  const bn = isBn ? "hind-siliguri" : "";

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          setBlog(data.data);
        } else {
          setBlog(getFallbackBlogBySlug(slug));
        }
      } catch (error) {
        setBlog(getFallbackBlogBySlug(slug));
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#003ECB]/20 border-t-[#003ECB] rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#003ECB]/10 text-[#003ECB] flex items-center justify-center">
            <LuBookOpen size={28} />
          </div>
          <h1 className={`text-2xl font-heading font-black mb-3 ${bn}`}>{isBn ? "ব্লগ পাওয়া যায়নি" : "Blog not found"}</h1>
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#003ECB] font-bold text-sm">
            <LuArrowLeft size={16} /> {isBn ? "ব্লগে ফিরে যান" : "Back to Blog"}
          </Link>
        </div>
      </div>
    );
  }

  const isFb = blog._sample;
  const accent = blog.color || "#003ECB";
  const title = isBn ? blog.titleBn || blog.title : blog.title;
  const excerpt = isBn ? blog.excerptBn || blog.excerpt : blog.excerpt;
  const content = isFb ? (isBn ? blog.contentHtmlBn : blog.contentHtml) : blog.content;
  const thumb = blog.thumbnail || blog.image;
  const catName =
    blog.category?.name || (typeof blog.category === "string" ? blog.category : null) || (isBn ? "আর্টিকেল" : "Article");
  const author =
    blog.author?.name ||
    (blog.author?.firstName ? `${blog.author.firstName} ${blog.author.lastName || ""}`.trim() : null) ||
    (typeof blog.author === "string" ? blog.author : null) ||
    "Md. Abu Sayeed";
  const date = blog.publishedAt || blog.createdAt;
  let fmtDate = "";
  try {
    if (date) fmtDate = new Date(date).toLocaleDateString(isBn ? "bn-BD" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch { /* ignore */ }
  const tags = blog.tags || [];

  return (
    <main className="min-h-screen bg-white dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-[#003ECB] selection:text-white">
      <article className="container mx-auto px-6 max-w-3xl py-12 md:py-16">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-500 dark:text-slate-400 hover:text-[#003ECB] transition-colors mb-8">
          <LuArrowLeft size={16} /> {isBn ? "সব পোস্ট" : "All posts"}
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-[12px]">
          <span className="px-3 py-1 rounded-full font-bold text-white" style={{ background: accent }}>{catName}</span>
          {fmtDate && (
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <LuCalendar size={13} /> {fmtDate}
            </span>
          )}
          {blog.readingTime ? (
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <LuClock size={13} /> {blog.readingTime} {isBn ? "মিনিট পড়া" : "min read"}
            </span>
          ) : null}
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className={`text-3xl md:text-[42px] font-heading font-black tracking-tight leading-[1.12] mb-5 ${bn}`}>
          {title}
        </motion.h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: accent }}>
            {author.charAt(0)}
          </span>
          <div>
            <p className={`text-sm font-bold leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>{author}</p>
            <p className="text-[11px] text-slate-400">{isBn ? "লেখক" : "Author"}</p>
          </div>
        </div>

        {/* Hero image */}
        {thumb && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}
            className="rounded-2xl overflow-hidden border border-slate-100 dark:border-white/10 mb-10">
            <img src={thumb} alt={title} className="w-full aspect-[16/9] object-cover" />
          </motion.div>
        )}

        {/* Excerpt lead */}
        {excerpt && (
          <p className={`text-lg leading-relaxed text-slate-600 dark:text-slate-300 border-l-4 pl-5 mb-10 italic ${bn}`} style={{ borderColor: accent }}>
            {excerpt}
          </p>
        )}

        {/* Content */}
        {content ? (
          <div
            className={`max-w-none text-slate-600 dark:text-slate-300 leading-[1.85] text-[15.5px] space-y-5
              [&_h2]:text-2xl [&_h2]:font-heading [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-1 [&_h2]:text-slate-900 dark:[&_h2]:text-white
              [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:text-slate-900 dark:[&_h3]:text-white
              [&_p]:leading-[1.85]
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6
              [&_a]:text-[#003ECB] [&_a]:font-medium hover:[&_a]:underline
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#003ECB] [&_blockquote]:pl-5 [&_blockquote]:italic
              [&_strong]:text-slate-900 dark:[&_strong]:text-white ${bn}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-slate-500">{isBn ? "এই পোস্টের বিস্তারিত শীঘ্রই আসছে।" : "Full content coming soon."}</p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-12">
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-14 pt-8 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-[#003ECB] hover:gap-3 transition-all">
            <LuArrowLeft size={16} /> {isBn ? "সব পোস্ট দেখুন" : "View all posts"}
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#003ECB] hover:bg-[#002da3] text-white text-xs font-bold uppercase tracking-widest transition-all">
            {isBn ? "যোগাযোগ" : "Get in touch"} <LuArrowRight size={14} />
          </Link>
        </div>
      </article>
    </main>
  );
}
