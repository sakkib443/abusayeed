"use client";

import React from 'react';
import Link from 'next/link';

const Logo = ({ className = "", color = "#003ECB", size = "normal", align = "center", href = "/" }) => {
    // We will keep a fixed size now to prevent animation/shifting on scroll
    const alignmentClass = align === "left" ? "items-start" : align === "right" ? "items-end" : "items-center";

    const Content = () => (
        <div className={`flex flex-col ${alignmentClass}`}>
            <span
                className="font-heading font-bold leading-none mb-1 text-[24px]"
                style={{ color: color }}
            >
                ABU SAYEED
            </span>
            <div
                className="w-10 h-0.5"
                style={{ backgroundColor: color }}
            />
            <span
                className="tracking-[0.5em] font-medium uppercase text-[7px] mt-1.5 opacity-80"
                style={{ color: color }}
            >
                DESIGNER & TRAINER
            </span>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className={`group flex flex-col ${alignmentClass} ${className}`}>
                <Content />
            </Link>
        );
    }

    return (
        <div className={`group flex flex-col ${alignmentClass} ${className}`}>
            <Content />
        </div>
    );
};

export default Logo;
