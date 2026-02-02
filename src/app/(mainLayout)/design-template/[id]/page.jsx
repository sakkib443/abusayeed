"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { API_URL } from "@/config/api";
import {
    LuShoppingCart,
    LuCheck,
    LuStar,
    LuShare2,
    LuShieldCheck,
    LuLayers,
    LuMaximize2,
    LuDownload,
    LuFileCode,
    LuSearch,
    LuHeart,
    LuEye,
    LuPackage,
    LuPalette,
    LuCalendar,
    LuTag,
    LuMonitor,
    LuSmartphone,
    LuCopy,
    LuExternalLink
} from "react-icons/lu";

// Loading Skeleton Component
const DetailSkeleton = () => (
    <div className="container mx-auto px-4 lg:px-16 py-12 animate-pulse">
        <div className="h-8 w-1/3 bg-slate-200 dark:bg-white/5 rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-4">
                <div className="aspect-[4/3] bg-slate-200 dark:bg-white/5 rounded-2xl" />
                <div className="flex gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-24 h-24 bg-slate-200 dark:bg-white/5 rounded-xl" />
                    ))}
                </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
                <div className="h-10 w-3/4 bg-slate-200 dark:bg-white/5 rounded" />
                <div className="h-6 w-1/2 bg-slate-200 dark:bg-white/5 rounded" />
                <div className="h-24 w-full bg-slate-200 dark:bg-white/5 rounded" />
            </div>
        </div>
    </div>
);

const DesignTemplateDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState("");
    const [isAdded, setIsAdded] = useState(false);
    const [activeTab, setActiveTab] = useState("description");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`${API_URL}/design-templates/${id}`);
                const data = await res.json();
                if (data.success) {
                    setTemplate(data.data);
                    setActiveImage(data.data.images?.[0] || "");
                }
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetails();
    }, [id]);

    const handleAddToCart = () => {
        if (!template) return;
        dispatch(addToCart({
            id: template._id,
            title: template.title,
            price: template.offerPrice || template.price,
            image: activeImage,
            type: "design-template"
        }));
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    if (loading) return <DetailSkeleton />;

    if (!template) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <LuSearch size={48} className="text-slate-300 mb-4" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Template Not Found</h2>
            <Link href="/design-template" className="mt-4 text-[#003ECB] hover:underline text-sm font-medium">
                Back to Templates
            </Link>
        </div>
    );

    // Calculate Pricing
    const hasDiscount = template.offerPrice && template.offerPrice > 0 && template.offerPrice < template.price;
    const currentPrice = hasDiscount ? template.offerPrice : template.price;
    const discountPercent = hasDiscount ? Math.round(((template.price - template.offerPrice) / template.price) * 100) : 0;
    const isFree = currentPrice === 0;

    return (
        <div className="min-h-screen bg-white dark:bg-[#020202] text-slate-800 dark:text-slate-200">
            {/* Breadcrumb Header */}
            <div className="border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="container mx-auto px-4 lg:px-16 py-4">
                    <nav className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 font-medium uppercase tracking-wider">
                        <Link href="/" className="hover:text-[#003ECB] dark:hover:text-[#003ECB] transition-colors">Home</Link>
                        <span className="opacity-40">/</span>
                        <Link href="/design-template" className="hover:text-[#003ECB] dark:hover:text-[#003ECB] transition-colors">Templates</Link>
                        <span className="opacity-40">/</span>
                        <span className="text-slate-800 dark:text-white truncate max-w-[200px]">{template.title}</span>
                    </nav>
                </div>
            </div>

            <main className="container mx-auto px-4 lg:px-16 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left Column - Gallery */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-50 dark:bg-[#0a0a0a] rounded-3xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-xl shadow-black/5 relative group mb-6"
                        >
                            <div className="relative aspect-[4/3] w-full">
                                <Image
                                    src={activeImage || "/images/placeholder.png"}
                                    alt={template.title}
                                    fill
                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="absolute top-4 right-4 flex flex-col gap-3">
                                {template.previewUrl && (
                                    <a
                                        href={template.previewUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white dark:bg-black/50 backdrop-blur text-slate-600 dark:text-white flex items-center justify-center hover:bg-[#003ECB] hover:text-white transition-all shadow-lg border border-slate-100 dark:border-white/10"
                                        title="Live Preview"
                                    >
                                        <LuExternalLink size={16} />
                                    </a>
                                )}
                                <button className="w-10 h-10 rounded-full bg-white dark:bg-black/50 backdrop-blur text-slate-600 dark:text-white flex items-center justify-center hover:bg-[#003ECB] hover:text-white transition-all shadow-lg border border-slate-100 dark:border-white/10" title="Fullscreen">
                                    <LuMaximize2 size={16} />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white dark:bg-black/50 backdrop-blur text-slate-600 dark:text-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg border border-slate-100 dark:border-white/10" title="Add to Wishlist">
                                    <LuHeart size={16} />
                                </button>
                            </div>

                            {/* Stats Badge */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-3">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-xs">
                                    <LuEye size={12} />
                                    <span>{template.viewCount || 0} views</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-xs">
                                    <LuHeart size={12} />
                                    <span>{template.likeCount || 0}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Thumbnails */}
                        {template.images?.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {template.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? "border-[#003ECB] dark:border-[#003ECB]" : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <Image src={img} fill className="object-cover" alt={`View ${idx}`} />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Description Tabs */}
                        <div className="mt-12">
                            <div className="flex items-center gap-8 border-b border-slate-100 dark:border-white/10 mb-8">
                                {['description', 'features', 'specifications'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === tab
                                            ? 'text-[#003ECB] dark:text-[#3365f5]'
                                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                            }`}
                                    >
                                        {tab === 'description' ? (language === 'bn' ? 'বিবরণ' : 'Description') :
                                            tab === 'features' ? (language === 'bn' ? 'ফিচার' : 'Features') :
                                                (language === 'bn' ? 'স্পেসিফিকেশন' : 'Specifications')}
                                        {activeTab === tab && (
                                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#003ECB] dark:bg-[#003ECB]" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {activeTab === 'description' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed ${bengaliClass}`}
                                    >
                                        <p className="text-base leading-7">{template.description}</p>
                                        {template.longDescription && (
                                            <div className="mt-6 whitespace-pre-line">{template.longDescription}</div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'features' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-4"
                                    >
                                        {template.features?.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {template.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/20">
                                                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                                            <LuCheck size={12} />
                                                        </div>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-slate-500">No features listed.</p>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'specifications' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm"
                                    >
                                        {[
                                            { label: language === 'bn' ? "প্ল্যাটফর্ম" : "Platform", value: template.platform, icon: LuMonitor },
                                            { label: language === 'bn' ? "টাইপ" : "Template Type", value: template.templateType, icon: LuTag },
                                            { label: language === 'bn' ? "ভার্সন" : "Version", value: template.version || "1.0.0", icon: LuPackage },
                                            { label: language === 'bn' ? "ফাইল সাইজ" : "File Size", value: template.fileSize || "N/A", icon: LuDownload },
                                            { label: language === 'bn' ? "ডাইমেনশন" : "Dimensions", value: template.dimensions || "N/A", icon: LuMaximize2 },
                                            { label: language === 'bn' ? "ইন্ডাস্ট্রি" : "Industry", value: template.industry || "General", icon: LuPalette },
                                            { label: language === 'bn' ? "রেসপন্সিভ" : "Responsive", value: template.responsive ? "Yes" : "No", icon: LuSmartphone },
                                            { label: language === 'bn' ? "লেয়ার্ড" : "Layered", value: template.layered ? "Yes" : "No", icon: LuLayers },
                                            { label: language === 'bn' ? "শেষ আপডেট" : "Last Updated", value: new Date(template.lastUpdate || template.updatedAt).toLocaleDateString(), icon: LuCalendar },
                                        ].map((spec, i) => (
                                            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-white/5">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <spec.icon size={14} />
                                                    <span>{spec.label}</span>
                                                </div>
                                                <span className="font-medium text-slate-800 dark:text-white">{spec.value}</span>
                                            </div>
                                        ))}

                                        {/* Files Included */}
                                        {template.filesIncluded?.length > 0 && (
                                            <div className="col-span-full mt-4">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                                                    {language === 'bn' ? 'অন্তর্ভুক্ত ফাইল' : 'Files Included'}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {template.filesIncluded.map((file, i) => (
                                                        <span key={i} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-400">
                                                            {file}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Compatibility */}
                                        {template.compatibility?.length > 0 && (
                                            <div className="col-span-full mt-4">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                                                    {language === 'bn' ? 'সামঞ্জস্যতা' : 'Compatibility'}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {template.compatibility.map((comp, i) => (
                                                        <span key={i} className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/10 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/20">
                                                            {comp}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column - Info & Actions */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-28 space-y-8">

                            {/* Header Info */}
                            <div>
                                <div className="flex items-center gap-3 mb-4 flex-wrap">
                                    <span className="px-3 py-1 rounded-full bg-[#003ECB]/5 dark:bg-[#003ECB]/10 text-[#003ECB] dark:text-[#3365f5] text-[10px] font-bold uppercase tracking-widest border border-[#003ECB]/10 dark:border-[#003ECB]/20">
                                        {template.category?.name || template.templateType || "Design Template"}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                        {template.platform}
                                    </span>
                                    {isFree && (
                                        <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest">
                                            FREE
                                        </span>
                                    )}
                                    {hasDiscount && !isFree && (
                                        <span className="px-3 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest">
                                            {discountPercent}% OFF
                                        </span>
                                    )}
                                </div>
                                <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4 ${bengaliClass}`}>
                                    {template.title}
                                </h1>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        <LuStar fill="currentColor" size={14} />
                                        <span className="font-bold text-slate-800 dark:text-white">{template.rating?.toFixed(1) || "5.0"}</span>
                                        <span className="text-slate-400">({template.reviewCount || 0} {language === 'bn' ? 'রিভিউ' : 'Reviews'})</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                    <span>{template.salesCount || 0} {language === 'bn' ? 'বিক্রয়' : 'Sales'}</span>
                                </div>
                            </div>

                            {/* Price Card */}
                            <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
                                <div className="flex items-end gap-3 mb-6">
                                    {isFree ? (
                                        <span className="text-4xl font-serif italic text-emerald-500">
                                            {language === 'bn' ? 'ফ্রি' : 'FREE'}
                                        </span>
                                    ) : (
                                        <>
                                            <span className="text-4xl font-serif italic text-[#003ECB] dark:text-[#3365f5]">
                                                ৳{currentPrice?.toLocaleString()}
                                            </span>
                                            {hasDiscount && (
                                                <span className="text-lg text-slate-400 line-through mb-1">
                                                    ৳{template.price?.toLocaleString()}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* License Options */}
                                {!isFree && template.extendedLicensePrice && (
                                    <div className="mb-6 p-4 rounded-xl bg-white dark:bg-black/20 border border-slate-100 dark:border-white/5">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">{language === 'bn' ? 'লাইসেন্স অপশন' : 'License Options'}</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600 dark:text-slate-400">{language === 'bn' ? 'রেগুলার লাইসেন্স' : 'Regular License'}</span>
                                                <span className="font-bold text-slate-800 dark:text-white">৳{template.regularLicensePrice?.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600 dark:text-slate-400">{language === 'bn' ? 'এক্সটেন্ডেড লাইসেন্স' : 'Extended License'}</span>
                                                <span className="font-bold text-slate-800 dark:text-white">৳{template.extendedLicensePrice?.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isAdded}
                                        className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group transition-all shadow-lg ${isAdded
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-[#003ECB] text-white hover:bg-[#002da3] shadow-[#003ECB]/20'
                                            }`}
                                    >
                                        {isAdded ? <LuCheck size={18} /> : <LuShoppingCart size={18} />}
                                        <span>{isAdded ? (language === 'bn' ? 'কার্টে যোগ হয়েছে' : 'Added to Cart') : (language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart')}</span>
                                    </button>
                                    <Link
                                        href="/checkout"
                                        className="w-full py-4 bg-white dark:bg-[#020202] text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                                    >
                                        <span>{language === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}</span>
                                    </Link>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 space-y-3">
                                    {[
                                        { icon: LuDownload, text: language === 'bn' ? 'তাৎক্ষণিক ডাউনলোড' : 'Instant Download' },
                                        { icon: LuShieldCheck, text: language === 'bn' ? 'নিরাপদ পেমেন্ট' : 'Secure Payment' },
                                        { icon: LuFileCode, text: language === 'bn' ? 'সোর্স ফাইল অন্তর্ভুক্ত' : 'Source File Included' },
                                        { icon: LuLayers, text: language === 'bn' ? 'সম্পূর্ণ এডিটেবল' : 'Fully Editable' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                                                <item.icon size={10} />
                                            </div>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            {template.tags?.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                                        {language === 'bn' ? 'ট্যাগ' : 'Tags'}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {template.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share & Support */}
                            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 hover:text-[#003ECB] dark:hover:text-[#003ECB] transition-colors"
                                >
                                    {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
                                    {copied ? (language === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (language === 'bn' ? 'লিংক কপি করুন' : 'Copy Link')}
                                </button>
                                <Link href="/contact" className="hover:text-[#003ECB] dark:hover:text-[#003ECB] transition-colors">
                                    {language === 'bn' ? 'সাপোর্ট দরকার?' : 'Need Support?'}
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DesignTemplateDetails;
