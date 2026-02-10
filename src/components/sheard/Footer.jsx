/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { LuSend, LuArrowUpRight, LuHeart, LuGithub, LuTwitter } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import Logo from "./Logo";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Apply Bengali font class when language is Bengali
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const quickLinks = [
    { to: "/", label: t("navbar.home") },
    { to: "/courses", label: t("navbar.courses") },
    { to: "/website", label: "Websites" },
    { to: "/design-template", label: "Templates" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: t("navbar.about") },
    { to: "/contact", label: t("navbar.contact") },
  ];

  const categories = [
    { key: "Web Development", label: "Web Design" },
    { key: "Digital Marketing", label: "Marketing" },
    { key: "Graphics Design", label: "Graphics" },
    { key: "UI/UX Design", label: "UI/UX" },
    { key: "Motion Graphics", label: "Motion" },
    { key: "Video Editing", label: "Video" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/Trainer.AbuSayeed", color: "#1877F2", label: "Facebook" },
    { icon: FaLinkedin, href: "#", color: "#0A66C2", label: "LinkedIn" },
    { icon: FaYoutube, href: "#", color: "#FF0000", label: "YouTube" },
    { icon: FaInstagram, href: "#", color: "#E4405F", label: "Instagram" },
  ];

  return (
    <footer className={`relative transition-colors duration-700 overflow-hidden ${isDark ? "bg-[#020202] text-white" : "bg-[#050505] text-white"}`}>

      {/* Background Aesthetic Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none opacity-10 bg-blue-900/40" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none opacity-10 bg-purple-900/40" />

      {/* Top CTA / Newsletter Section */}
      <div className="relative border-b border-white/5">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/5 border border-white/10 rounded-[2rem] p-8 lg:p-12 backdrop-blur-sm relative group overflow-hidden">

            {/* Interactive Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#003ECB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 max-w-2xl text-center lg:text-left">
              <h3 className={`text-3xl md:text-4xl font-heading font-normal tracking-tight mb-4 ${bengaliClass}`}>
                {language === 'bn' ? 'চলুন একসাথে দুর্দান্ত কিছু তৈরি করি' : 'Let\'s create something great together'}
              </h3>
              <p className={`text-slate-400 text-[15px] leading-relaxed mb-0 ${bengaliClass}`}>
                {language === 'bn'
                  ? 'নতুন ডিজাইন রিসোর্স এবং টিপস পেতে আমাদের নিউজলেটারে সাবস্ক্রাইব করুন।'
                  : 'Subscribe to our newsletter for the latest design resources, tips, and exclusive updates.'}
              </p>
            </div>

            <div className="relative z-10 w-full lg:w-auto">
              <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-full focus-within:border-[#003ECB] transition-colors duration-300 w-full lg:min-w-[400px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'bn' ? 'আপনার ইমেইল দিন' : 'Enter your email'}
                  className="bg-transparent border-none outline-none px-6 py-3 text-white text-sm flex-1 placeholder:text-slate-500"
                />
                <button className="px-8 py-3 bg-[#003ECB] hover:bg-blue-700 text-white rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-2 group">
                  <span>{language === 'bn' ? 'সাবস্ক্রাইব' : 'Join'}</span>
                  <LuSend className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-12">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Logo color="#003ECB" size="large" align="left" />
            </div>
            <p className={`text-slate-400 text-[15px] leading-relaxed max-w-sm ${bengaliClass}`}>
              {language === 'bn'
                ? 'উন্নত মানের ইউএক্স/ইউআই এবং গ্রাফিক ডিজাইন শিক্ষার মাধ্যমে আমরা নতুন প্রজন্মের দক্ষ ডিজাইনার তৈরি করছি।'
                : 'Empowering the next generation of designers through world-class UX/UI and graphic design education.'}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#003ECB] hover:border-[#003ECB] hover:text-white transition-all duration-300 text-slate-400"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 1: Links */}
          <div>
            <h4 className={`text-white text-sm font-bold uppercase tracking-[0.2em] mb-8 ${bengaliClass}`}>
              {language === 'bn' ? 'দ্রুত লিঙ্ক' : 'Navigation'}
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.to}
                    className="text-slate-400 hover:text-[#003ECB] text-[14px] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#003ECB] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className={`text-white text-sm font-bold uppercase tracking-[0.2em] mb-8 ${bengaliClass}`}>
              {language === 'bn' ? 'ক্যাটাগরি' : 'Resources'}
            </h4>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={`/courses?category=${encodeURIComponent(cat.key)}`}
                    className="text-slate-400 hover:text-[#003ECB] text-[14px] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#003ECB] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-8">
            <h4 className={`text-white text-sm font-bold uppercase tracking-[0.2em] mb-8 ${bengaliClass}`}>
              {language === 'bn' ? 'যোগাযোগ' : 'Get in touch'}
            </h4>
            <div className="space-y-6">
              <a href="tel:+8801516153972" className="group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#003ECB] group-hover:bg-[#003ECB]/10 transition-all duration-300">
                  <IoCallOutline className="text-[#003ECB]" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-[14px] text-slate-300 group-hover:text-white transition-colors">+880 1516-153972</p>
                </div>
              </a>
              <a href="mailto:info@abusayeed.com" className="group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#003ECB] group-hover:bg-[#003ECB]/10 transition-all duration-300">
                  <IoMailOutline className="text-[#003ECB]" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-[14px] text-slate-300 group-hover:text-white transition-colors">info@abusayeed.com</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Final Bar */}
      <div className="border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-slate-500 text-[13px] flex items-center gap-2">
              <span>© {new Date().getFullYear()} Abu Sayeed.</span>
              <span className="hidden md:inline">|</span>
              <span>{language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত' : 'All Rights Reserved.'}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] text-slate-500">
              <p className="flex items-center gap-1">
                {language === 'bn' ? 'তৈরি হয়েছে' : 'Made with'} <LuHeart className="text-[#003ECB] animate-pulse" size={14} /> {language === 'bn' ? 'বাংলাদেশে' : 'in Bangladesh'}
              </p>
              <p>
                Developed by <a href="https://extrainweb.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#003ECB] font-bold transition-colors">Extrain Web</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
