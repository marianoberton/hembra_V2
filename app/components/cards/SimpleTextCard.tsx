import React from 'react';

interface SimpleTextCardProps {
  title: string;
  content: string;
  minHeight?: string;
  className?: string;
}

export default function SimpleTextCard({
  title,
  content,
  minHeight = 'min-h-[280px]',
  className = ''
}: SimpleTextCardProps) {
  return (
    <div 
      className={`bg-white px-8 md:px-10 py-10 md:py-14 flex flex-col justify-center ${minHeight} rounded-3xl ${className}`}
    >
      <div className="text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 tracking-wide leading-tight" style={{color: '#2D3A2D'}}>
          {title}
        </h2>
        <p className="text-lg md:text-xl leading-relaxed font-normal max-w-2xl mx-auto tracking-wide" style={{color: '#444444', lineHeight: '1.7'}}>
          {content}
        </p>
      </div>
    </div>
  );
} 