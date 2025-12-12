'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function MainShell({ children }: Props) {
  const pathname = usePathname();

  // Color de fondo del contenedor principal según la ruta.
  // Home: usa color principal (#d0ddc3) para continuidad con body/footer.
  // Resto: usa gris claro (#f2f2f2) como superficie de contenido.
  const isHome = pathname === '/';
  const bgClass = isHome ? 'bg-[#d0ddc3]' : 'bg-[#f2f2f2]';

  return (
    <div className={`relative z-10 ${bgClass} shadow-2xl rounded-b-[40px] overflow-hidden pb-4`}>
      {children}
    </div>
  );
}

