export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  category: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: Date;
  approved: boolean;
  parentId?: string; // Para respuestas
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalComments: number;
  topPosts: {
    id: string;
    title: string;
    views: number;
  }[];
} 