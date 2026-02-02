"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { LuQuote, LuStar } from "react-icons/lu";

const Testimonials = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "Rakib Hassan",
            designation: "UI/UX Designer, Dhaka",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            review: "Abu Sayeed's design courses have completely transformed my approach to UX/UI. The practical examples and industry insights are invaluable. I now approach every project with confidence and a professional mindset.",
            rating: 5,
        },
        {
            id: 2,
            name: "Farhan Ahmed",
            designation: "Freelancer, Chittagong",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            review: "The quality of instruction is exceptional. Every lesson is crafted with care, making complex design concepts easy to understand. The 20+ years of experience really shows in the depth of knowledge shared.",
            rating: 5,
        },
        {
            id: 3,
            name: "Tanvir Islam",
            designation: "Graphic Designer, Sylhet",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            review: "Very responsive support and excellent course content. The templates and resources provided have saved me countless hours. I highly recommend these courses to anyone serious about design.",
            rating: 5,
        },
        {
            id: 4,
            name: "Imran Khan",
            designation: "Creative Director, Rajshahi",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
            review: "The courses are beautifully crafted. Every lesson is easy to understand and practical. I've learned more in a few months here than in years of self-study. Absolutely worth the investment.",
            rating: 5,
        },
        {
            id: 5,
            name: "Sabbir Rahman",
            designation: "Motion Designer, Khulna",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
            review: "Best platform for design learning. All courses are updated with the latest industry trends. The community and support are outstanding. A must-have for any aspiring designer.",
            rating: 5,
        },
    ];

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className={`py-20 transition-colors duration-700 overflow-hidden relative ${isDark ? "bg-[#020202]" : "bg-[#f8fafc]"}`}>

            {/* Background Aesthetic Elements */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[200px] rounded-full pointer-events-none opacity-20 ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`} />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-[#003ECB] font-normal text-[10px] uppercase tracking-[0.4em] mb-5"
                    >
                        <span className="w-12 h-[1px] bg-[#003ECB]" />
                        {language === 'bn' ? 'টেস্টিমোনিয়াল' : 'Testimonials'}
                        <span className="w-12 h-[1px] bg-[#003ECB]" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`text-[40px] font-heading font-normal tracking-tight leading-[1.1] ${isDark ? "text-white" : "text-slate-900"} ${bengaliClass}`}
                    >
                        {language === 'bn' ? 'মানুষ আমার সম্পর্কে যা বলে' : 'What People Say About Me'}
                    </motion.h2>
                </div>

                {/* Main Content - Left avatars, Right testimonial */}
                <div className="flex flex-col lg:flex-row items-stretch gap-8 max-w-5xl mx-auto">

                    {/* Left Side - Avatar Stack (Overlapping) */}
                    <div className="flex flex-row lg:flex-col items-center justify-center -space-x-5 lg:space-x-0 lg:-space-y-6 lg:py-4">
                        {testimonials.map((t, idx) => (
                            <button
                                key={t.id}
                                onClick={() => setActiveIndex(idx)}
                                style={{ zIndex: 10 + idx }}
                                className={`relative transition-all duration-500 ${idx === activeIndex
                                    ? "scale-125 z-[50] shadow-2xl"
                                    : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0 hover:z-[40] hover:scale-110"
                                    }`}
                            >
                                <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-4 transition-colors duration-300 ${idx === activeIndex
                                    ? "border-[#003ECB]"
                                    : isDark ? "border-[#020202]" : "border-[#f8fafc]"
                                    } shadow-2xl`}>
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right Side - Testimonial Card */}
                    <div className="flex-1 flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className={`relative p-8 md:p-10 rounded-2xl ${isDark ? "bg-white/5 border border-white/10" : "bg-white shadow-xl"}`}
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-6">
                                    <LuQuote size={40} className={`${isDark ? "text-white/5" : "text-slate-100"}`} />
                                </div>

                                {/* Rating Stars */}
                                <div className="flex items-center gap-1 mb-5">
                                    {[...Array(5)].map((_, i) => (
                                        <LuStar
                                            key={i}
                                            size={14}
                                            className={i < activeTestimonial.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}
                                        />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className={`text-[17px] leading-relaxed mb-8 ${isDark ? "text-slate-300" : "text-slate-600"} ${bengaliClass}`}>
                                    "{activeTestimonial.review}"
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#003ECB]/20">
                                        <img
                                            src={activeTestimonial.avatar}
                                            alt={activeTestimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className={`text-base font-normal ${isDark ? "text-white" : "text-slate-900"} ${bengaliClass}`}>
                                            {activeTestimonial.name}
                                        </h4>
                                        <p className="text-[11px] text-[#003ECB] uppercase tracking-[0.15em]">
                                            {activeTestimonial.designation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress Dots */}
                        <div className="flex items-center justify-center gap-2 mt-6">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex
                                        ? "w-8 bg-[#003ECB]"
                                        : `w-1.5 ${isDark ? "bg-white/20" : "bg-slate-200"}`
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
