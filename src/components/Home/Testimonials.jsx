"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuQuote, LuStar } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const testimonials = [
  {
    id: 1,
    name: "Rakib Hassan",
    designation: "UI/UX Designer, Dhaka",
    color: "#0182E6",
    review:
      "Abu Sayeed's design courses have completely transformed my approach to UX/UI. The practical examples and industry insights are invaluable. I now approach every project with confidence and a professional mindset.",
    rating: 5,
  },
  {
    id: 2,
    name: "Farhan Ahmed",
    designation: "Freelancer, Chittagong",
    color: "#F78F18",
    review:
      "The quality of instruction is exceptional. Every lesson is crafted with care, making complex design concepts easy to understand. The depth of knowledge shared really shows in every module.",
    rating: 5,
  },
  {
    id: 3,
    name: "Tanvir Islam",
    designation: "Graphic Designer, Sylhet",
    color: "#0182E6",
    review:
      "Very responsive support and excellent course content. The templates and resources provided have saved me countless hours. I highly recommend these courses to anyone serious about design.",
    rating: 5,
  },
  {
    id: 4,
    name: "Imran Khan",
    designation: "Creative Director, Rajshahi",
    color: "#F78F18",
    review:
      "The courses are beautifully crafted. Every lesson is easy to understand and practical. I've learned more in a few months here than in years of self-study. Absolutely worth the investment.",
    rating: 5,
  },
  {
    id: 5,
    name: "Sabbir Rahman",
    designation: "Motion Designer, Khulna",
    color: "#0182E6",
    review:
      "Best platform for design learning. All courses are updated with the latest industry trends. The community and support are outstanding. A must-have for any aspiring designer.",
    rating: 5,
  },
];

const Testimonials = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const active = testimonials[activeIndex];

  return (
    <section className={`py-20 md:py-24 transition-colors duration-500 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 text-[#0182E6] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-[#F78F18]" />
            {language === "bn" ? "টেস্টিমোনিয়াল" : "Testimonials"}
            <span className="w-8 h-px bg-[#F78F18]" />
          </div>
          <h2 className={`text-3xl md:text-[40px] font-heading font-bold tracking-tight leading-[1.15] ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
            {language === "bn" ? "শিক্ষার্থীরা যা বলেন" : "What our learners say"}
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl mx-auto">
          {/* Avatars */}
          <div className="flex lg:flex-col items-center justify-center gap-3">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={t.name}
                className={`rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 transition-all duration-300 ${
                  idx === activeIndex
                    ? `ring-2 ring-[#0182E6] ring-offset-2 ${isDark ? "ring-offset-[#0a0a0a]" : "ring-offset-white"}`
                    : "opacity-50 hover:opacity-100"
                }`}
                style={{
                  width: idx === activeIndex ? 60 : 48,
                  height: idx === activeIndex ? 60 : 48,
                  background: t.color,
                  fontSize: idx === activeIndex ? 22 : 17,
                }}
              >
                {t.name.charAt(0)}
              </button>
            ))}
          </div>

          {/* Card */}
          <div className="flex-1 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className={`relative p-8 md:p-10 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-[#f8fafc] border-gray-100"}`}
              >
                <LuQuote size={36} className={`absolute top-6 right-6 ${isDark ? "text-white/10" : "text-slate-200"}`} />
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <LuStar key={i} size={15} className={i < active.rating ? "text-[#F78F18] fill-[#F78F18]" : "text-slate-300"} />
                  ))}
                </div>
                <p className={`text-[16px] md:text-[18px] leading-relaxed mb-8 ${isDark ? "text-slate-300" : "text-slate-700"} ${bn}`}>
                  “{active.review}”
                </p>
                <div className={`flex items-center gap-4 pt-6 border-t ${isDark ? "border-white/5" : "border-gray-200"}`}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                    style={{ background: active.color }}
                  >
                    {active.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{active.name}</h4>
                    <p className="text-[12px] text-[#0182E6] font-medium">{active.designation}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-8 bg-[#0182E6]" : `w-1.5 ${isDark ? "bg-white/20" : "bg-slate-200"}`
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
