import { NextResponse } from 'next/server';
import { tiendanubeFetch } from '../../../utils/tiendanube';
import { TiendanubeProduct } from '../../../types/tiendanube';

// Productos de ejemplo apropiados para Hembra mientras se configura la tienda real
const hembraProducts: TiendanubeProduct[] = [
  {
    id: 1,
    name: { es: 'Lámpara Upcycled Roble' },
    description: { 
      es: 'Lámpara artesanal creada a partir de madera de roble recuperada. Cada pieza es única y cuenta una historia de transformación.' 
    },
    handle: { es: 'lampara-upcycled-roble' },
    attributes: [],
    published: true,
    free_shipping: false,
    requires_shipping: true,
    canonical_url: '',
    video_url: null,
    seo_title: { es: 'Lámpara Upcycled de Roble - Hembra Taller' },
    seo_description: { es: 'Lámpara artesanal sostenible de madera recuperada' },
    brand: 'Hembra',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [{
      id: 1,
      image_id: 1,
      product_id: 1,
      position: 1,
      price: '85000',
      compare_at_price: '',
      promotional_price: null,
      stock_management: true,
      stock: 3,
      weight: '2.5',
      width: '25',
      height: '40',
      depth: '25',
      sku: 'HEM-LUP-001',
      values: [],
      barcode: null,
      mpn: null,
      age_group: null,
      gender: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      cost: '45000',
      visible: true,
      inventory_levels: []
    }],
    tags: 'luminarias,upcycled,sostenible,artesanal',
    images: [{
      id: 1,
      product_id: 1,
      src: '/images/categoria-luminarias.jpg',
      position: 1,
      alt: ['Lámpara upcycled de roble'],
      height: 800,
      width: 600,
      thumbnails_generated: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }],
    categories: [{
      id: 1,
      name: { es: 'Colección Luminarias' },
      description: { es: 'Iluminación única y sostenible' },
      handle: { es: 'luminarias' },
      parent: null,
      subcategories: [],
      seo_title: { es: 'Luminarias Sostenibles' },
      seo_description: { es: 'Colección de lámparas upcycled' },
      google_shopping_category: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]
  },
  {
    id: 2,
    name: { es: 'Maceta Terracota Regenerada' },
    description: { 
      es: 'Maceta artesanal creada con técnicas de regeneración. Perfecta para plantas de interior, diseñada con amor y conciencia ambiental.' 
    },
    handle: { es: 'maceta-terracota-regenerada' },
    attributes: [],
    published: true,
    free_shipping: true,
    requires_shipping: true,
    canonical_url: '',
    video_url: null,
    seo_title: { es: 'Maceta Terracota Regenerada - Hembra' },
    seo_description: { es: 'Maceta artesanal sostenible para plantas de interior' },
    brand: 'Hembra',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [{
      id: 2,
      image_id: 2,
      product_id: 2,
      position: 1,
      price: '32000',
      compare_at_price: '35000',
      promotional_price: '28000',
      stock_management: true,
      stock: 8,
      weight: '1.2',
      width: '18',
      height: '20',
      depth: '18',
      sku: 'HEM-MAC-002',
      values: [],
      barcode: null,
      mpn: null,
      age_group: null,
      gender: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      cost: '18000',
      visible: true,
      inventory_levels: []
    }],
    tags: 'macetas,plantas,terracota,sostenible,regenerativo',
    images: [{
      id: 2,
      product_id: 2,
      src: '/images/categoria-macetras.jpeg',
      position: 1,
      alt: ['Maceta de terracota regenerada'],
      height: 800,
      width: 600,
      thumbnails_generated: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }],
    categories: [{
      id: 2,
      name: { es: 'Macetas' },
      description: { es: 'Hogar perfecto para tus plantas' },
      handle: { es: 'macetas' },
      parent: null,
      subcategories: [],
      seo_title: { es: 'Macetas Artesanales' },
      seo_description: { es: 'Macetas sostenibles para el hogar' },
      google_shopping_category: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]
  },
  {
    id: 3,
    name: { es: 'Estante Flotante Recuperado' },
    description: { 
      es: 'Estante minimalista creado a partir de madera recuperada. Diseño limpio y funcional que aporta calidez a cualquier espacio.' 
    },
    handle: { es: 'estante-flotante-recuperado' },
    attributes: [],
    published: true,
    free_shipping: false,
    requires_shipping: true,
    canonical_url: '',
    video_url: null,
    seo_title: { es: 'Estante Flotante Recuperado - Hembra' },
    seo_description: { es: 'Estante minimalista de madera recuperada' },
    brand: 'Hembra',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [{
      id: 3,
      image_id: 3,
      product_id: 3,
      position: 1,
      price: '45000',
      compare_at_price: '',
      promotional_price: null,
      stock_management: true,
      stock: 5,
      weight: '1.8',
      width: '60',
      height: '15',
      depth: '20',
      sku: 'HEM-EST-003',
      values: [],
      barcode: null,
      mpn: null,
      age_group: null,
      gender: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      cost: '25000',
      visible: true,
      inventory_levels: []
    }],
    tags: 'estantes,madera,recuperado,minimalista,funcional',
    images: [{
      id: 3,
      product_id: 3,
      src: '/images/categoria-estantes.jpg',
      position: 1,
      alt: ['Estante flotante de madera recuperada'],
      height: 800,
      width: 600,
      thumbnails_generated: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }],
    categories: [{
      id: 3,
      name: { es: 'Estantes' },
      description: { es: 'Organización con diseño' },
      handle: { es: 'estantes' },
      parent: null,
      subcategories: [],
      seo_title: { es: 'Estantes de Diseño' },
      seo_description: { es: 'Estantes funcionales y estéticos' },
      google_shopping_category: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]
  },
  {
    id: 4,
    name: { es: 'Bandeja Circular Upcycled' },
    description: { 
      es: 'Bandeja decorativa creada a partir de materiales recuperados. Perfecta para presentar con estilo o como elemento decorativo.' 
    },
    handle: { es: 'bandeja-circular-upcycled' },
    attributes: [],
    published: true,
    free_shipping: true,
    requires_shipping: true,
    canonical_url: '',
    video_url: null,
    seo_title: { es: 'Bandeja Circular Upcycled - Hembra' },
    seo_description: { es: 'Bandeja decorativa de materiales recuperados' },
    brand: 'Hembra',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [{
      id: 4,
      image_id: 4,
      product_id: 4,
      position: 1,
      price: '28000',
      compare_at_price: '',
      promotional_price: null,
      stock_management: true,
      stock: 12,
      weight: '0.8',
      width: '30',
      height: '5',
      depth: '30',
      sku: 'HEM-BAN-004',
      values: [],
      barcode: null,
      mpn: null,
      age_group: null,
      gender: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      cost: '15000',
      visible: true,
      inventory_levels: []
    }],
    tags: 'bandejas,upcycled,decorativo,presentacion,circular',
    images: [{
      id: 4,
      product_id: 4,
      src: '/images/categoria-bandejasyplatos.jpg',
      position: 1,
      alt: ['Bandeja circular upcycled'],
      height: 800,
      width: 600,
      thumbnails_generated: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }],
    categories: [{
      id: 4,
      name: { es: 'Bandejas y Platos' },
      description: { es: 'Presentación con estilo' },
      handle: { es: 'bandejas' },
      parent: null,
      subcategories: [],
      seo_title: { es: 'Bandejas Decorativas' },
      seo_description: { es: 'Bandejas y platos de diseño' },
      google_shopping_category: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]
  }
];

// Función para detectar si los productos son inapropiados (demo de ropa)
function areProductsInappropriate(products: TiendanubeProduct[]): boolean {
  if (!products || products.length === 0) return true;
  
  const inappropriateTerms = ['camisa', 'campera', 'pantalon', 'remera', 'jean', 'dress', 'shirt', 'pants'];
  
  return products.some(product => {
    const name = product.name?.es || product.name?.en || '';
    return inappropriateTerms.some(term => 
      name.toLowerCase().includes(term.toLowerCase())
    );
  });
}

export async function GET() {
  try {
    const products = await tiendanubeFetch<TiendanubeProduct[]>('products');
    
    // Si los productos son inapropiados para el negocio, usar los de ejemplo
    if (areProductsInappropriate(products)) {
      console.log('Using Hembra sample products instead of inappropriate demo products');
      return NextResponse.json(hembraProducts);
    }
    
    return NextResponse.json(products || hembraProducts);
  } catch (error) {
    console.error('API Error fetching products, using sample products:', error);
    // En caso de error, usar productos de ejemplo
    return NextResponse.json(hembraProducts);
  }
} 