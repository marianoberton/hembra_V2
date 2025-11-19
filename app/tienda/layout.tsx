import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hembra | Tienda',
  description: 'Productos únicos de diseño regenerativo. Macetas, luminarias, decoración y accesorios creados con materiales upcycled.',
  openGraph: {
    title: 'Hembra | Tienda',
    description: 'Productos únicos de diseño regenerativo',
    images: ['/images/logo.jpg']
  },
};

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}