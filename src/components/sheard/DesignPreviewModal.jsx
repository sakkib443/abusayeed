"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

/* Minimal design preview — just the image(s) and the name. */
const DesignPreviewModal = ({ template, onClose }) => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bn = language === "bn" ? "hind-siliguri" : "";

    const images = template?.images?.length ? template.images : [template?.image || "/cat_graphic.png"];
    const [activeIdx, setActiveIdx] = useState(0);

    const prev = useCallback(() => setActiveIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setActiveIdx((i) => (i + 1) % images.length), [images.length]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose, prev, next]);

    if (!template) return null;

    const title = template.title || template.name || "Untitled";

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
                className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            >
                <div
                    className={`relative w-full max-w-3xl rounded-2xl overflow-hidden pointer-events-auto shadow-2xl ${
                        isDark ? "bg-[#0e0e0e] border border-white/10" : "bg-white border border-slate-100"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close */}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                    >
                        <LuX size={18} />
                    </button>

                    {/* Image */}
                    <div className={`relative ${isDark ? "bg-[#0a0a0a]" : "bg-slate-50"}`}>
                        <motion.img
                            key={activeIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            src={images[activeIdx]}
                            alt={title}
                            className="w-full max-h-[72vh] object-contain"
                        />

                        {/* Nav arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prev}
                                    aria-label="Previous"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <LuChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={next}
                                    aria-label="Next"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <LuChevronRight size={20} />
                                </button>
                                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-[11px] font-bold tracking-widest">
                                    {activeIdx + 1} / {images.length}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Name */}
                    <div className="px-6 py-5">
                        <h2 className={`text-xl font-bold leading-tight text-center ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
                            {title}
                        </h2>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DesignPreviewModal;
