"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuX, LuZap, LuCrown, LuRocket, LuGem } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const PricingPage = () => {
    const { language } = useLanguage();
    const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "yearly"
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    const plans = [
        {
            name: "Free",
            nameBn: "ফ্রি",
            icon: LuRocket,
            description: "Perfect for exploring our assets",
            descriptionBn: "আমাদের অ্যাসেটগুলো এক্সপ্লোর করার জন্য",
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: [
                { text: "5 Free Downloads/month", textBn: "মাসে ৫টি ফ্রি ডাউনলোড", included: true },
                { text: "Access to Free Templates", textBn: "ফ্রি টেম্পলেটে অ্যাক্সেস", included: true },
                { text: "Basic Community Support", textBn: "বেসিক কমিউনিটি সাপোর্ট", included: true },
                { text: "Premium Templates", textBn: "প্রিমিয়াম টেম্পলেট", included: false },
                { text: "Commercial License", textBn: "কমার্শিয়াল লাইসেন্স", included: false },
            ],
            buttonText: "Start for Free",
            buttonTextBn: "ফ্রিতে শুরু করুন",
            highlight: false
        },
        {
            name: "Pro",
            nameBn: "প্রো",
            icon: LuCrown,
            description: "Perfect for professional designers",
            descriptionBn: "পেশাদার ডিজাইনারদের জন্য সেরা",
            monthlyPrice: 999,
            yearlyPrice: 799,
            features: [
                { text: "50 Downloads/month", textBn: "মাসে ৫০টি ডাউনলোড", included: true },
                { text: "All Premium Templates", textBn: "সব প্রিমিয়াম টেম্পলেট", included: true },
                { text: "Commercial License", textBn: "কমার্শিয়াল লাইসেন্স", included: true },
                { text: "Priority Email Support", textBn: "প্রায়োরিটি ইমেল সাপোর্ট", included: true },
                { text: "Early Access to New Assets", textBn: "নতুন অ্যাসেটে আর্লি অ্যাক্সেস", included: true },
            ],
            buttonText: "Choose Pro Plan",
            buttonTextBn: "প্রো প্ল্যান নিন",
            highlight: true,
            badge: "MOST POPULAR",
            badgeBn: "সবচেয়ে জনপ্রিয়"
        },
        {
            name: "Ultimate",
            nameBn: "আল্টিমেট",
            icon: LuGem,
            description: "Power tools for teams & agencies",
            descriptionBn: "টিম এবং এজেন্সির জন্য শক্তিশালী টুলস",
            monthlyPrice: 4999,
            yearlyPrice: 3999,
            features: [
                { text: "Unlimited Downloads", textBn: "আনলিমিটেড ডাউনলোড", included: true },
                { text: "All Premium Templates", textBn: "সব প্রিমিয়াম টেম্পলেট", included: true },
                { text: "Extended Business License", textBn: "এক্সটেন্ডেড বিজনেস লাইসেন্স", included: true },
                { text: "24/7 Dedicated Support", textBn: "২৪/৭ ডেডিকেটেড সাপোর্ট", included: true },
                { text: "Team Access (Up to 10)", textBn: "টিম অ্যাক্সেস (১০ জন পর্যন্ত)", included: true },
            ],
            buttonText: "Get Ultimate Now",
            buttonTextBn: "আল্টিমেট নিন",
            highlight: false
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#020202]">
            {/* Premium Heading Section */}
            <header className="pt-24 pb-12 bg-white dark:bg-[#020202]">
                <div className="container mx-auto px-6 max-w-[1600px]">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-1">
                        <div className="max-w-2xl text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 text-[#003ECB] font-normal text-[10px] uppercase tracking-[0.4em] mb-5"
                            >
                                <span className="w-12 h-[1px] bg-[#003ECB]" />
                                {language === 'bn' ? 'ফ্লেক্সিবল প্রাইসিং' : 'Flexible Pricing'}
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-4xl md:text-5xl font-heading font-normal tracking-tight leading-[1.1] text-slate-900 dark:text-white ${bengaliClass}`}
                            >
                                {language === 'bn'
                                    ? 'আপনার প্রবৃদ্ধি নিশ্চিত করতে সঠিক প্ল্যান বেছে নিন'
                                    : 'Choose the Right Plan for Your Growth'}
                            </motion.h2>
                        </div>

                        {/* Billing Toggle */}
                        <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-1 rounded-xl border border-slate-100 dark:border-white/10">
                            <button
                                onClick={() => setBillingCycle("monthly")}
                                className={`px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${billingCycle === "monthly"
                                    ? "bg-[#003ECB] text-white shadow-lg shadow-[#003ECB]/20"
                                    : "text-slate-500 hover:text-[#003ECB] dark:text-gray-400"
                                    }`}
                            >
                                {language === 'bn' ? 'মাসিক' : 'Monthly'}
                            </button>
                            <button
                                onClick={() => setBillingCycle("yearly")}
                                className={`px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${billingCycle === "yearly"
                                    ? "bg-[#003ECB] text-white shadow-lg shadow-[#003ECB]/20"
                                    : "text-slate-500 hover:text-[#003ECB] dark:text-gray-400"
                                    }`}
                            >
                                <span>{language === 'bn' ? 'বার্ষিক' : 'Yearly'}</span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${billingCycle === 'yearly' ? 'bg-white/20 text-white' : 'bg-[#003ECB]/10 text-[#003ECB]'}`}>-20%</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Pricing Grid */}
            <main className="pb-24 pt-4">
                <div className="container mx-auto px-6 max-w-[1600px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {plans.map((plan, idx) => {
                            const Icon = plan.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`relative group flex flex-col p-8 rounded-3xl transition-all duration-500 ${plan.highlight
                                        ? "bg-slate-900 dark:bg-white/5 border-2 border-[#003ECB] shadow-2xl shadow-[#003ECB]/10"
                                        : "bg-white dark:bg-[#0d0d0d] border border-slate-100 dark:border-white/5 hover:border-[#003ECB]/30"
                                        }`}
                                >
                                    {plan.badge && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <span className="bg-[#003ECB] text-white text-[9px] font-bold tracking-[0.2em] px-5 py-1.5 rounded-full shadow-xl uppercase">
                                                {language === 'bn' ? plan.badgeBn : plan.badge}
                                            </span>
                                        </div>
                                    )}

                                    <div className="mb-10 text-left">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${plan.highlight ? 'bg-[#003ECB] text-white' : 'bg-slate-50 dark:bg-white/5 text-[#003ECB] group-hover:bg-[#003ECB] group-hover:text-white'}`}>
                                            <Icon size={24} />
                                        </div>
                                        <h3 className={`text-2xl font-normal leading-tight mb-2 ${plan.highlight ? 'text-white' : 'text-slate-900 dark:text-white'} ${bengaliClass}`}>
                                            {language === 'bn' ? plan.nameBn : plan.name}
                                        </h3>
                                        <p className={`text-sm ${plan.highlight ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'} ${bengaliClass}`}>
                                            {language === 'bn' ? plan.descriptionBn : plan.description}
                                        </p>
                                    </div>

                                    <div className="mb-10 flex items-baseline gap-1">
                                        <span className={`text-5xl font-heading ${plan.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                            ৳{billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                                        </span>
                                        <span className={`text-sm italic font-medium ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                                            {plan.monthlyPrice === 0
                                                ? (language === 'bn' ? '/ চিরকাল' : '/ forever')
                                                : (language === 'bn' ? '/ মাসে' : '/ month')}
                                        </span>
                                    </div>

                                    <div className="space-y-4 mb-12 flex-1">
                                        {plan.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-3">
                                                <div className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center border ${feature.included
                                                    ? "bg-[#003ECB]/10 border-[#003ECB]/20 text-[#003ECB]"
                                                    : "bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-300 dark:text-slate-700"
                                                    }`}>
                                                    {feature.included ? <LuCheck size={12} strokeWidth={3} /> : <LuX size={12} />}
                                                </div>
                                                <span className={`text-[13px] ${feature.included
                                                    ? (plan.highlight ? "text-slate-300" : "text-slate-600 dark:text-gray-300")
                                                    : (plan.highlight ? "text-slate-600" : "text-slate-400 dark:text-slate-600")
                                                    } ${bengaliClass}`}>
                                                    {language === 'bn' ? feature.textBn : feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className={`w-full py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${plan.highlight
                                            ? "bg-[#003ECB] text-white hover:bg-[#003ECB]/90 shadow-xl shadow-[#003ECB]/20 hover:-translate-y-1"
                                            : "bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white hover:bg-[#003ECB] hover:text-white hover:shadow-xl hover:shadow-[#003ECB]/10 hover:-translate-y-1 border border-transparent hover:border-[#003ECB]/20"
                                            } ${bengaliClass}`}
                                    >
                                        {language === 'bn' ? plan.buttonTextBn : plan.buttonText}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* FAQ Mini */}
                    <div className="mt-24 text-center max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-3 px-6 py-4 bg-white dark:bg-[#0d0d0d] border border-slate-100 dark:border-white/5 rounded-2xl shadow-sm">
                            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-500">
                                <LuZap size={20} />
                            </div>
                            <p className={`text-slate-600 dark:text-slate-400 text-sm font-medium ${bengaliClass}`}>
                                {language === 'bn'
                                    ? 'আরও কিছু জানতে চান? আমাদের সাপোর্ট টিমের সাথে কথা বলুন।'
                                    : 'Need a custom plan for your agency? Contact our enterprise support.'}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PricingPage;
