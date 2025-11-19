"use client";

import React from "react";
import Image from "next/image";

interface ImageCardDecorativeProps {
  src: string;
  alt: string;
}

export default function ImageCardDecorative({
  src,
  alt
}: ImageCardDecorativeProps) {
  return (
    <div className="w-full">
      <div className="relative w-full rounded-xl overflow-hidden bg-gray-200 min-h-[400px] sm:min-h-[480px] lg:min-h-[560px]">
        {/* Background Image - No hover effects */}
        <Image
          src={src}
          alt={alt}
          fill
          sizes="max((min(100vw, 1920px) - 56px) / 3, 1px)"
          className="object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}