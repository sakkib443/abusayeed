"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
                    {/* Subtle dot pattern */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#0182E6 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}
                    />

                    <div className="relative flex flex-col items-center">

                        {/* Logo */}
                        <motion.div
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            className="mb-8"
                        >
                            <Image
                                src="/images/creation logo-01.png"
                                alt="Creative Solve CS"
                                width={220}
                                height={63}
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Progress Section */}
                        <div className="flex flex-col items-center space-y-3">
                            <div className="text-2xl font-light text-slate-300 tabular-nums">
                                {percent.toString().padStart(3, '0')}
                            </div>
                            <div className="w-48 md:w-64 h-[2px] bg-slate-100 relative overflow-hidden rounded-full">
                                <motion.div
                                    className="absolute top-0 left-0 h-full"
                                    style={{ background: 'linear-gradient(to right, #F78F18, #0182E6)' }}
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ type: "spring", bounce: 0 }}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 text-[9px] tracking-[0.35em] text-slate-400 font-semibold uppercase"
                        >
                            Designer · Developer · Mentor
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
