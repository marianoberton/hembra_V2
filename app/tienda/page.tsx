'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ProductGridPremium from '../components/ProductGridPremium';
import { TiendanubeProduct } from '../../types/tiendanube';

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  image: string;
  products: string;
}

const categories: CategoryInfo[] = [
  {
    id: 'luminarias',
    name: 'Luminarias',
    description: 'Toda la línea Vol. 1 → Vol. 10 (mesa, pie, pared)',
    image: '/images/categoria-luminarias.jpg',
    products: 'Vol. 1 - Vol. 10'
  },
  {
    id: 'macetas',
    name: 'Macetas',
    description: 'De superficie: Betty M, Alicia, Enrica, Enriqueta… Colgantes: Diana, Berta',
    image: '/images/categoria-macetras.jpeg',
    products: 'Betty M, Alicia, Enrica, Diana, Berta'
  },
  {
    id: 'decoracion',
    name: 'Decoración',
    description: 'Floreros & Jarrones: Betty (estándar, mini, triple), Reina, Cris… Bandejas & Platos: Ø 12, Ø 25, Ø 32',
    image: '/images/categoria-decoracion.jpg',
    products: 'Betty, Reina, Cris, Bandejas Ø 12-32'
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    description: 'Muebles ligeros: Mesa Bea, Estante Mabel S/L. Pequeños accesorios: Porta Sahumerio Marga, Luisa + Vela',
    image: '/images/categoria-estantes.jpg',
    products: 'Mesa Bea, Estante Mabel, Marga, Luisa'
  }
];

// Helper functions for TiendaNube data
function getProductName(product: TiendanubeProduct): string {
  if (typeof product.name === 'string') {
    return product.name;
  }
  return product.name?.es || product.name?.en || product.name?.pt || 'Producto';
}

function getProductDescription(product: TiendanubeProduct): string {
  if (typeof product.description === 'string') {
    return product.description;
  }
  return product.description?.es || product.description?.en || product.description?.pt || '';
}

function getProductPrice(product: TiendanubeProduct): number {
  if (product.variants && product.variants.length > 0) {
    const price = parseFloat(product.variants[0].price || '0');
    return price;
  }
  return 0;
}

function TiendaClient() {
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<TiendanubeProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TiendanubeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('newest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFeaturedFirst, setShowFeaturedFirst] = useState(true);
  const [heroImage, setHeroImage] = useState<string>('/images/hero1.jpg'); // Fix hydration issue

  // Fix hydration mismatch - only set random image on client
  useEffect(() => {
    const heroImages = ['/images/hero1.jpg', '/images/hero2.jpg', '/images/hero3.jpg'];
    setHeroImage(heroImages[Math.floor(Math.random() * heroImages.length)]);
  }, []);

  // Get category from URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const categoria = urlParams.get('categoria');
      setSelectedCategory(categoria);
      // If category is selected, don't show featured first
      if (categoria) {
        setShowFeaturedFirst(false);
      }
    }
  }, []);

  const selectedCategoryInfo = selectedCategory 
    ? categories.find(cat => cat.id === selectedCategory)
    : null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory) {
      filtered = products.filter(product => {
        const name = getProductName(product).toLowerCase();
        const description = getProductDescription(product).toLowerCase();
        return name.includes(selectedCategory.toLowerCase()) || 
               description.includes(selectedCategory.toLowerCase());
      });
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const name = getProductName(product).toLowerCase();
        const description = getProductDescription(product).toLowerCase();
        return name.includes(searchTerm.toLowerCase()) || 
               description.includes(searchTerm.toLowerCase());
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return getProductName(a).localeCompare(getProductName(b));
        case 'price':
          return getProductPrice(a) - getProductPrice(b);
        case 'newest':
        default:
          return (new Date(b.created_at || 0)).getTime() - (new Date(a.created_at || 0)).getTime();
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
      {/* Hero Section - Only show if no category selected and featured mode */}
      <AnimatePresence>
        {!selectedCategory && showFeaturedFirst && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-[60vh] flex items-center justify-center overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${heroImage})`,
                filter: 'brightness(0.7)',
              }}
              onError={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = "url('/images/marquesina1.webp')";
              }}
            />
            <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              >
                Regeneramos
                <br />
                <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #718355, #b3c1a2)'}}>
                  Materiales
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl mb-6 font-light leading-relaxed"
              >
                Cada pieza cuenta una historia de transformación
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button 
                  onClick={() => setShowFeaturedFirst(false)}
                  className="px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{
                    backgroundColor: '#718355',
                    color: '#e9f5db'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#7c8e60';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#718355';
                  }}
                >
                  Explorar Colección
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Category Header/Banner - Only when category is selected */}
      <AnimatePresence>
        {selectedCategoryInfo && (
          <motion.section
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="relative h-[40vh] flex items-center justify-center overflow-hidden"
            style={{backgroundColor: '#8e9d75'}}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
              style={{
                backgroundImage: `url(${selectedCategoryInfo.image})`,
              }}
              onError={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = "url('/images/placeholder-hero.jpg')";
              }}
            />
            
            <div className="absolute inset-0" style={{background: 'linear-gradient(to right, rgba(168, 131, 109, 0.7), rgba(139, 157, 117, 0.4), rgba(168, 131, 109, 0.7))'}} />
            
            <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-3"
              >
                <span 
                  className="inline-block px-3 py-1 backdrop-blur-sm rounded-full text-xs font-medium border"
                  style={{
                    backgroundColor: 'rgba(113, 131, 85, 0.2)',
                    color: '#e9f5db',
                    borderColor: 'rgba(179, 193, 162, 0.3)'
                  }}
                >
                  Categoría
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
              >
                {selectedCategoryInfo.name}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto"
                style={{color: '#cedbbf'}}
              >
                {selectedCategoryInfo.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-4 flex items-center justify-center space-x-3 text-xs"
                style={{color: '#cedbbf'}}
              >
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: '#718355'}}></div>
                  <span>{selectedCategoryInfo.products}</span>
                </div>
                <div className="w-px h-3" style={{backgroundColor: '#a8836d'}}></div>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: '#a8836d'}}></div>
                  <span>{filteredProducts.length} productos disponibles</span>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Category Selector - Show only when no category is selected */}
      <AnimatePresence>
        {!selectedCategory && showFeaturedFirst && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="py-12 border-b"
            style={{backgroundColor: '#fefcfb', borderColor: '#cedbbf'}}
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{color: '#718355'}}>
                  Nuestras Líneas de Productos
                </h2>
                <p className="max-w-2xl mx-auto" style={{color: '#a8836d'}}>
                  Cada línea representa años de desarrollo y perfeccionamiento en diseño regenerativo
                </p>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                  <motion.a
                    key={category.id}
                    href={`/tienda?categoria=${category.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative overflow-hidden border transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: '#e9f5db',
                      borderColor: '#cedbbf'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#718355';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#cedbbf';
                    }}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-hero.jpg';
                        }}
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(to top, rgba(168, 131, 109, 0.6), transparent, transparent)'}} />
                      
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                        <p className="text-xs opacity-90 line-clamp-2">{category.products}</p>
                      </div>
                    </div>
                    
                    <div 
                      className="absolute top-3 left-3 text-white px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{backgroundColor: '#718355'}}
                    >
                      Ver línea
                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <div className="backdrop-blur-sm rounded-full p-1.5 shadow-sm" style={{backgroundColor: 'rgba(233, 245, 219, 0.9)'}}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#718355'}}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Main Content with Sidebar Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`fixed left-0 top-0 h-full w-64 border-r transform transition-transform duration-300 z-40 pt-[8.75rem] overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:pt-0 md:h-auto`}
          style={{backgroundColor: '#fefcfb', borderColor: '#cedbbf'}}
        >
          <div className="p-4">
            {/* Close button for mobile */}
            <div className="md:hidden flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold" style={{color: '#718355'}}>Filtros</h2>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded transition-colors"
                style={{color: '#a8836d'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e9f5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{color: '#718355'}}>Buscar productos</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: '#cedbbf',
                    backgroundColor: '#e9f5db',
                    color: '#718355'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#718355';
                    e.target.style.boxShadow = '0 0 0 2px rgba(113, 131, 85, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#cedbbf';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#a8836d'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 border-b pb-2" style={{color: '#718355', borderColor: '#cedbbf'}}>Categorías</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setShowFeaturedFirst(true);
                      window.history.pushState({}, '', '/tienda');
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded transition-colors font-medium"
                    style={{
                      backgroundColor: !selectedCategory ? '#718355' : 'transparent',
                      color: !selectedCategory ? '#e9f5db' : '#a8836d'
                    }}
                    onMouseEnter={(e) => {
                      if (!(!selectedCategory)) {
                        e.currentTarget.style.backgroundColor = '#e9f5db';
                        e.currentTarget.style.color = '#718355';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(!selectedCategory)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#a8836d';
                      }
                    }}
                  >
                    Todas las categorías ({products.length})
                  </button>
                </li>
                {categories.map((category) => {
                  const categoryCount = products.filter(product => {
                    const name = getProductName(product).toLowerCase();
                    const description = getProductDescription(product).toLowerCase();
                    return name.includes(category.id.toLowerCase()) || 
                           description.includes(category.id.toLowerCase());
                  }).length;

                  return (
                    <li key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setShowFeaturedFirst(false);
                          window.history.pushState({}, '', `/tienda?categoria=${category.id}`);
                        }}
                        className="w-full text-left px-3 py-2 text-sm rounded transition-colors font-medium"
                        style={{
                          backgroundColor: selectedCategory === category.id ? '#718355' : 'transparent',
                          color: selectedCategory === category.id ? '#e9f5db' : '#a8836d'
                        }}
                        onMouseEnter={(e) => {
                          if (!(selectedCategory === category.id)) {
                            e.currentTarget.style.backgroundColor = '#e9f5db';
                            e.currentTarget.style.color = '#718355';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!(selectedCategory === category.id)) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#a8836d';
                          }
                        }}
                      >
                        {category.name} ({categoryCount})
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{color: '#718355'}}>Ordenar por</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'newest')}
                className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:outline-none"
                style={{
                  borderColor: '#cedbbf',
                  backgroundColor: '#e9f5db',
                  color: '#718355'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#718355';
                  e.target.style.boxShadow = '0 0 0 2px rgba(113, 131, 85, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cedbbf';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="newest">Más recientes</option>
                <option value="name">Nombre A-Z</option>
                <option value="price">Precio: menor a mayor</option>
              </select>
            </div>

            {/* Filter Summary */}
            <div className="p-3 rounded-md" style={{backgroundColor: '#e9f5db'}}>
              <div className="text-xs mb-1" style={{color: '#a8836d'}}>Resultados</div>
              <div className="text-sm font-medium" style={{color: '#718355'}}>
                {showFeaturedFirst && !selectedCategory ? Math.min(products.length, 8) : filteredProducts.length} productos
              </div>
              {searchTerm && (
                <div className="text-xs mt-1" style={{color: '#a8836d'}}>
                  para &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 md:ml-0">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Mobile filter button and header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden flex items-center px-3 py-2 border rounded-md text-sm font-medium transition-colors"
                  style={{
                    borderColor: '#cedbbf',
                    backgroundColor: '#fefcfb',
                    color: '#718355'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e9f5db';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fefcfb';
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filtros
                </button>
              </div>
              
              <div className="text-sm" style={{color: '#a8836d'}}>
                {showFeaturedFirst && !selectedCategory ? Math.min(products.length, 8) : filteredProducts.length} productos
              </div>
            </div>

            {/* Section Header */}
            {showFeaturedFirst && !selectedCategory && (
              <div style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '8px', margin: '0 -1rem 3rem -1rem'}}>
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{color: '#718355'}}>
                    Productos Destacados
                  </h2>
                  <p className="max-w-2xl mx-auto" style={{color: '#a8836d'}}>
                    Descubre nuestra selección curada de piezas únicas, creadas con pasión por la sostenibilidad
                  </p>
                </div>

                {/* Product Grid - Centered */}
                <div className="flex justify-center">
                  <div className="w-full max-w-6xl">
                    <ProductGridPremium 
                      products={showFeaturedFirst && !selectedCategory ? products.slice(0, 8) : filteredProducts} 
                    />
                  </div>
                </div>

                {/* Show "Ver todos" button when showing featured */}
                {products.length > 8 && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setShowFeaturedFirst(false)}
                      className="px-8 py-3 font-semibold transition-colors duration-300 shadow-sm"
                      style={{
                        backgroundColor: '#718355',
                        color: '#e9f5db'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#7c8e60';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#718355';
                      }}
                    >
                      Ver todos los productos ({products.length})
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Product Grid - Centered (when not showing featured) */}
            {(!showFeaturedFirst || selectedCategory) && (
              <div className="flex justify-center">
                <div className="w-full max-w-6xl">
                  <ProductGridPremium 
                    products={filteredProducts} 
                  />
                </div>
              </div>
            )}

            {/* Empty state */}
            {filteredProducts.length === 0 && !loading && !showFeaturedFirst && (
              <div className="text-center py-16">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#a8836d'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium" style={{color: '#718355'}}>No se encontraron productos</h3>
                <p className="mt-1 text-sm" style={{color: '#a8836d'}}>Intenta ajustar los filtros de búsqueda.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                    setShowFeaturedFirst(true);
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 border-transparent shadow-sm text-sm font-medium rounded-md transition-colors"
                  style={{
                    backgroundColor: '#718355',
                    color: '#e9f5db'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#7c8e60';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#718355';
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            )}

            {/* Category Cards Section - Show when showing featured */}
            {showFeaturedFirst && !selectedCategory && (
              <section className="mt-20">
                <div className="text-center mb-10">
                  <h2 className="text-xl md:text-2xl font-bold mb-2" style={{color: '#718355'}}>
                    También te puede interesar
                  </h2>
                  <p className="text-sm max-w-xl mx-auto" style={{color: '#a8836d'}}>
                    Explora otras líneas de productos con el mismo nivel de calidad y diseño
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  {categories.map((category, index) => (
                    <motion.a
                      key={category.id}
                      href={`/tienda?categoria=${category.id}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group relative overflow-hidden border transition-all duration-300 hover:shadow-md"
                      style={{
                        backgroundColor: '#fefcfb',
                        borderColor: '#cedbbf'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#718355';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#cedbbf';
                      }}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder-hero.jpg';
                          }}
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(to top, rgba(168, 131, 109, 0.4), transparent, transparent)'}} />
                      </div>
                      
                      <div className="p-3">
                        <h3 className="text-sm font-medium mb-1 transition-colors" style={{color: '#718355'}}>
                          {category.name}
                        </h3>
                        <p className="text-xs leading-relaxed line-clamp-2 mb-1" style={{color: '#a8836d'}}>
                          {category.description}
                        </p>
                        <p className="text-xs font-medium" style={{color: '#718355'}}>
                          {category.products}
                        </p>
                      </div>

                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0">
                        <div className="backdrop-blur-sm rounded-full p-1 shadow-sm" style={{backgroundColor: 'rgba(254, 252, 251, 0.9)'}}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#718355'}}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </section>
            )}

            {/* About Section - Show when showing featured */}
            {showFeaturedFirst && !selectedCategory && (
              <section 
                className="mt-20 border p-8 md:p-10 max-w-4xl mx-auto"
                style={{
                  background: 'linear-gradient(to bottom right, #e9f5db, #cedbbf)',
                  borderColor: '#b3c1a2'
                }}
              >
                <div className="text-center">
                  <div className="mb-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: 'rgba(113, 131, 85, 0.1)',
                        color: '#718355',
                        borderColor: '#b3c1a2'
                      }}
                    >
                      Nuestra Filosofía
                    </span>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold mb-4" style={{color: '#718355'}}>
                    Regeneración a través del Diseño
                  </h2>
                  
                  <p className="text-sm leading-relaxed mb-6 max-w-2xl mx-auto" style={{color: '#a8836d'}}>
                    En Hembra creemos que cada material tiene múltiples vidas. A través del upcycling y la regeneración, 
                    transformamos lo descartado en piezas únicas que cuentan historias de renovación y esperanza.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 text-sm font-semibold transition-colors duration-300 shadow-sm"
                    style={{
                      backgroundColor: '#718355',
                      color: '#e9f5db'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#7c8e60';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#718355';
                    }}
                  >
                    Conocé el Taller
                  </motion.button>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function TiendaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Cargando tienda...</h2>
        </div>
      </div>
    }>
      <TiendaClient />
    </Suspense>
  );
}