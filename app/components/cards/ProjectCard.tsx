import React from 'react';
import BaseCard from './BaseCard';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description?: string;
  badge?: string;
  label?: string;
  href?: string;
  backgroundColor?: string;
  cardNumber?: number;
  className?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  badge,
  label,
  href,
  backgroundColor = '#FFFF00',
  cardNumber,
  className = ''
}: ProjectCardProps) {
  const cardClasses = `px-4 md:px-6 py-8 md:py-12 pb-16 md:pb-20 flex flex-col justify-center min-h-[280px] ${className}`;
  const hoverClasses = href ? 'hover:opacity-90 transition-opacity group cursor-pointer' : '';

  return (
    <BaseCard 
      href={href} 
      className={`${cardClasses} ${hoverClasses}`}
      style={{ backgroundColor }}
      cardNumber={cardNumber}
    >
      {badge && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 border border-black inline-block px-3 py-1 prowl-label rounded-full">
          {badge}
        </div>
      )}
      
      {label && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 prowl-label">
          {label}
        </div>
      )}

      <div className="flex flex-col justify-center items-center h-full text-center mt-16">
        <h3 className="text-headline mb-2 text-black w-full">{title}</h3>
        <h4 className="text-headline mb-8 text-black w-full">{subtitle}</h4>
        {description && (
          <p className="text-body italic underline text-black max-w-4xl">
            {description}
          </p>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <span className="prowl-arrow text-black">→</span>
      </div>
    </BaseCard>
  );
} 