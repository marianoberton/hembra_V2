export interface Proyecto {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailDescription: string;
  image: string;
  gallery: string[];
  backgroundColor: string;
  category: string;
  year: string;
  collaborators?: string[];
  materials: string[];
  process: string[];
  impact: {
    environmental: string;
    social: string;
    economic: string;
  };
  specifications?: {
    dimensions?: string;
    weight?: string;
    capacity?: string;
    colors?: string[];
  };
  status: 'completed' | 'in-progress' | 'concept';
  featured: boolean;
} 