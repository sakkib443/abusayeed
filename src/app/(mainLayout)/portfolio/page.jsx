"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    LuArrowDown,
    LuMoveRight,
    LuBriefcase,
    LuGraduationCap,
    LuAward,
    LuPalette,
    LuPenTool,
    LuLayoutGrid,
    LuVideo,
    LuSparkles,
    LuMegaphone,
    LuCheck,
    LuMapPin,
    LuMail,
    LuPhone,
    LuExternalLink,
} from "react-icons/lu";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { API_URL } from "@/config/api";
import DesignPreviewModal from "@/components/sheard/DesignPreviewModal";

/* ─────────────────────────── data ─────────────────────────── */

const STATS = [
    { number: "12+", en: "Years Experience", bn: "বছরের অভিজ্ঞতা" },
    { number: "4500+", en: "Students Trained", bn: "শিক্ষার্থী প্রশিক্ষিত" },
    { number: "9", en: "Professional Roles", bn: "পেশাগত ভূমিকা" },
    { number: "4", en: "Specializations", bn: "বিশেষায়িত ক্ষেত্র" },
];

const SKILLS = [
    { name: "Graphic Design", level: 95 },
    { name: "Brand & Logo Design", level: 92 },
    { name: "Adobe Premiere Pro", level: 90 },
    { name: "UI/UX Design", level: 86 },
    { name: "Motion Graphics", level: 85 },
    { name: "After Effects", level: 82 },
];

const TOOLS = [
    "Photoshop",
    "Illustrator",
    "Figma",
    "Premiere Pro",
    "After Effects",
    "InDesign",
];

const EXPERIENCE = [
    { role: "Graphic Design Assessor & Trainer CBT&A (Level-4)", org: "BTEB & NSDA", current: true },
    { role: "Master Trainer", org: "SEIP-Project, Bangladesh Ministry of ICT" },
    { role: "Trainer", org: "LGSP-Project, DC Office, Bogura" },
    { role: "Guest Instructor", org: "NECTAR" },
    { role: "Mentor", org: "LEDP-Project, BCS-PRIMAX Software & Pencil Box" },
    { role: "Mentor", org: "Asset-Project, SAIC Group" },
    { role: "Mentor", org: "BYETS-Project, Swisscontact" },
    { role: "Graphic Design In-charge", org: "SEO Experte Bangladesh Ltd" },
    { role: "Freelancer", org: "International Platforms" },
];

const EDUCATION = [
    "MSC in Geography & Environment",
    "Diploma in Graphic Design",
    "Diploma in Computer Software Application",
    "Graphic Design Assessor & Trainer CBT&A (Level-4)",
    "TOT — On Graphic Design",
];

const SERVICES = [
    { icon: LuPalette, en: "Graphic Design", bn: "গ্রাফিক ডিজাইন", descEn: "Print, social & marketing creatives that convert.", descBn: "প্রিন্ট, সোশ্যাল ও মার্কেটিং ক্রিয়েটিভ।" },
    { icon: LuPenTool, en: "Branding & Logo", bn: "ব্র্যান্ডিং ও লোগো", descEn: "Distinct brand identities and memorable logos.", descBn: "স্বতন্ত্র ব্র্যান্ড আইডেন্টিটি ও লোগো।" },
    { icon: LuLayoutGrid, en: "UI/UX Design", bn: "ইউআই/ইউএক্স ডিজাইন", descEn: "Clean, user-first interfaces for web & app.", descBn: "ওয়েব ও অ্যাপের জন্য পরিষ্কার ইন্টারফেস।" },
    { icon: LuSparkles, en: "Motion Graphics", bn: "মোশন গ্রাফিক্স", descEn: "Animated visuals that bring stories to life.", descBn: "অ্যানিমেটেড ভিজ্যুয়াল ও স্টোরিটেলিং।" },
    { icon: LuVideo, en: "Videography & Editing", bn: "ভিডিওগ্রাফি ও এডিটিং", descEn: "Professional shoots, reels and post-production.", descBn: "প্রফেশনাল শুট, রিলস ও এডিটিং।" },
    { icon: LuMegaphone, en: "Design Training", bn: "ডিজাইন ট্রেনিং", descEn: "Industry-grade mentorship for aspiring designers.", descBn: "নতুন ডিজাইনারদের জন্য মেন্টরশিপ।" },
];

/* ─────────────────────────── component ─────────────────────────── */

const PortfolioPage = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const isBn = language === "bn";
    const bn = isBn ? "hind-siliguri" : "";

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTemplate, setActiveTemplate] = useState(null);

    useEffect(() => {
        const fetchWork = async () => {
            try {
                const res = await fetch(`${API_URL}/design-templates?limit=8`);
                const data = await res.json();
                if (data.success) setItems((data.data || []).slice(0, 8));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchWork();
    }, []);

    /* small reusable eyebrow heading */
    const Eyebrow = ({ children }) => (
        <span className="text-[#003ECB] text-[10px] font-black uppercase tracking-[0.3em]">
            {children}
        </span>
    );

    return (
        <>
            {activeTemplate && (
                <DesignPreviewModal
                    template={activeTemplate}
                    onClose={() => setActiveTemplate(null)}
                />
            )}

            <main className="min-h-screen bg-white dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-[#003ECB] selection:text-white">

                {/* ══════════════ HERO ══════════════ */}
                <section className="relative pt-20 pb-20 lg:pt-24 overflow-hidden border-b border-slate-100 dark:border-white/5">
                    <div className="absolute top-0 right-0 w-[600px] h-[420px] bg-[#003ECB]/5 rounded-full blur-[120px] pointer-events-none dark:bg-[#003ECB]/10" />

                    <div className="container mx-auto px-6 max-w-7xl relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                            {/* Left */}
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                                    className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#003ECB]/20 bg-[#003ECB]/5">
                                    <span className="w-2 h-2 rounded-full bg-[#003ECB] animate-pulse" />
                                    <span className={`text-[#003ECB] text-xs font-bold tracking-widest uppercase ${bn}`}>
                                        {isBn ? "ক্রিয়েটিভ ডিজাইনার ও মেন্টর" : "Creative Designer & Educator"}
                                    </span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                                    className={`text-5xl md:text-6xl lg:text-[64px] font-heading font-black tracking-tight leading-[1.05] mb-5 ${bn}`}>
                                    {isBn ? (
                                        <>মোঃ আবু<br /><span className="text-[#003ECB]">সাঈদ</span></>
                                    ) : (
                                        <>Md. Abu<br /><span className="text-[#003ECB]">Sayeed</span></>
                                    )}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                                    className={`text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-lg mb-8 ${bn}`}>
                                    {isBn
                                        ? "গ্রাফিক ডিজাইনে দক্ষ একজন ডিপার্টমেন্ট হেড — ব্র্যান্ড ডিজাইন, লোগো ডিজাইন ও অ্যানিমেশনে শক্ত ভিত্তি। ১২ বছরে ৪৫০০+ শিক্ষার্থীকে প্রশিক্ষণ দিয়েছেন।"
                                        : "Department Head specializing in Graphic Design with a strong foundation in Brand Design, Logo Design and Animation — having trained 4500+ students across 12 years."}
                                </motion.p>

                                {/* CTAs */}
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                                    className="flex flex-wrap gap-4 mb-8">
                                    <a href="#work">
                                        <button className={`group px-8 py-3.5 bg-[#003ECB] hover:bg-[#002da3] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-[0_8px_30px_rgba(0,62,203,0.25)] ${bn}`}>
                                            {isBn ? "কাজ দেখুন" : "View My Work"}
                                            <LuArrowDown className="group-hover:translate-y-0.5 transition-transform" />
                                        </button>
                                    </a>
                                    <Link href="/contact">
                                        <button className={`px-8 py-3.5 border border-slate-200 dark:border-white/15 hover:border-[#003ECB]/50 text-slate-600 dark:text-slate-300 hover:text-[#003ECB] dark:hover:text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all ${bn}`}>
                                            {isBn ? "যোগাযোগ করুন" : "Hire Me"}
                                        </button>
                                    </Link>
                                </motion.div>

                                {/* Socials */}
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
                                    className="flex items-center gap-3">
                                    {[
                                        { Icon: FaFacebookF, href: "https://www.facebook.com/Trainer.AbuSayeed", label: "Facebook" },
                                        { Icon: FaWhatsapp, href: "https://wa.me/8801516153972", label: "WhatsApp" },
                                        { Icon: LuMail, href: "mailto:info@abusayeed.com", label: "Email" },
                                    ].map(({ Icon, href, label }) => (
                                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                            className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:border-[#003ECB] hover:text-[#003ECB] hover:-translate-y-0.5 transition-all">
                                            <Icon size={15} />
                                        </a>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Right — portrait */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}
                                className="relative flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-slate-100 dark:border-white/8 bg-slate-50 dark:bg-white/3 shadow-xl">
                                    <Image
                                        src="/images/Abu sayeed-CEO-CS Creative Solution-03.svg"
                                        alt="Md. Abu Sayeed — Creative Designer & Educator"
                                        fill
                                        className="object-contain p-6"
                                        priority
                                    />
                                    <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-50 dark:from-[#020202] to-transparent" />
                                    <div className="absolute bottom-5 left-4 right-4 flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#111] border border-slate-100 dark:border-white/10 shadow-lg">
                                        <div className="w-10 h-10 rounded-xl bg-[#003ECB] flex items-center justify-center shrink-0">
                                            <LuAward size={18} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-slate-900 dark:text-white text-xs font-bold leading-tight">CBT&A Level-4 Certified</p>
                                            <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-0.5">BTEB &amp; NSDA Assessor &amp; Trainer</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* ══════════════ STATS ══════════════ */}
                <section className="bg-slate-50 dark:bg-[#0a0a0a] border-b border-slate-100 dark:border-white/5">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200 dark:divide-white/8">
                            {STATS.map((s, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    transition={{ delay: 0.06 * i }}
                                    className="py-10 px-6 text-center">
                                    <p className="text-3xl md:text-4xl font-heading font-black text-[#003ECB]">{s.number}</p>
                                    <p className={`text-slate-500 dark:text-slate-400 text-[11px] md:text-xs font-bold uppercase tracking-widest mt-1.5 ${bn}`}>
                                        {isBn ? s.bn : s.en}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════ SKILLS ══════════════ */}
                <section className="py-24 bg-white dark:bg-[#020202] border-b border-slate-100 dark:border-white/5">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="mb-14">
                            <Eyebrow>{isBn ? "দক্ষতা" : "Expertise"}</Eyebrow>
                            <h2 className={`text-4xl md:text-5xl font-heading font-black mt-2 ${bn}`}>
                                {isBn ? <>আমার <span className="text-[#003ECB]">দক্ষতা</span></> : <>Skills &amp; <span className="text-[#003ECB]">Tools</span></>}
                            </h2>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-x-14 gap-y-7">
                            {SKILLS.map((s, i) => (
                                <motion.div key={s.name}
                                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    transition={{ delay: 0.05 * i }}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{s.name}</span>
                                        <span className="text-xs font-bold text-[#003ECB]">{s.level}%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-white/8 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.1 + 0.05 * i, ease: "easeOut" }}
                                            className="h-full rounded-full bg-[#003ECB]" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Tools */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-2.5 mt-12">
                            {TOOLS.map((t) => (
                                <span key={t}
                                    className="px-4 py-2 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-[#003ECB]/40 hover:text-[#003ECB] dark:hover:text-white transition-colors cursor-default">
                                    {t}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ══════════════ EXPERIENCE + EDUCATION ══════════════ */}
                <section className="py-24 bg-slate-50 dark:bg-[#0a0a0a] border-b border-slate-100 dark:border-white/5">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="mb-14">
                            <Eyebrow>{isBn ? "অভিজ্ঞতা" : "Resume"}</Eyebrow>
                            <h2 className={`text-4xl md:text-5xl font-heading font-black mt-2 ${bn}`}>
                                {isBn ? <>চাকরি ও <span className="text-[#003ECB]">শিক্ষা</span></> : <>Experience &amp; <span className="text-[#003ECB]">Education</span></>}
                            </h2>
                        </motion.div>

                        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">

                            {/* Experience timeline */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                className="lg:col-span-3 p-8 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#111]">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-[#003ECB] flex items-center justify-center">
                                        <LuBriefcase size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-black ${bn}`}>{isBn ? "কর্ম-অভিজ্ঞতা" : "Work Experience"}</h3>
                                        <p className="text-slate-400 text-xs">{isBn ? "পেশাগত পথচলা" : "Professional Journey"}</p>
                                    </div>
                                </div>

                                <div className="relative pl-5 border-l-2 border-[#003ECB]/20 space-y-5">
                                    {EXPERIENCE.map((item, i) => (
                                        <motion.div key={i}
                                            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.04 * i }} viewport={{ once: true }}
                                            className="relative group">
                                            <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-[#003ECB] border-2 border-white dark:border-[#111] group-hover:scale-125 transition-transform" />
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="text-slate-900 dark:text-white text-sm font-semibold leading-snug">{item.role}</p>
                                                {item.current && (
                                                    <span className={`px-2 py-0.5 rounded-full bg-[#003ECB]/10 text-[#003ECB] text-[9px] font-bold uppercase tracking-wider ${bn}`}>
                                                        {isBn ? "বর্তমান" : "Current"}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[#003ECB] text-xs mt-0.5 font-medium">{item.org}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Education */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                                className="lg:col-span-2 p-8 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#111]">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-[#003ECB] flex items-center justify-center">
                                        <LuGraduationCap size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-black ${bn}`}>{isBn ? "শিক্ষা ও সার্টিফিকেশন" : "Education & Certifications"}</h3>
                                        <p className="text-slate-400 text-xs">{isBn ? "একাডেমিক যোগ্যতা" : "Academic Qualifications"}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {EDUCATION.map((item, i) => (
                                        <motion.div key={i}
                                            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 * i }} viewport={{ once: true }}
                                            className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/4 border border-slate-100 dark:border-white/6 hover:border-[#003ECB]/30 transition-all">
                                            <div className="w-5 h-5 rounded-full bg-[#003ECB]/10 border border-[#003ECB]/30 flex items-center justify-center shrink-0 mt-0.5">
                                                <LuCheck size={11} className="text-[#003ECB]" />
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-snug">{item}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* ══════════════ SERVICES ══════════════ */}
                <section className="py-24 bg-white dark:bg-[#020202] border-b border-slate-100 dark:border-white/5">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="mb-14">
                            <Eyebrow>{isBn ? "সেবা" : "What I Do"}</Eyebrow>
                            <h2 className={`text-4xl md:text-5xl font-heading font-black mt-2 ${bn}`}>
                                {isBn ? <>আমার <span className="text-[#003ECB]">সেবাসমূহ</span></> : <>Services I <span className="text-[#003ECB]">Offer</span></>}
                            </h2>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {SERVICES.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                        transition={{ delay: 0.05 * i }}
                                        className="group p-7 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#111] hover:border-[#003ECB]/40 hover:-translate-y-1 transition-all">
                                        <div className="w-12 h-12 rounded-2xl bg-[#003ECB]/10 group-hover:bg-[#003ECB] flex items-center justify-center mb-5 transition-colors">
                                            <Icon size={22} className="text-[#003ECB] group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className={`text-base font-bold text-slate-900 dark:text-white mb-2 ${bn}`}>{isBn ? s.bn : s.en}</h3>
                                        <p className={`text-slate-500 dark:text-slate-400 text-sm leading-relaxed ${bn}`}>{isBn ? s.descBn : s.descEn}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ══════════════ SELECTED WORK ══════════════ */}
                <section id="work" className="scroll-mt-24 py-24 bg-slate-50 dark:bg-[#0a0a0a] border-b border-slate-100 dark:border-white/5">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                            <div>
                                <Eyebrow>{isBn ? "পোর্টফোলিও" : "Portfolio"}</Eyebrow>
                                <h2 className={`text-4xl md:text-5xl font-heading font-black mt-2 ${bn}`}>
                                    {isBn ? <>নির্বাচিত <span className="text-[#003ECB]">কাজ</span></> : <>Selected <span className="text-[#003ECB]">Work</span></>}
                                </h2>
                            </div>
                            <Link href="/design-template"
                                className={`group inline-flex items-center gap-2 text-sm font-bold text-[#003ECB] hover:gap-3 transition-all ${bn}`}>
                                {isBn ? "সব কাজ দেখুন" : "View all work"}
                                <LuMoveRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="aspect-[4/3] rounded-2xl bg-slate-100 dark:bg-white/5 mb-3" />
                                        <div className="h-3 w-1/2 rounded bg-slate-100 dark:bg-white/5" />
                                    </div>
                                ))}
                            </div>
                        ) : items.length === 0 ? (
                            <div className="py-20 text-center text-slate-400">
                                {isBn ? "কোনো কাজ পাওয়া যায়নি" : "No work to show yet"}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {items.map((item, idx) => {
                                    const img = item.images?.[0] || item.image || "/cat_graphic.png";
                                    const title = item.title || item.name || "Untitled";
                                    const catName = isBn
                                        ? item.category?.name_bn || item.category?.name || item.templateType || "Design"
                                        : item.category?.name || item.templateType || "Design";

                                    return (
                                        <motion.button key={item._id || idx}
                                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
                                            onClick={() => setActiveTemplate(item)}
                                            className="group text-left">
                                            <div className="relative overflow-hidden rounded-2xl mb-3 border border-slate-200 dark:border-white/8">
                                                <img
                                                    src={img}
                                                    alt={title}
                                                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                    <span className="inline-flex items-center gap-1.5 text-white text-xs font-bold">
                                                        <LuExternalLink size={13} /> {isBn ? "প্রিভিউ" : "Preview"}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className={`text-[13px] font-semibold leading-snug line-clamp-1 text-slate-700 dark:text-slate-200 group-hover:text-[#003ECB] transition-colors ${bn}`}>
                                                {title}
                                            </p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">{catName}</p>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* ══════════════ CONTACT / CTA ══════════════ */}
                <section className="py-28 px-6 bg-white dark:bg-[#020202]">
                    <div className="container mx-auto max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-[#003ECB]" />
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#002da3] rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />

                            <div className="relative z-10 p-12 md:p-20 text-center">
                                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/25 bg-white/10">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    <span className={`text-white text-xs font-bold tracking-widest uppercase ${bn}`}>
                                        {isBn ? "ফ্রিল্যান্স কাজের জন্য উপলব্ধ" : "Available for Freelance"}
                                    </span>
                                </div>

                                <h2 className={`text-4xl md:text-5xl font-heading font-black text-white mb-5 leading-tight ${bn}`}>
                                    {isBn ? "চলুন একসাথে কাজ করি" : "Let's Work Together"}
                                </h2>
                                <p className={`text-white/70 text-base mb-10 max-w-lg mx-auto leading-relaxed ${bn}`}>
                                    {isBn
                                        ? "একটি নতুন প্রজেক্ট, ব্র্যান্ড বা ডিজাইন আইডিয়া আছে? যোগাযোগ করুন — একসাথে দুর্দান্ত কিছু তৈরি করি।"
                                        : "Have a project, brand or design idea in mind? Get in touch — let's create something remarkable together."}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                                    <Link href="/contact">
                                        <button className={`px-10 py-4 bg-white text-[#003ECB] rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl ${bn}`}>
                                            {isBn ? "যোগাযোগ করুন" : "Hire Me"}
                                        </button>
                                    </Link>
                                    <Link href="/design-template">
                                        <button className={`px-10 py-4 border border-white/25 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all ${bn}`}>
                                            {isBn ? "টেমপ্লেট দেখুন" : "Browse Templates"}
                                        </button>
                                    </Link>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/80 text-sm">
                                    <a href="tel:+8801516153972" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                                        <LuPhone size={15} /> +880 1516-153972
                                    </a>
                                    <a href="mailto:info@abusayeed.com" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                                        <LuMail size={15} /> info@abusayeed.com
                                    </a>
                                    <span className="inline-flex items-center gap-2">
                                        <LuMapPin size={15} /> Bogura, Bangladesh
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default PortfolioPage;
