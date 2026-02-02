"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { fetchDesignTemplates } from "@/redux/designTemplateSlice";
import { LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";
import ProductCard from "@/components/sheard/ProductCard";

const PopularDesign = () => {
    const dispatch = useDispatch();
    const { items: templates = [], loading } = useSelector((state) => state.designTemplates);
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        dispatch(fetchDesignTemplates({ limit: 6 }));
    }, [dispatch]);

    return (
        <section className={`py-20 transition-colors duration-700 overflow-hidden relative ${isDark ? "bg-[#020202]" : "bg-[#f8fafc]"}`}>

            {/* Background Aesthetic Elements */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none opacity-20 ${isDark ? "bg-blue-900/40" : "bg-blue-100"}`} />
            <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none opacity-20 ${isDark ? "bg-purple-900/40" : "bg-purple-100"}`} />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Header Information */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-[#003ECB] font-normal text-[10px] uppercase tracking-[0.4em] mb-5"
                        >
                            <span className="w-12 h-[1px] bg-[#003ECB]" />
                            {language === 'bn' ? 'জনপ্রিয় টেমপ্লেট' : 'Popular Templates'}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className={`text-[40px] font-heading font-normal tracking-tight leading-[1.1] ${isDark ? "text-white" : "text-slate-900"
                                } ${bengaliClass}`}
                        >
                            {language === 'bn'
                                ? 'প্রফেশনাল ডিজাইন টেমপ্লেট কালেকশন'
                                : 'Popular Design Templates'}
                        </motion.h2>
                    </div>

                    <Link href="/design-template">
                        <motion.button
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-700 hover:text-[#003ECB] transition-colors py-2 border-b border-gray-300 hover:border-[#003ECB]"
                        >
                            <span>{language === 'bn' ? 'সবগুলো দেখুন' : 'Explore Market'}</span>
                            <LuArrowUpRight size={14} />
                        </motion.button>
                    </Link>
                </div>

                {/* Designs Grid - Using ProductCard Component */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className={`animate-pulse rounded-md aspect-[16/10] ${isDark ? "bg-white/5" : "bg-slate-100"}`} />
                        ))
                    ) : (
                        templates.slice(0, 6).map((item) => (
                            <ProductCard
                                key={item._id}
                                product={item}
                                type="design-template"
                            />
                        ))
                    )}
                </div>

            </div>
        </section>
    );
};

export default PopularDesign;
