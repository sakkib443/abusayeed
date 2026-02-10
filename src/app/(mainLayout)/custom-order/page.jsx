"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
    LuSparkles,
    LuUpload,
    LuCalendar,
    LuDollarSign,
    LuMessageSquare,
    LuUser,
    LuMail,
    LuPhone,
    LuCheck,
    LuFileText,
    LuTag,
} from "react-icons/lu";

const CustomOrderPage = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        category: "",
        projectTitle: "",
        description: "",
        budget: "",
        timeline: "",
        files: [],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const categories = [
        { id: "brand-identity", name_en: "Brand Identity", name_bn: "ব্র্যান্ড আইডেন্টিটি" },
        { id: "ui-ux", name_en: "UI/UX Design", name_bn: "ইউআই/ইউএক্স ডিজাইন" },
        { id: "social-media", name_en: "Social Media", name_bn: "সোশ্যাল মিডিয়া" },
        { id: "video-motion", name_en: "Video & Motion", name_bn: "ভিডিও ও মোশন" },
        { id: "print", name_en: "Print Design", name_bn: "প্রিন্ট ডিজাইন" },
        { id: "illustration", name_en: "Illustration", name_bn: "ইলাস্ট্রেশন" },
        { id: "photo-editing", name_en: "Photo Editing", name_bn: "ফটো এডিটিং" },
        { id: "other", name_en: "Other", name_bn: "অন্যান্য" },
    ];

    const budgetRanges = [
        { id: "5k-10k", label_en: "৳5,000 - ৳10,000", label_bn: "৳৫,০০০ - ৳১০,০০০" },
        { id: "10k-25k", label_en: "৳10,000 - ৳25,000", label_bn: "৳১০,০০০ - ৳২৫,০০০" },
        { id: "25k-50k", label_en: "৳25,000 - ৳50,000", label_bn: "৳২৫,০০০ - ৳৫০,০০০" },
        { id: "50k+", label_en: "৳50,000+", label_bn: "৳৫০,০০০+" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitted(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
                    >
                        <LuCheck className="text-green-500" size={40} />
                    </motion.div>
                    <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"} ${bengaliClass}`}>
                        {language === "bn" ? "সফলভাবে জমা দেওয়া হয়েছে!" : "Successfully Submitted!"}
                    </h2>
                    <p className={`text-lg mb-8 ${isDark ? "text-gray-400" : "text-gray-600"} ${bengaliClass}`}>
                        {language === "bn"
                            ? "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।"
                            : "We'll get back to you shortly."}
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="px-8 py-3 bg-[#003ECB] text-white rounded-lg hover:bg-[#002a8a] transition-colors"
                    >
                        {language === "bn" ? "আরেকটি অর্ডার করুন" : "Submit Another Order"}
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#020202]">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-[#003ECB]/5 to-transparent dark:from-[#003ECB]/10">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <LuSparkles className="text-[#003ECB]" size={24} />
                            <span className="text-[#003ECB] font-semibold uppercase tracking-wider text-sm">
                                {language === "bn" ? "কাস্টম অর্ডার" : "Custom Order"}
                            </span>
                        </div>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"} ${bengaliClass}`}>
                            {language === "bn"
                                ? "আপনার স্বপ্নের ডিজাইন তৈরি করুন"
                                : "Bring Your Vision to Life"}
                        </h1>
                        <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"} ${bengaliClass}`}>
                            {language === "bn"
                                ? "আপনার প্রজেক্টের বিস্তারিত জানান এবং আমরা আপনার জন্য নিখুঁত ডিজাইন তৈরি করব"
                                : "Tell us about your project and we'll create the perfect design solution for you"}
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className={`rounded-2xl border p-8 md:p-12 ${isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-gray-100 shadow-xl"
                            }`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div>
                                <label className={`flex items-center gap-2 mb-3 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    <LuUser size={16} />
                                    {language === "bn" ? "পুরো নাম" : "Full Name"} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${isDark
                                        ? "bg-white/5 border-white/10 text-white focus:border-[#003ECB]"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#003ECB]"
                                        }`}
                                    placeholder={language === "bn" ? "আপনার নাম লিখুন" : "Enter your name"}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className={`flex items-center gap-2 mb-3 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    <LuMail size={16} />
                                    {language === "bn" ? "ইমেইল" : "Email"} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${isDark
                                        ? "bg-white/5 border-white/10 text-white focus:border-[#003ECB]"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#003ECB]"
                                        }`}
                                    placeholder={language === "bn" ? "আপনার ইমেইল লিখুন" : "Enter your email"}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className={`flex items-center gap-2 mb-3 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    <LuPhone size={16} />
                                    {language === "bn" ? "ফোন নম্বর" : "Phone Number"}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${isDark
                                        ? "bg-white/5 border-white/10 text-white focus:border-[#003ECB]"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#003ECB]"
                                        }`}
                                    placeholder={language === "bn" ? "আপনার ফোন নম্বর" : "Your phone number"}
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className={`flex items-center gap-2 mb-3 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    <LuTag size={16} />
                                    {language === "bn" ? "ক্যাটাগরি" : "Category"} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${isDark
                                        ? "bg-white/5 border-white/10 text-white focus:border-[#003ECB]"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#003ECB]"
                                        }`}
                                >
                                    <option value="">{language === "bn" ? "একটি ক্যাটাগরি নির্বাচন করুন" : "Select a category"}</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {language === "bn" ? cat.name_bn : cat.name_en}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Project Title */}
                            <div className="md:col-span-2">
                                <label className={`flex items-center gap-2 mb-3 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    <LuFileText size={16} />
                                    {language === "bn" ? "প্রজেক্ট টাইটেল" : "Project Title"} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="projectTitle"
                                    value={formData.projectTitle}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${isDark
                                        ? "bg-white/5 border-white/10 text-white focus:border-[#003ECB]"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#003ECB]"
                                        }`}
                                    placeholder={language === "bn" ? "যেমন: 'স্টার্টআপের জন্য লোগো ডিজাইন'" : "e.g., 'Logo Design for Startup'"}
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className={`flex items-center gap-2 mb-3 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    <LuMessageSquare size={16} />
                                    {language === "bn" ? "প্রজেক্ট বিস্তারিত" : "Project Details"} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all resize-none ${isDark
                                        ? "bg-white/5 border-white/10 text-white focus:border-[#003ECB]"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#003ECB]"
                                        }`}
                                    placeholder={language === "bn" ? "আপনার প্রজেক্ট সম্পর্কে বিস্তারিত লিখুন..." : "Tell us about your project in detail..."}
                                />
                            </div>

                            {/* Budget */}
                            <div>
                                <label className={`flex items-center gap-2 mb-3 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    <LuDollarSign size={16} />
                                    {language === "bn" ? "বাজেট" : "Budget"} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${isDark
                                        ? "bg-white/5 border-white/10 text-white focus:border-[#003ECB]"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#003ECB]"
                                        }`}
                                >
                                    <option value="">{language === "bn" ? "বাজেট নির্বাচন করুন" : "Select budget range"}</option>
                                    {budgetRanges.map((range) => (
                                        <option key={range.id} value={range.id}>
                                            {language === "bn" ? range.label_bn : range.label_en}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Timeline */}
                            <div>
                                <label className={`flex items-center gap-2 mb-3 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    <LuCalendar size={16} />
                                    {language === "bn" ? "ডেডলাইন" : "Deadline"} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="timeline"
                                    value={formData.timeline}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${isDark
                                        ? "bg-white/5 border-white/10 text-white focus:border-[#003ECB]"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#003ECB]"
                                        }`}
                                    placeholder={language === "bn" ? "যেমন: '2 সপ্তাহ'" : "e.g., '2 weeks'"}
                                />
                            </div>

                            {/* File Upload */}
                            <div className="md:col-span-2">
                                <label className={`flex items-center gap-2 mb-3 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    <LuUpload size={16} />
                                    {language === "bn" ? "রেফারেন্স ফাইল" : "Reference Files"} {" "}
                                    <span className="text-gray-400 text-xs">{language === "bn" ? "(ঐচ্ছিক)" : "(Optional)"}</span>
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDark
                                        ? "border-white/10 hover:border-[#003ECB]/50 bg-white/5"
                                        : "border-gray-200 hover:border-[#003ECB]/50 bg-gray-50"
                                        }`}
                                >
                                    <LuUpload className={`mx-auto mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`} size={32} />
                                    <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                        {language === "bn" ? "ফাইল আপলোড করতে ক্লিক করুন" : "Click to upload files"}
                                    </p>
                                    <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                                        {language === "bn" ? "PNG, JPG, PDF (সর্বোচ্চ 10MB)" : "PNG, JPG, PDF (max 10MB)"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-10">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#003ECB] hover:bg-[#002a8a] hover:shadow-lg hover:shadow-[#003ECB]/20"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        {language === "bn" ? "জমা দেওয়া হচ্ছে..." : "Submitting..."}
                                    </>
                                ) : (
                                    <>
                                        <LuSparkles size={20} />
                                        {language === "bn" ? "অর্ডার সাবমিট করুন" : "Submit Order"}
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </section>
        </div>
    );
};

export default CustomOrderPage;
