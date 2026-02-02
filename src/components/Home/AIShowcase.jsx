"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { LuSparkles, LuImage, LuVideo, LuMusic, LuWand, LuPlay } from "react-icons/lu";

const AIShowcase = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    const [activeCategory, setActiveCategory] = useState("image-editing");
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    // Tool logos
    const toolLogos = [
        { name: "KLING", icon: "🎬" },
        { name: "Flux", icon: "⚡" },
        { name: "ChatGPT", icon: "🤖" },
        { name: "ElevenLabs", icon: "🔊" },
        { name: "Runway", icon: "🎥" },
        { name: "Google", icon: "🔍" },
        { name: "MiniMax", icon: "🌐" },
        { name: "Magnific", icon: "✨" },
    ];

    // Categories with their showcase content - single image for B&W to Color effect
    const categories = [
        {
            id: "image-editing",
            label: language === 'bn' ? 'ইমেজ এডিটিং' : 'Image Editing',
            icon: <LuWand size={16} />,
            title: language === 'bn' ? 'AI দিয়ে ইমেজ এডিটিং' : 'AI-Powered Image Editing',
            description: language === 'bn' ? 'এক ক্লিকে ইমেজ এনহ্যান্স, রিটাচ এবং ট্রান্সফর্ম করুন।' : 'Enhance, retouch, and transform images with a single click.',
            image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
            features: ["Background Removal", "Face Enhancement", "Color Correction", "Upscaling"],
        },
        {
            id: "image-generation",
            label: language === 'bn' ? 'ইমেজ জেনারেশন' : 'Image Generation',
            icon: <LuImage size={16} />,
            title: language === 'bn' ? 'AI ইমেজ জেনারেশন' : 'AI Image Generation',
            description: language === 'bn' ? 'টেক্সট থেকে অসাধারণ ইমেজ তৈরি করুন।' : 'Create stunning images from text descriptions.',
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
            features: ["Text to Image", "Style Transfer", "Art Generation", "Concept Art"],
        },
        {
            id: "video-generation",
            label: language === 'bn' ? 'ভিডিও জেনারেশন' : 'Video Generation',
            icon: <LuVideo size={16} />,
            title: language === 'bn' ? 'AI ভিডিও জেনারেশন' : 'AI Video Creation',
            description: language === 'bn' ? 'টেক্সট বা ইমেজ থেকে ভিডিও তৈরি করুন।' : 'Generate videos from text or images instantly.',
            image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop",
            features: ["Text to Video", "Image to Video", "Animation", "Motion Graphics"],
        },
        {
            id: "video-editing",
            label: language === 'bn' ? 'ভিডিও এডিটিং' : 'Video Editing',
            icon: <LuPlay size={16} />,
            title: language === 'bn' ? 'AI ভিডিও এডিটিং' : 'AI Video Editing',
            description: language === 'bn' ? 'স্বয়ংক্রিয়ভাবে ভিডিও এডিট করুন।' : 'Automatically edit and enhance your videos.',
            image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
            features: ["Auto Cut", "Color Grade", "Remove Background", "Add Effects"],
        },
        {
            id: "audio-generation",
            label: language === 'bn' ? 'অডিও জেনারেশন' : 'Audio Generation',
            icon: <LuMusic size={16} />,
            title: language === 'bn' ? 'AI অডিও জেনারেশন' : 'AI Audio & Voice',
            description: language === 'bn' ? 'প্রাকৃতিক ভয়েস এবং মিউজিক তৈরি করুন।' : 'Generate natural voices and music with AI.',
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop",
            features: ["Text to Speech", "Voice Cloning", "Music Generation", "Sound Effects"],
        },
    ];

    const activeData = categories.find(cat => cat.id === activeCategory);

    // Handle mouse/touch drag
    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleMove(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging]);

    // Reset slider when category changes
    useEffect(() => {
        setSliderPosition(50);
    }, [activeCategory]);

    return (
        <section className={`py-20 transition-colors duration-700 overflow-hidden relative ${isDark ? "bg-[#050505]" : "bg-[#f8fafc]"}`}>

            {/* Background */}
            <div className={`absolute inset-0 bg-[linear-gradient(rgba(0,62,203,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,62,203,0.03)_1px,transparent_1px)] bg-[size:60px_60px] ${isDark ? 'opacity-100' : 'opacity-50'}`} />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[200px] rounded-full pointer-events-none ${isDark ? 'opacity-30 bg-blue-900/20' : 'opacity-20 bg-blue-200/50'}`} />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Tool Logos Marquee Carousel */}
                <div className="relative overflow-hidden mb-12">
                    {/* Gradient Fade Left */}
                    <div className={`absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${isDark ? 'bg-gradient-to-r from-[#050505] to-transparent' : 'bg-gradient-to-r from-[#f8fafc] to-transparent'}`} />
                    {/* Gradient Fade Right */}
                    <div className={`absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${isDark ? 'bg-gradient-to-l from-[#050505] to-transparent' : 'bg-gradient-to-l from-[#f8fafc] to-transparent'}`} />

                    <motion.div
                        className="flex items-center gap-12"
                        animate={{ x: [0, -1200] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {/* Double the logos for seamless loop */}
                        {[...toolLogos, ...toolLogos, ...toolLogos].map((tool, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-3 transition-colors cursor-pointer group whitespace-nowrap ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                <span className="text-3xl">{tool.icon}</span>
                                <span className="text-lg font-semibold tracking-wide">{tool.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Main Showcase Area */}
                <div className="relative max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                        >
                            {/* Left: Control Panel */}
                            <div className={`rounded-md p-5 space-y-4 border ${isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'}`}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-md flex items-center justify-center text-[#003ECB] ${isDark ? 'bg-[#003ECB]/20' : 'bg-[#003ECB]/10'}`}>
                                        <LuSparkles size={16} />
                                    </div>
                                    <div>
                                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeData?.title}</h3>
                                        <p className="text-slate-500 text-xs">{activeData?.description}</p>
                                    </div>
                                </div>

                                {/* Mode Toggle */}
                                <div className="space-y-1.5">
                                    <label className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Mode</label>
                                    <div className="flex gap-2">
                                        <button className={`flex-1 px-3 py-2 text-xs rounded-md ${isDark ? 'bg-white/10 text-white' : 'bg-[#003ECB] text-white'}`}>Creative</button>
                                        <button className={`flex-1 px-3 py-2 text-xs rounded-md transition-colors ${isDark ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'}`}>Precision</button>
                                    </div>
                                </div>

                                {/* Model Selector */}
                                <div className="space-y-1.5">
                                    <label className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Model</label>
                                    <select className={`w-full px-3 py-2 text-xs rounded-md focus:outline-none focus:border-[#003ECB] ${isDark ? 'bg-white/5 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-slate-900'}`}>
                                        <option>Magnific</option>
                                        <option>Flux Pro</option>
                                        <option>DALL-E 3</option>
                                    </select>
                                </div>

                                {/* Features List */}
                                <div className="space-y-2">
                                    <label className={`text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Features</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {activeData?.features.map((feature, i) => (
                                            <div key={i} className={`px-3 py-2 rounded-md text-xs flex items-center gap-2 ${isDark ? 'bg-white/5 text-slate-300' : 'bg-gray-50 text-slate-600'}`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#003ECB]"></span>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Generate Button */}
                                <button className="w-full py-3 bg-[#003ECB] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2">
                                    <LuSparkles size={14} />
                                    {language === 'bn' ? 'জেনারেট করুন' : 'Generate'}
                                </button>
                            </div>

                            {/* Right: Interactive Before/After Slider */}
                            <div
                                ref={containerRef}
                                className={`relative aspect-[16/10] rounded-md overflow-hidden cursor-ew-resize select-none border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                                onMouseDown={handleMouseDown}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleMouseUp}
                            >
                                {/* Black & White Image (Bottom Layer) */}
                                <div className="absolute inset-0">
                                    <img
                                        src={activeData?.image}
                                        alt="Before - Black & White"
                                        className="w-full h-full object-cover"
                                        style={{ filter: 'grayscale(100%)' }}
                                        draggable="false"
                                    />
                                </div>

                                {/* Colorful Image (Top Layer - Clipped) */}
                                <div
                                    className="absolute inset-0 overflow-hidden"
                                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                                >
                                    <img
                                        src={activeData?.image}
                                        alt="After - Colorful"
                                        className="w-full h-full object-cover"
                                        draggable="false"
                                    />
                                </div>

                                {/* Slider Line & Handle */}
                                <div
                                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20"
                                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                                >
                                    {/* Handle Button */}
                                    <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${isDragging ? 'bg-[#003ECB] scale-110' : 'bg-white'}`}>
                                        <div className="flex gap-0.5">
                                            <span className={`w-0.5 h-4 rounded-full transition-colors ${isDragging ? 'bg-white' : 'bg-slate-400'}`}></span>
                                            <span className={`w-0.5 h-4 rounded-full transition-colors ${isDragging ? 'bg-white' : 'bg-slate-400'}`}></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Labels */}
                                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                                    {language === 'bn' ? 'আগে' : 'B&W'}
                                </div>
                                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#003ECB] rounded-full text-white text-xs font-medium">
                                    {language === 'bn' ? 'পরে' : 'Color'}
                                </div>

                                {/* Drag Hint */}
                                {!isDragging && (
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-[10px] flex items-center gap-2 animate-pulse">
                                        <span>←</span>
                                        {language === 'bn' ? 'টেনে দেখুন' : 'Drag to compare'}
                                        <span>→</span>
                                    </div>
                                )}

                                {/* Progress Indicator */}
                                <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white text-[10px]">
                                    {Math.round(sliderPosition)}%
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mt-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-5 py-2.5 rounded-md text-xs font-medium transition-all duration-300 flex items-center gap-2 border ${activeCategory === cat.id
                                ? "bg-[#003ECB] text-white border-[#003ECB]"
                                : isDark
                                    ? "bg-transparent text-slate-400 border-white/10 hover:bg-white/5 hover:text-white"
                                    : "bg-white text-slate-600 border-gray-200 hover:bg-gray-50 hover:text-slate-900"
                                }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AIShowcase;
