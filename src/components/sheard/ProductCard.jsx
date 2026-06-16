'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import { LuShoppingCart, LuHeart, LuCheck, LuStar } from 'react-icons/lu';
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

/* ─── Design Template Card — simple image + title ─── */
const DesignCard = ({ product, onCardClick, isDark, language }) => {
    const bn = language === "bn" ? "hind-siliguri" : "";
    const img = product.images?.[0] || product.image || "/cat_graphic.png";
    const title = product.title || product.name || "Untitled";

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group cursor-pointer"
            onClick={onCardClick}
        >
            {/* Image */}
            <div className="overflow-hidden mb-3">
                <img
                    src={img}
                    alt={title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
            </div>

            {/* Title */}
            <p className={`text-[13px] font-medium leading-snug line-clamp-1 transition-colors group-hover:text-[#003ECB] ${
                isDark ? "text-slate-300" : "text-slate-700"
            } ${bn}`}>
                {title}
            </p>
        </motion.div>
    );
};

/* ─── General Product Card (courses, software, websites) ─── */
const ProductCard = ({ product, type, onCardClick }) => {
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { language } = useLanguage();
    const bn = language === "bn" ? "hind-siliguri" : "";

    const isDesign = type === "design-template";

    if (isDesign) {
        return (
            <DesignCard
                product={product}
                onCardClick={onCardClick}
                isDark={isDark}
                language={language}
            />
        );
    }

    const detailUrl = `/${type}/${product._id || product.id}`;
    const productImage = product.images?.[0] || product.image || "/cat_graphic.png";
    const hasDiscount = product.offerPrice && product.offerPrice > 0 && product.offerPrice < product.price;
    const displayPrice = hasDiscount ? product.offerPrice : product.price;
    const title = product.title || product.name || "Untitled";
    const categoryName = product.category?.name || product.templateType || 'Design';

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({
            id: product._id || product.id,
            title,
            price: displayPrice,
            image: productImage,
            type,
        }));
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(v => !v);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="group"
        >
            <div className={`rounded-2xl overflow-hidden border transition-all duration-300 group-hover:shadow-xl ${
                isDark
                    ? "bg-[#111] border-white/8 group-hover:shadow-black/40"
                    : "bg-white border-gray-100 group-hover:shadow-slate-200/80"
            }`}>

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Link href={detailUrl}>
                        <img
                            src={productImage}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 text-[13px] font-semibold rounded-full shadow-lg">
                                {language === "bn" ? "দেখুন" : "View"}
                            </span>
                        </div>
                    </Link>

                    <button
                        onClick={handleLike}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                            isLiked ? "bg-red-500 text-white" : "bg-white/95 text-slate-500 hover:text-red-500"
                        }`}
                    >
                        <LuHeart size={14} className={isLiked ? "fill-current" : ""} />
                    </button>
                </div>

                {/* Info */}
                <div className="p-4 pb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F78F18] mb-2">
                        {categoryName}
                    </p>

                    <Link href={detailUrl}>
                        <h4 className={`text-[15px] font-semibold leading-snug line-clamp-1 mb-3 transition-colors group-hover:text-[#0182E6] ${
                            isDark ? "text-white" : "text-slate-900"
                        } ${bn}`}>
                            {title}
                        </h4>
                    </Link>

                    <div className="flex items-center gap-1.5 mb-4">
                        <div className="flex items-center gap-0.5 text-[#F78F18]">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <LuStar
                                    key={s}
                                    size={11}
                                    className={s <= Math.round(product.rating || 0) ? "fill-current" : "opacity-20"}
                                />
                            ))}
                        </div>
                        <span className="text-[11px] text-slate-400">({product.reviewCount || 0})</span>
                    </div>

                    <div className={`flex items-center justify-between pt-3.5 border-t ${isDark ? "border-white/8" : "border-gray-100"}`}>
                        <div>
                            {product.accessType === 'free' ? (
                                <span className="text-[15px] font-bold text-green-500">
                                    {language === "bn" ? "ফ্রি" : "FREE"}
                                </span>
                            ) : (
                                <div className="flex items-center gap-2">
                                    {hasDiscount && (
                                        <span className="text-[11px] text-slate-400 line-through">৳{product.price}</span>
                                    )}
                                    <span className="text-[15px] font-bold text-[#0182E6]">৳{displayPrice}</span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            title={language === "bn" ? "কার্টে যোগ" : "Add to cart"}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                                isAdded
                                    ? "bg-green-500 text-white"
                                    : "bg-[#0182E6]/10 text-[#0182E6] hover:bg-[#0182E6] hover:text-white"
                            }`}
                        >
                            {isAdded ? <LuCheck size={16} /> : <LuShoppingCart size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
