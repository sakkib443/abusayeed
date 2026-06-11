"use client";

import React from "react";
import { LuPhone, LuMail } from "react-icons/lu";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const socials = [
  { Icon: FaFacebookF, href: "https://www.facebook.com/Trainer.AbuSayeed", label: "Facebook" },
  { Icon: FaYoutube, href: "#", label: "YouTube" },
  { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
];

const TopHeader = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";

  return (
    <div
      className={`hidden md:block w-full text-[13px] ${
        isDark ? "bg-[#0a0a0a] text-gray-400 border-b border-white/5" : "bg-[#0B1120] text-slate-300"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-10">
          {/* Left — contact */}
          <div className="flex items-center gap-5">
            <a href="tel:+8801516153972" className="flex items-center gap-2 hover:text-white transition-colors">
              <LuPhone size={13} className="text-[#0182E6]" />
              <span>+880 1516-153972</span>
            </a>
            <span className="w-px h-3.5 bg-white/15" />
            <a href="mailto:info@abusayeed.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <LuMail size={13} className="text-[#0182E6]" />
              <span>info@abusayeed.com</span>
            </a>
          </div>

          {/* Right — tagline + social */}
          <div className="flex items-center gap-5">
            <span className={`hidden lg:inline text-slate-400 ${bn}`}>
              {language === "bn"
                ? "প্রিমিয়াম ডিজাইন রিসোর্স ও অভিজ্ঞ মেন্টরশিপ"
                : "Premium design resources & expert mentorship"}
            </span>
            <span className="hidden lg:inline w-px h-3.5 bg-white/15" />
            <div className="flex items-center gap-0.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
