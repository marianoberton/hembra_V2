'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function DynamicBackground() {
  const pathname = usePathname();

  useEffect(() => {
    // Detectar rutas específicas
    const isHome = pathname === '/';
    const isTienda = pathname?.includes('/tienda') || pathname?.includes('/carrito') || pathname?.includes('/producto');
    
    // Remover todas las clases de fondo previas
    document.documentElement.classList.remove('dynamic-bg-home', 'dynamic-bg-tienda', 'dynamic-bg-other');
    document.body.classList.remove('dynamic-bg-home', 'dynamic-bg-tienda', 'dynamic-bg-other');
    
    // Aplicar estilos directamente con JavaScript y asegurar que se mantengan
    if (isHome) {
      document.documentElement.style.backgroundColor = '#ffffff';
      document.body.style.backgroundColor = '#ffffff';
      document.documentElement.style.setProperty('background-color', '#ffffff', 'important');
      document.body.style.setProperty('background-color', '#ffffff', 'important');
      document.documentElement.classList.add('dynamic-bg-home');
      document.body.classList.add('dynamic-bg-home');
      console.log('✅ DynamicBackground: WHITE for HOME');
    } else if (isTienda) {
      document.documentElement.style.backgroundColor = '#ffffff';
      document.body.style.backgroundColor = '#ffffff';
      document.documentElement.style.setProperty('background-color', '#ffffff', 'important');
      document.body.style.setProperty('background-color', '#ffffff', 'important');
      document.documentElement.classList.add('dynamic-bg-tienda');
      document.body.classList.add('dynamic-bg-tienda');
      console.log('✅ DynamicBackground: WHITE for TIENDA/ECOMMERCE');
    } else {
      document.documentElement.style.backgroundColor = '#f2f2f2';
        document.body.style.backgroundColor = '#f2f2f2';
        document.documentElement.style.setProperty('background-color', '#f2f2f2', 'important');
        document.body.style.setProperty('background-color', '#f2f2f2', 'important');
      document.documentElement.classList.add('dynamic-bg-other');
      document.body.classList.add('dynamic-bg-other');
      console.log('✅ DynamicBackground: #f2f2f2 for route:', pathname);
    }

  }, [pathname]);

  return null;
}