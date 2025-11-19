interface TitleDescriptionProps {
  title: string;
  description: string;
}

export default function TitleDescription({ title, description }: TitleDescriptionProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl lg:text-5xl font-light" style={{color: '#2C2C2C', fontFamily: 'Helvetica Neue, sans-serif'}}>
        {title}
      </h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed" style={{color: '#2C2C2C', fontFamily: 'Helvetica Neue, sans-serif'}}>
          {description}
        </p>
      </div>
    </div>
  );
}