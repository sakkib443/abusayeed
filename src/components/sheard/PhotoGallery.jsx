"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuChevronLeft, LuChevronRight, LuImage } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

/* ─────────────────── gallery images ───────────────────
   Flat list of every photo (used by the lightbox).
   Files live in /public/my-gallery.                       */
const PHOTOS = [
    "/my-gallery/488648374_9465383176888037_3061879676274274573_n.jpg",
    "/my-gallery/513872094_23887161060950342_4636718187892204464_n.jpg",
    "/my-gallery/565149189_24802140986119007_4793880151125744297_n.jpg",
    "/my-gallery/486134604_9402090189884003_8427730406881594654_n.jpg",
    "/my-gallery/108296412_3123820381044380_2363611727814091937_n.jpg",
    "/my-gallery/588461088_25172224272444008_5649342833261832541_n.jpg",
    "/my-gallery/513825841_23874065572259891_707080307308183864_n.jpg",
    "/my-gallery/107904130_3124111991015219_923316769024972492_n.jpg",
    "/my-gallery/595613482_25254907374175697_6485323755312438704_n.jpg",
    "/my-gallery/488711811_9465383243554697_6583496016155516192_n.jpg",
    "/my-gallery/573045765_24908845502115221_4683277495606671917_n.jpg",
    "/my-gallery/109836634_3123652354394516_3939505594434780293_n.jpg",
    "/my-gallery/589741390_25172221145777654_3858218792250745343_n.jpg",
    "/my-gallery/486131603_9416631715096517_5013860056904421991_n.jpg",
    "/my-gallery/596688981_25254903034176131_1267997613390657025_n.jpg",
    "/my-gallery/514018805_23875716595428122_9208435068194017039_n.jpg",
    "/my-gallery/29244779_1658552764237823_8956134404283957248_n.jpg",
];

/* ─────────────────── columns ───────────────────
   Each column stacks 2–3 photos top-to-bottom. `rows` are
   fr-units, so heights differ (small / big) inside a column.
   `i` indexes into PHOTOS above.                            */
const COLUMNS = [
    { w: 300, rows: "1.5fr 1fr", items: [0, 1] },
    { w: 230, rows: "1fr 1.15fr 1fr", items: [2, 3, 4] },
    { w: 320, rows: "1fr 1.45fr", items: [5, 6] },
    { w: 240, rows: "1.1fr 1fr 1.2fr", items: [7, 8, 9] },
    { w: 300, rows: "1.35fr 1fr", items: [10, 11] },
    { w: 230, rows: "1fr 1.2fr 1fr", items: [12, 13, 14] },
    { w: 300, rows: "1.4fr 1fr", items: [15, 16] },
];

const COL_GAP = 18; // px gap between columns (margin → seamless loop)

const PhotoGallery = () => {
    const { language } = useLanguage();
    const isBn = language === "bn";
    const bn = isBn ? "hind-siliguri" : "";

    const [active, setActive] = useState(null); // index of open photo (lightbox)

    const close = useCallback(() => setActive(null), []);
    const next = useCallback(
        () => setActive((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
        []
    );
    const prev = useCallback(
        () => setActive((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length)),
        []
    );

    /* keyboard nav + scroll-lock while lightbox is open */
    useEffect(() => {
        if (active === null) return;
        const onKey = (e) => {
            if (e.key === "Escape") close();
            else if (e.key === "ArrowRight") next();
            else if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [active, close, next, prev]);

    /* render the columns twice so the marquee loops seamlessly */
    const loop = [...COLUMNS, ...COLUMNS];

    const Tile = ({ i }) => (
        <button
            type="button"
            onClick={() => setActive(i)}
            aria-label={isBn ? `গ্যালারি ছবি ${i + 1}` : `Gallery photo ${i + 1}`}
            className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-white/8 bg-slate-100 dark:bg-white/5 shadow-sm hover:shadow-xl transition-shadow"
        >
            <img
                src={PHOTOS[i]}
                alt={isBn ? `গ্যালারি ছবি ${i + 1}` : `Gallery photo ${i + 1}`}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
    );

    return (
        <section className="py-16 bg-white dark:bg-[#020202] border-b border-slate-100 dark:border-white/5 overflow-hidden">
            {/* heading */}
            <div className="container mx-auto px-6 max-w-7xl mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <span className="text-[#003ECB] text-[10px] font-black uppercase tracking-[0.3em]">
                        {isBn ? "মুহূর্তসমূহ" : "Moments"}
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
                        <h2 className={`text-4xl md:text-5xl font-heading font-black ${bn}`}>
                            {isBn ? <>ছবির <span className="text-[#003ECB]">গ্যালারি</span></> : <>Photo <span className="text-[#003ECB]">Gallery</span></>}
                        </h2>
                        <p className={`inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm ${bn}`}>
                            <LuImage size={16} className="text-[#003ECB]" />
                            {isBn ? "ক্লাস, ইভেন্ট ও কর্মশালার ঝলক" : "Glimpses from classes, events & workshops"}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* ─────────── moving marquee strip ─────────── */}
            <div className="marquee-mask relative w-full h-[58vh] md:h-[76vh] max-h-[720px]">
                <div className="marquee-track flex items-stretch h-full w-max">
                    {loop.map((col, idx) => (
                        <div
                            key={idx}
                            style={{
                                width: `${col.w}px`,
                                gridTemplateRows: col.rows,
                                marginRight: `${COL_GAP}px`,
                            }}
                            className="grid gap-[18px] h-full shrink-0"
                        >
                            {col.items.map((i) => (
                                <Tile key={i} i={i} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* component-scoped marquee animation */}
            <style>{`
                .marquee-mask {
                    -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
                    mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
                }
                .marquee-track {
                    /* start shifted one full copy to the left, slide to 0 → left-to-right motion */
                    animation: gallery-marquee 85s linear infinite;
                    will-change: transform;
                }
                .marquee-mask:hover .marquee-track { animation-play-state: paused; }
                @keyframes gallery-marquee {
                    from { transform: translateX(-50%); }
                    to   { transform: translateX(0); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .marquee-track { animation: none; }
                }
            `}</style>

            {/* ─────────── lightbox ─────────── */}
            <AnimatePresence>
                {active !== null && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={close}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
                    >
                        <button
                            onClick={close}
                            aria-label="Close"
                            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        >
                            <LuX size={22} />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            aria-label="Previous"
                            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        >
                            <LuChevronLeft size={24} />
                        </button>

                        <motion.img
                            key={active}
                            src={PHOTOS[active]}
                            alt={isBn ? `গ্যালারি ছবি ${active + 1}` : `Gallery photo ${active + 1}`}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                        />

                        <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            aria-label="Next"
                            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        >
                            <LuChevronRight size={24} />
                        </button>

                        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest">
                            {active + 1} / {PHOTOS.length}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PhotoGallery;
