"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  LuStar, LuChevronRight, LuShoppingCart, LuCheck, LuDownload, LuExternalLink,
  LuFileText, LuLayers, LuMonitor, LuType, LuPackage, LuTag, LuArrowLeft, LuEye, LuTrendingUp,
} from "react-icons/lu";
import { addToCart } from "@/redux/cartSlice";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { API_URL } from "@/config/api";

const DesignTemplateDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isBn = language === "bn";
  const bn = isBn ? "hind-siliguri" : "";

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/design-templates/${id}`);
        const data = await res.json();
        if (data.success && data.data) setItem(data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#003ECB]/20 border-t-[#003ECB] rounded-full animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center px-6">
        <div className="text-center">
          <LuPackage className="mx-auto text-slate-300 mb-5" size={48} />
          <h1 className={`text-2xl font-heading font-black mb-3 ${bn}`}>{isBn ? "ডিজাইন পাওয়া যায়নি" : "Design not found"}</h1>
          <Link href="/design-template" className="inline-flex items-center gap-2 text-[#003ECB] font-bold text-sm">
            <LuArrowLeft size={16} /> {isBn ? "সব ডিজাইন" : "Browse all designs"}
          </Link>
        </div>
      </div>
    );
  }

  const images = item.images?.length ? item.images : [item.image || "/cat_graphic.png"];
  const catName = item.category?.name || item.templateType || "Design";
  const author = item.author?.fullName || `${item.author?.firstName || ""} ${item.author?.lastName || ""}`.trim() || "Md. Abu Sayeed";
  const isFree = item.accessType === "free" || !item.price;
  const hasOffer = item.offerPrice > 0 && item.offerPrice < item.price;
  const finalPrice = hasOffer ? item.offerPrice : item.price;

  const handleAddToCart = () => {
    dispatch(addToCart({ id: item._id, title: item.title, price: finalPrice, image: images[0], type: "design-template" }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const specs = [
    { icon: LuMonitor, label: isBn ? "প্ল্যাটফর্ম" : "Platform", value: item.platform },
    { icon: LuType, label: isBn ? "ধরন" : "Type", value: item.templateType },
    { icon: LuTag, label: isBn ? "ক্যাটাগরি" : "Category", value: item.category?.name },
    { icon: LuPackage, label: isBn ? "ফাইল সাইজ" : "File Size", value: item.fileSize },
    { icon: LuLayers, label: isBn ? "ডাইমেনশন" : "Dimensions", value: item.dimensions },
    { icon: LuFileText, label: isBn ? "ভার্সন" : "Version", value: item.version },
    { icon: LuPackage, label: isBn ? "ইন্ডাস্ট্রি" : "Industry", value: item.industry },
  ].filter((s) => s.value);

  const flags = [
    { label: isBn ? "এডিটেবল" : "Editable", on: item.isEditable },
    { label: isBn ? "লেয়ারড" : "Layered", on: item.layered },
    { label: isBn ? "রেসপন্সিভ" : "Responsive", on: item.responsive },
    { label: isBn ? "ফন্ট সহ" : "Font Included", on: item.fontIncluded },
  ].filter((f) => f.on);

  return (
    <main className="min-h-screen bg-white dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-[#003ECB] selection:text-white">
      <div className="container mx-auto px-6 max-w-7xl py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-slate-400 mb-8 flex-wrap">
          <Link href="/" className="hover:text-[#003ECB]">{isBn ? "হোম" : "Home"}</Link>
          <LuChevronRight size={13} />
          <Link href="/design-template" className="hover:text-[#003ECB]">{isBn ? "ডিজাইন" : "Design"}</Link>
          <LuChevronRight size={13} />
          <span className="text-slate-600 dark:text-slate-300 font-medium line-clamp-1">{item.title}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ── Gallery ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
              <img src={images[activeImg]} alt={item.title} className="w-full aspect-[16/10] object-cover" />
            </motion.div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-[#003ECB]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-10">
              <h2 className={`text-xl font-heading font-bold mb-3 ${bn}`}>{isBn ? "বিবরণ" : "Description"}</h2>
              <p className={`text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 ${bn}`}>{item.description}</p>
              {item.longDescription && (
                <p className={`text-[14px] leading-relaxed text-slate-500 dark:text-slate-400 mt-4 whitespace-pre-line ${bn}`}>{item.longDescription}</p>
              )}
            </div>

            {/* Features */}
            {item.features?.length > 0 && (
              <div className="mt-10">
                <h2 className={`text-xl font-heading font-bold mb-4 ${bn}`}>{isBn ? "যা যা আছে" : "What's Included"}</h2>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {item.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-[#003ECB]/10 text-[#003ECB] flex items-center justify-center shrink-0"><LuCheck size={12} strokeWidth={3} /></span>
                      <span className="text-[14px] text-slate-600 dark:text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specs */}
            {specs.length > 0 && (
              <div className="mt-10">
                <h2 className={`text-xl font-heading font-bold mb-4 ${bn}`}>{isBn ? "স্পেসিফিকেশন" : "Specifications"}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {specs.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111]">
                      <s.icon size={18} className="text-[#003ECB] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                        <p className="text-[13px] font-semibold text-slate-800 dark:text-white truncate">{s.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {(flags.length > 0 || item.compatibility?.length > 0) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {flags.map((f, i) => (
                      <span key={`fl${i}`} className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1.5">
                        <LuCheck size={12} /> {f.label}
                      </span>
                    ))}
                    {item.compatibility?.map((c, i) => (
                      <span key={`cp${i}`} className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">{c}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            {item.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {item.tags.filter((t) => !["auto-seed", "sample"].includes(t)).map((t, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">#{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="p-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] shadow-sm">
                {/* badges */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#003ECB]/10 text-[#003ECB] text-[11px] font-bold uppercase tracking-wider">{catName}</span>
                  {item.isFeatured && <span className="px-3 py-1 rounded-full bg-[#F78F18]/10 text-[#F78F18] text-[11px] font-bold uppercase tracking-wider">Featured</span>}
                </div>

                <h1 className={`text-2xl md:text-3xl font-heading font-black leading-tight mb-3 ${bn}`}>{item.title}</h1>

                {/* rating + stats */}
                <div className="flex items-center gap-4 mb-6 text-[13px] text-slate-400">
                  <span className="inline-flex items-center gap-1 text-[#F78F18]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <LuStar key={s} size={14} className={s <= Math.round(item.rating || 0) ? "fill-current" : "opacity-25"} />
                    ))}
                    <span className="text-slate-500 dark:text-slate-400 ml-1 font-medium">{(item.rating || 0).toFixed(1)} ({item.reviewCount || 0})</span>
                  </span>
                </div>

                {/* price */}
                <div className="flex items-end gap-3 mb-6">
                  {isFree ? (
                    <span className="text-3xl font-heading font-black text-emerald-500">{isBn ? "ফ্রি" : "FREE"}</span>
                  ) : (
                    <>
                      <span className="text-3xl font-heading font-black text-slate-900 dark:text-white">৳{finalPrice}</span>
                      {hasOffer && <span className="text-base text-slate-400 line-through mb-1">৳{item.price}</span>}
                    </>
                  )}
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  {isFree ? (
                    <a href={item.downloadFile || "#"} target="_blank" rel="noopener noreferrer"
                      className={`w-full py-3.5 rounded-xl bg-[#003ECB] hover:bg-[#002da3] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${bn}`}>
                      <LuDownload size={16} /> {isBn ? "ফ্রি ডাউনলোড" : "Download Free"}
                    </a>
                  ) : (
                    <>
                      <button onClick={handleAddToCart}
                        className={`w-full py-3.5 rounded-xl bg-[#003ECB] hover:bg-[#002da3] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${bn}`}>
                        {added ? <><LuCheck size={16} /> {isBn ? "যোগ হয়েছে" : "Added"}</> : <><LuShoppingCart size={16} /> {isBn ? "কার্টে যোগ করুন" : "Add to Cart"}</>}
                      </button>
                      <Link href="/checkout" onClick={handleAddToCart}
                        className={`w-full py-3.5 rounded-xl border border-[#003ECB] text-[#003ECB] hover:bg-[#003ECB] hover:text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${bn}`}>
                        {isBn ? "এখনই কিনুন" : "Buy Now"}
                      </Link>
                    </>
                  )}
                  {item.previewUrl && (
                    <a href={item.previewUrl} target="_blank" rel="noopener noreferrer"
                      className={`w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-[#003ECB] hover:text-[#003ECB] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${bn}`}>
                      <LuEye size={15} /> {isBn ? "লাইভ প্রিভিউ" : "Live Preview"}
                    </a>
                  )}
                  {item.documentationUrl && (
                    <a href={item.documentationUrl} target="_blank" rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl text-slate-500 hover:text-[#003ECB] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                      <LuExternalLink size={15} /> {isBn ? "ডকুমেন্টেশন" : "Documentation"}
                    </a>
                  )}
                </div>

                {/* license / files */}
                {item.filesIncluded?.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/8">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{isBn ? "ফাইল ফরম্যাট" : "File Formats"}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.filesIncluded.map((f, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-300">{f}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* author + stats */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/8 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-full bg-[#003ECB] text-white flex items-center justify-center font-bold text-sm">{author.charAt(0)}</span>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">{isBn ? "ডিজাইনার" : "Designer"}</p>
                      <p className="text-[13px] font-bold text-slate-800 dark:text-white">{author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-slate-400">
                    <span className="inline-flex items-center gap-1"><LuTrendingUp size={13} /> {item.salesCount || 0}</span>
                    <span className="inline-flex items-center gap-1"><LuEye size={13} /> {item.viewCount || 0}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DesignTemplateDetails;
