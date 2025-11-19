"use client";

import React from "react";

interface CardServicioV2Props {
  title: string;
  description: string;
  backgroundColor: string;
  imageSrc: string;
  imageAlt: string;
}

export default function CardServicioV2({
  title,
  description,
  backgroundColor,
  imageSrc,
  imageAlt
}: CardServicioV2Props) {
  return (
    <div 
      className="relative w-full h-64 lg:h-72 rounded-xl overflow-hidden group cursor-pointer"
      style={{
        backgroundColor: '#dfe6d4',
        fontFamily: '"Neue Helvetica", "Helvetica Neue", Helvetica, Arial, sans-serif'
      }}
    >
      {/* Content - layout diferente para mobile y desktop */}
      <div className="absolute inset-0 z-10 transition-all duration-300">
        {/* Layout Mobile: columna con imagen arriba */}
        <div className="flex flex-col h-full px-4 lg:hidden">
          {/* Imagen en mobile */}
          <div className="flex-shrink-0 mt-4 mb-3 flex justify-center">
            <div className="w-32 h-24 rounded-lg overflow-hidden">
              <img 
                src={imageSrc} 
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Contenido de texto */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-3">
              <h2 className="text-2xl text-gray-800 font-bold max-w-sm leading-tight mx-auto" style={{
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
                hyphens: 'none',
                lineHeight: '1.1'
              }}>
                {title}
              </h2>
            </div>
            <div className="text-center max-w-sm mx-auto">
              <p className="text-gray-700 leading-relaxed" style={{
                fontSize: '13px',
                lineHeight: '1.4',
                letterSpacing: '-0.01em',
                fontWeight: '400'
              }}>
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Layout Desktop: horizontal con imagen a la derecha */}
        <div className="hidden lg:flex items-center h-full px-6 transition-all duration-300">
          {/* Contenido de texto a la izquierda - más espacio */}
          <div className="flex-1 pr-12 max-w-[55%]">
            <div className="mb-4">
              <h2 className="text-4xl lg:text-5xl text-gray-800 font-bold leading-tight" style={{
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
                hyphens: 'none',
                lineHeight: '1.1'
              }}>
                {title}
              </h2>
            </div>
            
            {/* Descripción visible por defecto en desktop */}
            <div>
              <p className="text-gray-700 leading-relaxed" style={{
                fontSize: '15px',
                lineHeight: '1.5',
                letterSpacing: '-0.01em',
                fontWeight: '400'
              }}>
                {description}
              </p>
            </div>
          </div>

          {/* Imagen a la derecha en desktop - más separada del texto */}
          <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105 w-[40%] -mr-6 ml-4">
            <div className="w-full h-48 lg:h-56 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={imageSrc} 
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}