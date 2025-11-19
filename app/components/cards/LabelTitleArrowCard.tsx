import React from 'react';
import BaseCard from './BaseCard';

interface LabelTitleArrowCardProps {
  label: string;
  title: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
  heightPx?: number;
  showArrow?: boolean;
  className?: string;
}

export default function LabelTitleArrowCard({
  label,
  title,
  href,
  backgroundColor = '#F5F5F5',
  textColor = '#000000',
  heightPx = 416.39,
  showArrow = true,
  className = ''
}: LabelTitleArrowCardProps) {
  return (
    <BaseCard
      href={href}
      className={`w-full relative rounded-xl overflow-hidden ${className}`}
      style={{ backgroundColor, color: textColor, height: `${heightPx}px`, borderRadius: '12px' }}
    >
      {/* Badge (label) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-30"
        style={{
          top: '25px',
          fontFamily: '"Helvetica Neue", sans-serif',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '15px',
          lineHeight: '15px',
          color: '#333333',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {label}
      </div>

      {/* Main title, centered */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <h2
          style={{
            fontFamily: '"neue-haas-grotesk-text", sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '45px',
            lineHeight: '95%',
            color: '#000000',
            margin: 0,
            letterSpacing: '-0.01em',
            fontStretch: 'normal',
            textAlign: 'center'
          }}
        >
          {title}
        </h2>
      </div>

      {/* Arrow */}
      {showArrow && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center" style={{ bottom: '25px' }}>
          <span
            style={{
              fontFamily: '"Liberation Sans", sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '36px',
              lineHeight: '37px',
              color: '#000000',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            →
          </span>
        </div>
      )}
    </BaseCard>
  );
}