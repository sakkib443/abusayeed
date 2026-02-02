"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { LuArrowRight, LuAward, LuUsers, LuBookOpen } from "react-icons/lu";

const AboutMe = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    const achievements = [
        {
            icon: <LuAward size={20} />,
            value: "20+",
            label: language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'
        },
        {
            icon: <LuUsers size={20} />,
            value: "15K+",
            label: language === 'bn' ? 'শিক্ষার্থী' : 'Students Trained'
        },
        {
            icon: <LuBookOpen size={20} />,
            value: "50+",
            label: language === 'bn' ? 'কোর্স' : 'Courses Created'
        }
    ];

    return (
        <section className={`py-24 transition-colors duration-500 overflow-hidden ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
            <div className="container mx-auto px-4 max-w-7xl">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Main Image */}
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md">
                                <img
                                    src="/about_instructor.png"
                                    alt="Abu Sayeed"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </div>

                            {/* Experience Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className={`absolute -bottom-6 -right-6 md:right-auto md:-left-6 px-6 py-4 rounded-xl shadow-xl ${isDark ? 'bg-[#111] border border-white/10' : 'bg-white border border-gray-100'}`}
                            >
                                <div className="text-center">
                                    <span className="text-3xl font-bold text-[#003ECB]">20+</span>
                                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Decorative Element */}
                            <div className={`absolute -z-10 top-8 -right-8 w-full h-full rounded-2xl ${isDark ? 'bg-[#003ECB]/10' : 'bg-[#003ECB]/5'}`} />
                        </div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 text-[#003ECB] text-[10px] uppercase tracking-[0.4em]"
                        >
                            <span className="w-10 h-[1px] bg-[#003ECB]" />
                            {language === 'bn' ? 'আমার সম্পর্কে' : 'About Me'}
                        </motion.div>

                        {/* Heading */}
                        <h2 className={`text-3xl md:text-4xl font-heading font-normal tracking-tight leading-[1.2] ${isDark ? "text-white" : "text-slate-900"} ${bengaliClass}`}>
                            {language === 'bn'
                                ? 'পেশাদার ডিজাইন ইন্সট্রাক্টর ও মেন্টর'
                                : 'Professional Design Instructor & Creative Mentor'}
                        </h2>

                        {/* Description */}
                        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"} ${bengaliClass}`}>
                            {language === 'bn'
                                ? 'আমি আবু সাঈদ, ২০ বছরেরও বেশি সময় ধরে গ্রাফিক ডিজাইন এবং ডিজিটাল আর্ট শেখাচ্ছি। আমার লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে পেশাদার ডিজাইনার হিসেবে গড়ে তোলা।'
                                : 'I am Abu Sayeed, a passionate design educator with over 20 years of experience in graphic design and digital art. My mission is to transform every student into a professional designer.'}
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-6 pt-4">
                            {achievements.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/5 text-[#003ECB]' : 'bg-[#003ECB]/5 text-[#003ECB]'}`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.value}</span>
                                        <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{item.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link href="/about">
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#003ECB] text-white text-sm font-medium rounded-lg hover:bg-[#002da3] transition-colors"
                                >
                                    {language === 'bn' ? 'আরো জানুন' : 'Learn More'}
                                    <LuArrowRight size={16} />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default AboutMe;
