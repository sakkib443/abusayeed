"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const timer = setInterval(() => {
            setPercent((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 800);
                    return 100;
                }
                const increment = Math.floor(Math.random() * 15) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 50);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                document.body.style.overflow = "auto";
            }, 1000);
        }
    }, [isLoading]);

    const containerVariants = {
        exit: {
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
        }
    };

    const textVariants = {
        initial: { y: 40, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    };

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    variants={containerVariants}
                    initial="initial"
                    exit="exit"
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                >
                    {/* Minimalist Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#003ECB 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}
                    />

                    <div className="relative flex flex-col items-center">

                        {/* Status Label */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute -top-12 text-[10px] tracking-[0.5em] text-[#003ECB] font-bold uppercase"
                        >
                            {percent < 100 ? "Innovating Future" : "Welcome"}
                        </motion.div>

                        {/* Centered Large Branding - Royal Blue & Gold */}
                        <div className="overflow-hidden flex items-center mb-6">
                            <motion.h1
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                className="text-4xl md:text-6xl font-bold tracking-tight flex items-center gap-3"
                            >
                                <span className="text-[#003ECB]">ABU</span>
                                <span className="text-[#D4AF37]">SAYEED</span>
                            </motion.h1>
                        </div>

                        {/* High-End Progress Section */}
                        <div className="flex flex-col items-center space-y-4">
                            {/* Value Display */}
                            <div className="text-3xl md:text-4xl font-light font-sans text-slate-300 tabular-nums">
                                {percent.toString().padStart(3, '0')}
                            </div>

                            {/* Ultra Thin Progress Bar */}
                            <div className="w-48 md:w-64 h-[2px] bg-slate-100 relative overflow-hidden rounded-full">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-[#003ECB]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ type: "spring", bounce: 0 }}
                                />
                            </div>
                        </div>

                        {/* Footer Subtext */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 text-[8px] tracking-[0.3em] text-[#003ECB] font-bold uppercase"
                        >
                            Designer • Developer • Mentor
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
