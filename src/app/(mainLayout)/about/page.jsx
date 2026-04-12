"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import {
  LuGraduationCap,
  LuBriefcase,
  LuMoveRight,
  LuCheck,
  LuAward,
  LuUsers,
  LuPalette,
} from "react-icons/lu";

/* ─────────── data ─────────── */
const stats = [
  { number: "12+", label: "Years Experience", icon: LuAward },
  { number: "4500+", label: "Students Trained", icon: LuUsers },
  { number: "4", label: "Specializations", icon: LuPalette },
];

const education = [
  "MSC in Geography & Environment",
  "Diploma in Graphic Design",
  "Diploma in Computer Software Application",
  "Graphic Design Assessor & Trainer CBT&A (Level-4)",
  "TOT — On Graphic Design",
];

const workExperience = [
  { role: "Graphic Design Assessor & Trainer CBT&A (Level-4)", org: "BTEB & NSDA" },
  { role: "Master Trainer", org: "SEIP-Project, Bangladesh Ministry of ICT" },
  { role: "Trainer", org: "LGSP-Project, DC Office, Bogura" },
  { role: "Guest Instructor", org: "NECTAR" },
  { role: "Mentor", org: "LEDP-Project, BCS-PRIMAX Software & Pencil Box" },
  { role: "Mentor", org: "Asset-Project, SAIC Group" },
  { role: "Mentor", org: "BYETS-Project, Swisscontact" },
  { role: "Graphic Design In-charge", org: "SEO Experte Bangladesh Ltd" },
  { role: "Freelancer", org: "International Platforms" },
];

const skills = ["Graphic Design", "UI/UX Design", "Adobe Premiere Pro", "After Effects", "Brand Design", "Logo Design", "Animation"];

/* ─────────── component ─────────── */
export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-white dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-[#003ECB] selection:text-white">

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section className="relative pt-20 pb-20 lg:pt-24 overflow-hidden border-b border-slate-100 dark:border-white/5">

        {/* Subtle bg glow — matches site */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#003ECB]/4 rounded-full blur-[120px] pointer-events-none dark:bg-[#003ECB]/8" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#003ECB]/20 bg-[#003ECB]/5">
                <span className="w-2 h-2 rounded-full bg-[#003ECB] animate-pulse" />
                <span className="text-[#003ECB] text-xs font-bold tracking-widest uppercase">Creative Designer &amp; Educator</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                className="text-5xl md:text-6xl lg:text-[64px] font-heading font-black tracking-tight leading-[1.05] mb-5 text-slate-900 dark:text-white">
                Md. Abu<br />
                <span className="text-[#003ECB]">Sayeed</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-lg mb-6">
                Department Head specializing in Graphic Design with a strong foundation in Brand Design,
                Logo Design, and Animation. Educated over{" "}
                <span className="text-slate-900 dark:text-white font-semibold">4500+ students</span>{" "}
                across 12 years of dedicated professional training.
              </motion.p>

              {/* Skill tags */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
                className="flex flex-wrap gap-2 mb-8">
                {skills.map((s) => (
                  <span key={s}
                    className="px-3 py-1.5 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-[#003ECB]/40 hover:text-[#003ECB] dark:hover:text-white transition-colors cursor-default">
                    {s}
                  </span>
                ))}
              </motion.div>

              {/* Stat pills */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-3 mb-10">
                {stats.map(({ number, label, icon: Icon }, i) => (
                  <div key={i}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-50 dark:bg-white/4 border border-slate-200 dark:border-white/8">
                    <Icon size={18} className="text-[#003ECB] shrink-0" />
                    <div>
                      <p className="text-slate-900 dark:text-white font-black text-lg leading-none">{number}</p>
                      <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4">
                <Link href="/courses">
                  <button className="group px-8 py-3.5 bg-[#003ECB] hover:bg-[#002da3] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-[0_8px_30px_rgba(0,62,203,0.25)]">
                    Explore Courses
                    <LuMoveRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-3.5 border border-slate-200 dark:border-white/15 hover:border-[#003ECB]/50 text-slate-600 dark:text-slate-300 hover:text-[#003ECB] dark:hover:text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all">
                    Contact Us
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* ── Right — Abu Sayeed SVG ── */}
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
                {/* Bottom overlay */}
                <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-50 dark:from-[#020202] to-transparent" />

                {/* Badge */}
                <div className="absolute bottom-5 left-4 right-4 flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#111] border border-slate-100 dark:border-white/10 shadow-lg backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#003ECB] flex items-center justify-center shrink-0">
                    <LuAward size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white text-xs font-bold leading-tight">CBT&amp;A Level-4 Certified</p>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-0.5">BTEB &amp; NSDA Assessor &amp; Trainer</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — EDUCATION & EXPERIENCE
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 dark:bg-[#0a0a0a] border-b border-slate-100 dark:border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-14">
            <span className="text-[#003ECB] text-[10px] font-black uppercase tracking-[0.3em]">Background</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white mt-2">
              Education &amp; <span className="text-[#003ECB]">Experience</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#111]">

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#003ECB] flex items-center justify-center">
                  <LuGraduationCap size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Education</h3>
                  <p className="text-slate-400 text-xs">Academic Qualifications</p>
                </div>
              </div>

              <div className="space-y-3">
                {education.map((item, i) => (
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

            {/* Work Experience */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#111]">

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#003ECB] flex items-center justify-center">
                  <LuBriefcase size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Work Experience</h3>
                  <p className="text-slate-400 text-xs">Professional Journey</p>
                </div>
              </div>

              <div className="relative pl-5 border-l-2 border-[#003ECB]/20 space-y-5">
                {workExperience.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }} viewport={{ once: true }}
                    className="relative group">
                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-[#003ECB] border-2 border-slate-50 dark:border-[#0a0a0a] group-hover:scale-125 transition-transform" />
                    <p className="text-slate-900 dark:text-white text-sm font-semibold leading-snug">{item.role}</p>
                    <p className="text-[#003ECB] text-xs mt-0.5 font-medium">{item.org}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — LIFE JOURNEY + AGENCY
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-[#020202] border-b border-slate-100 dark:border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Life Journey */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[#003ECB] text-[10px] font-black uppercase tracking-[0.3em]">His Story</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white mt-2 mb-8 leading-tight">
                Life <span className="text-[#003ECB]">Journey</span>
              </h2>

              <div className="relative p-8 rounded-2xl border border-slate-100 dark:border-white/8 bg-slate-50 dark:bg-[#0a0a0a]">
                {/* Big quote mark */}
                <div className="absolute -top-5 left-6 text-[#003ECB]/15 dark:text-[#003ECB]/20 text-[100px] font-serif leading-none select-none">&ldquo;</div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-[1.9] relative z-10">
                  Md. Abu Sayeed began his journey in the world of education and professional training with a passion for
                  Graphic Design. After completing his{" "}
                  <span className="text-slate-900 dark:text-white font-semibold">MSC in Geography &amp; Environment</span>,
                  he quickly realized the importance of staying ahead in the digital and creative fields.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-[1.9] mt-4 relative z-10">
                  With certification as an Assessor &amp; Trainer CBT&amp;A (Level-4), his early work at the SEIP-Project
                  under the Bangladesh Ministry of ICT gave him deep insight into both academic and corporate training.
                  His impact grew — training more than{" "}
                  <span className="text-[#003ECB] font-bold">4500 students</span> over{" "}
                  <span className="text-[#003ECB] font-bold">12 years</span>.
                </p>

                {/* Attribution */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-white/8">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                    <Image src="/images/founder.png" alt="Md. Abu Sayeed" width={48} height={48} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold text-sm">Md. Abu Sayeed</p>
                    <p className="text-[#003ECB] text-[11px] font-semibold uppercase tracking-widest">Founder &amp; Department Head</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Creative Solve CS */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <span className="text-[#003ECB] text-[10px] font-black uppercase tracking-[0.3em]">The Agency</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white mt-2 mb-8 leading-tight">
                Creative <span className="text-[#003ECB]">Solve CS</span>
              </h2>

              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                A modern creative agency and learning platform with over{" "}
                <span className="text-slate-900 dark:text-white font-semibold">13+ years</span> of professional experience
                in graphic design and digital media solutions.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                At Creative Solve CS, we combine <span className="text-slate-800 dark:text-slate-200 font-medium">creativity</span>,{" "}
                <span className="text-slate-800 dark:text-slate-200 font-medium">technology</span>, and{" "}
                <span className="text-slate-800 dark:text-slate-200 font-medium">marketing strategy</span> to deliver
                impactful results for every client.
              </p>

              {/* Services grid */}
              <div className="grid grid-cols-2 gap-3">
                {["Graphic Design", "Branding & Logo", "Motion Graphics", "Social Media Reels", "Professional Videography", "Design Training"].map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }} viewport={{ once: true }}
                    className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-white/4 border border-slate-200 dark:border-white/8 hover:border-[#003ECB]/40 transition-all group">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#003ECB] shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300 text-xs font-medium group-hover:text-[#003ECB] dark:group-hover:text-white transition-colors">{s}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — CTA
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white dark:bg-[#020202]">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl">

            {/* Background */}
            <div className="absolute inset-0 bg-[#003ECB]" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#002da3] rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />

            <div className="relative z-10 p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-5 leading-tight">
                Start Your Success Story
              </h2>
              <p className="text-white/70 text-base mb-10 max-w-lg mx-auto leading-relaxed">
                Join <span className="text-white font-semibold">4500+ students</span> who have transformed their careers
                under the guidance of Md. Abu Sayeed &amp; Creative Solve CS.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <button className="px-10 py-4 bg-white text-[#003ECB] rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl">
                    Explore All Courses
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-10 py-4 border border-white/25 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                    Get in Touch
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
