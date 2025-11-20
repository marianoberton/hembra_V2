"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ThreeDTextCardProps {
  title?: string;
  label?: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
  showArrow?: boolean;
  className?: string;
  svgPath?: string;
  compactText?: boolean;
  cardVariant?: string;
}

export default function ThreeDTextCard({
  title,
  label,
  href,
  backgroundColor = '#f2f2f2',
  textColor = '#333333',
  showArrow = true,
  className = '',
  svgPath,
  compactText = false
}: ThreeDTextCardProps) {
  
  const Wrapper = href ? Link : 'div';

  return (
    <Wrapper
      href={href || ''}
      // Ajustado min-h a 300px.
      className={`relative w-full h-full min-h-[300px] flex flex-col justify-between p-8 rounded-2xl transition-all duration-500 hover:scale-[1.01] cursor-pointer group ${className}`}
      style={{ backgroundColor }}
    >
      {/* Label */}
      <div className="w-full flex justify-center h-5">
        {label && (
          <span 
            className="text-xs tracking-[0.2em] uppercase opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            style={{ fontFamily: 'Helvetica Neue, sans-serif', color: textColor }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col items-center justify-center text-center flex-grow w-full px-4 md:px-8">
        {svgPath ? (
          <div className="w-3/4 max-w-[200px] opacity-90 group-hover:opacity-100 transition-opacity">
            <Image
              src={svgPath}
              alt="Logo"
              width={200}
              height={100}
              className="w-full h-auto object-contain"
              style={{ filter: textColor === '#ffffff' ? 'invert(1)' : 'none' }}
            />
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <h2 
              className="leading-snug tracking-tight"
              style={{ 
                fontFamily: 'Helvetica Neue, sans-serif',
                fontSize: compactText ? '24px' : '32px',
                fontWeight: '400',
                color: textColor
              }}
            >
              {title}
            </h2>
          </div>
        )}
      </div>

      {/* Arrow */}
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