"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Helper function to strip HTML tags and return plain text
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

interface ThreeDTextCardProps {
  title?: string;
  subtitle?: string;
  content?: string;
  label?: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
  cardNumber?: number;
  showArrow?: boolean;
  className?: string;
  svgPath?: string; // Nueva prop para mostrar SVG en lugar de texto
  compactText?: boolean; // Nueva prop para cards con texto largo
  cardVariant?: 'card-5' | 'card-20'; // Nueva prop para identificar cards específicas sin mostrar números
}

export default function ThreeDTextCard({
  title,
  subtitle,
  content,
  label = 'Studio',
  href,
  backgroundColor = '#f2f2f2ff', // Nuevo color por defecto
  textColor = '#333333', // Color consistente con otras cards
  cardNumber,
  showArrow = true,
  className = '',
  svgPath, // Nueva prop para SVG
  compactText = false, // Nueva prop para texto compacto
  cardVariant // Nueva prop para identificar cards específicas
}: ThreeDTextCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if backgroundColor is dark to determine text color
  const isDarkBackground = backgroundColor === '#718355' || backgroundColor === '#a8836d' || backgroundColor === '#2c2c2c';
  const finalTextColor = isDarkBackground ? '#ffffff' : textColor;
  const arrowClass = isDarkBackground ? 'prowl-arrow-white' : 'prowl-arrow';
  const labelClass = isDarkBackground ? 'prowl-label-white' : 'prowl-label';

  return (
    <div className="w-full">
      <div 
        className={`relative w-full h-full rounded-3xl overflow-hidden transition-all duration-300 ${
          isHovered ? 'scale-105' : ''
        } cursor-pointer px-4 md:px-6 py-6 md:py-9 pb-16 md:pb-20 flex flex-col justify-center ${className}`}
        style={{
          backgroundColor: backgroundColor,
          color: finalTextColor,
          height: '340px', // Altura fija para todas las pantallas
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Number */}
        {cardNumber && (
          <div className="absolute top-4 right-4 z-30">
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
              {cardNumber}
            </div>
          </div>
        )}

        {/* Label */}
        {label && (
          <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 z-30 ${labelClass}`}>
            {label}
          </div>
        )}

        {/* Content */}
        <div 
          className={`absolute inset-x-0 flex flex-col items-center justify-center text-center overflow-visible ${
            compactText ? 'px-6 py-4' : 'px-4 py-6'
          }`}
          style={{ 
            color: finalTextColor,
            // Mantener el espacio superior para acercar al badge verde
            top: label || cardNumber ? 'clamp(50px, 10vh, 65px)' : 'clamp(35px, 6vh, 45px)',
            // Ajustar bottom para que termine exactamente donde comienza la flecha (32px + padding)
            bottom: showArrow ? '40px' : 'clamp(25px, 4vh, 35px)', // 32px (bottom-8) + 8px padding = 40px
            margin: '0', // Sin margin para que termine exactamente donde comience la flecha
            paddingTop: '5px',
            ...(compactText && {
                // Recalcular maxHeight considerando los nuevos espacios
                maxHeight: (() => {
                  const topSpace = label || cardNumber ? 'clamp(50px, 10vh, 65px)' : 'clamp(35px, 6vh, 45px)';
                  const bottomSpace = showArrow ? '40px' : 'clamp(25px, 4vh, 35px)';
                  return `calc(100% - ${topSpace} - ${bottomSpace})`;
                })(),
                marginTop: label || cardNumber ? 'clamp(50px, 10vh, 65px)' : 'clamp(35px, 6vh, 45px)',
                marginBottom: showArrow ? '40px' : 'clamp(25px, 4vh, 35px)',
            })
          }}
        >
          {svgPath ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-full flex justify-center">
                <Image
                  src="/hembra_estudio.svg"
                  alt="Hembra Estudio"
                  width={300}
                  height={130}
                  className="object-contain"
                  style={{ filter: finalTextColor === '#ffffff' ? 'invert(1)' : 'none' }}
                />
              </div>
            </div>
          ) : (
            <>
              {title && (
                <div 
                  className={`w-full flex items-start justify-center ${
                    cardVariant === 'card-5' ? 'card-5-title' : cardVariant === 'card-20' ? 'card-20-title' : ''
                  }`}
                  style={{ 
                    fontFamily: '"Helvetica Neue", sans-serif',
                    ...(cardVariant !== 'card-5' && cardVariant !== 'card-20' && {
                      fontSize: compactText ? 'clamp(18px, 3vw, 24px)' : 'clamp(20px, 3.4vw, 30px)'
                    }),
                    fontStyle: 'normal',
                    fontWeight: 400, // Asegurar que no sea bold
                    letterSpacing: '0em',
                    lineHeight: (cardVariant === 'card-5' || cardVariant === 'card-20') ? '95%' : (compactText ? '100%' : '105%'), // Línea más compacta para evitar desbordamiento
                    textAlign: 'center' as const,
                    color: '#000000',
                    textDecoration: 'none',
                    textTransform: 'none',
                    backgroundColor: 'transparent',
                    margin: (cardVariant === 'card-5' || cardVariant === 'card-20') ? 'clamp(0.5px, 0.2vw, 1px)' : '2px',
                    paddingLeft: (cardVariant === 'card-5' || cardVariant === 'card-20') ? 'clamp(1px, 0.4vw, 2px)' : '3px',
                    paddingRight: (cardVariant === 'card-5' || cardVariant === 'card-20') ? 'clamp(1px, 0.4vw, 2px)' : '3px',
                    paddingBottom: (cardVariant === 'card-5' || cardVariant === 'card-20') ? 'clamp(1px, 0.4vw, 2px)' : '3px',
                    paddingTop: '0px', // Sin padding superior para que empiece desde arriba
                    boxSizing: 'border-box',
                    overflow: 'visible', // Cambiar a visible para mostrar todo el texto
                    wordWrap: 'break-word', // Permitir que las palabras se rompan
                    hyphens: 'auto', // Activar guiones automáticos
                    minHeight: 'auto', // Altura automática basada en contenido
                    flexShrink: 0, // No permitir que se encoja
                  }}
                >
                  <span dangerouslySetInnerHTML={{ __html: title }} />
                </div>
              )}
              
              {subtitle && (
                <div 
                  className={`${compactText ? 'mb-4 max-w-full' : 'mb-8 max-w-4xl'} overflow-hidden ${
                    cardNumber === 5 ? 'card-5-subtitle' : cardNumber === 20 ? 'card-20-subtitle' : ''
                  }`}
                  style={{ 
                    fontFamily: '"Helvetica Neue", sans-serif',
                    ...(cardNumber !== 5 && cardNumber !== 20 && {
                      fontSize: compactText ? 'clamp(16px, 2.6vw, 20px)' : 'clamp(18px, 3vw, 26px)'
                    }),
                    fontStyle: 'normal',
                    fontWeight: 400,
                    letterSpacing: '0em',
                    lineHeight: compactText ? '105%' : '100%', // Más compacto para evitar desbordamiento
                    textAlign: 'center' as const,
                    color: '#000000',
                    textDecoration: 'none',
                    textTransform: 'none',
                    ...(compactText && {
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical' as const,
                      overflow: 'hidden'
                    })
                  }}
                >
                  <span dangerouslySetInnerHTML={{ __html: subtitle }} />
                </div>
              )}
              
              {content && (
                <p className={`text-body italic underline ${compactText ? 'max-w-full' : 'max-w-4xl'} overflow-hidden ${
                  cardNumber === 5 ? 'card-5-content' : cardNumber === 20 ? 'card-20-content' : ''
                }`} style={{
                  ...(cardNumber !== 5 && cardNumber !== 20 && {
                    fontSize: compactText ? 'clamp(12px, 2vw, 14px)' : 'clamp(14px, 2.4vw, 16px)'
                  }),
                  lineHeight: compactText ? '115%' : '120%', // Más compacto
                  ...(compactText && {
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden'
                  })
                }}>
                  {content}
                </p>
              )}
            </>
          )}
        </div>

        {/* Arrow */}
        {showArrow && (
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center px-2 py-1"
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

        {/* Link overlay */}
        {href && <Link href={href} className="absolute inset-0 z-10" />}
      </div>
    </div>
  );
}