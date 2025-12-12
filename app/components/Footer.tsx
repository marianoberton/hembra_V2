'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  // En Home, el footer debe ser blanco para coincidir con el body y navbar.
  // En otras páginas, mantiene el verde de marca (#d0ddc3).
  const bgColor = isHome ? 'bg-white' : 'bg-[#d0ddc3]';

  return (
    // CONTENEDOR FANTASMA (Espacio de scroll)
    // Se le quita clipPath y se asegura que sea transparente.
    // Su única función es decirle al navegador "la página es así de larga"
    <div className="relative h-[80vh] md:h-[60vh] w-full bg-transparent -z-10">
      
      {/* CONTENEDOR FIJO (Contenido Visual) 
          Se pega al fondo de la ventana.
      */}
      <div className={`fixed bottom-0 left-0 w-full h-[80vh] md:h-[60vh] ${bgColor} flex flex-col justify-between`}>
        
        {/* --- Sección Superior --- */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center z-20">
          
          {/* Izquierda: Copyright */}
          <div className="mb-8 md:mb-0">
            <span className="text-[#3D4A3D] text-sm font-medium tracking-wide font-sans">
              © 2025 Hembra Estudio
            </span>
          </div>

          {/* Derecha: Enlaces */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-[#3D4A3D] w-full md:w-auto justify-end">
            
            <div className="flex flex-col items-start md:items-end space-y-3">
              <h3 className="text-xs uppercase tracking-widest opacity-60 mb-1 font-sans">Social</h3>
              <a 
                href="https://www.instagram.com/hembra.estudio/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl font-light hover:opacity-70 transition-opacity font-serif"
              >
                Instagram ↗
              </a>
              <a 
                href="https://www.linkedin.com/company/hembra.estudio&taller/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl font-light hover:opacity-70 transition-opacity font-serif"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="flex flex-col items-start md:items-end space-y-3">
              <h3 className="text-xs uppercase tracking-widest opacity-60 mb-1 font-sans">Contacto</h3>
              <Link 
                href="/contacto" 
                className="text-xl md:text-2xl font-light hover:opacity-70 transition-opacity font-serif"
              >
                hello@hembra.studio
              </Link>
              <span className="text-xl md:text-2xl font-light font-serif opacity-80">
                Buenos Aires, Arg.
              </span>
            </div>

          </div>
        </div>

        {/* --- Logo SVG Gigante --- */}
        <div className="relative w-full h-[40%] md:h-[55%] mb-4 md:mb-0">
          <Image
            src="/hembra.svg"
            alt="HEMBRA"
            fill
            className="object-contain object-bottom opacity-90 select-none pointer-events-none"
            priority
          />
        </div>

      </div>
    </div>
  );
}