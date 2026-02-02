'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import {
    LuShoppingCart,
    LuEye,
    LuHeart,
    LuCrown,
    LuDownload,
    LuCheck,
    LuStar
} from 'react-icons/lu';
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product, type, view = "grid" }) => {
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    const detailUrl = `/${type}/${product._id || product.id}`;

    // Get first image from images array or fallback
    const productImage = product.images?.[0] || product.image || "/cat_graphic.png";

    // Calculate discount percentage
    const hasDiscount = product.offerPrice && product.offerPrice > 0 && product.offerPrice < product.price;

    // Display Price logic
    const displayPrice = hasDiscount ? product.offerPrice : product.price;
    const originalPrice = product.price;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({
            id: product._id || product.id,
            title: product.title || product.name,
            price: displayPrice,
            image: productImage,
            type: type
        }));
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    // Fields
    const title = product.title || product.name || "Untitled Product";
    const sales = product.salesCount || product.totalSales || 0;
    const categoryName = product.category?.name || product.templateType || 'Design';

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group"
        >
            <div className="relative h-full flex flex-col transition-all duration-700 bg-transparent rounded-md">

                {/* Image Container with Floating Effect */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-slate-100 dark:bg-zinc-900 shadow-sm group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700">
                    <Link href={detailUrl}>
                        <img
                            src={productImage}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 group-hover:rotate-1"
                        />
                    </Link>

                    {/* Premium Badge */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-md flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                            <LuCrown size={10} className="text-amber-400" />
                            <span className="text-[8px] font-normal text-white uppercase tracking-widest">Premium</span>
                        </div>
                    </div>

                    {/* Dynamic HUD on Hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4"
                            >
                                {/* Action Buttons Row */}
                                <div className="flex items-center gap-3">
                                    {/* Add to Cart */}
                                    <motion.button
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ delay: 0.05 }}
                                        onClick={handleAddToCart}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all ${isAdded
                                            ? 'bg-green-500 text-white'
                                            : 'bg-white text-black hover:bg-slate-100'
                                            }`}
                                        title={language === 'bn' ? 'কার্টে যোগ' : 'Add to Cart'}
                                    >
                                        {isAdded ? <LuCheck size={18} /> : <LuShoppingCart size={18} />}
                                    </motion.button>

                                    {/* View Details */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Link
                                            href={detailUrl}
                                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-2xl hover:bg-slate-100 transition-all"
                                            title={language === 'bn' ? 'বিস্তারিত' : 'View Details'}
                                        >
                                            <LuEye size={22} />
                                        </Link>
                                    </motion.div>

                                    {/* Like/Wishlist */}
                                    <motion.button
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ delay: 0.15 }}
                                        onClick={handleLike}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all ${isLiked
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white text-black hover:bg-slate-100'
                                            }`}
                                        title={language === 'bn' ? 'পছন্দ' : 'Like'}
                                    >
                                        <LuHeart size={18} className={isLiked ? 'fill-current' : ''} />
                                    </motion.button>
                                </div>

                                <p className="text-[9px] font-normal text-white uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all delay-200">
                                    {language === 'bn' ? 'এখনই দেখুন' : 'View Details'}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Content Area - Cleaner Spacing */}
                <div className="mt-6 px-1 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-[#003ECB]" />
                        <p className="text-[9px] text-[#003ECB] font-normal uppercase tracking-[0.2em]">{categoryName}</p>
                    </div>

                    <Link href={detailUrl}>
                        <h4 className={`text-lg font-normal leading-tight transition-colors group-hover:text-[#003ECB] ${isDark ? "text-white" : "text-slate-900"} ${bengaliClass} line-clamp-1`}>
                            {title}
                        </h4>
                    </Link>

                    {/* Rating Section */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-amber-500">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <LuStar
                                    key={star}
                                    size={12}
                                    className={`${star <= Math.round(product.rating || 0) ? "fill-current" : "opacity-30"}`}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">({product.reviewCount || 0})</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                        {/* Sales Count */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuDownload size={14} className="group-hover:text-[#003ECB] transition-colors" />
                            <span className="text-[10px] uppercase font-normal tracking-wide">
                                {sales > 0 ? `${sales} ${language === 'bn' ? 'বিক্রি' : 'Sales'}` : (language === 'bn' ? 'নতুন' : 'New')}
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-1">
                            {product.accessType === 'free' ? (
                                <span className="text-sm font-normal text-green-500">
                                    {language === 'bn' ? 'ফ্রি' : 'FREE'}
                                </span>
                            ) : (
                                <>
                                    {hasDiscount && (
                                        <span className="text-[10px] text-slate-400 line-through font-normal">৳{originalPrice}</span>
                                    )}
                                    <span className="text-sm font-normal text-[#003ECB]">৳{displayPrice}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default ProductCard;
