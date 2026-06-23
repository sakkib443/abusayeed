"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LuMail, LuPhone, LuMapPin, LuSend, LuClock, LuHeadphones, LuCheck, LuArrowRight } from "react-icons/lu";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { API_BASE_URL as API_URL } from "@/config/api";

const InfoItem = ({ icon: Icon, title, value, link }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-4 p-5 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-md">
      <div className="w-10 h-10 shrink-0 bg-[#003ECB]/5 dark:bg-[#003ECB]/10 flex items-center justify-center text-[#003ECB] rounded-md">
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1">{title}</p>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-slate-900 dark:text-white hover:text-[#003ECB] transition-colors break-words">
            {value}
          </a>
        ) : (
          <p className="text-base font-bold text-slate-900 dark:text-white break-words">{value}</p>
        )}
      </div>
    </div>
  );
};

const SOCIAL_META = [
  { key: "facebook", icon: FaFacebookF, color: "hover:bg-[#1877F2]" },
  { key: "whatsapp", icon: FaWhatsapp, color: "hover:bg-[#25D366]" },
  { key: "youtube", icon: FaYoutube, color: "hover:bg-[#FF0000]" },
  { key: "linkedin", icon: FaLinkedinIn, color: "hover:bg-[#0A66C2]" },
  { key: "instagram", icon: FaInstagram, color: "hover:bg-[#E4405F]" },
];

const ContactPage = () => {
  const { language } = useLanguage();
  const isBn = language === "bn";
  const bn = isBn ? "hind-siliguri" : "";
  const [messageSent, setMessageSent] = useState(false);

  // Real defaults (used until the backend responds / if it fails) — no demo data.
  const [content, setContent] = useState({
    hero: {},
    contactInfo: {
      email: "info@abusayeed.com",
      phone: "+880 1516-153972",
      address: "Bogura, Bangladesh",
      addressBn: "বগুড়া, বাংলাদেশ",
      officeHours: "Sat - Thu: 10:00 AM - 6:00 PM",
      officeHoursBn: "শনি - বৃহঃ: সকাল ১০টা - সন্ধ্যা ৬টা",
    },
    socialLinks: {
      facebook: "https://www.facebook.com/Trainer.AbuSayeed",
      whatsapp: "https://wa.me/8801516153972",
      youtube: "",
      linkedin: "",
      instagram: "",
    },
    mapEmbedUrl: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_URL}/design/contact`);
        const data = await res.json();
        if (data.success && data.data?.contactContent) {
          const c = data.data.contactContent;
          setContent((prev) => ({
            hero: { ...prev.hero, ...(c.hero || {}) },
            contactInfo: { ...prev.contactInfo, ...(c.contactInfo || {}) },
            socialLinks: { ...prev.socialLinks, ...(c.socialLinks || {}) },
            mapEmbedUrl: c.mapEmbedUrl ?? prev.mapEmbedUrl,
          }));
        }
      } catch (error) {
        console.error("Error fetching contact content:", error);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 5000);
  };

  const info = content.contactInfo || {};
  const address = isBn ? info.addressBn || info.address : info.address;
  const officeHours = isBn ? info.officeHoursBn || info.officeHours : info.officeHours;
  const phoneDigits = (info.phone || "").replace(/[^0-9]/g, "");
  const whatsappHref = content.socialLinks?.whatsapp || (phoneDigits ? `https://wa.me/${phoneDigits}` : null);
  const mapSrc = content.mapEmbedUrl?.trim()
    ? content.mapEmbedUrl
    : `https://www.google.com/maps?q=${encodeURIComponent(info.address || "Bogura, Bangladesh")}&output=embed`;
  const socials = SOCIAL_META.filter((s) => content.socialLinks?.[s.key]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-700 dark:text-slate-300 font-poppins pb-32">

      {/* 1. Header */}
      <section className="bg-white dark:bg-[#050505] border-b border-slate-200 dark:border-white/10 pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                <Link href="/" className="hover:text-[#003ECB]">Home</Link>
                <span>/</span>
                <span className="text-slate-600 dark:text-slate-200">Contact</span>
              </nav>
              <h1 className={`text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 ${bn}`}>
                {isBn ? "আমাদের সাথে যোগাযোগ করুন" : "Get in Touch with Us"}
              </h1>
              <p className={`text-slate-500 dark:text-slate-400 font-medium max-w-xl ${bn}`}>
                {(isBn ? content.hero?.subtitleBn : content.hero?.subtitle) ||
                  (isBn
                    ? "কোর্স, ভর্তি বা ডিজাইন সার্ভিস নিয়ে কোনো প্রশ্ন? Creative Solve CS টিমের সাথে যোগাযোগ করুন — আমরা সাহায্য করতে প্রস্তুত!"
                    : "Have a question about courses, admissions, or design services? Reach out to the Creative Solve CS team — we're happy to help!")}
              </p>
            </div>
            <div className="flex flex-wrap lg:justify-end gap-3">
              <div className="px-4 py-2 bg-[#003ECB]/10 text-[#003ECB] rounded-md text-xs font-bold border border-[#003ECB]/20 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#003ECB] animate-pulse" />
                {isBn ? "~২৪ ঘণ্টায় উত্তর" : "Response within ~24h"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Contact info cards (dynamic) */}
      <section className="py-12 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoItem icon={LuMail} title={isBn ? "ইমেইল" : "Email"} value={info.email} link={info.email ? `mailto:${info.email}` : null} />
          <InfoItem icon={LuPhone} title={isBn ? "ফোন" : "Phone"} value={info.phone} link={info.phone ? `tel:${info.phone.replace(/\s/g, "")}` : null} />
          <InfoItem
            icon={LuMapPin}
            title={isBn ? "ঠিকানা" : "Location"}
            value={address}
            link={info.address ? `https://www.google.com/maps?q=${encodeURIComponent(info.address)}` : null}
          />
          <InfoItem icon={LuClock} title={isBn ? "অফিস সময়" : "Office Hours"} value={officeHours} />
        </div>
      </section>

      {/* 3. Form & sidebar */}
      <section className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Form */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0a0a0a] p-8 md:p-12 border border-slate-200 dark:border-white/10 rounded-md shadow-sm">
            <h2 className={`text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 ${bn}`}>
              <span className="w-1 h-6 bg-[#003ECB] rounded-full" />
              {isBn ? "মেসেজ পাঠান" : "Send a Message"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest ${bn}`}>{isBn ? "পূর্ণ নাম" : "Full Name"}</label>
                  <input required type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-md outline-none focus:border-[#003ECB] transition-all dark:text-white text-sm" placeholder={isBn ? "আপনার নাম" : "Enter your name"} />
                </div>
                <div className="space-y-2">
                  <label className={`text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest ${bn}`}>{isBn ? "ইমেইল" : "Email Address"}</label>
                  <input required type="email" className="w-full px-4 py-3 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-md outline-none focus:border-[#003ECB] transition-all dark:text-white text-sm" placeholder="example@mail.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest ${bn}`}>{isBn ? "বিষয়" : "Subject"}</label>
                <input required type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-md outline-none focus:border-[#003ECB] transition-all dark:text-white text-sm" placeholder={isBn ? "যেমন: কোর্স ভর্তি" : "e.g. Course Admission"} />
              </div>
              <div className="space-y-2">
                <label className={`text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest ${bn}`}>{isBn ? "আপনার মেসেজ" : "Your Message"}</label>
                <textarea required rows="6" className="w-full px-4 py-3 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-md outline-none focus:border-[#003ECB] transition-all dark:text-white resize-none text-sm" placeholder={isBn ? "বিস্তারিত লিখুন..." : "Describe your request in detail..."}></textarea>
              </div>
              <button type="submit" className={`px-10 py-3.5 bg-[#003ECB] text-white rounded-md font-bold uppercase text-[11px] tracking-widest hover:bg-[#002da3] transition-all flex items-center justify-center gap-3 ${bn}`}>
                {messageSent ? (isBn ? "পাঠানো হয়েছে" : "Message Sent") : (isBn ? "মেসেজ পাঠান" : "Submit Inquiry")}
                {messageSent ? <LuCheck size={16} /> : <LuSend size={16} />}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* WhatsApp */}
            {whatsappHref && (
              <div className="p-8 bg-[#25D366] text-white rounded-md shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><FaWhatsapp size={100} /></div>
                <h3 className={`text-xl font-bold mb-4 relative z-10 ${bn}`}>{isBn ? "হোয়াটসঅ্যাপ সাপোর্ট" : "WhatsApp Support"}</h3>
                <p className={`text-sm text-white/90 mb-8 relative z-10 leading-relaxed ${bn}`}>
                  {isBn ? "কোর্স ও ভর্তি নিয়ে তাৎক্ষণিক সাহায্যের জন্য সরাসরি চ্যাট করুন।" : "Chat directly with us for instant help on courses and the admission process."}
                </p>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-6 py-3 bg-white text-[#25D366] rounded-md font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all ${bn}`}>
                  {isBn ? "মেসেজ করুন" : "Message Us"} <LuArrowRight size={16} />
                </a>
              </div>
            )}

            {/* Office hours (dynamic) */}
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-md text-white shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <LuHeadphones className="text-[#003ECB]" size={24} />
                <h3 className={`text-lg font-bold tracking-tight ${bn}`}>{isBn ? "অফিস সময়" : "Office Hours"}</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-3 border-b border-white/5 pb-3">
                  <span className={`text-slate-400 text-xs ${bn}`}>{isBn ? "শনি - বৃহঃ" : "Sat - Thu"}</span>
                  <span className="font-bold text-xs text-right">{officeHours}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className={`text-slate-400 text-xs ${bn}`}>{isBn ? "শুক্রবার" : "Friday"}</span>
                  <span className={`text-slate-500 font-bold uppercase text-[10px] ${bn}`}>{isBn ? "বন্ধ" : "Closed"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-slate-400 text-xs ${bn}`}>{isBn ? "গড় উত্তর সময়" : "Avg. Response"}</span>
                  <span className="text-emerald-500 font-bold text-[10px] uppercase">~24h</span>
                </div>
              </div>
            </div>

            {/* Socials (dynamic — only real links) */}
            {socials.length > 0 && (
              <div className="p-8 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-md">
                <h4 className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 ${bn}`}>{isBn ? "সোশ্যাল মিডিয়া" : "Follow Us"}</h4>
                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a key={s.key} href={content.socialLinks[s.key]} target="_blank" rel="noopener noreferrer" aria-label={s.key}
                      className={`w-10 h-10 border border-slate-200 dark:border-white/10 flex items-center justify-center rounded-md text-slate-400 ${s.color} hover:text-white transition-all`}>
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Map (dynamic from address) */}
      <section className="container mx-auto px-6 max-w-7xl mt-12">
        <div className="rounded-md overflow-hidden grayscale hover:grayscale-0 transition-all duration-[1.5s] border border-slate-200 dark:border-white/10 shadow-sm h-[450px]">
          <iframe
            key={mapSrc}
            src={mapSrc}
            title="Location map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
