"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ImageCardHorizontalProps {
  src: string;
  alt: string;
  title: string;
  label?: string;
  href: string;
  cardNumber?: number;
  showArrow?: boolean;
}

export default function ImageCardHorizontal({
  src,
  alt,
  title,
  label,
  href,
  cardNumber,
  showArrow = true
}: ImageCardHorizontalProps) {
  return (
    <div className="w-full">
      <div className="relative w-full rounded-xl overflow-hidden bg-gray-200 cursor-pointer group min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
        {/* Background Image */}
        <Image
          src={src}
          alt={alt}
          fill
          sizes="max((min(100vw, 1920px) - 56px) / 3, 1px)"
          className="object-cover group-hover:scale-105 md:group-hover:scale-105 group-active:scale-105 transition-transform duration-700"
          priority={!!(cardNumber && cardNumber <= 12)}
        />

        {/* Card Number - Black background on hover */}
        {cardNumber && (
          <div className="absolute top-2 right-2 z-20">
            <div 
              className="text-xs px-2 py-1 rounded font-bold z-20 transition-colors duration-500"
              style={{
                backgroundColor: '#000000', 
                color: '#fefcfb'
              }}
            >
              {cardNumber}
            </div>
          </div>
        )}

        {/* Label - White by default, white on hover */}
        {label && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 transition-colors duration-500 prowl-label-white">
            {label}
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-100 md:opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center px-6 transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 md:group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500">
            <h2 className="text-headline-white">
              {title}
            </h2>
          </div>
        </div>

        {/* Arrow - Centered on hover, white */}
        {showArrow && (
          <div className="absolute inset-0 opacity-100 md:opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <span style={{ color: '#ffffff', fontSize: '28px', fontWeight: 100, fontFamily: '"Helvetica Neue", sans-serif' }}>→</span>
            </div>
          </div>
        )}

        {/* Link overlay */}
        <Link href={href} className="absolute inset-0 z-10" />
      </div>
    </div>
  );
}