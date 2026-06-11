"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight, LuPlay, LuStar } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const Hero = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";

  return (
    <section className={`relative overflow-hidden ${isDark ? "bg-[#050505] text-white" : "bg-white text-slate-900"}`}>
      {/* two-tone accent glows */}
      <div
        className={`absolute -top-40 right-0 w-[460px] h-[460px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? "bg-[#0182E6]/15" : "bg-[#0182E6]/[0.07]"
        }`}
      />
      <div className="absolute top-16 right-[180px] w-[260px] h-[260px] rounded-full blur-[120px] pointer-events-none bg-[#F78F18]/10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24">
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

          {/* Right — single clean visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
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

              {/* one tasteful stat card, kept inside the frame */}
              <div
                className={`absolute bottom-4 left-4 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md ${
                  isDark ? "bg-[#0a0a0a]/70 border-white/10" : "bg-white/90 border-gray-100 shadow-lg"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#F78F18]/10 flex items-center justify-center">
                  <LuStar className="text-[#F78F18] fill-current" size={20} />
                </div>
                <div>
                  <p className={`font-heading font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>2,500+</p>
                  <p className={`text-[12px] ${isDark ? "text-gray-400" : "text-slate-500"} ${bn}`}>
                    {language === "bn" ? "প্রিমিয়াম টেমপ্লেট" : "Premium templates"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
