'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoCardProps {
  label?: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
  showArrow?: boolean;
  className?: string;
}

export default function LogoCard({
  label = 'Estudio',
  href,
  backgroundColor = '#f2f2f2',
  textColor = '#333333',
  showArrow = true,
  className = ''
}: LogoCardProps) {
  
  const Wrapper = href ? Link : 'div';

  return (
    <Wrapper
      href={href || ''}
      // Ajustado min-h a 300px para consistencia
      className={`relative w-full h-full min-h-[300px] flex flex-col justify-between p-8 transition-all duration-500 hover:scale-[1.01] cursor-pointer group ${className}`}
      style={{ backgroundColor }}
    >
      {/* Label Superior */}
      <div className="w-full flex justify-center h-5">
        {label && (
          <span 
            className="text-xs opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            style={{ 
              fontFamily: 'Helvetica Neue, sans-serif', 
              color: textColor,
              letterSpacing: '0.05em'
            }}
          >
            {label}
          </span>
        )}
      </div>

      {/* SVG Central */}
      <div className="flex flex-col items-center justify-center flex-grow w-full py-4">
        <div className="w-full max-w-[280px] opacity-90 group-hover:opacity-100 transition-opacity">
          <Image
            src="/hembra_estudio.svg"
            alt="Hembra Estudio"
            width={300}
            height={150}
            className="w-full h-auto object-contain"
            style={{ filter: textColor === '#ffffff' ? 'invert(1)' : 'none' }}
          />
        </div>
      </div>

      {/* Flecha Inferior */}
      <div className="w-full flex justify-center h-6">
        {showArrow && (
          <span 
            className="text-3xl font-light opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
            style={{ color: textColor }}
          >
            →
          </span>
        )}
      </div>
    </Wrapper>
  );
}