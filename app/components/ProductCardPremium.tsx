'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TiendanubeProduct } from '../../types/tiendanube';
import { useCart } from '../context/CartContext';
import { useState, useRef, useEffect } from 'react';

interface ProductCardPremiumProps {
  product: TiendanubeProduct;
  index?: number;
}

export default function ProductCardPremium({ product, index = 0 }: ProductCardPremiumProps) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Magnetic button effect
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  
  // Color options (simulated - in real implementation would come from product variants)
  const colorOptions = [
    { name: 'Natural', color: '#8B7355', available: true },
    { name: 'Terracota', color: '#CD853F', available: true },
    { name: 'Rosa', color: '#DDA0A0', available: true },
    { name: 'Beige', color: '#F5F5DC', available: true },
    { name: 'Blanco', color: '#FFFFFF', available: false },
    { name: 'Negro', color: '#2C2C2C', available: true },
  ];

  const variant = product.variants?.[0];
  const price = parseFloat(variant?.price || '0');
  const comparePrice = parseFloat(variant?.compare_at_price || '0');
  const promotionalPrice = parseFloat(variant?.promotional_price || '0');
  
  const finalPrice = promotionalPrice > 0 ? promotionalPrice : price;
  const originalPrice = comparePrice > 0 ? comparePrice : (promotionalPrice > 0 ? price : 0);
  const discountPercentage = originalPrice > 0 ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

  // Generate star rating (simulated)
  const rating = 3 + Math.random() * 2; // Random rating between 3-5
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Product images with fallback
  const productImages = product.images?.length > 0 ? product.images : [
    { 
      id: 1, 
      src: '/placeholder-product.jpg', 
      alt: [product.name?.es || 'Producto'],
      product_id: product.id,
      position: 1,
      height: 400,
      width: 400,
      thumbnails_generated: 1,
      created_at: '',
      updated_at: ''
    }
  ];

  // Determine badges
  const isNew = new Date(product.created_at).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000;
  const isLowStock = (variant?.stock || 0) <= 3 && (variant?.stock || 0) > 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100 + index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  const formatPrice = (price: string): string => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const getCurrentImage = (): string => {
    const images = productImages.map(img => img.src);
    return images[currentImageIndex] || images[0];
  };

  const getProductName = (): string => {
    if (typeof product.name === 'string') {
      return product.name;
    }
    return product.name?.es || product.name?.en || 'Producto sin nombre';
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!variant || !variant.stock || variant.stock <= 0 || isAdded) return;
    
    addToCart(product, 1, variant);
    setIsAdded(true);
    
    // Reset después de 3 segundos
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
    
    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (centerX - e.clientX) / 10;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setCurrentImageIndex(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  // Auto cycle through images on hover
  useEffect(() => {
    if (!isHovered) return;
    
    const images = productImages.map(img => img.src);
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isHovered, imageError]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="aspect-square bg-gray-100 animate-pulse rounded-t-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-shimmer"></div>
        </div>
        <div className="p-6 space-y-3">
          <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
          <div className="flex space-x-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-gray-100 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md"
    >
      {/* Heart Icon */}
      <button className="absolute top-3 left-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200">
        <svg className="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col space-y-1">
        {discountPercentage > 0 && (
          <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-sm">
            {discountPercentage}% OFF
          </span>
        )}
        {isNew && (
          <span className="px-2 py-1 bg-emerald-600 text-white text-xs font-bold rounded-sm">
            New
          </span>
        )}
        {isLowStock && (
          <span className="px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded-sm">
            Últimas
          </span>
        )}
      </div>

      <Link href={`/producto/${product.id}`} className="block">
        {/* Image Container */}
        <div 
          className="aspect-square relative overflow-hidden cursor-pointer group/image"
          onClick={productImages.length > 1 ? () => setCurrentImageIndex((prev) => (prev + 1) % productImages.length) : undefined}
        >
          <motion.div
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotateZ: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={getCurrentImage()}
              alt={productImages[currentImageIndex]?.alt?.[0] || getProductName()}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-product.jpg';
              }}
            />
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
            {getProductName()}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < fullStars
                      ? 'text-yellow-400 fill-current'
                      : i === fullStars && hasHalfStar
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mb-3">
            <div className="flex items-center space-x-1.5">
              {colorOptions.slice(0, 6).map((color, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (color.available) setSelectedColor(i);
                  }}
                  disabled={!color.available}
                  className={`w-5 h-5 rounded-full border transition-all duration-200 ${
                    selectedColor === i 
                      ? 'border-gray-400 scale-110' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${
                    !color.available ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                >
                  {!color.available && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-0.5 h-full bg-gray-400 rotate-45"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold text-gray-900">
                {formatPrice(finalPrice.toString())}
              </span>
              {originalPrice > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(originalPrice.toString())}
                </span>
              )}
            </div>

            {/* Stock Status */}
            {variant?.stock_management && (
              <div className="text-xs text-right">
                {(variant?.stock || 0) > 0 ? (
                  isLowStock ? (
                    <span className="text-orange-600 font-medium">Últimas {variant.stock}</span>
                  ) : (
                    <span className="text-emerald-600">En stock</span>
                  )
                ) : (
                  <span className="text-red-600">Sin stock</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 