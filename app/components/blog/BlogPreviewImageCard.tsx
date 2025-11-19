import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPreviewImageCardProps {
  title: string;
  subtitle: string;
  description?: string;
  excerpt?: string;
  href: string;
  imageUrl: string;
  imageAlt?: string;
  minHeight?: string;
  showArrow?: boolean;
  className?: string;
  // Blog-specific props
  overlayOpacity?: number; // 0-1, default 0.6
}

export default function BlogPreviewImageCard({
  title,
  subtitle,
  description,
  excerpt,
  href,
  imageUrl,
  imageAlt,
  minHeight = 'min-h-[320px]',
  showArrow = true,
  className = '',
  overlayOpacity = 0.6
}: BlogPreviewImageCardProps) {
  const cardClasses = `relative overflow-hidden flex flex-col justify-between ${minHeight} ${className}`;
  const hoverClasses = 'hover:scale-105 transition-all duration-300 group cursor-pointer hover:shadow-2xl';
  
  const cardStyle: React.CSSProperties = {
    borderRadius: '12px',
    position: 'relative' as const,
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white'
  };

  return (
    <article className={`${cardClasses} ${hoverClasses}`} style={cardStyle}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay for text readability */}
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full p-6 text-white">
        <div className="flex-1 flex flex-col justify-center text-center space-y-4">
          <header>
            <h2 className="card-title-subtitle-main leading-tight mb-2 text-white">
              <Link href={href} className="hover:opacity-80 transition-opacity text-white">
                {title}
                {subtitle && (
                  <>
                    <br />
                    <span className="text-sm opacity-90 text-white">{subtitle}</span>
                  </>
                )}
              </Link>
            </h2>
          </header>
          
          {/* Description/Excerpt */}
          {(description || excerpt) && (
            <div className="card-title-subtitle-description">
              <p className="text-sm text-white opacity-90 line-clamp-3">
                {description || excerpt}
              </p>
            </div>
          )}
        </div>

        {/* Footer with centered arrow */}
        {showArrow && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <Link href={href} className="prowl-arrow group-hover:transform group-hover:translate-x-1 transition-transform" style={{ color: 'white !important' }}>
              →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
} 