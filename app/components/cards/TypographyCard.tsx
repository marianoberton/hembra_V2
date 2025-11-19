import React from 'react';
import BaseCard from './BaseCard';

interface TypographyItem {
  text: string;
  className?: string;
  color?: string;
  fontSize?: string;
}

interface TypographyCardProps {
  items: TypographyItem[];
  backgroundColor?: string;
  cardNumber?: number;
  className?: string;
  label?: string;
  showArrow?: boolean;
  href?: string;
}

export default function TypographyCard({
  items,
  backgroundColor = 'bg-white border border-gray-200',
  cardNumber,
  className = '',
  label = 'Work',
  showArrow = true,
  href
}: TypographyCardProps) {
  // Check if backgroundColor is a hex color or CSS class
  const isHexColor = backgroundColor.startsWith('#');
  
  // Determine if we need white text for dark backgrounds
  const isDarkBackground = backgroundColor === 'bg-black' || 
                           backgroundColor === 'bg-gray-900' || 
                           backgroundColor === 'bg-slate-900' ||
                           (isHexColor && (
                             backgroundColor === '#000000' ||
                             backgroundColor.toLowerCase() === '#000'
                           ));

  // Auto-select label and arrow classes based on background
  const labelClass = isDarkBackground ? 'prowl-label-white' : 'prowl-label';
  const arrowClass = isDarkBackground ? 'prowl-arrow-white' : 'prowl-arrow';

  // Card styling with consistent padding and height
  const cardClasses = `${isHexColor ? '' : backgroundColor} p-4 md:p-6 pb-16 flex flex-col justify-center ${className}`;
  
  const cardStyle: React.CSSProperties = {
    minHeight: '200px',
    position: 'relative',
    ...(isHexColor && { backgroundColor }),
    ...(isDarkBackground && { color: '#ffffff' })
  };

  return (
    <BaseCard 
      className={cardClasses}
      style={cardStyle}
      cardNumber={cardNumber}
      href={href}
    >
      {/* Label - positioned with equal distance from top */}
      {label && (
        <div 
          className={`absolute top-6 left-1/2 transform -translate-x-1/2 ${labelClass}`}
          style={{ 
            zIndex: 10
          }}
        >
          {label}
        </div>
      )}

      {/* Main content area - better centering for mobile */}
      <div 
        className="absolute inset-0 flex flex-col justify-center items-center px-4"
        style={{ 
          paddingTop: '50px',
          paddingBottom: '50px',
          zIndex: 1
        }}
      >
        <div className="space-y-1 text-center w-full">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={item.className || 'font-light'}
              style={{
                fontSize: item.fontSize || '32px',
                color: isDarkBackground ? '#ffffff' : (item.color || 'inherit'),
                fontFamily: '"Helvetica Neue", sans-serif',
                lineHeight: '1.2'
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow - positioned with equal distance from bottom */}
      {showArrow && (
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
          style={{ 
            zIndex: 10
          }}
        >
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