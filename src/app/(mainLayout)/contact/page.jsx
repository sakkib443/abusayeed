"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuSend,
  LuClock,
  LuMessageCircle,
  LuHeadphones,
  LuCheck,
  LuArrowRight,
  LuExternalLink
} from "react-icons/lu";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { API_BASE_URL as API_URL } from "@/config/api";

const InfoItem = ({ icon: Icon, title, value, link }) => (
  <div className="flex items-start gap-4 p-5 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-md">
    <div className="w-10 h-10 shrink-0 bg-[#003ECB]/5 dark:bg-[#003ECB]/10 flex items-center justify-center text-[#003ECB] rounded-md">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1">{title}</p>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-slate-900 dark:text-white hover:text-[#003ECB] transition-colors break-all">
          {value}
        </a>
      ) : (
        <p className="text-base font-bold text-slate-900 dark:text-white">{value}</p>
      )}
    </div>
  </div>
);

const ContactPage = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";
  const [messageSent, setMessageSent] = useState(false);
  const [content, setContent] = useState({
    contactInfo: {
      email: 'info@jayeduddin.com',
      phone: '+880 1829-818616',
      address: 'Dhaka, Bangladesh',
      addressBn: 'ঢাকা, বাংলাদেশ',
      officeHours: 'Sat - Thu: 10:00 AM - 6:00 PM',
      officeHoursBn: 'শনি - বৃহঃ: সকাল ১০টা - সন্ধ্যা ৬টা'
    }
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_URL}/design/contact`);
        const data = await res.json();
        if (data.success && data.data?.contactContent) {
          setContent(prev => ({ ...prev, ...data.data.contactContent }));
        }
      } catch (error) {
        console.error('Error fetching contact content:', error);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-700 dark:text-slate-300 font-poppins pb-32">

      {/* 1. Page Header (Corporate Style) */}
      <section className="bg-white dark:bg-[#050505] border-b border-slate-200 dark:border-white/10 pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                <Link href="/" className="hover:text-[#003ECB]">Home</Link>
                <span>/</span>
                <span className="text-slate-600 dark:text-slate-200">Contact</span>
              </nav>
              <h1 className={`text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 ${bengaliClass}`}>
                {language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Contact Our Academy'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                We're here to help you achieve your creative goals. Reach out to us for any inquiries regarding courses, admissions, or support.
              </p>
            </div>
            <div className="flex flex-wrap lg:justify-end gap-3">
              <div className="px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md text-xs font-bold border border-emerald-500/20 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Chat Available
              </div>
              <div className="px-4 py-2 bg-[#003ECB]/10 text-[#003ECB] dark:text-[#003ECB] rounded-md text-xs font-bold border border-[#003ECB]/20 flex items-center gap-2">
                Response Time: ~24h
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Contact Information Cards */}
      <section className="py-12 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoItem
            icon={LuMail}
            title="Email Support"
            value={content.contactInfo.email}
            link={`mailto:${content.contactInfo.email}`}
          />
          <InfoItem
            icon={LuPhone}
            title="Direct Phone"
            value={content.contactInfo.phone}
            link={`tel:${content.contactInfo.phone.replace(/\s/g, '')}`}
          />
          <InfoItem
            icon={LuMapPin}
            title="Our Hub"
            value={language === 'bn' ? content.contactInfo.addressBn : content.contactInfo.address}
            link="https://maps.google.com"
          />
          <InfoItem
            icon={LuClock}
            title="Active Hours"
            value={language === 'bn' ? content.contactInfo.officeHoursBn : content.contactInfo.officeHours}
          />
        </div>
      </section>

      {/* 3. Message Form & Social Section */}
      <section className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Contact Form */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0a0a0a] p-8 md:p-12 border border-slate-200 dark:border-white/10 rounded-md shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="w-1 h-6 bg-[#003ECB] rounded-full" />
              Submission Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-md outline-none focus:border-[#003ECB] transition-all dark:text-white text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-md outline-none focus:border-[#003ECB] transition-all dark:text-white text-sm"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Subject of Inquiry</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-md outline-none focus:border-[#003ECB] transition-all dark:text-white text-sm"
                  placeholder="e.g. Course Admission"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Your Message</label>
                <textarea
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-md outline-none focus:border-[#003ECB] transition-all dark:text-white resize-none text-sm"
                  placeholder="Describe your request in detail..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-10 py-3.5 bg-[#003ECB] text-white rounded-md font-bold uppercase text-[11px] tracking-widest hover:bg-[#002da3] transition-all flex items-center justify-center gap-3"
              >
                {messageSent ? "Request Dispatched" : "Submit Inquiry"}
                {messageSent ? <LuCheck size={16} /> : <LuSend size={16} />}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* WhatsApp Integration */}
            <div className="p-8 bg-[#25D366] text-white rounded-md shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FaWhatsapp size={100} />
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">WhatsApp Support</h3>
              <p className="text-sm text-white/90 mb-8 relative z-10 leading-relaxed">
                Connect directly with our support team for instant clarification on courses and admission process.
              </p>
              <a
                href={`https://wa.me/${content.contactInfo.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#25D366] rounded-md font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all font-body"
              >
                Message Us <LuArrowRight size={16} />
              </a>
            </div>

            {/* Support Hours Card */}
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-md text-white shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <LuHeadphones className="text-[#003ECB]" size={24} />
                <h3 className="text-lg font-bold tracking-tight">Active Support</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-slate-400 text-xs">Sat - Thu</span>
                  <span className="font-bold text-xs">10 AM - 6 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-slate-400 text-xs">Discord Support</span>
                  <span className="text-emerald-500 font-bold text-[10px] uppercase">Always Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs">Friday</span>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Closed</span>
                </div>
              </div>
            </div>

            {/* Socials Connection */}
            <div className="p-8 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-md">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Social Influence</h4>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebookF, href: "#", color: "hover:bg-[#1877F2]" },
                  { icon: FaYoutube, href: "#", color: "hover:bg-[#FF0000]" },
                  { icon: FaLinkedinIn, href: "#", color: "hover:bg-[#0A66C2]" },
                  { icon: FaInstagram, href: "#", color: "hover:bg-[#E4405F]" }
                ].map((social, i) => (
                  <Link key={i} href={social.href} className={`w-10 h-10 border border-slate-200 dark:border-white/10 flex items-center justify-center rounded-md text-slate-400 ${social.color} hover:text-white transition-all`}>
                    <social.icon size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Map View (Full Width Frame) */}
      <section className="container mx-auto px-6 max-w-7xl mt-12">
        <div className="rounded-md overflow-hidden grayscale hover:grayscale-0 transition-all duration-[1.5s] border border-slate-200 dark:border-white/10 shadow-sm h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8986834879085!2d90.41723!3d23.7656976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c754583dd209%3A0xdd0c5fcc7d2d3836!2sDaisy%20Garden!5e0!3m2!1sen!2sbd!4v1704532086149!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
