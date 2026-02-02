"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  LuTarget,
  LuUsers,
  LuBookOpen,
  LuMoveRight,
  LuSparkles,
  LuCheck,
  LuGraduationCap,
  LuAward,
  LuGlobe,
  LuQuote,
  LuLightbulb,
  LuShieldCheck,
  LuMonitor,
  LuPalette,
  LuStar
} from "react-icons/lu";

const StatCard = ({ number, label, icon: Icon, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.1, duration: 0.5 }}
    className="relative p-8 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-slate-100 dark:border-white/5 group hover:border-[#003ECB]/30 transition-all duration-500 shadow-sm"
  >
    <div className="relative z-10">
      <div className="w-12 h-12 mb-6 rounded-xl bg-[#003ECB]/5 dark:bg-[#003ECB]/10 flex items-center justify-center group-hover:bg-[#003ECB] group-hover:text-white transition-all duration-500">
        <Icon className="w-5 h-5 text-[#003ECB] group-hover:text-white transition-colors duration-500" />
      </div>
      <h3 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-1 tabular-nums">{number}</h3>
      <p className="text-[10px] text-slate-400 dark:text-gray-500 font-bold uppercase tracking-widest">{label}</p>
    </div>
  </motion.div>
);

const AboutPage = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  return (
    <div className="min-h-screen bg-white dark:bg-[#020202] text-slate-900 dark:text-slate-100 selection:bg-[#003ECB] selection:text-white font-body">

      {/* 1. Hero Section - Refined Proportions */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden z-10 border-b border-slate-50 dark:border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Content Left */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <span className="w-8 h-[1px] bg-[#003ECB]" />
                <span className="text-[#003ECB] font-bold text-[10px] uppercase tracking-[0.3em]">
                  {language === 'bn' ? 'আমাদের সম্পর্কে' : 'Our Story'}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className={`text-[36px] md:text-[50px] font-heading font-bold tracking-tight leading-[1.1] text-slate-900 dark:text-white mb-6 ${bengaliClass}`}
              >
                {language === 'bn' ? (
                  <>সৃজনশীলতা এবং <span className="text-[#003ECB]">প্রযুক্তির</span> এক অনন্য মেলবন্ধন</>
                ) : (
                  <>Shaping the Future of <span className="text-[#003ECB]">Digital Craft</span> and Education</>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-normal"
              >
                {language === 'bn'
                  ? 'আমরা ২০ বছরেরও বেশি সময় ধরে ডিজিটাল ফিল্ডে কাজ করছি। আমাদের লক্ষ্য শুধুমাত্র স্কিল তৈরি করা নয়, বরং বাংলাদেশের তরুণদের জন্য ফ্রিল্যান্সিং এবং গ্লোবাল মার্কেটের এক মজবুত ভিত্তি গড়ে তোলা।'
                  : 'With over two decades of presence in the digital landscape, we are more than just an academy. We are a bridge between untapped local talent and high-end global standards.'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <Link href="/courses">
                  <button className="px-8 py-3.5 bg-[#003ECB] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#002da3] transition-all flex items-center gap-3 group">
                    {language === 'bn' ? 'কোর্সগুলো দেখুন' : 'Explore Academy'}
                    <LuMoveRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#020202] bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=user${i + 40}`} alt="Student" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">50k+ Members</p>
                </div>
              </motion.div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-white/5"
              >
                <Image
                  src="/images/about-hero.png"
                  alt="Modern Studio"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Meta Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 md:-left-12 p-5 bg-white dark:bg-[#111] rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <LuCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight">ISO Standard Verified</p>
                  <p className="text-[9px] text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-1">International Academy</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Philosophy - Compact & Sharp */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <LuQuote size={48} className="text-[#003ECB] mb-6 mx-auto opacity-50" />
            <h2 className="text-2xl md:text-3xl font-heading font-normal text-white mb-10 leading-relaxed italic">
              {language === 'bn'
                ? '"পেশাদারিত্ব মানে শুধু কাজ শেষ করা নয়, পেশাদারিত্ব মানে হলো প্রতিজ্ঞা রক্ষা করা এবং সর্বোচ্চ গুণমান বজায় রাখা।"'
                : '"Professionalism isn\'t about the job you do; it\'s about how you do it and the legacy you leave behind."'}
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#003ECB] mb-3">
                <img src="/images/founder.png" alt="Founder" className="w-full h-full object-cover" />
              </div>
              <p className="text-white text-sm font-bold">Abu Sayeed</p>
              <p className="text-[#003ECB] text-[10px] uppercase tracking-widest">Founder & Mentor</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: LuTarget, title: "Our Mission", desc: "Digital literacy for everyone." },
              { icon: LuGlobe, title: "Global standards", desc: "Local talent, global stage." },
              { icon: LuLightbulb, title: "Innovation", desc: "Future-proof curriculum." },
              { icon: LuShieldCheck, title: "Excellence", desc: "No compromise on quality." },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <item.icon size={20} className="text-[#003ECB] mb-4" />
                <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-2">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Stats Section - Clean & Balanced */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard number="50k+" label="Global Students" icon={LuUsers} idx={0} />
          <StatCard number="20+" label="Years Experience" icon={LuAward} idx={1} />
          <StatCard number="850+" label="Premium Assets" icon={LuPalette} idx={2} />
          <StatCard number="4.9" label="User Rating" icon={LuStar} idx={3} />
        </div>
      </section>

      {/* 4. Pillars of Excellence */}
      <section className="py-24 bg-slate-50 dark:bg-[#0a0a0a] border-y border-slate-100 dark:border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <h2 className={`text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-10 leading-tight ${bengaliClass}`}>
                {language === 'bn' ? 'আমাদের এগিয়ে চলার মূল স্তম্ভ' : 'Our Pillars of Excellence'}
              </h2>
              <div className="grid gap-8">
                {[
                  { icon: LuBookOpen, title: "Industry Led Curriculum", desc: "Every lesson is designed based on current market demands." },
                  { icon: LuGraduationCap, title: "Expert Mentorship", desc: "Direct guidance from instructors with 20+ years of industry experience." },
                  { icon: LuTarget, title: "Practical Exposure", desc: "Working on real projects to build a professional portfolio." }
                ].map((pill, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 rounded-lg bg-[#003ECB] flex items-center justify-center text-white shrink-0">
                      <pill.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 tracking-wide uppercase">{pill.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">{pill.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/10">
                <Image src="/images/office-showcase.png" fill className="object-cover" alt="Support" />
              </div>
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-[#003ECB] rounded-full flex items-center justify-center text-white animate-pulse">
                <LuSparkles size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA - Refined & Professional */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="relative bg-[#003ECB] rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight leading-tight">
                {language === 'bn' ? 'সফলতার নতুন গল্প লিখুন আজই' : 'Start Your Success Story Today'}
              </h2>
              <p className="text-sm md:text-base text-white/70 mb-10 max-w-xl mx-auto font-light">
                Join a global network of professionals who trust Abu Sayeed for the most practical and high-end digital education.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <button className="px-10 py-3.5 bg-white text-[#003ECB] rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                    Explore All Courses
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-10 py-3.5 border border-white/30 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
