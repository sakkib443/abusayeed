"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LuImage, LuVideo, LuMusic, LuWand, LuPlay, LuCheck, LuArrowRight } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const AIShowcase = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";

  const [activeCategory, setActiveCategory] = useState("image-editing");
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const categories = [
    {
      id: "image-editing",
      label: language === "bn" ? "ইমেজ এডিটিং" : "Image Editing",
      icon: <LuWand size={15} />,
      title: language === "bn" ? "AI দিয়ে ইমেজ এডিটিং" : "AI-Powered Image Editing",
      description: language === "bn" ? "এক ক্লিকে ইমেজ এনহ্যান্স, রিটাচ এবং ট্রান্সফর্ম করুন।" : "Enhance, retouch, and transform images with a single click.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      features: ["Background Removal", "Face Enhancement", "Color Correction", "Upscaling"],
    },
    {
      id: "image-generation",
      label: language === "bn" ? "ইমেজ জেনারেশন" : "Image Generation",
      icon: <LuImage size={15} />,
      title: language === "bn" ? "AI ইমেজ জেনারেশন" : "AI Image Generation",
      description: language === "bn" ? "টেক্সট থেকে অসাধারণ ইমেজ তৈরি করুন।" : "Create stunning images from text descriptions.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
      features: ["Text to Image", "Style Transfer", "Art Generation", "Concept Art"],
    },
    {
      id: "video-generation",
      label: language === "bn" ? "ভিডিও জেনারেশন" : "Video Generation",
      icon: <LuVideo size={15} />,
      title: language === "bn" ? "AI ভিডিও জেনারেশন" : "AI Video Creation",
      description: language === "bn" ? "টেক্সট বা ইমেজ থেকে ভিডিও তৈরি করুন।" : "Generate videos from text or images instantly.",
      image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop",
      features: ["Text to Video", "Image to Video", "Animation", "Motion Graphics"],
    },
    {
      id: "video-editing",
      label: language === "bn" ? "ভিডিও এডিটিং" : "Video Editing",
      icon: <LuPlay size={15} />,
      title: language === "bn" ? "AI ভিডিও এডিটিং" : "AI Video Editing",
      description: language === "bn" ? "স্বয়ংক্রিয়ভাবে ভিডিও এডিট করুন।" : "Automatically edit and enhance your videos.",
      image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
      features: ["Auto Cut", "Color Grade", "Remove Background", "Add Effects"],
    },
    {
      id: "audio-generation",
      label: language === "bn" ? "অডিও জেনারেশন" : "Audio Generation",
      icon: <LuMusic size={15} />,
      title: language === "bn" ? "AI অডিও জেনারেশন" : "AI Audio & Voice",
      description: language === "bn" ? "প্রাকৃতিক ভয়েস এবং মিউজিক তৈরি করুন।" : "Generate natural voices and music with AI.",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop",
      features: ["Text to Speech", "Voice Cloning", "Music Generation", "Sound Effects"],
    },
  ];

  const activeData = categories.find((cat) => cat.id === activeCategory);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e) => { setIsDragging(true); handleMove(e.clientX); };
  const handleTouchStart = (e) => { setIsDragging(true); handleMove(e.touches[0].clientX); };
  const handleTouchMove = (e) => { if (isDragging) handleMove(e.touches[0].clientX); };

  useEffect(() => {
    const onUp = () => setIsDragging(false);
    const onMove = (e) => { if (isDragging) handleMove(e.clientX); };
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mousemove", onMove);
    };
  }, [isDragging]);

  useEffect(() => { setSliderPosition(50); }, [activeCategory]);

  return (
    <section className={`py-20 md:py-24 transition-colors duration-500 ${isDark ? "bg-[#050505]" : "bg-white"}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 text-[#0182E6] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-[#F78F18]" />
            {language === "bn" ? "এআই টুলস" : "AI Tools"}
            <span className="w-8 h-px bg-[#F78F18]" />
          </div>
          <h2 className={`text-3xl md:text-[40px] font-heading font-bold tracking-tight leading-[1.15] ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
            {language === "bn" ? "AI দিয়ে দ্রুত কাজ করুন" : "Create faster with AI"}
          </h2>
          <p className={`mt-4 text-[15px] leading-relaxed ${isDark ? "text-gray-400" : "text-slate-500"} ${bn}`}>
            {language === "bn"
              ? "ইমেজ, ভিডিও ও অডিও — সবকিছুর জন্য আধুনিক AI টুলস, এক প্ল্যাটফর্মে।"
              : "Modern AI tools for image, video, and audio — all in one platform."}
          </p>
        </div>

        {/* Main */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Left: info */}
            <div className="order-2 lg:order-1">
              <h3 className={`text-xl md:text-2xl font-heading font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"} ${bn}`}>
                {activeData?.title}
              </h3>
              <p className={`text-[15px] leading-relaxed mb-6 ${isDark ? "text-gray-400" : "text-slate-500"} ${bn}`}>
                {activeData?.description}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {activeData?.features.map((feature, i) => (
                  <div key={i} className={`flex items-center gap-2.5 text-[14px] ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                    <span className="w-5 h-5 rounded-full bg-[#0182E6]/10 flex items-center justify-center flex-shrink-0">
                      <LuCheck size={12} className="text-[#0182E6]" />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0182E6] text-white text-[14px] font-semibold hover:bg-[#002da3] transition-colors"
              >
                {language === "bn" ? "শিখতে শুরু করুন" : "Start learning"}
                <LuArrowRight size={16} />
              </Link>
            </div>

            {/* Right: before/after slider */}
            <div
              ref={containerRef}
              className={`order-1 lg:order-2 relative aspect-[16/11] rounded-2xl overflow-hidden cursor-ew-resize select-none border ${isDark ? "border-white/10" : "border-gray-200"}`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setIsDragging(false)}
            >
              <img
                src={activeData?.image}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "grayscale(100%)" }}
                draggable="false"
              />
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                <img src={activeData?.image} alt="After" className="w-full h-full object-cover" draggable="false" />
              </div>

              <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20" style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}>
                <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-xl transition-colors ${isDragging ? "bg-[#0182E6]" : "bg-white"}`}>
                  <div className="flex gap-0.5">
                    <span className={`w-0.5 h-3.5 rounded-full ${isDragging ? "bg-white" : "bg-slate-400"}`} />
                    <span className={`w-0.5 h-3.5 rounded-full ${isDragging ? "bg-white" : "bg-slate-400"}`} />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-md text-white text-[11px] font-medium">
                {language === "bn" ? "আগে" : "Before"}
              </div>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#F78F18] rounded-md text-white text-[11px] font-medium">
                {language === "bn" ? "পরে" : "After"}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-[12px] font-semibold transition-colors flex items-center gap-2 ${
                activeCategory === cat.id
                  ? "bg-[#0182E6] text-white"
                  : isDark
                  ? "bg-white/5 text-gray-400 hover:bg-white/10"
                  : "bg-[#f8fafc] text-slate-600 border border-gray-200 hover:bg-gray-100"
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
