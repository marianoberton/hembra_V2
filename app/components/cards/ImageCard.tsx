import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ImageCardProps {
  src?: string;
  alt?: string;
  title?: string;
  label?: string;
  href?: string;
  minHeight?: string;
  cardNumber?: number;
  showArrow?: boolean;
  placeholder?: string;
  overlayText?: string;
  overlayPosition?: 'bottom-left' | 'bottom-right' | 'center';
  className?: string;
}

export default function ImageCard({
  src,
  alt = '',
  title,
  label = 'Work',
  href = '/work',
  cardNumber,
  showArrow = true,
  placeholder,
  overlayText,
  overlayPosition = 'bottom-left',
  className = ''
}: ImageCardProps) {
  const getOverlayPositionClasses = () => {
    switch (overlayPosition) {
      case 'bottom-right':
        return 'absolute bottom-4 right-4';
      case 'center':
        return 'absolute inset-0 flex items-center justify-center';
      default:
        return 'absolute bottom-4 left-4';
    }
  };

  // Define arrowClass for consistency with other card components
  const arrowClass = 'prowl-arrow-white';

  const cardContent = (
    <div 
      className={`bg-gray-100 relative overflow-hidden rounded-xl w-full ${href ? 'group cursor-pointer' : ''} ${className}`}
    >
      {cardNumber && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold z-20">
          {cardNumber}
        </div>
      )}

      {label && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 prowl-label-white" style={{ 
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}>
          {label}
        </div>
      )}

      {src ? (
        <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="max((min(100vw, 1920px) - 56px) / 3, 1px)"
            className={`object-cover ${href ? 'group-hover:scale-105 transition-transform duration-500' : ''}`}
            priority={!!(cardNumber && cardNumber <= 12)}
          />
        </div>
      ) : (
        <div className="w-full" style={{ aspectRatio: '4/3' }}>
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <p className="text-gray-600 text-sm">{placeholder || 'Image Placeholder'}</p>
          </div>
        </div>
      )}

      {title && (
        <div className="absolute bottom-4 left-4 text-white z-20 bg-black/50 px-2 py-1 rounded">
          <h2 className="text-headline">{title}</h2>
        </div>
      )}

      {overlayText && (
        <div className={`${getOverlayPositionClasses()} text-xs uppercase tracking-wide text-gray-600 z-10`}>
          {overlayText}
        </div>
      )}

      {showArrow && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <span 
            className={arrowClass}
            style={{
              fontFamily: '"Helvetica Neue", sans-serif',
              fontSize: '28px',
              fontWeight: 100
            }}
          >→</span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}