"use client";

import React from "react";

interface CardServicioProps {
  title: string;
  description: string;
  backgroundColor: string;
  imageSrc: string;
  imageAlt: string;
}

export default function CardServicio({
  title,
  description,
  backgroundColor,
  imageSrc,
  imageAlt
}: CardServicioProps) {
  return (
    <div 
      className="relative w-full h-64 lg:h-72 rounded-xl overflow-hidden group cursor-pointer"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f3f4f6', // Fallback color
        fontFamily: '"Neue Helvetica", "Helvetica Neue", Helvetica, Arial, sans-serif'
      }}
    >
      {/* Overlay - siempre visible en mobile, hover en desktop */}
      <div className="absolute inset-0 bg-black opacity-50 lg:opacity-0 lg:group-hover:opacity-50 transition-opacity duration-300 z-5"></div>
      
      {/* Content - layout diferente para mobile y desktop */}
      <div className="absolute inset-0 z-10 transition-all duration-300">
        {/* Layout Mobile: columna centrada */}
        <div className="flex flex-col items-center justify-center h-full px-4 lg:hidden">
          <div className="text-center mb-4">
            <h2 className="text-3xl text-white font-bold drop-shadow-lg max-w-sm leading-tight" style={{
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
              hyphens: 'none',
              lineHeight: '1.1'
            }}>
              {title}
            </h2>
          </div>
          <div className="text-center max-w-sm">
            <p className="text-white leading-relaxed drop-shadow-md" style={{
              fontSize: '14px',
              lineHeight: '1.4',
              letterSpacing: '-0.01em',
              fontWeight: '400'
            }}>
              {description}
            </p>
          </div>
        </div>

        {/* Layout Desktop: horizontal con hover */}
        <div className="hidden lg:flex items-center justify-start h-full transition-all duration-300 group-hover:justify-between group-hover:px-8">
          {/* Título fijo a la izquierda */}
          <div className="flex-shrink-0 transition-all duration-300">
            <h2 className="text-4xl lg:text-5xl text-white font-bold drop-shadow-lg px-4 max-w-sm lg:max-w-md leading-tight" style={{
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
              hyphens: 'none',
              lineHeight: '1.1'
            }}>
              {title}
            </h2>
          </div>

          {/* Descripción que aparece a la derecha en hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-8 group-hover:translate-x-0 flex-1 max-w-none group-hover:max-w-2xl ml-0 group-hover:ml-8">
            <div className="text-left px-4">
              <p className="text-white leading-relaxed drop-shadow-md" style={{
                fontSize: '16px',
                lineHeight: '1.5',
                letterSpacing: '-0.01em',
                fontWeight: '400'
              }}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}