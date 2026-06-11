"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  LuChevronDown, LuLayoutDashboard, LuMegaphone, LuPlay,
  LuPresentation, LuPrinter, LuPenTool, LuSparkles, LuArrowRight,
} from "react-icons/lu";
import { API_URL } from "@/config/api";

// Fallback categories — kept intentionally small (6 parents) for a clean, classic header.
const fallbackCategories = [
  {
    _id: "1", name: "Brand Identity", name_bn: "ব্র্যান্ড আইডেন্টিটি", slug: "brand-identity",
    icon: "LuPenTool", order: 1, isParent: true,
    subcategories: [
      { _id: "1-1", name: "Logo Design", name_bn: "লোগো ডিজাইন", slug: "logo-design" },
      { _id: "1-2", name: "Business Card", name_bn: "ব্যবসা কার্ড", slug: "business-card" },
      { _id: "1-3", name: "Brand Guideline", name_bn: "ব্র্যান্ড গাইডলাইন", slug: "brand-guideline" },
      { _id: "1-4", name: "Letterhead", name_bn: "লেটারহেড", slug: "letterhead" },
      { _id: "1-5", name: "Typography", name_bn: "টাইপোগ্রাফি", slug: "typography" },
    ],
  },
  {
    _id: "2", name: "UI/UX Design", name_bn: "ইউআই/ইউএক্স", slug: "ui-ux-design",
    icon: "LuLayoutDashboard", order: 2, isParent: true,
    subcategories: [
      { _id: "2-1", name: "Mobile App UI", name_bn: "মোবাইল অ্যাপ ইউআই", slug: "mobile-app-ui" },
      { _id: "2-2", name: "Landing Page", name_bn: "ল্যান্ডিং পেজ", slug: "landing-page" },
      { _id: "2-3", name: "Dashboard", name_bn: "ড্যাশবোর্ড", slug: "saas-dashboard" },
      { _id: "2-4", name: "E-commerce UI", name_bn: "ই-কমার্স ইউআই", slug: "ecommerce-ui" },
      { _id: "2-5", name: "Wireframe Kit", name_bn: "ওয়্যারফ্রেম কিট", slug: "wireframe" },
    ],
  },
  {
    _id: "3", name: "Social Media", name_bn: "সোশ্যাল মিডিয়া", slug: "social-media",
    icon: "LuMegaphone", order: 3, isParent: true,
    subcategories: [
      { _id: "3-1", name: "Instagram Post", name_bn: "ইনস্টাগ্রাম পোস্ট", slug: "instagram-post" },
      { _id: "3-2", name: "Facebook Ad", name_bn: "ফেসবুক অ্যাড", slug: "facebook-ad" },
      { _id: "3-3", name: "YouTube Thumbnail", name_bn: "ইউটিউব থাম্বনেইল", slug: "youtube-thumbnail" },
      { _id: "3-4", name: "Story Template", name_bn: "স্টোরি টেমপ্লেট", slug: "story-template" },
      { _id: "3-5", name: "Carousel Post", name_bn: "ক্যারোসেল পোস্ট", slug: "carousel-post" },
    ],
  },
  {
    _id: "4", name: "Video & Motion", name_bn: "ভিডিও ও মোশন", slug: "motion-graphics",
    icon: "LuPlay", order: 4, isParent: true,
    subcategories: [
      { _id: "4-1", name: "Reels Template", name_bn: "রিলস টেমপ্লেট", slug: "reels-template" },
      { _id: "4-2", name: "Intro / Outro", name_bn: "ইন্ট্রো/আউট্রো", slug: "intro-outro" },
      { _id: "4-3", name: "Motion Graphics", name_bn: "মোশন গ্রাফিক্স", slug: "motion-graphics" },
      { _id: "4-4", name: "Explainer Video", name_bn: "এক্সপ্লেনার ভিডিও", slug: "explainer-video" },
      { _id: "4-5", name: "Logo Animation", name_bn: "লোগো অ্যানিমেশন", slug: "logo-animation" },
    ],
  },
  {
    _id: "5", name: "Presentation", name_bn: "প্রেজেন্টেশন", slug: "presentation",
    icon: "LuPresentation", order: 5, isParent: true,
    subcategories: [
      { _id: "5-1", name: "Pitch Deck", name_bn: "পিচ ডেক", slug: "pitch-deck" },
      { _id: "5-2", name: "PowerPoint", name_bn: "পাওয়ারপয়েন্ট", slug: "powerpoint" },
      { _id: "5-3", name: "Google Slides", name_bn: "গুগল স্লাইড", slug: "google-slides" },
      { _id: "5-4", name: "Investor Deck", name_bn: "ইনভেস্টর ডেক", slug: "investor-deck" },
      { _id: "5-5", name: "Corporate PPT", name_bn: "কর্পোরেট পিপিটি", slug: "corporate-ppt" },
    ],
  },
  {
    _id: "6", name: "Print Design", name_bn: "প্রিন্ট ডিজাইন", slug: "print-design",
    icon: "LuPrinter", order: 6, isParent: true,
    subcategories: [
      { _id: "6-1", name: "Flyer Design", name_bn: "ফ্লায়ার ডিজাইন", slug: "flyer" },
      { _id: "6-2", name: "Brochure", name_bn: "ব্রুশিয়ার", slug: "brochure" },
      { _id: "6-3", name: "Poster Design", name_bn: "পোস্টার ডিজাইন", slug: "poster" },
      { _id: "6-4", name: "Book Cover", name_bn: "বুক কভার", slug: "book-cover" },
      { _id: "6-5", name: "Menu Design", name_bn: "মেনু ডিজাইন", slug: "menu-design" },
    ],
  },
];

const iconMap = {
  LuPenTool: <LuPenTool size={17} />,
  LuLayoutDashboard: <LuLayoutDashboard size={17} />,
  LuMegaphone: <LuMegaphone size={17} />,
  LuPlay: <LuPlay size={17} />,
  LuPresentation: <LuPresentation size={17} />,
  LuPrinter: <LuPrinter size={17} />,
};

const CategoryNav = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState(fallbackCategories);
  const isDark = theme === "dark";

  // Try backend categories, fall back to the small hardcoded set.
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch(`${API_URL}/categories?type=design-template&limit=100`);
        const data = await res.json();

        if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
          const parents = data.data.filter((c) => c.isParent);
          const subs = data.data.filter((c) => !c.isParent && c.parentCategory);

          const mapped = parents
            .map((parent) => {
              const pid = parent._id.toString();
              const children = subs.filter((s) => {
                const sp =
                  typeof s.parentCategory === "object"
                    ? s.parentCategory._id?.toString() || s.parentCategory.toString()
                    : s.parentCategory.toString();
                return sp === pid;
              });
              return { ...parent, subcategories: children };
            })
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .slice(0, 6); // keep the bar clean — max 6 parents

          if (mapped.length > 0) setCategories(mapped);
        }
      } catch {
        setCategories(fallbackCategories);
      }
    };

    fetchCats();
  }, []);

  return (
    <div
      className={`hidden lg:block w-full border-b ${
        isDark ? "bg-[#0a0a0a] border-white/5" : "bg-white border-gray-100"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <ul className="flex items-center">
            {categories.map((cat) => {
              const open = activeCategory === cat._id;
              return (
                <li
                  key={cat._id}
                  className="relative"
                  onMouseEnter={() => setActiveCategory(cat._id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    href={`/design-template?category=${cat.slug}`}
                    className={`flex items-center gap-2 px-4 py-3 text-[13px] font-medium whitespace-nowrap transition-colors ${
                      open
                        ? "text-[#0182E6]"
                        : isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-slate-600 hover:text-[#0182E6]"
                    }`}
                  >
                    <span className={open ? "text-[#0182E6]" : "opacity-70"}>
                      {iconMap[cat.icon] || <LuLayoutDashboard size={17} />}
                    </span>
                    <span>{language === "bn" ? cat.name_bn : cat.name}</span>
                    {cat.subcategories?.length > 0 && (
                      <LuChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                    )}
                  </Link>

                  <AnimatePresence>
                    {open && cat.subcategories?.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-60 z-[999] pt-1"
                      >
                        <div className={`rounded-xl border shadow-xl overflow-hidden ${isDark ? "bg-[#111] border-white/10" : "bg-white border-gray-100"}`}>
                          <div className="p-2">
                            {cat.subcategories.map((sub) => (
                              <Link
                                key={sub._id}
                                href={`/design-template?category=${sub.slug}`}
                                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] transition-colors group ${
                                  isDark ? "text-gray-400 hover:bg-white/5 hover:text-white" : "text-slate-600 hover:bg-gray-50 hover:text-[#0182E6]"
                                }`}
                              >
                                <span className="font-medium">{language === "bn" ? sub.name_bn : sub.name}</span>
                                <LuArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            ))}
                          </div>
                          <Link
                            href={`/design-template?category=${cat.slug}`}
                            className={`flex items-center justify-between px-4 py-2.5 text-[12px] font-semibold border-t ${
                              isDark ? "border-white/5 text-gray-300 hover:bg-white/5" : "border-gray-100 text-slate-700 hover:bg-gray-50"
                            }`}
                          >
                            <span>{language === "bn" ? "সব দেখুন" : "View all"}</span>
                            <LuArrowRight size={13} className="text-[#F78F18]" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Right CTA */}
          <Link
            href="/custom-order"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-colors ${
              isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-[#0182E6] hover:bg-gray-50"
            }`}
          >
            <LuSparkles size={14} className="text-[#F78F18]" />
            <span>{language === "bn" ? "কাস্টম অর্ডার" : "Custom Order"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
