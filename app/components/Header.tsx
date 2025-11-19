'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';

function HeaderClient() {
  const { state } = useCart();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Detectar si estamos en la tienda (e-commerce)
  const isEcommerce = pathname?.includes('tienda') || pathname?.includes('carrito') || pathname?.includes('producto');
  
  // Detectar si estamos en home
  const isHome = pathname === '/';
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header 
      className="w-full overflow-hidden" 
      style={{ 
        marginTop: '8px',
        backgroundColor: isHome ? '#ffffff' : '#f2f2f2'
      }}
    >
      <div className="w-full overflow-hidden">
        
        {/* Desktop Layout - PROWL Style with Full Width */}
        <div className="hidden lg:flex items-center justify-between py-3 px-4">
          
          {/* Logo Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <div className="text-white px-12 py-2 rounded-full flex items-center" style={{ backgroundColor: '#969697' }}>
                <span className="text-sm tracking-wide" style={{ fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '400' }}>
                  HEMBRA
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Center */}
          <nav className="flex items-center space-x-2">
            <Link 
              href="/proyectos"
              className={`flex items-center justify-center rounded-full nav-button transition-all duration-200 border ${
                isHome 
                  ? 'bg-[#f2f2f2] border-transparent hover:bg-white hover:border-black' 
                  : 'bg-white border-transparent hover:bg-[#f2f2f2] hover:border-black'
              }`}
              style={{ 
                color: '#000', 
                height: '36px',
                minWidth: '95px',
                padding: '0 42px',
                fontSize: '14px',
                fontFamily: '"Helvetica Neue", sans-serif',
                fontWeight: '400'
              }}
            >
              Proyectos
            </Link>
            <Link 
              href="/estudio"
              className={`flex items-center justify-center rounded-full nav-button transition-all duration-200 border ${
                isHome 
                  ? 'bg-[#f2f2f2] border-transparent hover:bg-white hover:border-black' 
                  : 'bg-white border-transparent hover:bg-[#f2f2f2] hover:border-black'
              }`}
              style={{ 
                color: '#000', 
                height: '36px',
                minWidth: '85px',
                padding: '0 42px',
                fontSize: '14px',
                fontFamily: '"Helvetica Neue", sans-serif',
                fontWeight: '400'
              }}
            >
              Estudio
            </Link>
            <Link 
              href="/servicios"
              className={`flex items-center justify-center rounded-full nav-button transition-all duration-200 border ${
                isHome 
                  ? 'bg-[#f2f2f2] border-transparent hover:bg-white hover:border-black' 
                  : 'bg-white border-transparent hover:bg-[#f2f2f2] hover:border-black'
              }`}
              style={{ 
                color: '#000', 
                height: '36px',
                minWidth: '95px',
                padding: '0 42px',
                fontSize: '14px',
                fontFamily: '"Helvetica Neue", sans-serif',
                fontWeight: '400'
              }}
            >
              Servicios
            </Link>

            <Link 
              href="/contacto"
              className={`flex items-center justify-center rounded-full nav-button transition-all duration-200 border ${
                isHome 
                  ? 'bg-[#f2f2f2] border-transparent hover:bg-white hover:border-black' 
                  : 'bg-white border-transparent hover:bg-[#f2f2f2] hover:border-black'
              }`}
              style={{ 
                color: '#000', 
                height: '36px',
                minWidth: '95px',
                padding: '0 42px',
                fontSize: '14px',
                fontFamily: '"Helvetica Neue", sans-serif',
                fontWeight: '400'
              }}
            >
              Contacto
            </Link>
          </nav>

          {/* Tienda Button Right */}
          <div className="flex items-center">
            <Link 
              href="https://www.hembra.cloudland.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full tienda-button"
              style={{ 
                backgroundColor: '#d0ddc3', 
                color: '#000', 
                height: '36px',
                minWidth: '85px',
                padding: '0 42px',
                fontSize: '14px',
                fontFamily: '"Helvetica Neue", sans-serif',
                fontWeight: '400'
              }}
            >
              <span>Tienda</span>
            </Link>
            
            {/* Cart Button - Only show when in ecommerce context */}
            {isEcommerce && (
              <Link 
                href="/carrito" 
                className="relative px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Carrito
                {state.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex items-center justify-center space-x-2 py-4 px-4 overflow-hidden">
          
          {/* Logo Button */}
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 rounded-full flex items-center justify-center cursor-pointer"
            style={{ 
              backgroundColor: '#969697', 
              color: '#FFF', 
              fontFamily: '"Helvetica Neue", sans-serif',
              height: '36px', 
              fontWeight: '400',
              fontSize: '10px',
              letterSpacing: '0',
              lineHeight: '1.2em',
              textAlign: 'center',
              textTransform: 'none',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '1 1 35%',
              border: 'none'
            }}
          >
            HEMBRA
          </button>
          
          {/* Menu Button */}
          <button 
            className="px-6 py-2 rounded-full"
            style={{ 
              backgroundColor: isHome ? '#f2f2f2' : '#F5F5F5', 
              color: '#000', 
              fontFamily: 'neue-haas-grotesk-text, sans-serif',
              height: '36px', 
              fontWeight: '400',
              fontSize: '10px',
              letterSpacing: '0',
              lineHeight: '1.2em',
              textAlign: 'center',
              textTransform: 'none',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '1 1 35%'
            }}
            onClick={toggleMobileMenu}
          >
            Menu
          </button>
          
          {/* Tienda Button */}
          <Link 
            href="https://www.hembra.cloudland.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full"
            style={{ 
              backgroundColor: '#d0ddc3', 
              color: '#333', 
              fontFamily: '"Helvetica Neue", sans-serif',
              height: '36px', 
              fontWeight: '400',
              fontSize: '10px',
              letterSpacing: '0',
              lineHeight: '1.2em',
              textAlign: 'center',
              textTransform: 'none',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '1 1 30%'
            }}
          >
            Tienda
          </Link>
        </div>

        {/* Mobile Navigation - Centered Menu */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 overflow-hidden"
            style={{
        backgroundColor: isHome ? '#ffffff' : '#f2f2f2'
      }}
          >
            <div className="flex flex-col items-center space-y-4">
              
              {/* Close Button */}
              <button 
                className="px-4 py-2 rounded-full mb-6" 
                style={{ 
                  backgroundColor: isHome ? '#f2f2f2' : '#F5F5F5', 
                  color: '#333333', 
                  fontFamily: 'neue-haas-grotesk-text, sans-serif',
                  fontWeight: '600',
                  fontSize: '16px',
                  letterSpacing: '0em',
                  lineHeight: '102%',
                  textAlign: 'center',
                  textTransform: 'none',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '37px',
                  width: '60px'
                }}
                onClick={closeMobileMenu}
              >
                ✕
              </button>
              
              {/* Navigation Items - Vertical Stack */}
              <nav className="flex flex-col items-center space-y-4">
                <Link 
                  href="/"
                  className="px-8 py-2 rounded-full"
                  style={{ 
                    backgroundColor: isHome ? '#f2f2f2' : '#F5F5F5', 
                    color: '#333333', 
                    fontFamily: 'neue-haas-grotesk-text, sans-serif',
                    fontWeight: '400',
                    fontSize: '10px',
                    letterSpacing: '0em',
                    lineHeight: '102%',
                    textAlign: 'center',
                    textTransform: 'none',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '37px',
                    width: '147px'
                  }}
                  onClick={closeMobileMenu}
                >
                  Inicio
                </Link>
                <Link 
                  href="/proyectos"
                  className="px-8 py-2 rounded-full"
                  style={{ 
                    backgroundColor: isHome ? '#f2f2f2' : '#F5F5F5', 
                    color: '#333333', 
                    fontFamily: 'neue-haas-grotesk-text, sans-serif',
                    fontWeight: '400',
                    fontSize: '10px',
                    letterSpacing: '0em',
                    lineHeight: '102%',
                    textAlign: 'center',
                    textTransform: 'none',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '37px',
                    width: '147px'
                  }}
                  onClick={closeMobileMenu}
                >
                  Proyectos
                </Link>
                <Link 
                  href="/estudio"
                  className="px-8 py-2 rounded-full"
                  style={{ 
                    backgroundColor: isHome ? '#f2f2f2' : '#F5F5F5', 
                    color: '#333333', 
                    fontFamily: 'neue-haas-grotesk-text, sans-serif',
                    fontWeight: '400',
                    fontSize: '10px',
                    letterSpacing: '0em',
                    lineHeight: '102%',
                    textAlign: 'center',
                    textTransform: 'none',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '37px',
                    width: '147px'
                  }}
                  onClick={closeMobileMenu}
                >
                  Estudio
                </Link>
                <Link 
                  href="/servicios"
                  className="px-8 py-2 rounded-full"
                  style={{ 
                    backgroundColor: isHome ? '#f2f2f2' : '#F5F5F5', 
                    color: '#333333', 
                    fontFamily: 'neue-haas-grotesk-text, sans-serif',
                    fontWeight: '400',
                    fontSize: '10px',
                    letterSpacing: '0em',
                    lineHeight: '102%',
                    textAlign: 'center',
                    textTransform: 'none',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '37px',
                    width: '147px'
                  }}
                  onClick={closeMobileMenu}
                >
                  Servicios
                </Link>

                <Link 
                  href="/contacto"
                  className="px-8 py-2 rounded-full"
                  style={{ 
                    backgroundColor: isHome ? '#f2f2f2' : '#F5F5F5', 
                    color: '#333333', 
                    fontFamily: 'neue-haas-grotesk-text, sans-serif',
                    fontWeight: '400',
                    fontSize: '10px',
                    letterSpacing: '0em',
                    lineHeight: '102%',
                    textAlign: 'center',
                    textTransform: 'none',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '37px',
                    width: '147px'
                  }}
                  onClick={closeMobileMenu}
                >
                  Contacto
                </Link>
              </nav>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={
      <header className="w-full bg-white border-b border-gray-100">
        <div className="w-full">
          <div className="flex items-center justify-between py-4 px-8">
            <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="flex space-x-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-20 h-10 bg-gray-200 animate-pulse rounded-full"></div>
              ))}
            </div>
            <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </header>
    }>
      <HeaderClient />
    </Suspense>
  );
}