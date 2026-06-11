"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { LuUsers, LuFolderOpen, LuDownload, LuStar } from "react-icons/lu";

const CounterSection = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        {
            id: 1,
            value: 15000,
            suffix: "+",
            label: language === 'bn' ? 'সন্তুষ্ট গ্রাহক' : 'Happy Customers',
            icon: <LuUsers size={18} />
        },
        {
            id: 2,
            value: 500,
            suffix: "+",
            label: language === 'bn' ? 'ডিজাইন টেমপ্লেট' : 'Design Templates',
            icon: <LuFolderOpen size={18} />
        },
        {
            id: 3,
            value: 50000,
            suffix: "+",
            label: language === 'bn' ? 'ডাউনলোড' : 'Total Downloads',
            icon: <LuDownload size={18} />
        },
        {
            id: 4,
            value: 4.9,
            suffix: "",
            label: language === 'bn' ? 'গড় রেটিং' : 'Average Rating',
            icon: <LuStar size={18} />,
            isDecimal: true
        }
    ];

    // Counter animation hook
    const useCounter = (end, duration = 2000, isDecimal = false) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!isInView) return;

            let startTime;
            let animationFrame;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);

                const currentValue = isDecimal
                    ? parseFloat((easeOutQuart * end).toFixed(1))
                    : Math.floor(easeOutQuart * end);

                setCount(currentValue);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        }, [end, duration, isDecimal, isInView]);

        return count;
    };

    const CounterItem = ({ stat, index }) => {
        const count = useCounter(stat.value, 2000, stat.isDecimal);

        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
            >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-md flex items-center justify-center mb-3 transition-colors ${isDark ? 'bg-white/5 text-[#0182E6] group-hover:bg-[#0182E6]/20' : 'bg-[#0182E6]/5 text-[#0182E6] group-hover:bg-[#0182E6]/10'}`}>
                    {stat.icon}
                </div>

                {/* Number */}
                <div className={`text-2xl md:text-3xl font-heading font-medium tracking-tight mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {stat.isDecimal ? count.toFixed(1) : count.toLocaleString()}{stat.suffix}
                </div>

                {/* Label */}
                <p className="text-xs text-slate-500">
                    {stat.label}
                </p>
            </motion.div>
        );
    };

    return (
        <section
            ref={ref}
            className={`py-14 md:py-16 transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f8fafc]'}`}
        >
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <CounterItem key={stat.id} stat={stat} index={index} />
                    ))}
                </div>

                {/* Decorative Line */}
                <div className="mt-10 flex items-center justify-center">
                    <div className={`w-32 h-[1px] ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                    <div className="w-2 h-2 rounded-full bg-[#F78F18] mx-4" />
                    <div className={`w-32 h-[1px] ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                </div>
            </div>
        </section>
    );
};

export default CounterSection;
