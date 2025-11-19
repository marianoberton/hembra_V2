'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { TiendanubeProduct } from '../../types/tiendanube';
import { 
  containerVariants, 
  gridItemVariants, 
  staggeredScrollVariants,
  scrollRevealVariants,
  viewportSettings,
  transitions 
} from '../../lib/animations';

interface ProductGridProps {
  products: TiendanubeProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitions.smooth}
        className="text-center py-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...transitions.smooth, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <svg 
            className="w-10 h-10 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
            />
          </svg>
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.smooth, delay: 0.3 }}
          className="text-xl font-semibold text-gray-900 mb-3 tracking-wide"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          No hay productos disponibles
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.smooth, delay: 0.4 }}
          className="text-gray-600 max-w-sm mx-auto leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Estamos actualizando nuestro catálogo. Vuelve pronto para descubrir nuestras nuevas plantas y accesorios.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggeredScrollVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          variants={gridItemVariants}
          custom={index}
          className="flex"
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
} 