"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LuStar, LuQuote, LuChevronLeft, LuChevronRight, LuPencil } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import AmbientBg from "@/components/Home/AmbientBg";

const REVIEWS = [
  {
    id: 1, name: "Ariful Islam", role: "Graphic Designer", category: "Graphic Design", color: "#003ECB", rating: 5,
    review: "Graphic Design কোর্সটি অসাধারণ! Logo আর Branding-এর প্রতিটা detail হাতে-কলমে শিখেছি। Instructor-এর teaching style অনেক clear এবং বুঝতে সহজ।",
  },
  {
    id: 2, name: "Roksana Begum", role: "Content Creator & Marketer", category: "Social Media", color: "#14B8A6", rating: 5,
    review: "Social Media Design কোর্স আমার চিন্তার জগৎ বদলে দিয়েছে। কীভাবে কাজ করতে হয় শিখেছি, এখন নিজেরই একটা ছোট agency আছে। ধন্যবাদ Creative Solve CS!",
  },
  {
    id: 3, name: "Sumaiya Akter", role: "UI/UX Designer", category: "UI/UX Design", color: "#8B5CF6", rating: 5,
    review: "UI/UX কোর্সটি step-by-step শেখানো হয়েছে — Figma থেকে prototype পর্যন্ত সবকিছু। Instructor-রা অত্যন্ত experienced এবং সবসময় doubt clear করে দিতেন।",
  },
  {
    id: 4, name: "Tanvir Hasan", role: "Video Editor", category: "Video & Motion", color: "#F78F18", rating: 5,
    review: "Video Editing ও Motion Graphics শিখে এখন আমি international client-দের সাথে কাজ করছি। practical project গুলো অনেক বেশি helpful ছিল।",
  },
  {
    id: 5, name: "Nusrat Jahan", role: "Brand Designer", category: "Brand Identity", color: "#EC4899", rating: 4,
    review: "Brand Identity কোর্সে logo, color আর typography — সব শিখেছি। course content এবং support দুটোই top class। নতুনদের জন্য perfect।",
  },
  {
    id: 6, name: "Mahdi Rahman", role: "Freelancer", category: "Print Design", color: "#10B981", rating: 5,
    review: "Print Design কোর্স করে এখন Fiverr-এ regular order পাচ্ছি। ধন্যবাদ স্যার — দারুণ একটা learning journey ছিল, একদম beginner থেকে professional।",
  },
];

const Testimonials = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";

  const n = REVIEWS.length;
  const loop = [...REVIEWS, ...REVIEWS]; // duplicate for a seamless one-by-one loop

  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  // responsive cards-per-view
  useEffect(() => {
    const calc = () => setPerView(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // auto-advance one card every 2s (pauses on hover)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => i + 1), 2000);
    return () => clearInterval(t);
  }, [paused]);

  // seamless loop: when we reach the cloned set, snap back without animation
  useEffect(() => {
    if (index >= n) {
      const t = setTimeout(() => { setAnimate(false); setIndex(index - n); }, 650);
      return () => clearTimeout(t);
    }
  }, [index, n]);

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  const goNext = () => setIndex((i) => i + 1);
  const goPrev = () => {
    if (index <= 0) { setAnimate(false); setIndex(n - 1); }
    else setIndex((i) => i - 1);
  };
  const goTo = (i) => { setAnimate(true); setIndex(i); };

  const activeDot = ((index % n) + n) % n;

  const Card = ({ t }) => (
    <div className={`h-full rounded-2xl border overflow-hidden transition-colors ${isDark ? "bg-[#111] border-white/10" : "bg-white border-slate-100 shadow-[0_10px_30px_rgba(2,6,23,0.05)]"}`}>
      <div className="h-1.5 w-full" style={{ background: t.color }} />
      <div className="p-6 md:p-7 flex flex-col h-[calc(100%-6px)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <LuStar key={i} size={15} className={i < t.rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-slate-300 dark:text-white/15"} />
            ))}
          </div>
          <LuQuote size={34} style={{ color: t.color }} className="opacity-15 shrink-0" />
        </div>

        <p className={`text-[14px] leading-relaxed flex-1 ${isDark ? "text-slate-300" : "text-slate-600"} ${bn}`}>
          “{t.review}”
        </p>

        <div className={`flex items-center justify-between gap-3 mt-6 pt-5 border-t ${isDark ? "border-white/8" : "border-slate-100"}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-base shrink-0" style={{ background: t.color }}>
              {t.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h4 className={`font-bold text-[14px] truncate ${isDark ? "text-white" : "text-slate-900"}`}>{t.name}</h4>
              <p className="text-[12px] text-slate-400 truncate">{t.role}</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap shrink-0" style={{ background: `${t.color}1a`, color: t.color }}>
            {t.category}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 transition-colors duration-500 ${isDark ? "bg-[#0a0a0a]" : "bg-[#f8fafc]"}`}>
      <AmbientBg />
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className={`inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-5 bg-[#003ECB]/10 text-[#003ECB] ${bn}`}>
            {language === "bn" ? "শিক্ষার্থীদের রিভিউ" : "Student Reviews"}
          </span>
          <h2 className={`text-3xl md:text-[42px] font-heading font-black tracking-tight leading-[1.12] ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
            {language === "bn"
              ? <>আমাদের শিক্ষার্থীরা যা <span className="text-[#003ECB]">বলেন</span></>
              : <>What Our Students <span className="text-[#003ECB]">Say</span></>}
          </h2>
          <p className={`mt-4 text-[15px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"} ${bn}`}>
            {language === "bn"
              ? "Creative Solve CS-এ আমাদের সফল শিক্ষার্থীদের শেখার অভিজ্ঞতা শুনুন।"
              : "Hear from our successful students about their learning experience at Creative Solve CS."}
          </p>
          <Link href="/contact"
            className={`inline-flex items-center gap-2 mt-7 px-7 py-3 rounded-full bg-[#003ECB] hover:bg-[#002da3] text-white text-[13px] font-bold transition-all shadow-[0_8px_24px_rgba(0,62,203,0.25)] ${bn}`}>
            <LuPencil size={15} />
            {language === "bn" ? "রিভিউ দিন" : "Add Your Review"}
          </Link>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden py-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div
            className="flex"
            style={{
              width: `${(loop.length / perView) * 100}%`,
              transform: `translateX(-${index * (100 / loop.length)}%)`,
              transition: animate ? "transform 0.6s cubic-bezier(0.4,0,0.2,1)" : "none",
            }}
          >
            {loop.map((t, i) => (
              <div key={`${t.id}-${i}`} className="shrink-0 px-3" style={{ width: `${100 / loop.length}%` }}>
                <Card t={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls: arrows + dots */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <button onClick={goPrev} aria-label="Previous"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${isDark ? "border-white/15 text-slate-300 hover:border-[#003ECB] hover:text-[#003ECB]" : "border-slate-200 text-slate-500 hover:border-[#003ECB] hover:text-[#003ECB]"}`}>
            <LuChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeDot ? "w-7 bg-[#003ECB]" : `w-2 ${isDark ? "bg-white/20 hover:bg-white/40" : "bg-slate-300 hover:bg-slate-400"}`}`} />
            ))}
          </div>

          <button onClick={goNext} aria-label="Next"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${isDark ? "border-white/15 text-slate-300 hover:border-[#003ECB] hover:text-[#003ECB]" : "border-slate-200 text-slate-500 hover:border-[#003ECB] hover:text-[#003ECB]"}`}>
            <LuChevronRight size={18} />
          </button>
        </div>

        {/* Avatar row */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {REVIEWS.map((t, i) => (
            <button key={t.id} onClick={() => goTo(i)} aria-label={t.name}
              className="rounded-full flex items-center justify-center font-bold text-white transition-all duration-300"
              style={{
                background: t.color,
                width: i === activeDot ? 42 : 34,
                height: i === activeDot ? 42 : 34,
                fontSize: i === activeDot ? 16 : 13,
                opacity: i === activeDot ? 1 : 0.45,
                boxShadow: i === activeDot ? `0 0 0 3px ${isDark ? "#0a0a0a" : "#f8fafc"}, 0 0 0 5px ${t.color}` : "none",
              }}>
              {t.name.charAt(0)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
