import React from 'react';
import Link from 'next/link';


interface BlogPreviewCardProps {
  title: string;
  subtitle: string;
  description?: string;
  excerpt?: string;
  href: string;
  backgroundColor?: string;
  textColor?: string;
  minHeight?: string;
  showArrow?: boolean;
  className?: string;
}

export default function BlogPreviewCard({
  title,
  subtitle,
  description,
  excerpt,
  href,
  backgroundColor = '#cedbbf',
  textColor = '#3D4A3D',
  minHeight = 'min-h-[320px]',
  showArrow = true,
  className = ''
}: BlogPreviewCardProps) {
  // Check if backgroundColor is a hex color or CSS class
  const isHexColor = backgroundColor.startsWith('#');
  const cardClasses = `${isHexColor ? '' : backgroundColor} flex flex-col justify-between ${minHeight} ${className}`;
  const hoverClasses = 'hover:opacity-90 transition-all duration-300 group cursor-pointer hover:shadow-lg';
  
  const cardStyle: React.CSSProperties = isHexColor ? { 
    backgroundColor, 
    borderRadius: '12px',
    padding: '24px',
    position: 'relative' as const,
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: textColor
  } : { 
    borderRadius: '12px',
    padding: '24px',
    position: 'relative' as const,
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  return (
    <article className={`${cardClasses} ${hoverClasses}`} style={cardStyle}>
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center text-center space-y-4">
        <header>
          <h2 className="card-title-subtitle-main leading-tight mb-2">
            <Link href={href} className="hover:opacity-80 transition-opacity">
              {title}
              {subtitle && (
                <>
                  <br />
                  <span className="text-sm opacity-80">{subtitle}</span>
                </>
              )}
            </Link>
          </h2>
        </header>
        
        {/* Description/Excerpt */}
        {(description || excerpt) && (
          <div className="card-title-subtitle-description">
            <p className="text-sm opacity-80 line-clamp-3">
              {description || excerpt}
            </p>
          </div>
        )}
      </div>

      {/* Footer with centered arrow */}
      {showArrow && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <Link href={href} className="prowl-arrow group-hover:transform group-hover:translate-x-1 transition-transform">
            →
          </Link>
        </div>
      )}
    </article>
  );
} 