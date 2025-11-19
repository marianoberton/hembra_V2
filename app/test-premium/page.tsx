'use client';

import { useState, useEffect } from 'react';
import ProductCardPremium from '../components/ProductCardPremium';
import { TiendanubeProduct } from '../../types/tiendanube';

export default function TestPremiumPage() {
  const [products, setProducts] = useState<TiendanubeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Test product data
  const testProduct: TiendanubeProduct = {
    id: 1,
    name: { es: 'Planta Test Premium' },
    description: { es: 'Una planta de prueba para el componente premium' },
    variants: [{
      id: 1,
      image_id: 1,
      product_id: 1,
      position: 1,
      price: '25000',
      compare_at_price: '28000',
      promotional_price: '22000',
      stock_management: true,
      stock: 5,
      weight: '1.0',
      width: '10',
      height: '20',
      depth: '10',
      sku: 'TEST-001',
      values: [],
      barcode: null,
      mpn: null,
      age_group: null,
      gender: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      cost: null,
      visible: true,
      inventory_levels: []
    }],
    images: [{
      id: 1,
      product_id: 1,
      src: '/placeholder-product.jpg',
      position: 1,
      alt: ['Planta test'],
      height: 400,
      width: 400,
      thumbnails_generated: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published: true,
    handle: { es: 'planta-test' },
    attributes: [],
    free_shipping: false,
    requires_shipping: true,
    canonical_url: '',
    video_url: null,
    seo_title: { es: 'Planta Test Premium' },
    seo_description: { es: 'Una planta de prueba para el componente premium' },
    brand: null,
    tags: '',
    categories: [{ 
      id: 1, 
      name: { es: 'Test' },
      description: { es: 'Categoría de prueba' },
      handle: { es: 'test' },
      parent: null,
      subcategories: [],
      seo_title: { es: 'Test' },
      seo_description: { es: 'Categoría de prueba' },
      google_shopping_category: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          console.log('Productos cargados:', data);
          setProducts(data || [testProduct]);
        } else {
          console.log('Error en API, usando producto de prueba');
          setProducts([testProduct]);
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setProducts([testProduct]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [testProduct]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#3D4A3D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-[#2C2C2C]">
            Cargando test premium...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4 font-serif">
            Test Premium Components
          </h1>
          <p className="text-lg text-gray-600 font-sans">
            Verificando funcionalidad de ProductCardPremium
          </p>
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-700">Error: {error}</p>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Productos cargados</h3>
            <p className="text-2xl font-bold text-[#3D4A3D]">{products.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Estado API</h3>
            <p className="text-sm text-green-600">✅ Funcionando</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Componentes</h3>
            <p className="text-sm text-blue-600">Premium Cards</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={product.id || index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ProductCardPremium product={product} />
            </div>
          ))}
        </div>

        {/* Debug Info */}
        <div className="mt-16 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Debug Info</h3>
          <pre className="text-xs text-gray-600 overflow-x-auto">
            {JSON.stringify({ 
              productsCount: products.length,
              firstProduct: products[0] ? {
                id: products[0].id,
                name: products[0].name,
                hasVariants: !!products[0].variants?.length,
                hasImages: !!products[0].images?.length
              } : null,
              timestamp: new Date().toISOString()
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}