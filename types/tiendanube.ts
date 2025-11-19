export interface TiendanubeImage {
  id: number;
  product_id: number;
  src: string;
  position: number;
  alt: string[];
  height: number;
  width: number;
  thumbnails_generated: number;
  created_at: string;
  updated_at: string;
}

export interface TiendanubeInventoryLevel {
  id: number;
  variant_id: number;
  location_id: string;
  stock: number | null;
}

export interface TiendanubeVariant {
  id: number;
  image_id: number;
  product_id: number;
  position: number;
  price: string;
  compare_at_price: string;
  promotional_price: string | null;
  stock_management: boolean;
  stock: number | null;
  weight: string;
  width: string;
  height: string;
  depth: string;
  sku: string | null;
  values: Array<any>;
  barcode: string | null;
  mpn: string | null;
  age_group: string | null;
  gender: string | null;
  created_at: string;
  updated_at: string;
  cost: string | null;
  visible: boolean;
  inventory_levels: TiendanubeInventoryLevel[];
}

export interface TiendanubeCategory {
  id: number;
  name: {
    en?: string;
    es?: string;
    pt?: string;
  };
  description: {
    en?: string;
    es?: string;
    pt?: string;
  };
  handle: {
    en?: string;
    es?: string;
    pt?: string;
  };
  parent: number | null;
  subcategories: any[];
  seo_title: {
    en?: string;
    es?: string;
    pt?: string;
  };
  seo_description: {
    en?: string;
    es?: string;
    pt?: string;
  };
  google_shopping_category: string;
  created_at: string;
  updated_at: string;
}

export interface TiendanubeProduct {
  id: number;
  name: {
    en?: string;
    es?: string;
    pt?: string;
  };
  description?: {
    en?: string;
    es?: string;
    pt?: string;
  };
  handle: {
    en?: string;
    es?: string;
    pt?: string;
  };
  attributes: any[];
  published: boolean;
  free_shipping: boolean;
  requires_shipping: boolean;
  canonical_url: string;
  video_url: string | null;
  seo_title: {
    en?: string;
    es?: string;
    pt?: string;
  };
  seo_description: {
    en?: string;
    es?: string;
    pt?: string;
  };
  brand: string | null;
  created_at: string;
  updated_at: string;
  variants: TiendanubeVariant[];
  tags: string;
  images: TiendanubeImage[];
  categories: TiendanubeCategory[];
}

export interface TiendanubeStore {
  name: {
    en?: string;
    es?: string;
    pt?: string;
  };
  domain?: string;
  currency?: string;
}

export interface TiendanubeFetchOptions extends RequestInit {
  headers?: Record<string, string>;
} 