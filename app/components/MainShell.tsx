'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function MainShell({ children }: Props) {
  const pathname = usePathname();

  // Color de fondo del contenedor principal según la ruta.
  // Home: usa color blanco (igual que navbar) según feedback.
  // Resto: usa gris claro (#f2f2f2) como superficie de contenido.
  const isHome = pathname === '/';
  const bgClass = isHome ? 'bg-white' : 'bg-[#f2f2f2]';

  // Sincronizar el color del body para evitar "flashes" de color incorrecto en overscroll
  useEffect(() => {
    if (isHome) {
      document.body.style.backgroundColor = '#ffffff';
    } else {
      // Color por defecto para otras páginas (verde marca)
      document.body.style.backgroundColor = '#d0ddc3';
    }
  }, [isHome]);

  return (
    <div className={`relative z-10 ${bgClass} shadow-2xl rounded-b-[40px] overflow-hidden pb-4`}>
      {children}
    </div>
  );
}

