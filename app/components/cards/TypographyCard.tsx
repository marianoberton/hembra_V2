'use client';

import React from 'react';
import Link from 'next/link';

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
  backgroundColor = '#FFFFFF',
  cardNumber,
  className = '',
  label,
  showArrow = true,
  href
}: TypographyCardProps) {
  
  const Wrapper = href ? Link : 'div';
  
  // Colores de texto según fondo
  const isDarkBackground = backgroundColor === '#3D4A3D' || backgroundColor === '#000000';
  const labelClass = isDarkBackground ? 'prowl-label-white' : 'prowl-label';
  const arrowClass = isDarkBackground ? 'prowl-arrow-white' : 'prowl-arrow';

  return (
    <Wrapper 
      href={href || ''}
      // Ajustado min-h a 300px para consistencia con ThreeDTextCard y LogoCard
      className={`relative w-full h-full min-h-[300px] flex flex-col justify-between p-8 rounded-2xl transition-all duration-500 hover:scale-[1.01] cursor-pointer group ${className}`}
      style={{ backgroundColor }}
    >
      {/* Label Superior */}
      {label && (
        <div className={`w-full flex justify-center h-5 ${labelClass}`}>
          {label}
        </div>
      )}

      {/* Contenido Central */}
      <div className="flex flex-col items-center justify-center text-center w-full flex-grow z-0 px-4">
        {items.map((item, index) => (
          <h2 
            key={index}
            className="leading-tight tracking-tight"
            style={{
              fontFamily: 'Helvetica Neue, sans-serif',
              fontSize: '32px',
              fontWeight: '400',
              color: item.color || (isDarkBackground ? '#ffffff' : '#000000')
            }}
          >
            {item.text}
          </h2>
        ))}
      </div>

      {/* Flecha Inferior */}
      {showArrow && (
        <div className="w-full flex justify-center h-6">
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
    </Wrapper>
  );
}