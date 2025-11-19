import React from 'react';

interface ProjectHeaderProps {
  title: string;
  subtitle: string;
  backgroundColor?: string;
  className?: string;
}

export default function ProjectHeader({
  title,
  subtitle,
  backgroundColor = '#d0ddc3',
  className = ''
}: ProjectHeaderProps) {
  // Check if backgroundColor is a hex color or CSS class
  const isHexColor = backgroundColor.startsWith('#');
  
  // Determine if we need white text for dark backgrounds
  const isDarkBackground = backgroundColor === 'bg-black' || 
                           backgroundColor === 'bg-gray-900' || 
                           backgroundColor === 'bg-slate-900' ||
                           (isHexColor && (
                             backgroundColor === '#000000' ||
                             backgroundColor.toLowerCase() === '#000'
                           ));

  // Header styling with consistent padding, height and rounded corners like TypographyCard
  const headerClasses = `${isHexColor ? '' : backgroundColor} p-4 md:p-6 pb-16 flex flex-col justify-center rounded-xl overflow-hidden ${className}`;
  
  const headerStyle: React.CSSProperties = {
    minHeight: '200px',
    position: 'relative',
    ...(isHexColor && { backgroundColor }),
    ...(isDarkBackground && { color: '#ffffff' })
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-8">
      <div className="w-full">
        <div 
          className={headerClasses}
          style={headerStyle}
        >
          {/* Main content area with consistent spacing like TypographyCard */}
          <div className="space-y-2 text-center mt-8 mb-4">
            <div 
              className="font-light"
              style={{
                fontSize: '48px',
                color: isDarkBackground ? '#ffffff' : '#2C2C2C',
                fontFamily: '"Helvetica Neue", sans-serif',
                lineHeight: '1.1'
              }}
            >
              {title}
            </div>
            <div 
              className="font-light"
              style={{
                fontSize: '32px',
                color: isDarkBackground ? '#ffffff' : '#2C2C2C',
                fontFamily: '"Helvetica Neue", sans-serif',
                lineHeight: '1.2'
              }}
            >
              — {subtitle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}