import React from 'react';
import BaseCard from './BaseCard';

interface CardTitleSubtitleProps {
  title: string;
  subtitle: string;
  description?: string;
  label?: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
  minHeight?: string;
  cardNumber?: number;
  showArrow?: boolean;
  className?: string;
}

export default function CardTitleSubtitle({
  title,
  subtitle,
  description,
  label,
  href,
  backgroundColor = '#FFFF00',
  textColor = 'text-black',
  minHeight = 'min-h-[280px]',
  cardNumber,
  showArrow = true,
  className = ''
}: CardTitleSubtitleProps) {
  // Check if backgroundColor is a hex color or CSS class
  const isHexColor = backgroundColor.startsWith('#');
  const cardClasses = `${isHexColor ? '' : backgroundColor} ${textColor} flex flex-col justify-center items-center gap-6 ${minHeight} ${className}`;
  const hoverClasses = href ? 'hover:opacity-90 transition-opacity group cursor-pointer' : '';
  const cardStyle: React.CSSProperties = isHexColor ? { 
    backgroundColor, 
    borderRadius: '12px',
    padding: '60px 25px',
    position: 'relative' as const,
    minHeight: '410px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  } : { 
    borderRadius: '12px',
    padding: '60px 25px',
    position: 'relative' as const,
    minHeight: '410px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <BaseCard 
      href={href} 
      className={`${cardClasses} ${hoverClasses}`}
      style={cardStyle}
      cardNumber={cardNumber}
    >
      {label && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 prowl-label">
          {label}
        </div>
      )}

      {/* BLOQUE DE TEXTO COMPLETO CENTRADO */}
      <div className="flex flex-col items-center justify-center text-center" style={{ gap: '20px' }}>
        {/* Title and Subtitle Block - MÁS JUNTOS */}
        <div>
          <h2 className="card-title-subtitle-main leading-tight">
            {title}
            <br />
            {subtitle}
          </h2>
        </div>
        
        {/* Description Block - DOS PÁRRAFOS SEPARADOS como en Framer */}
        {description && (
          <div className="card-title-subtitle-description">
            <p><em>Produced in collaboration with</em></p>
            <p>Barriers to Action</p>
          </div>
        )}
      </div>

      {showArrow && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <span 
            className="prowl-arrow"
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