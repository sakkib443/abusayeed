"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    LuPenTool, LuLayoutDashboard, LuMegaphone, LuPlay, LuPrinter,
    LuImage, LuMousePointer2, LuShapes, LuArrowRight,
    LuCheck, LuCrown, LuSparkles, LuChevronRight, LuLayoutGrid,
} from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { API_URL } from "@/config/api";
import ProductCard from "@/components/sheard/ProductCard";
import DesignPreviewModal from "@/components/sheard/DesignPreviewModal";

/* ── backend icon string → Lucide component ── */
const ICONS = { LuPenTool, LuLayoutDashboard, LuMegaphone, LuPlay, LuPrinter, LuImage, LuMousePointer2, LuShapes };
const iconFor = (name, size = 26) => {
    const Icon = ICONS[name] || LuShapes;
    return <Icon size={size} strokeWidth={1.6} />;
};

/* ── short marketing blurb per category (backend has none) ── */
const BLURBS = {
    "brand-identity": { en: "Logos, business cards, brand guidelines and everything that makes a brand instantly recognizable.", bn: "লোগো, বিজনেস কার্ড, ব্র্যান্ড গাইডলাইন — একটি ব্র্যান্ডকে অনন্য করে তোলার সবকিছু।" },
    "ui-ux-design": { en: "Clean, user-first interfaces for websites, mobile apps and dashboards.", bn: "ওয়েবসাইট, মোবাইল অ্যাপ ও ড্যাশবোর্ডের জন্য পরিষ্কার, ইউজার-ফার্স্ট ইন্টারফেস।" },
    "social-media": { en: "Scroll-stopping posts, ads and thumbnails crafted for every platform.", bn: "প্রতিটি প্ল্যাটফর্মের জন্য নজরকাড়া পোস্ট, অ্যাড ও থাম্বনেইল।" },
    "video-motion": { en: "Reels, intros, logo animations and motion graphics that bring stories to life.", bn: "রিলস, ইন্ট্রো, লোগো অ্যানিমেশন ও মোশন গ্রাফিক্স যা গল্পকে জীবন্ত করে।" },
    "print-design": { en: "Brochures, flyers, posters and stationery designed to look sharp in print.", bn: "ব্রুশিয়ার, ফ্লায়ার, পোস্টার ও স্টেশনারি — প্রিন্টে নিখুঁত দেখানোর জন্য।" },
    "illustration": { en: "Custom characters, icons, patterns and vector art with a unique style.", bn: "কাস্টম ক্যারেক্টার, আইকন, প্যাটার্ন ও ভেক্টর আর্ট — অনন্য স্টাইলে।" },
    "photo-editing": { en: "Background removal, retouching, color correction and creative manipulation.", bn: "ব্যাকগ্রাউন্ড রিমুভাল, রিটাচিং, কালার কারেকশন ও ক্রিয়েটিভ ম্যানিপুলেশন।" },
};

const PLACEHOLDERS = ["/cat_graphic.png", "/cat_uiux.png", "/cat_templates.png", "/cat_content.png"];

/* ── compact 3-tier pricing (placeholder prices — owner editable) ── */
const PLANS = [
    {
        name: "Basic", name_bn: "বেসিক", price: 1500, icon: LuSparkles,
        en: ["1 concept", "2 revisions", "3-day delivery", "JPG / PNG files"],
        bn: ["১টি কনসেপ্ট", "২টি রিভিশন", "৩ দিনে ডেলিভারি", "JPG / PNG ফাইল"],
        highlight: false,
    },
    {
        name: "Standard", name_bn: "স্ট্যান্ডার্ড", price: 3500, icon: LuCrown,
        en: ["3 concepts", "Unlimited revisions", "2-day delivery", "Source files included"],
        bn: ["৩টি কনসেপ্ট", "আনলিমিটেড রিভিশন", "২ দিনে ডেলিভারি", "সোর্স ফাইল সহ"],
        highlight: true,
    },
    {
        name: "Premium", name_bn: "প্রিমিয়াম", price: 7000, icon: LuShapes,
        en: ["Unlimited concepts", "Unlimited revisions", "Priority 24h delivery", "Full commercial rights"],
        bn: ["আনলিমিটেড কনসেপ্ট", "আনলিমিটেড রিভিশন", "প্রায়োরিটি ২৪ ঘণ্টা ডেলিভারি", "ফুল কমার্শিয়াল রাইটস"],
        highlight: false,
    },
];

const CategoryDetailsPage = () => {
    const { slug } = useParams();
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const isBn = language === "bn";
    const bn = isBn ? "hind-siliguri" : "";

    const [allCats, setAllCats] = useState([]);
    const [allDesigns, setAllDesigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTemplate, setActiveTemplate] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const [catRes, dRes] = await Promise.all([
                    fetch(`${API_URL}/categories?type=design-template&limit=100`),
                    fetch(`${API_URL}/design-templates?limit=100`),
                ]);
                const catData = await catRes.json();
                const dData = await dRes.json();
                if (catData?.success) setAllCats(catData.data || []);
                if (dData?.success) setAllDesigns(dData.data || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Resolve the current parent category + its subcategories + matching designs.
    const { category, children, designs } = useMemo(() => {
        const parent = allCats.find((c) => c.slug === slug && c.isParent)
            || allCats.find((c) => c.slug === slug); // tolerate a sub-slug too
        if (!parent) return { category: null, children: [], designs: [] };

        const kids = allCats.filter((c) => {
            if (c.isParent) return false;
            const p = c.parentCategory;
            const pid = typeof p === "object" ? (p?._id || p?.id) : p;
            return String(pid) === String(parent._id);
        });

        const idSet = new Set([String(parent._id), ...kids.map((k) => String(k._id))]);
        const slugSet = new Set([parent.slug, ...kids.map((k) => k.slug)]);

        const matched = allDesigns.filter((d) => {
            const c = d.category;
            if (!c) return false;
            const cid = typeof c === "object" ? (c._id || c.id) : c;
            const cslug = typeof c === "object" ? c.slug : null;
            return idSet.has(String(cid)) || (cslug && slugSet.has(cslug));
        });

        return { category: parent, children: kids, designs: matched };
    }, [allCats, allDesigns, slug]);

    // Browser tab title
    useEffect(() => {
        if (category) document.title = `Abu Sayeed | ${category.name}`;
    }, [category]);

    const heroImages = useMemo(() => {
        const imgs = designs
            .map((d) => d.images?.[0] || d.image)
            .filter(Boolean)
            .slice(0, 3);
        while (imgs.length < 3) imgs.push(PLACEHOLDERS[imgs.length % PLACEHOLDERS.length]);
        return imgs;
    }, [designs]);

    const name = category ? (isBn ? category.name_bn || category.name : category.name) : "";
    const blurb = category
        ? (BLURBS[category.slug]?.[isBn ? "bn" : "en"]
            || (isBn ? "এই ক্যাটাগরির প্রিমিয়াম ডিজাইন ও কাস্টম সার্ভিস।" : "Premium designs and custom services for this category."))
        : "";

    /* ── loading ── */
    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#003ECB]/20 border-t-[#003ECB] rounded-full animate-spin" />
                    <p className="text-slate-500 animate-pulse font-medium">{isBn ? "লোড হচ্ছে..." : "Loading..."}</p>
                </div>
            </div>
        );
    }

    /* ── not found ── */
    if (!category) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className={`text-3xl font-heading font-black text-slate-900 dark:text-white mb-3 ${bn}`}>
                        {isBn ? "ক্যাটাগরি পাওয়া যায়নি" : "Category not found"}
                    </h1>
                    <p className="text-slate-500 mb-8">{isBn ? "এই ক্যাটাগরিটি আর নেই বা সরিয়ে ফেলা হয়েছে।" : "This category doesn't exist or was removed."}</p>
                    <Link href="/design-template" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#003ECB] hover:bg-[#002da3] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all">
                        {isBn ? "সব ডিজাইন দেখুন" : "Browse all designs"} <LuArrowRight />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {activeTemplate && (
                <DesignPreviewModal template={activeTemplate} onClose={() => setActiveTemplate(null)} />
            )}

            <main className="min-h-screen bg-white dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-[#003ECB] selection:text-white">

                {/* ══════════════ HERO ══════════════ */}
                <section className="relative pt-12 pb-16 lg:pt-16 overflow-hidden border-b border-slate-100 dark:border-white/5">
                    <div className="absolute top-0 right-0 w-[600px] h-[420px] bg-[#003ECB]/5 rounded-full blur-[120px] pointer-events-none dark:bg-[#003ECB]/10" />

                    <div className="container mx-auto px-6 max-w-7xl relative z-10">
                        {/* Breadcrumb */}
                        <motion.nav
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-[12px] text-slate-400 mb-8">
                            <Link href="/" className="hover:text-[#003ECB] transition-colors">{isBn ? "হোম" : "Home"}</Link>
                            <LuChevronRight size={13} />
                            <Link href="/design-template" className="hover:text-[#003ECB] transition-colors">{isBn ? "ক্যাটাগরি" : "Categories"}</Link>
                            <LuChevronRight size={13} />
                            <span className="text-slate-600 dark:text-slate-300 font-medium">{name}</span>
                        </motion.nav>

                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Left — text */}
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                                    className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full border border-[#003ECB]/20 bg-[#003ECB]/5 text-[#003ECB]">
                                    {iconFor(category.icon, 16)}
                                    <span className={`text-xs font-bold tracking-widest uppercase ${bn}`}>{isBn ? "ডিজাইন ক্যাটাগরি" : "Design Category"}</span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                                    className={`text-4xl md:text-5xl lg:text-[58px] font-heading font-black tracking-tight leading-[1.05] mb-5 ${bn}`}>
                                    {name}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                                    className={`text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-lg mb-7 ${bn}`}>
                                    {blurb}
                                </motion.p>

                                {/* Subcategory pills */}
                                {children.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
                                        className="flex flex-wrap gap-2 mb-8">
                                        {children.map((c) => (
                                            <span key={c._id}
                                                className="px-3 py-1.5 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                                                {isBn ? c.name_bn || c.name : c.name}
                                            </span>
                                        ))}
                                    </motion.div>
                                )}

                                {/* CTAs */}
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }}
                                    className="flex flex-wrap gap-4">
                                    <a href="#designs">
                                        <button className={`group px-8 py-3.5 bg-[#003ECB] hover:bg-[#002da3] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-[0_8px_30px_rgba(0,62,203,0.25)] ${bn}`}>
                                            {isBn ? "ডিজাইন দেখুন" : "Browse Designs"}
                                            <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </a>
                                    <Link href="/custom-order">
                                        <button className={`px-8 py-3.5 border border-slate-200 dark:border-white/15 hover:border-[#003ECB]/50 text-slate-600 dark:text-slate-300 hover:text-[#003ECB] dark:hover:text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all ${bn}`}>
                                            {isBn ? "কাস্টম অর্ডার" : "Custom Order"}
                                        </button>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Right — image collage */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
                                className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-white/8 row-span-2">
                                    <img src={heroImages[0]} alt={name} className="w-full h-full object-cover min-h-[260px]" />
                                </div>
                                <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-white/8">
                                    <img src={heroImages[1]} alt={name} className="w-full h-full object-cover aspect-[4/3]" />
                                </div>
                                <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-white/8 relative">
                                    <img src={heroImages[2]} alt={name} className="w-full h-full object-cover aspect-[4/3]" />
                                    <div className="absolute inset-0 bg-[#003ECB]/85 flex flex-col items-center justify-center text-white">
                                        <span className="text-3xl font-heading font-black leading-none">{designs.length}+</span>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${bn}`}>{isBn ? "ডিজাইন" : "Designs"}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ══════════════ PRICING (compact) ══════════════ */}
                <section id="pricing" className="scroll-mt-24 py-16 md:py-20 bg-slate-50 dark:bg-[#0a0a0a] border-b border-slate-100 dark:border-white/5">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-center mb-12">
                            <span className="text-[#003ECB] text-[10px] font-black uppercase tracking-[0.3em]">{isBn ? "প্রাইসিং" : "Pricing"}</span>
                            <h2 className={`text-3xl md:text-4xl font-heading font-black mt-2 ${bn}`}>
                                {isBn ? <>{name} <span className="text-[#003ECB]">প্যাকেজ</span></> : <>{name} <span className="text-[#003ECB]">Packages</span></>}
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {PLANS.map((plan, idx) => {
                                const Icon = plan.icon;
                                const feats = isBn ? plan.bn : plan.en;
                                return (
                                    <motion.div key={idx}
                                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                                        className={`relative flex flex-col p-7 rounded-2xl transition-all duration-300 ${
                                            plan.highlight
                                                ? "bg-slate-900 dark:bg-white/5 border-2 border-[#003ECB] shadow-xl shadow-[#003ECB]/10 md:-translate-y-2"
                                                : "bg-white dark:bg-[#111] border border-slate-200 dark:border-white/8 hover:border-[#003ECB]/40"
                                        }`}>
                                        {plan.highlight && (
                                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#003ECB] text-white text-[9px] font-bold tracking-[0.2em] px-4 py-1 rounded-full uppercase">
                                                {isBn ? "জনপ্রিয়" : "Popular"}
                                            </span>
                                        )}
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${plan.highlight ? "bg-[#003ECB] text-white" : "bg-[#003ECB]/10 text-[#003ECB]"}`}>
                                            <Icon size={20} />
                                        </div>
                                        <h3 className={`text-lg font-bold mb-1 ${plan.highlight ? "text-white" : "text-slate-900 dark:text-white"} ${bn}`}>
                                            {isBn ? plan.name_bn : plan.name}
                                        </h3>
                                        <div className="flex items-baseline gap-1 mb-6">
                                            <span className={`text-3xl font-heading font-black ${plan.highlight ? "text-white" : "text-slate-900 dark:text-white"}`}>৳{plan.price.toLocaleString()}</span>
                                            <span className={`text-xs ${plan.highlight ? "text-slate-400" : "text-slate-400"}`}>{isBn ? "/ থেকে" : "/ from"}</span>
                                        </div>
                                        <ul className="space-y-3 mb-7 flex-1">
                                            {feats.map((f, fi) => (
                                                <li key={fi} className="flex items-center gap-2.5">
                                                    <span className="shrink-0 w-5 h-5 rounded-md bg-[#003ECB]/10 text-[#003ECB] flex items-center justify-center"><LuCheck size={11} strokeWidth={3} /></span>
                                                    <span className={`text-[13px] ${plan.highlight ? "text-slate-300" : "text-slate-600 dark:text-gray-300"} ${bn}`}>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href="/custom-order">
                                            <button className={`w-full py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${bn} ${
                                                plan.highlight
                                                    ? "bg-[#003ECB] text-white hover:bg-[#002da3]"
                                                    : "bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white hover:bg-[#003ECB] hover:text-white"
                                            }`}>
                                                {isBn ? "অর্ডার করুন" : "Order Now"}
                                            </button>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ══════════════ ALL DESIGNS ══════════════ */}
                <section id="designs" className="scroll-mt-24 py-16 md:py-24 bg-white dark:bg-[#020202]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                                <span className="text-[#003ECB] text-[10px] font-black uppercase tracking-[0.3em]">{isBn ? "গ্যালারি" : "Gallery"}</span>
                                <h2 className={`text-3xl md:text-4xl font-heading font-black mt-2 ${bn}`}>
                                    {isBn ? <>সকল <span className="text-[#003ECB]">{name}</span> ডিজাইন</> : <>All <span className="text-[#003ECB]">{name}</span> Designs</>}
                                </h2>
                            </div>
                            <Link href="/design-template"
                                className={`group inline-flex items-center gap-2 text-sm font-bold text-[#003ECB] hover:gap-3 transition-all ${bn}`}>
                                {isBn ? "সব ডিজাইন" : "All designs"}
                                <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {designs.length === 0 ? (
                            <div className="py-20 text-center border border-dashed border-slate-200 dark:border-white/10 rounded-3xl">
                                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#003ECB]/10 text-[#003ECB] flex items-center justify-center mb-5">
                                    <LuLayoutGrid size={26} />
                                </div>
                                <h3 className={`text-lg font-bold text-slate-800 dark:text-white mb-2 ${bn}`}>
                                    {isBn ? "এই ক্যাটাগরিতে এখনো কোনো ডিজাইন নেই" : "No designs in this category yet"}
                                </h3>
                                <p className={`text-slate-500 text-sm mb-7 ${bn}`}>
                                    {isBn ? "আপনার প্রয়োজন অনুযায়ী কাস্টম অর্ডার করুন।" : "Request a custom order tailored to your needs."}
                                </p>
                                <Link href="/custom-order" className={`inline-flex items-center gap-2 px-7 py-3.5 bg-[#003ECB] hover:bg-[#002da3] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all ${bn}`}>
                                    {isBn ? "কাস্টম অর্ডার" : "Custom Order"} <LuArrowRight />
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                                {designs.map((d) => (
                                    <ProductCard
                                        key={d._id}
                                        product={d}
                                        type="design-template"
                                        onCardClick={() => setActiveTemplate(d)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

            </main>
        </>
    );
};

export default CategoryDetailsPage;
