import React from 'react';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  spacing?: 'small' | 'medium' | 'large';
  layout?: 'default' | 'two-column';
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  className = '',
  titleClassName = '',
  contentClassName = '',
  spacing = 'medium',
  layout = 'default'
}) => {
  const spacingClasses = {
    small: 'mb-8',
    medium: 'mb-16',
    large: 'mb-24'
  };

  if (layout === 'two-column') {
    return (
      <section className={`${spacingClasses[spacing]} ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {title && (
            <div className="lg:col-span-3">
              <h2 
                className={`text-black ${titleClassName}`}
                style={{
                  fontFamily: 'Helvetica Neue LT Pro, var(--font-helvetica)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '36px',
                  lineHeight: '37px'
                }}
              >
                {title}
              </h2>
            </div>
          )}
          <div className={`lg:col-span-8 lg:col-start-5 ${contentClassName}`}>
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${spacingClasses[spacing]} ${className}`}>
      {title && (
        <h2 
          className={`text-black mb-6 ${titleClassName}`}
          style={{
            fontFamily: 'Helvetica Neue LT Pro, var(--font-helvetica)',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '36px',
            lineHeight: '37px'
          }}
        >
          {title}
        </h2>
      )}
      <div className={contentClassName}>
        {children}
      </div>
    </section>
  );
};

export default Section;