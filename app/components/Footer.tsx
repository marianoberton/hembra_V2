'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const [logoError, setLogoError] = React.useState(false);
  const pathname = usePathname();
  
  // Detectar si estamos en home
  const isHome = pathname === '/';

  return (
    <footer 
      className="py-1 sm:py-2 lg:py-4"
      style={{ backgroundColor: isHome ? '#ffffff' : '#f2f2f2' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Logo Gigante Central - Much larger */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="relative w-full mb-0 h-24 sm:h-32 md:h-40 lg:h-64 xl:h-80">
            {!logoError ? (
              <Image
                src="/hembra.svg"
                alt="Hembra"
                fill
                className="object-contain opacity-90"
                priority
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[12rem] sm:text-[16rem] lg:text-[24rem] xl:text-[30rem] font-bold text-[#3D4A3D] font-serif tracking-wide opacity-15">
                  HEMBRA
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer Navigation */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            {/* Social Links - Left */}
            <div className="flex space-x-3 mb-6 sm:mb-0">
              <a 
                href="https://www.instagram.com/hembra.estudio/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all duration-300 hover:bg-opacity-80 hover:scale-105"
                style={{backgroundColor: '#d0ddc3'}}
                title="Instagram"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black"
                >
                  <path 
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" 
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/hembra.estudio&taller/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all duration-300 hover:bg-opacity-80 hover:scale-105"
                style={{backgroundColor: '#d0ddc3'}}
                title="LinkedIn"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black"
                >
                  <path 
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" 
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>

            {/* CTA - Right - Mismo color que iconos sociales */}
            <div className="flex">
              <Link 
                href="/contacto" 
                className="px-6 py-2 rounded-full text-sm font-normal transition-all duration-300 hover:bg-opacity-80 hover:scale-105"
                style={{backgroundColor: '#d0ddc3', color: '#000'}}
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}