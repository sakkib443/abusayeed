"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = ({ className = "", size = "normal", href = "/" }) => {
    const logoHeight = size === "small" ? 36 : size === "large" ? 56 : 44;
    const logoWidth = logoHeight * 3.5; // aspect ratio maintain

    const Content = () => (
        <div className="flex items-center">
            <Image
                src="/images/creation logo-01.png"
                alt="Creative Solve CS — Abu Sayeed"
                width={logoWidth}
                height={logoHeight}
                className="object-contain"
                priority
            />
        </div>
    );

    if (href) {
        return (
            <Link href={href} className={`inline-flex items-center ${className}`}>
                <Content />
            </Link>
        );
    }

    return (
        <div className={`inline-flex items-center ${className}`}>
            <Content />
        </div>
    );
};

export default Logo;
