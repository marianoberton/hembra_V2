import React from 'react';
import Image from 'next/image';

interface HorizontalImageCardProps {
  src: string;
  alt: string;
  className?: string;
}

export default function HorizontalImageCard({
  src,
  alt,
  className = ''
}: HorizontalImageCardProps) {
  return (
    <div className={`relative h-[400px] rounded-2xl overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
} 