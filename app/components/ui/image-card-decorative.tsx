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
  const [errored, setErrored] = React.useState(false);
  return (
    <div className="w-full">
      <div className="relative w-full rounded-xl overflow-hidden bg-gray-200 min-h-[300px] sm:min-h-[360px] lg:min-h-[420px]">
        {/* Background Image - No hover effects */}
        {!errored ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="max((min(100vw, 1920px) - 56px) / 3, 1px)"
            className="object-cover"
            priority={false}
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300">
            <span className="text-sm text-neutral-500">Sin imagen</span>
          </div>
        )}
      </div>
    </div>
  );
}