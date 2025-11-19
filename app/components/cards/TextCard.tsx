import React from 'react';
import BaseCard from './BaseCard';

interface TextCardProps {
  title?: string;
  subtitle?: string;
  content?: string;
  label?: string;
  badge?: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
  minHeight?: string;
  cardNumber?: number;
  showArrow?: boolean;
  className?: string;
}

export default function TextCard({
  title,
  subtitle,
  content,
  label = 'Studio',
  badge,
  href,
  backgroundColor = 'bg-gray-50',
  textColor = 'text-black',
  minHeight = 'min-h-[200px]',
  cardNumber,
  showArrow = true,
  className = ''
}: TextCardProps) {
  // Check if backgroundColor is a hex color or CSS class
  const isHexColor = backgroundColor.startsWith('#');
  
  // Determine if we need white text for dark backgrounds
  const isDarkBackground = backgroundColor === 'bg-black' || backgroundColor === 'bg-gray-900' || 
                           (isHexColor && backgroundColor === '#000000');
  
  // Auto-adjust text color for dark backgrounds
  const finalTextColor = isDarkBackground ? 'text-white' : textColor;
  
  const cardClasses = `${isHexColor ? '' : backgroundColor} ${finalTextColor} px-4 md:px-6 py-8 md:py-12 pb-24 md:pb-28 flex flex-col justify-center ${minHeight} ${className}`;
  
  // Force inline styles for dark backgrounds to ensure white text
  const cardStyle: React.CSSProperties = isHexColor ? { 
    backgroundColor,
    minHeight: '200px' // Half of CardTitleSubtitle height (400px)
  } : { 
    minHeight: '200px' // Half of CardTitleSubtitle height (400px)
  };
  
  if (isDarkBackground) {
    cardStyle.color = '#ffffff';
  }

  const labelClass = isDarkBackground ? 'prowl-label-white' : 'prowl-label';
  const arrowClass = isDarkBackground ? 'prowl-arrow-white' : 'prowl-arrow';

  return (
    <BaseCard 
      href={href} 
      className={cardClasses}
      style={cardStyle}
      cardNumber={cardNumber}
    >
      {label && (
        <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 ${labelClass}`}>
          {label}
        </div>
      )}
      
      {badge && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 border border-white inline-block px-3 py-1 prowl-label-white rounded-full">
          {badge}
        </div>
      )}

      <div className="flex flex-col justify-center items-center h-full text-center mt-16">
        {title && (
          <h2 className="text-headline mb-2 w-full" style={isDarkBackground ? { color: '#ffffff' } : {}}>
            {title}
          </h2>
        )}
        
        {subtitle && (
          <h3 className="text-headline mb-8 max-w-4xl" style={isDarkBackground ? { color: '#ffffff' } : {}}>
            {subtitle}
          </h3>
        )}
        
        {content && (
          <p className="text-body italic underline max-w-4xl" style={isDarkBackground ? { color: '#ffffff' } : {}}>
            {content}
          </p>
        )}
      </div>

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
    </BaseCard>
  );
}