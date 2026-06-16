"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LuX,
    LuExternalLink,
    LuChevronLeft,
    LuChevronRight,
    LuMaximize2,
} from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const DesignPreviewModal = ({ template, onClose }) => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bn = language === "bn" ? "hind-siliguri" : "";

    const images = template?.images?.length ? template.images : [template?.image || "/cat_graphic.png"];
    const [activeIdx, setActiveIdx] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

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
    const catName = language === "bn"
        ? template.category?.name_bn || template.category?.name || template.templateType || "Design"
        : template.category?.name || template.templateType || "Design";

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
                className={`fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none`}
            >
                <div
                    className={`relative w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col lg:flex-row pointer-events-auto shadow-2xl ${
                        isDark ? "bg-[#0e0e0e] border border-white/8" : "bg-white border border-slate-100"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                            isDark
                                ? "bg-white/10 text-white hover:bg-white/20"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        <LuX size={18} />
                    </button>

                    {/* Left — Image gallery */}
                    <div className={`lg:w-[60%] flex flex-col ${isDark ? "bg-[#0a0a0a]" : "bg-slate-50"}`}>
                        {/* Main image */}
                        <div className="relative flex-1 min-h-[260px] lg:min-h-[420px] overflow-hidden">
                            <motion.img
                                key={activeIdx}
                                initial={{ opacity: 0, scale: 1.03 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                src={images[activeIdx]}
                                alt={title}
                                className={`w-full h-full object-contain p-4 ${fullscreen ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                                onClick={() => setFullscreen((v) => !v)}
                            />

                            {/* Nav arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prev}
                                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all ${
                                            isDark
                                                ? "bg-black/60 text-white hover:bg-black/80"
                                                : "bg-white/90 text-slate-700 hover:bg-white"
                                        }`}
                                    >
                                        <LuChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={next}
                                        className={`absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all ${
                                            isDark
                                                ? "bg-black/60 text-white hover:bg-black/80"
                                                : "bg-white/90 text-slate-700 hover:bg-white"
                                        }`}
                                    >
                                        <LuChevronRight size={18} />
                                    </button>
                                </>
                            )}

                            {/* fullscreen hint */}
                            <button
                                onClick={() => setFullscreen((v) => !v)}
                                className={`absolute bottom-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity ${
                                    isDark ? "bg-white/10 text-white" : "bg-black/10 text-slate-600"
                                }`}
                            >
                                <LuMaximize2 size={14} />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className={`flex gap-2 overflow-x-auto p-3 border-t ${isDark ? "border-white/5" : "border-slate-100"}`}>
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIdx(i)}
                                        className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                            activeIdx === i
                                                ? "border-[#003ECB]"
                                                : "border-transparent opacity-50 hover:opacity-80"
                                        }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right — Info */}
                    <div className="lg:w-[40%] flex flex-col overflow-y-auto p-8">
                        {/* Category */}
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F78F18] mb-3">
                            {catName}
                        </p>

                        {/* Title */}
                        <h2 className={`text-2xl font-bold leading-tight mb-4 ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
                            {title}
                        </h2>

                        {/* Divider */}
                        <div className={`h-px mb-5 ${isDark ? "bg-white/8" : "bg-slate-100"}`} />

                        {/* Description */}
                        {template.description && (
                            <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-slate-400" : "text-slate-600"} ${bn}`}>
                                {template.description}
                            </p>
                        )}

                        {/* Specs */}
                        {(template.platform || template.templateType || template.responsive !== undefined) && (
                            <div className="space-y-3 mb-6">
                                {template.platform && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={isDark ? "text-slate-500" : "text-slate-400"}>
                                            {language === "bn" ? "প্ল্যাটফর্ম" : "Platform"}
                                        </span>
                                        <span className={`font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                            {template.platform}
                                        </span>
                                    </div>
                                )}
                                {template.templateType && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={isDark ? "text-slate-500" : "text-slate-400"}>
                                            {language === "bn" ? "টাইপ" : "Type"}
                                        </span>
                                        <span className={`font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                            {template.templateType}
                                        </span>
                                    </div>
                                )}
                                {template.responsive !== undefined && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={isDark ? "text-slate-500" : "text-slate-400"}>
                                            {language === "bn" ? "রেসপন্সিভ" : "Responsive"}
                                        </span>
                                        <span className={`font-medium ${template.responsive ? "text-emerald-500" : isDark ? "text-slate-300" : "text-slate-700"}`}>
                                            {template.responsive ? (language === "bn" ? "হ্যাঁ" : "Yes") : (language === "bn" ? "না" : "No")}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tags */}
                        {template.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {template.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                                            isDark
                                                ? "bg-white/5 text-slate-400"
                                                : "bg-slate-100 text-slate-500"
                                        }`}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Live Preview button */}
                        {template.previewUrl && (
                            <a
                                href={template.previewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#003ECB] text-white text-sm font-semibold hover:bg-[#002da3] transition-colors"
                            >
                                <LuExternalLink size={16} />
                                {language === "bn" ? "লাইভ প্রিভিউ" : "Live Preview"}
                            </a>
                        )}

                        {/* Image counter */}
                        {images.length > 1 && (
                            <p className={`text-center text-[11px] mt-4 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                                {activeIdx + 1} / {images.length}
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Fullscreen image overlay */}
            {fullscreen && (
                <motion.div
                    key="fullscreen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[102] bg-black/95 flex items-center justify-center cursor-zoom-out"
                    onClick={() => setFullscreen(false)}
                >
                    <img
                        src={images[activeIdx]}
                        alt={title}
                        className="max-w-full max-h-full object-contain"
                    />
                    <button
                        onClick={() => setFullscreen(false)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <LuX size={20} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DesignPreviewModal;
