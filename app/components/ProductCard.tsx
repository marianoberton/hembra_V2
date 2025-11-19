'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TiendanubeProduct } from '../../types/tiendanube';
import { useCart } from '../context/CartContext';
import { 
  productCardVariants, 
  productImageVariants, 
  productOverlayVariants,
  addToCartButtonVariants,
  transitions,
  viewportSettings 
} from '../../lib/animations';
import { useState, useRef } from 'react';

interface ProductCardProps {
  product: TiendanubeProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Magnetic button effect
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-100, 100], [5, -5]);
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);
  
  const formatPrice = (price: string): string => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const getMainImage = (): string => {
    if (product.images && product.images.length > 0 && !imageError) {
      return product.images[0].src;
    }
    return '/placeholder-product.jpg';
  };

  const getProductName = (): string => {
    if (typeof product.name === 'string') {
      return product.name;
    }
    return product.name?.es || product.name?.en || 'Producto sin nombre';
  };

  // Obtener el primer variant
  const mainVariant = product.variants?.[0];
  const price = mainVariant?.price || '0';
  const promotionalPrice = mainVariant?.promotional_price;
  const hasStockManagement = mainVariant?.stock_management || false;
  const stock = mainVariant?.stock || 0;
  const isInStock = !hasStockManagement || (stock !== null && stock > 0);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInStock || isAdded) return;
    
    addToCart(product, 1);
    setIsAdded(true);
    
    // Reset después de 2 segundos
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const discountPercentage = promotionalPrice && promotionalPrice !== price 
    ? Math.round(((parseFloat(price) - parseFloat(promotionalPrice)) / parseFloat(price)) * 100)
    : null;

  return (
    <motion.div
      variants={productCardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      viewport={viewportSettings}
      className="group relative"
    >
      {/* Product Image Container */}
      <Link href={`/producto/${product.id}`}>
        <div className="relative aspect-square bg-gray-50 overflow-hidden mb-6">
          {/* Image with sophisticated hover effect */}
          <motion.div
            variants={productImageVariants}
            className="relative w-full h-full"
          >
            <Image
              src={getMainImage()}
              alt={getProductName()}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onError={() => setImageError(true)}
            />
          </motion.div>
          
          {/* Premium overlay with add to cart */}
          <motion.div
            variants={productOverlayVariants}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.button
              variants={addToCartButtonVariants}
              onClick={handleAddToCart}
              disabled={!isInStock || isAdded}
              className="bg-white text-black px-8 py-3 text-sm font-medium tracking-wide uppercase hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={transitions.quick}
                  >
                    ✓ Agregado
                  </motion.span>
                ) : !isInStock ? (
                  <motion.span
                    key="outofstock"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Agotado
                  </motion.span>
                ) : (
                  <motion.span
                    key="addtocart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Agregar al carrito
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          {/* Discount badge */}
          <AnimatePresence>
            {discountPercentage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={transitions.smooth}
                className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-medium tracking-wide"
              >
                -{discountPercentage}%
              </motion.div>
            )}
          </AnimatePresence>

          {/* Out of stock overlay */}
          <AnimatePresence>
            {!isInStock && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center"
              >
                <span className="text-gray-500 font-medium text-sm tracking-wide uppercase">
                  Agotado
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* Product Information */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transitions.smooth, delay: 0.1 }}
        className="space-y-3"
      >
        {/* Product Name */}
        <Link href={`/producto/${product.id}`}>
          <motion.h3
            className="text-sm font-medium text-gray-900 leading-tight tracking-wide uppercase hover:text-gray-600 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' }}
            whileHover={{ x: 2 }}
            transition={transitions.quick}
          >
            {getProductName()}
          </motion.h3>
        </Link>

        {/* Pricing */}
        <div className="flex items-baseline space-x-3">
          {promotionalPrice && promotionalPrice !== price ? (
            <>
              <motion.span
                className="text-lg font-semibold text-gray-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={transitions.smooth}
              >
                {formatPrice(promotionalPrice)}
              </motion.span>
              <motion.span
                className="text-sm text-gray-400 line-through"
                style={{ fontFamily: 'Inter, sans-serif' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...transitions.smooth, delay: 0.1 }}
              >
                {formatPrice(price)}
              </motion.span>
            </>
          ) : (
            <motion.span
              className="text-lg font-semibold text-gray-900"
              style={{ fontFamily: 'Inter, sans-serif' }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={transitions.smooth}
            >
              {formatPrice(price)}
            </motion.span>
          )}
        </div>

        {/* Stock indicator (minimal) */}
        <AnimatePresence>
          {hasStockManagement && stock !== null && stock <= 5 && stock > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs text-orange-600 font-medium tracking-wide uppercase"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Solo {stock} disponibles
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
} 