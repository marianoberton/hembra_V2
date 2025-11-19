'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TiendanubeProduct } from '../../types/tiendanube';

interface ProductDetailProps {
  product: TiendanubeProduct;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const formatPrice = (price: string | number): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(numPrice);
  };

  const getProductName = (): string => {
    if (typeof product.name === 'string') {
      return product.name;
    }
    return product.name?.es || product.name?.en || 'Producto sin nombre';
  };

  const getProductDescription = (): string => {
    if (typeof product.description === 'string') {
      return product.description;
    }
    return product.description?.es || product.description?.en || '';
  };

  const images = product.images || [];
  const mainImage = images.length > 0 ? images[selectedImage].src : '/placeholder-product.jpg';

  // Obtener la primera variante para precios
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.price || '0';
  const promotionalPrice = firstVariant?.promotional_price;
  const stock = firstVariant?.stock || 0;
  const stockManagement = firstVariant?.stock_management || false;
  const sku = firstVariant?.sku;
  const weight = firstVariant?.weight;

  const handleAddToCart = () => {
    // TODO: Implementar lógica del carrito
    console.log('Agregado al carrito:', {
      product: getProductName(),
      quantity: quantity
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Breadcrumb */}
      <div className="px-6 py-4 border-b border-gray-200">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Inicio
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">
                {getProductName()}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          {/* Imagen principal */}
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={mainImage}
              alt={getProductName()}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative bg-gray-100 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={`${getProductName()} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getProductName()}
            </h1>
            
            {/* Precio */}
            <div className="mb-4">
              {promotionalPrice ? (
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-red-600">
                    {formatPrice(promotionalPrice)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(price)}
                  </span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                    ¡Oferta!
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(price)}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              {stockManagement && stock > 0 ? (
                <span className="text-sm font-medium text-green-600">
                  {stock} unidades disponibles
                </span>
              ) : (
                <span className="text-sm font-medium text-red-600">Sin stock</span>
              )}
            </div>
          </div>

          {/* Descripción */}
          {getProductDescription() && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
              <div 
                className="text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: getProductDescription()
                }}
              />
            </div>
          )}

          {/* Selector de cantidad y botón de compra */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                Cantidad:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[...Array(Math.min(10, stock || 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!stockManagement || stock <= 0}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {stockManagement && stock <= 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>
          </div>

          {/* Información adicional */}
          <div className="border-t border-gray-200 pt-6">
            <dl className="space-y-2">
              {product.brand && (
                <div className="flex">
                  <dt className="text-sm font-medium text-gray-500 w-24">Marca:</dt>
                  <dd className="text-sm text-gray-900">{product.brand}</dd>
                </div>
              )}
              {sku && (
                <div className="flex">
                  <dt className="text-sm font-medium text-gray-500 w-24">SKU:</dt>
                  <dd className="text-sm text-gray-900">{sku}</dd>
                </div>
              )}
              {weight && (
                <div className="flex">
                  <dt className="text-sm font-medium text-gray-500 w-24">Peso:</dt>
                  <dd className="text-sm text-gray-900">{weight} kg</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
} 