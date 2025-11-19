'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';
import ProductGridPremium from '../components/ProductGridPremium';
import { TiendanubeProduct } from '../../types/tiendanube';

export default function PremiumDemoPage() {
  const [products, setProducts] = useState<TiendanubeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPremium, setShowPremium] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data || []);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 1, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-12 h-12 border-2 border-[#3D4A3D] border-t-transparent rounded-full mx-auto mb-6"
          ></motion.div>
          <h2 className="text-xl font-serif text-[#2C2C2C] mb-2">
            Cargando demostración premium
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#3D4A3D] to-[#2C2C2C] text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 font-serif"
          >
            Hembra V2.0
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-sans"
          >
            Experiencia Premium de E-commerce con Animaciones Sofisticadas
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => setShowPremium(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 text-lg font-medium transition-all font-sans tracking-wide uppercase ${
                showPremium 
                  ? 'bg-white text-[#2C2C2C] shadow-lg' 
                  : 'border-2 border-white text-white hover:bg-white hover:text-[#2C2C2C]'
              }`}
            >
              V2.0 Premium
            </motion.button>
            
            <motion.button
              onClick={() => setShowPremium(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 text-lg font-medium transition-all font-sans tracking-wide uppercase ${
                !showPremium 
                  ? 'bg-white text-[#2C2C2C] shadow-lg' 
                  : 'border-2 border-white text-white hover:bg-white hover:text-[#2C2C2C]'
              }`}
            >
              V1.0 Original
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Comparison Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Features Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-8 font-serif">
              {showPremium ? 'V2.0 Premium Features' : 'V1.0 Original Features'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {showPremium ? (
                // Premium Features
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🖼️</span>
                    </div>
                    <h3 className="font-semibold mb-2 font-sans">Cross-fade Gallery</h3>
                    <p className="text-sm text-gray-600 font-sans">Múltiples imágenes con transiciones suaves</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="font-semibold mb-2 font-sans">Magnetic Effects</h3>
                    <p className="text-sm text-gray-600 font-sans">Botones que siguen el cursor</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏷️</span>
                    </div>
                    <h3 className="font-semibold mb-2 font-sans">Smart Badges</h3>
                    <p className="text-sm text-gray-600 font-sans">Badges dinámicos contextuales</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <h3 className="font-semibold mb-2 font-sans">Skeleton Loading</h3>
                    <p className="text-sm text-gray-600 font-sans">Estados de carga elegantes</p>
                  </motion.div>
                </>
              ) : (
                // Original Features
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🖼️</span>
                    </div>
                    <h3 className="font-semibold mb-2 font-sans">Imagen Simple</h3>
                    <p className="text-sm text-gray-600 font-sans">Una imagen por producto</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔲</span>
                    </div>
                    <h3 className="font-semibold mb-2 font-sans">Hover Básico</h3>
                    <p className="text-sm text-gray-600 font-sans">Efectos de hover simples</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏷️</span>
                    </div>
                    <h3 className="font-semibold mb-2 font-sans">Badges Estáticos</h3>
                    <p className="text-sm text-gray-600 font-sans">Solo descuentos básicos</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <h3 className="font-semibold mb-2 font-sans">Loading Simple</h3>
                    <p className="text-sm text-gray-600 font-sans">Spinner básico</p>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>

          {/* Product Grid Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-[#2C2C2C] mb-8 text-center font-serif">
              {showPremium ? 'Producto Cards Premium' : 'Producto Cards Original'}
            </h3>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={showPremium ? 'premium' : 'original'}
                initial={{ opacity: 0, x: showPremium ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: showPremium ? -50 : 50 }}
                transition={{ duration: 0.5 }}
              >
                {showPremium ? (
                  <ProductGridPremium products={products} />
                ) : (
                  <ProductGrid products={products} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-white py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-[#2C2C2C] mb-6 font-serif"
          >
            ¿Listo para la experiencia premium?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-10 font-sans"
          >
            Descubre cómo las animaciones sofisticadas transforman la experiencia de compra
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.a
              href="/tienda"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(61, 74, 61, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-[#3D4A3D] text-white px-12 py-4 text-lg font-medium transition-all font-sans tracking-wide uppercase shadow-lg hover:bg-[#2C2C2C]"
            >
              Explorar Tienda Premium
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
} 