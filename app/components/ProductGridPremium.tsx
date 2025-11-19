'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ProductCardPremium from './ProductCardPremium';
import { TiendanubeProduct } from '../../types/tiendanube';

interface ProductGridPremiumProps {
  products: TiendanubeProduct[];
}

export default function ProductGridPremium({ products }: ProductGridPremiumProps) {
  if (!products || products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <svg 
            className="w-8 h-8 text-gray-400" 
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
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-lg font-medium text-gray-900 mb-2"
        >
          No hay productos disponibles
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-gray-600 text-sm max-w-sm mx-auto"
        >
          Estamos actualizando nuestro catálogo. Vuelve pronto para descubrir nuestras nuevas piezas.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
    >
      <AnimatePresence>
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              ease: "easeOut"
            }}
          >
            <ProductCardPremium product={product} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
} 