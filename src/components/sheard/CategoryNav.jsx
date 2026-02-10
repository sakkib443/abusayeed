"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { LuChevronDown, LuMousePointer2, LuLayoutDashboard, LuMegaphone, LuPlay, LuBox, LuPresentation, LuPrinter, LuPackage, LuPenTool, LuImage, LuSparkles, LuTrendingUp } from "react-icons/lu";
import { API_URL } from "@/config/api";

// Fallback hardcoded categories
const fallbackCategories = [
    {
        _id: "1",
        name: "Brand Identity",
        name_bn: "ব্র্যান্ড আইডেন্টিটি",
        slug: "brand-identity",
        icon: "LuPenTool",
        order: 1,
        isParent: true,
        subcategories: [
            { _id: "1-1", name: "Logo Design", name_bn: "লোগো ডিজাইন", slug: "logo-design" },
            { _id: "1-2", name: "Business Card", name_bn: "ব্যবসা কার্ড", slug: "business-card" },
            { _id: "1-3", name: "Letterhead Design", name_bn: "লেটারহেড ডিজাইন", slug: "letterhead" },
            { _id: "1-4", name: "Brand Guideline", name_bn: "ব্র্যান্ড গাইডলাইন", slug: "brand-guideline" },
            { _id: "1-5", name: "Color Palette", name_bn: "কালার প্যালেট", slug: "color-palette" },
            { _id: "1-6", name: "Typography System", name_bn: "টাইপোগ্রাফি সিস্টেম", slug: "typography" },
            { _id: "1-7", name: "Brand Icons", name_bn: "ব্র্যান্ড আইকন", slug: "brand-icons" },
        ]
    },
    {
        _id: "2",
        name: "UI/UX Design",
        name_bn: "ইউআই/ইউএক্স ডিজাইন",
        slug: "ui-ux-design",
        icon: "LuLayoutDashboard",
        order: 2,
        isParent: true,
        subcategories: [
            { _id: "2-1", name: "SaaS Dashboard", name_bn: "সাস ড্যাশবোর্ড", slug: "saas-dashboard" },
            { _id: "2-2", name: "Mobile App UI", name_bn: "মোবাইল অ্যাপ ইউআই", slug: "mobile-app-ui" },
            { _id: "2-3", name: "Landing Page", name_bn: "ল্যান্ডিং পেজ", slug: "landing-page" },
            { _id: "2-4", name: "E-commerce UI", name_bn: "ই-কমার্স ইউআই", slug: "ecommerce-ui" },
            { _id: "2-5", name: "Fintech App", name_bn: "ফিনটেক অ্যাপ", slug: "fintech-app" },
            { _id: "2-6", name: "EdTech Platform", name_bn: "এডটেক প্ল্যাটফর্ম", slug: "edtech-platform" },
            { _id: "2-7", name: "HealthTech UI", name_bn: "হেলথটেক ইউআই", slug: "healthtech-ui" },
            { _id: "2-8", name: "Admin Panel", name_bn: "অ্যাডমিন প্যানেল", slug: "admin-panel" },
            { _id: "2-9", name: "Wireframe Kit", name_bn: "ওয়্যারফ্রেম কিট", slug: "wireframe" },
        ]
    },
    {
        _id: "3",
        name: "Social Media",
        name_bn: "সোশ্যাল মিডিয়া",
        slug: "social-media",
        icon: "LuMegaphone",
        order: 3,
        isParent: true,
        subcategories: [
            { _id: "3-1", name: "Instagram Post", name_bn: "ইনস্টাগ্রাম পোস্ট", slug: "instagram-post" },
            { _id: "3-2", name: "Facebook Ad", name_bn: "ফেসবুক অ্যাড", slug: "facebook-ad" },
            { _id: "3-3", name: "YouTube Thumbnail", name_bn: "ইউটিউব থাম্বনেইল", slug: "youtube-thumbnail" },
            { _id: "3-4", name: "LinkedIn Banner", name_bn: "লিংকডইন ব্যানার", slug: "linkedin-banner" },
            { _id: "3-5", name: "Twitter Header", name_bn: "টুইটার হেডার", slug: "twitter-header" },
            { _id: "3-6", name: "Story Template", name_bn: "স্টোরি টেমপ্লেট", slug: "story-template" },
            { _id: "3-7", name: "Carousel Post", name_bn: "ক্যারোসেল পোস্ট", slug: "carousel-post" },
        ]
    },
    {
        _id: "4",
        name: "Video & Motion",
        name_bn: "ভিডিও ও মোশন",
        slug: "motion-graphics",
        icon: "LuPlay",
        order: 4,
        isParent: true,
        subcategories: [
            { _id: "4-1", name: "Reels Template", name_bn: "রিলস টেমপ্লেট", slug: "reels-template" },
            { _id: "4-2", name: "Shorts Template", name_bn: "শর্টস টেমপ্লেট", slug: "shorts-template" },
            { _id: "4-3", name: "TikTok Video", name_bn: "টিকটক ভিডিও", slug: "tiktok-video" },
            { _id: "4-4", name: "Intro/Outro", name_bn: "ইন্ট্রো/আউট্রো", slug: "intro-outro" },
            { _id: "4-5", name: "Motion Graphics", name_bn: "মোশন গ্রাফিক্স", slug: "motion-graphics" },
            { _id: "4-6", name: "Explainer Video", name_bn: "এক্সপ্লেনার ভিডিও", slug: "explainer-video" },
            { _id: "4-7", name: "Logo Animation", name_bn: "লোগো অ্যানিমেশন", slug: "logo-animation" },
        ]
    },
    {
        _id: "5",
        name: "3D & Render",
        name_bn: "থ্রিডি ও রেন্ডার",
        slug: "3d-design",
        icon: "LuBox",
        order: 5,
        isParent: true,
        subcategories: [
            { _id: "5-1", name: "3D Mockup", name_bn: "থ্রিডি মকআপ", slug: "3d-mockup" },
            { _id: "5-2", name: "Product Render", name_bn: "প্রোডাক্ট রেন্ডার", slug: "product-render" },
            { _id: "5-3", name: "Character Design", name_bn: "ক্যারেক্টার ডিজাইন", slug: "character-design" },
            { _id: "5-4", name: "Environment", name_bn: "এনভায়রনমেন্ট", slug: "3d-environment" },
            { _id: "5-5", name: "AR/VR Asset", name_bn: "এআর/ভিআর অ্যাসেট", slug: "ar-vr-asset" },
            { _id: "5-6", name: "Metaverse Design", name_bn: "মেটাভার্স ডিজাইন", slug: "metaverse" },
        ]
    },
    {
        _id: "6",
        name: "Presentation",
        name_bn: "প্রেজেন্টেশন",
        slug: "presentation",
        icon: "LuPresentation",
        order: 6,
        isParent: true,
        subcategories: [
            { _id: "6-1", name: "Pitch Deck", name_bn: "পিচ ডেক", slug: "pitch-deck" },
            { _id: "6-2", name: "PowerPoint", name_bn: "পাওয়ারপয়েন্ট", slug: "powerpoint" },
            { _id: "6-3", name: "Google Slides", name_bn: "গুগল স্লাইড", slug: "google-slides" },
            { _id: "6-4", name: "Keynote", name_bn: "কীনোট", slug: "keynote" },
            { _id: "6-5", name: "Investor Deck", name_bn: "ইনভেস্টর ডেক", slug: "investor-deck" },
            { _id: "6-6", name: "Corporate PPT", name_bn: "কর্পোরেট পিপিটি", slug: "corporate-ppt" },
        ]
    },
    {
        _id: "7",
        name: "Print Design",
        name_bn: "প্রিন্ট ডিজাইন",
        slug: "print-design",
        icon: "LuPrinter",
        order: 7,
        isParent: true,
        subcategories: [
            { _id: "7-1", name: "Flyer Design", name_bn: "ফ্লায়ার ডিজাইন", slug: "flyer" },
            { _id: "7-2", name: "Brochure", name_bn: "ব্রুশিয়ার", slug: "brochure" },
            { _id: "7-3", name: "Poster Design", name_bn: "পোস্টার ডিজাইন", slug: "poster" },
            { _id: "7-4", name: "Billboard", name_bn: "বিলবোর্ড", slug: "billboard" },
            { _id: "7-5", name: "Magazine Layout", name_bn: "ম্যাগাজিন লেআউট", slug: "magazine" },
            { _id: "7-6", name: "Book Cover", name_bn: "বুক কভার", slug: "book-cover" },
            { _id: "7-7", name: "Menu Design", name_bn: "মেনু ডিজাইন", slug: "menu-design" },
        ]
    },
    {
        _id: "8",
        name: "Packaging",
        name_bn: "প্যাকেজিং",
        slug: "packaging",
        icon: "LuPackage",
        order: 8,
        isParent: true,
        subcategories: [
            { _id: "8-1", name: "Box Design", name_bn: "বক্স ডিজাইন", slug: "box-design" },
            { _id: "8-2", name: "Pouch Packaging", name_bn: "পাউচ প্যাকেজিং", slug: "pouch-packaging" },
            { _id: "8-3", name: "Bottle Label", name_bn: "বোতল লেবেল", slug: "bottle-label" },
            { _id: "8-4", name: "Can Design", name_bn: "ক্যান ডিজাইন", slug: "can-design" },
            { _id: "8-5", name: "Bag Design", name_bn: "ব্যাগ ডিজাইন", slug: "bag-design" },
            { _id: "8-6", name: "Food Packaging", name_bn: "ফুড প্যাকেজিং", slug: "food-packaging" },
        ]
    },
    {
        _id: "9",
        name: "Apparel & Merch",
        name_bn: "পোশাক ও মার্চ",
        slug: "apparel",
        icon: "LuSparkles",
        order: 9,
        isParent: true,
        subcategories: [
            { _id: "9-1", name: "T-shirt Design", name_bn: "টি-শার্ট ডিজাইন", slug: "tshirt-design" },
            { _id: "9-2", name: "Hoodie Design", name_bn: "হুডি ডিজাইন", slug: "hoodie-design" },
            { _id: "9-3", name: "Mug Design", name_bn: "মগ ডিজাইন", slug: "mug-design" },
            { _id: "9-4", name: "Tote Bag", name_bn: "টোট ব্যাগ", slug: "tote-bag" },
            { _id: "9-5", name: "Cap Design", name_bn: "ক্যাপ ডিজাইন", slug: "cap-design" },
        ]
    },
    {
        _id: "10",
        name: "Illustration",
        name_bn: "ইলাস্ট্রেশন",
        slug: "illustration",
        icon: "LuImage",
        order: 10,
        isParent: true,
        subcategories: [
            { _id: "10-1", name: "Vector Art", name_bn: "ভেক্টর আর্ট", slug: "vector-art" },
            { _id: "10-2", name: "Character Art", name_bn: "ক্যারেক্টার আর্ট", slug: "character-art" },
            { _id: "10-3", name: "Icon Set", name_bn: "আইকন সেট", slug: "icon-set" },
            { _id: "10-4", name: "Pattern Design", name_bn: "প্যাটার্ন ডিজাইন", slug: "pattern-design" },
            { _id: "10-5", name: "Mascot Design", name_bn: "ম্যাসকট ডিজাইন", slug: "mascot-design" },
            { _id: "10-6", name: "Sticker Design", name_bn: "স্টিকার ডিজাইন", slug: "sticker-design" },
        ]
    },
    {
        _id: "11",
        name: "Photo Editing",
        name_bn: "ফটো এডিটিং",
        slug: "photo-editing",
        icon: "LuMousePointer2",
        order: 11,
        isParent: true,
        subcategories: [
            { _id: "11-1", name: "Background Removal", name_bn: "ব্যাকগ্রাউন্ড রিমুভ", slug: "background-removal" },
            { _id: "11-2", name: "Photo Retouching", name_bn: "ফটো রিটাচিং", slug: "photo-retouching" },
            { _id: "11-3", name: "Color Correction", name_bn: "কালার কারেকশন", slug: "color-correction" },
            { _id: "11-4", name: "Image Manipulation", name_bn: "ইমেজ ম্যানিপুলেশন", slug: "image-manipulation" },
            { _id: "11-5", name: "Vector Tracing", name_bn: "ভেক্টর ট্রেসিং", slug: "vector-tracing" },
            { _id: "11-6", name: "Photo Restoration", name_bn: "ফটো রিস্টোরেশন", slug: "photo-restoration" },
        ]
    },
];

// Icon mapping
const iconMap = {
    "LuPenTool": <LuPenTool size={18} />,
    "LuLayoutDashboard": <LuLayoutDashboard size={18} />,
    "LuMegaphone": <LuMegaphone size={18} />,
    "LuPlay": <LuPlay size={18} />,
    "LuBox": <LuBox size={18} />,
    "LuPresentation": <LuPresentation size={18} />,
    "LuPrinter": <LuPrinter size={18} />,
    "LuPackage": <LuPackage size={18} />,
    "LuSparkles": <LuSparkles size={18} />,
    "LuImage": <LuImage size={18} />,
    "LuMousePointer2": <LuMousePointer2 size={18} />,
};

const CategoryNav = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const [activeCategory, setActiveCategory] = useState(null);
    const [categories, setCategories] = useState(fallbackCategories);
    const [loading, setLoading] = useState(false);
    const isDark = theme === "dark";

    // Try to fetch categories from API, fallback to hardcoded
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/categories?type=design-template&limit=100`);
                const data = await response.json();

                console.log('CategoryNav API Response:', data);
                console.log('Fallback categories length:', fallbackCategories.length);

                if (data.success && data.data && data.data.length > 0) {
                    // Group categories by parent
                    const parentCategories = data.data.filter(cat => cat.isParent);
                    const subcategories = data.data.filter(cat => !cat.isParent && cat.parentCategory);

                    console.log('Parent Categories:', parentCategories.length);
                    console.log('Subcategories:', subcategories.length);

                    // Map subcategories to their parents
                    const categoriesWithSubs = parentCategories.map(parent => {
                        const parentId = parent._id.toString();
                        const subs = subcategories.filter(sub => {
                            const subParentId = typeof sub.parentCategory === 'object'
                                ? sub.parentCategory._id?.toString() || sub.parentCategory.toString()
                                : sub.parentCategory.toString();
                            return subParentId === parentId;
                        });

                        console.log(`Parent "${parent.name}" has ${subs.length} subcategories`);

                        return {
                            ...parent,
                            subcategories: subs
                        };
                    });

                    // Sort by order
                    categoriesWithSubs.sort((a, b) => (a.order || 0) - (b.order || 0));

                    setCategories(categoriesWithSubs);
                } else {
                    // Use fallback if no data from API
                    setCategories(fallbackCategories);
                }
            } catch (error) {
                console.error('Error fetching categories, using fallback:', error);
                setCategories(fallbackCategories);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    console.log('Rendering CategoryNav, categories count:', categories.length, categories);

    return (
        <div className={`hidden lg:block w-full border-b transition-all duration-300 sticky top-[70px] z-40 ${isDark ? "bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-white/5" : "bg-gradient-to-b from-white to-gray-50/50 border-gray-100"
            }`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    <ul className="flex items-center gap-0.5 overflow-visible scrollbar-hide py-1">
                        {categories.map((cat) => (
                            <li
                                key={cat._id}
                                className="relative group"
                                onMouseEnter={() => setActiveCategory(cat._id)}
                                onMouseLeave={() => setActiveCategory(null)}
                            >
                                <Link
                                    href={`/design-template?category=${cat.slug}`}
                                    className={`flex items-center gap-2.5 px-5 py-3.5 text-[13px] font-semibold transition-all whitespace-nowrap rounded-lg relative ${activeCategory === cat._id
                                        ? "text-[#003ECB]"
                                        : isDark
                                            ? "text-gray-400 hover:text-white hover:bg-white/5"
                                            : "text-gray-600 hover:text-[#003ECB] hover:bg-gray-50"
                                        }`}
                                >
                                    <span className={`transition-all duration-300 ${activeCategory === cat._id ? "scale-110 text-[#003ECB]" : "opacity-70"
                                        }`}>
                                        {iconMap[cat.icon] || <LuLayoutDashboard size={18} />}
                                    </span>
                                    <span className="font-medium">{language === "bn" ? cat.name_bn : cat.name}</span>
                                    <LuChevronDown
                                        size={14}
                                        className={`transition-transform duration-300 ${activeCategory === cat._id ? "rotate-180" : ""
                                            }`}
                                    />
                                    {/* Active Indicator */}
                                    {activeCategory === cat._id && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003ECB]"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>

                                {/* Mega Dropdown Menu */}
                                <AnimatePresence>
                                    {activeCategory === cat._id && cat.subcategories && cat.subcategories.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute top-full left-0 w-80 z-[999] pt-2"
                                        >
                                            <div className={`rounded-xl border shadow-2xl overflow-hidden ${isDark ? "bg-[#111] border-white/10" : "bg-white border-gray-100"
                                                }`}>
                                                {/* Header */}
                                                <div className={`px-5 py-4 border-b ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50/70 border-gray-100"
                                                    }`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? "bg-[#003ECB]/20 text-[#003ECB]" : "bg-[#003ECB]/10 text-[#003ECB]"
                                                            }`}>
                                                            {iconMap[cat.icon] || <LuLayoutDashboard size={18} />}
                                                        </div>
                                                        <div>
                                                            <p className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                                                                {language === "bn" ? cat.name_bn : cat.name}
                                                            </p>
                                                            <p className={`text-[11px] ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                                                                {cat.subcategories.length} {language === 'bn' ? 'ধরণ' : 'Types'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Subcategories Grid */}
                                                <div className="p-3 grid grid-cols-2 gap-1 max-h-[420px] overflow-y-auto scrollbar-hide">
                                                    {cat.subcategories.map((sub) => (
                                                        <Link
                                                            key={sub._id}
                                                            href={`/design-template?category=${sub.slug}`}
                                                            className={`flex items-center justify-between px-4 py-3 rounded-lg text-[13px] transition-all group ${isDark
                                                                ? "text-gray-400 hover:bg-white/5 hover:text-white"
                                                                : "text-gray-600 hover:bg-gray-50 hover:text-[#003ECB]"
                                                                }`}
                                                        >
                                                            <span className="font-medium truncate">
                                                                {language === "bn" ? sub.name_bn : sub.name}
                                                            </span>
                                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0">
                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>

                                                {/* Footer CTA */}
                                                <div className={`px-5 py-3 border-t ${isDark ? "bg-white/5 border-white/5" : "bg-blue-50/50 border-gray-100"
                                                    }`}>
                                                    <Link
                                                        href={`/design-template?category=${cat.slug}`}
                                                        className="flex items-center justify-between group"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <LuTrendingUp size={14} className="text-[#003ECB]" />
                                                            <span className={`text-[12px] font-bold ${isDark ? "text-gray-300" : "text-gray-700"
                                                                }`}>
                                                                {language === 'bn' ? 'সব দেখুন' : 'View All'}
                                                            </span>
                                                        </div>
                                                        <div className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                                            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                                                                <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}
                    </ul>

                    {/* Right side CTA */}
                    <div className="hidden xl:flex items-center gap-4 pl-6 border-l border-black/5 dark:border-white/5">
                        <Link
                            href="/custom-order"
                            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-widest transition-all ${isDark
                                ? "text-gray-400 hover:text-white hover:bg-white/5"
                                : "text-gray-600 hover:text-[#003ECB] hover:bg-gray-50"
                                }`}
                        >
                            <LuSparkles size={14} className="text-[#003ECB]" />
                            <span>{language === 'bn' ? 'কাস্টম অর্ডার' : 'Custom Order'}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryNav;
