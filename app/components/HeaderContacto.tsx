import React from 'react';

export default function HeaderContacto() {
  // Using the same color as Tienda button from Header.tsx
  const backgroundColor = '#d0ddc3';
  
  // Header styling with consistent padding, height and rounded corners like TypographyCard
  const headerClasses = `p-4 md:p-6 pb-16 flex flex-col justify-center rounded-xl overflow-hidden`;
  
  const headerStyle: React.CSSProperties = {
    minHeight: '200px',
    position: 'relative',
    backgroundColor,
    color: '#000000' // Dark text for the light green background
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-4">
      <div className="w-full">
        <div 
          className={headerClasses}
          style={headerStyle}
        >
          {/* Main content area with consistent spacing like TypographyCard */}
          <div className="space-y-2 text-center mt-4 mb-2">
            <div 
              className="font-light"
              style={{
                fontSize: '48px',
                color: '#2C2C2C',
                fontFamily: '"Helvetica Neue", sans-serif',
                lineHeight: '1.1'
              }}
            >
              Contacto
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}