interface TextBlockProps {
  title: string;
  content: string;
  titleClassName?: string;
  contentClassName?: string;
  showSeparator?: boolean;
}

export default function TextBlock({ 
  title, 
  content, 
  titleClassName = "text-3xl font-light",
  contentClassName = "text-lg leading-relaxed",
  showSeparator = false
}: TextBlockProps) {
  return (
    <div className="space-y-4">
      {showSeparator && (
        <div className="w-full h-px bg-gray-300"></div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <h2 
            className={titleClassName}
            style={{color: '#2C2C2C', fontFamily: 'Helvetica Neue, sans-serif'}}
          >
            {title}
          </h2>
        </div>
        <div className="lg:col-span-3">
          <div className="prose prose-lg max-w-none">
            <p 
              className={contentClassName}
              style={{color: '#2C2C2C', fontFamily: 'Helvetica Neue, sans-serif'}}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}