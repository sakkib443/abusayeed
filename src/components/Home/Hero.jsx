"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight, LuPlay, LuStar } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import AmbientBg from "@/components/Home/AmbientBg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const AVATARS = [
  { c: "#003ECB", l: "A" },
  { c: "#F78F18", l: "R" },
  { c: "#14B8A6", l: "S" },
  { c: "#8B5CF6", l: "T" },
];

const Hero = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";

  return (
    <section className={`relative overflow-hidden ${isDark ? "bg-[#050505] text-white" : "bg-white text-slate-900"}`}>
      {/* animated backdrop */}
      <AmbientBg />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 md:py-16">
          {/* Left — copy */}
          <div className="max-w-xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] font-semibold mb-7 ${
                isDark ? "border-white/10 bg-white/5 text-gray-300" : "border-gray-200 bg-gray-50 text-slate-600"
              } ${bn}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F78F18]" />
              {language === "bn" ? "ডিজাইন শেখা ও মার্কেটপ্লেস — একসাথে" : "Learn design & shop premium assets"}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className={`font-heading font-bold tracking-tight leading-[1.1] text-[36px] md:text-[52px] mb-6 ${bn}`}
            >
              {language === "bn" ? (
                <>
                  সৃজনশীলতা শিখুন,
                  <br />
                  <span className="bg-gradient-to-r from-[#F78F18] to-[#0182E6] bg-clip-text text-transparent">পেশাদার</span> হয়ে উঠুন
                </>
              ) : (
                <>
                  Master creative design,
                  <br />
                  the <span className="bg-gradient-to-r from-[#F78F18] to-[#0182E6] bg-clip-text text-transparent">professional</span> way
                </>
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className={`text-[15px] md:text-[17px] leading-relaxed mb-9 ${isDark ? "text-gray-400" : "text-slate-500"} ${bn}`}
            >
              {language === "bn"
                ? "প্রিমিয়াম ডিজাইন রিসোর্স, ইন্ডাস্ট্রি-স্ট্যান্ডার্ড কোর্স আর অভিজ্ঞ মেন্টরশিপ — সব এক জায়গায়।"
                : "Premium design resources, industry-grade courses, and expert mentorship — all in one place."}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Link
                href="/courses"
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#0182E6] text-white text-[15px] font-semibold hover:bg-[#0065c5] transition-colors shadow-lg shadow-[#0182E6]/20 ${bn}`}
              >
                {language === "bn" ? "শুরু করুন" : "Get started"}
                <LuArrowRight size={18} />
              </Link>
              <Link
                href="/design-template"
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-semibold border transition-colors ${
                  isDark ? "border-white/15 text-white hover:bg-white/5" : "border-gray-200 text-slate-700 hover:bg-gray-50"
                } ${bn}`}
              >
                <LuPlay size={15} className="text-[#F78F18]" />
                {language === "bn" ? "টেমপ্লেট দেখুন" : "Browse templates"}
              </Link>
            </motion.div>

            {/* trust row */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="flex items-center gap-6">
              <div>
                <div className="flex items-center gap-0.5 text-[#F78F18]">
                  {[...Array(5)].map((_, i) => (
                    <LuStar key={i} size={15} className="fill-current" />
                  ))}
                </div>
                <p className={`text-[13px] mt-1 ${isDark ? "text-gray-500" : "text-slate-500"} ${bn}`}>
                  {language === "bn" ? "৪.৯/৫ — ১২,০০০+ রিভিউ" : "4.9/5 from 12,000+ reviews"}
                </p>
              </div>
              <div className={`h-10 w-px ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
              <div>
                <p className="font-heading font-bold text-xl">700K+</p>
                <p className={`text-[13px] ${isDark ? "text-gray-500" : "text-slate-500"} ${bn}`}>
                  {language === "bn" ? "সন্তুষ্ট শিক্ষার্থী" : "Happy learners"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — visual with floating accents */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full max-w-[440px] mx-auto lg:ml-auto lg:mr-0"
          >
            {/* soft glow + offset panel behind the image */}
            <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-[#003ECB]/15 via-transparent to-[#F78F18]/10 blur-2xl -z-10" />
            <div aria-hidden className={`absolute -z-10 top-6 -right-6 w-full h-full rounded-3xl ${isDark ? "bg-[#0182E6]/10" : "bg-[#0182E6]/[0.06]"}`} />

            {/* image card */}
            <div
              className={`relative rounded-2xl overflow-hidden border ${
                isDark ? "border-white/10 shadow-2xl shadow-black/40" : "border-gray-100 shadow-2xl shadow-slate-200/70"
              }`}
            >
              <img
                src="/images/office-showcase.png"
                alt="Professional creative workspace"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>

            {/* floating: new batch enrolling (top-left) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-4 -left-4 z-20"
            >
              <div className={`animate-floatY flex items-center gap-2.5 px-4 py-2.5 rounded-xl backdrop-blur-md border shadow-lg ${isDark ? "bg-[#0a0a0a]/80 border-white/10" : "bg-white/90 border-slate-100"}`}>
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className={`text-[12px] font-bold ${isDark ? "text-slate-200" : "text-slate-700"} ${bn}`}>
                  {language === "bn" ? "নতুন ব্যাচ চলছে" : "New batch enrolling"}
                </span>
              </div>
            </motion.div>

            {/* floating: community avatars (bottom-right) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="absolute -bottom-5 -right-4 z-20"
            >
              <div className={`animate-floatY2 flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-md border shadow-lg ${isDark ? "bg-[#0a0a0a]/80 border-white/10" : "bg-white/90 border-slate-100"}`}>
                <div className="flex -space-x-2">
                  {AVATARS.map((a, i) => (
                    <span
                      key={i}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white ring-2 ${isDark ? "ring-[#0a0a0a]" : "ring-white"}`}
                      style={{ background: a.c }}
                    >
                      {a.l}
                    </span>
                  ))}
                </div>
                <div>
                  <p className={`text-[12px] font-bold leading-tight ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
                    {language === "bn" ? "কমিউনিটিতে যোগ দিন" : "Join the community"}
                  </p>
                  <p className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-400"} ${bn}`}>
                    {language === "bn" ? "ডিজাইনার ও শিক্ষার্থী" : "Designers & learners"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
