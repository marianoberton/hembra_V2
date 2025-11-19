import React from 'react';
import Image from 'next/image';

interface VerticalImageCardProps {
  src: string;
  alt: string;
  className?: string;
}

export default function VerticalImageCard({
  src,
  alt,
  className = ''
}: VerticalImageCardProps) {
  return (
    <div className={`relative h-[600px] rounded-2xl overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
} 