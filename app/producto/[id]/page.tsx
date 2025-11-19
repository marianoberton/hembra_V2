'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TiendanubeProduct } from '../../../types/tiendanube';
import { useCart } from '../../context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<TiendanubeProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        // Primero intentamos obtener todos los productos y buscar el específico
        const response = await fetch('/api/products');
        if (response.ok) {
          const products = await response.json();
          const foundProduct = products.find((p: TiendanubeProduct) => 
            p.id.toString() === productId
          );
          
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError('Producto no encontrado');
          }
        } else {
          setError('Error al cargar el producto');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const formatPrice = (price: string): string => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const getProductName = (): string => {
    if (!product) return '';
    if (typeof product.name === 'string') {
      return product.name;
    }
    return product.name?.es || product.name?.en || 'Producto sin nombre';
  };

  const getProductDescription = (): string => {
    if (!product) return '';
    if (typeof product.description === 'string') {
      return product.description;
    }
    return product.description?.es || product.description?.en || '';
  };

  const getImages = (): string[] => {
    if (!product || !product.images || product.images.length === 0) {
      return ['/placeholder-product.jpg'];
    }
    return product.images.map(img => img.src);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity);
    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const mainVariant = product?.variants?.[0];
  const price = mainVariant?.price || '0';
  const promotionalPrice = mainVariant?.promotional_price;
  const hasStockManagement = mainVariant?.stock_management || false;
  const stock = mainVariant?.stock || 0;
  const isInStock = !hasStockManagement || (stock !== null && stock > 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-2 border-[#3D4A3D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-[#2C2C2C] font-serif">
            Cargando producto...
          </h2>
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="text-6xl mb-6">🌱</div>
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 font-serif">
            Producto no encontrado
          </h2>
          <p className="text-gray-600 mb-8 font-sans">
            {error || 'El producto que buscas no está disponible en este momento.'}
          </p>
          <Link
            href="/tienda"
            className="inline-block bg-[#3D4A3D] text-white px-8 py-3 font-medium transition-colors hover:bg-[#2C2C2C] font-sans tracking-wide uppercase"
          >
            Ver todos los productos
          </Link>
        </motion.div>
      </div>
    );
  }

  const images = getImages();
  const discount = promotionalPrice && promotionalPrice !== price 
    ? Math.round(((parseFloat(price) - parseFloat(promotionalPrice)) / parseFloat(price)) * 100)
    : null;

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8 font-sans"
        >
          <Link href="/" className="hover:text-[#3D4A3D] transition-colors">Inicio</Link>
          <span>•</span>
          <Link href="/tienda" className="hover:text-[#3D4A3D] transition-colors">Tienda</Link>
          <span>•</span>
          <span className="text-[#2C2C2C] font-medium">{getProductName()}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[selectedImageIndex]}
                    alt={getProductName()}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Discount Badge */}
              {discount && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-sm font-bold tracking-wide"
                >
                  -{discount}%
                </motion.div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm border-2 transition-colors ${
                      index === selectedImageIndex 
                        ? 'border-[#3D4A3D]' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${getProductName()} - Imagen ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4 font-serif leading-tight">
                {getProductName()}
              </h1>
              
              <div className="flex items-baseline space-x-4 mb-6">
                {promotionalPrice && promotionalPrice !== price ? (
                  <>
                    <span className="text-3xl font-bold text-[#3D4A3D] font-sans">
                      {formatPrice(promotionalPrice)}
                    </span>
                    <span className="text-xl text-gray-400 line-through font-sans">
                      {formatPrice(price)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-[#2C2C2C] font-sans">
                    {formatPrice(price)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {isInStock ? (
                  <div className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium font-sans">
                      {hasStockManagement && stock <= 5 
                        ? `Solo ${stock} disponibles` 
                        : 'En stock'
                      }
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium font-sans">Agotado</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {getProductDescription() && (
              <div>
                <h3 className="text-lg font-semibold text-[#2C2C2C] mb-3 font-serif">
                  Descripción
                </h3>
                <p className="text-gray-700 leading-relaxed font-sans">
                  {getProductDescription()}
                </p>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-2 font-sans">
                  Cantidad
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-16 h-10 bg-white border border-gray-300 flex items-center justify-center font-medium font-sans">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    disabled={hasStockManagement && quantity >= stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <motion.button
                onClick={handleAddToCart}
                disabled={!isInStock || isAdded}
                whileHover={isInStock && !isAdded ? { scale: 1.02 } : {}}
                whileTap={isInStock && !isAdded ? { scale: 0.98 } : {}}
                className={`w-full py-4 px-8 text-lg font-medium transition-all font-sans tracking-wide uppercase ${
                  isInStock && !isAdded
                    ? 'bg-[#3D4A3D] text-white hover:bg-[#2C2C2C] shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center justify-center"
                    >
                      ✓ Agregado al carrito
                    </motion.span>
                  ) : !isInStock ? (
                    <span>Agotado</span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Agregar al carrito
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600 font-sans">
                  <svg className="w-5 h-5 mr-3 text-[#3D4A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Envío gratis en pedidos superiores a $50.000
                </div>
                <div className="flex items-center text-sm text-gray-600 font-sans">
                  <svg className="w-5 h-5 mr-3 text-[#3D4A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Garantía de plantas sanas
                </div>
                <div className="flex items-center text-sm text-gray-600 font-sans">
                  <svg className="w-5 h-5 mr-3 text-[#3D4A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Guía de cuidados incluida
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 