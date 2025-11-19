'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { proyectos } from '../../../data/proyectos';
import { Proyecto } from '../../../types/proyectos';
import TextBlock from '../../components/ui/TextBlock';
import TitleDescription from '../../components/ui/TitleDescription';
import Footer from '../../components/Footer';

export default function ProyectoDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const proyectoId = params.id as string;
  
  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const foundProyecto = proyectos.find(p => p.id === proyectoId);
    if (foundProyecto) {
      setProyecto(foundProyecto);
    }
    setLoading(false);
  }, [proyectoId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#f2f2f2'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3D4A3D] mx-auto mb-4"></div>
          <h2 className="text-xl font-medium" style={{color: '#2C2C2C', fontFamily: 'Helvetica Neue, sans-serif'}}>Cargando proyecto...</h2>
        </div>
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#f2f2f2'}}>
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4" style={{color: '#3D4A3D', fontFamily: 'Helvetica Neue, sans-serif'}}>Proyecto no encontrado</h1>
          <Link 
            href="/proyectos"
            className="text-lg hover:underline"
            style={{color: '#2C2C2C', fontFamily: 'Helvetica Neue, sans-serif'}}
          >
            ← Volver a Proyectos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f2f2f2'}}>
      {/* Navigation Bar */}
      <div className="w-full border-b border-gray-200" style={{backgroundColor: '#f2f2f2'}}>
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <Link 
            href="/proyectos"
            className="text-sm font-medium tracking-wide hover:underline"
            style={{color: '#2C2C2C', fontFamily: 'Helvetica Neue, sans-serif'}}
          >
            ← Proyectos
          </Link>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="w-full px-2 sm:px-4 lg:px-6">
        
        {/* Sección 1: Proyecto (Introducción) */}
        <section className="pt-1 sm:pt-2 lg:pt-3 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Columna Izquierda - 60% (3/5) */}
            <div className="lg:col-span-3">
              <TitleDescription 
                title={proyecto.title}
                description={proyecto.description}
              />
            </div>
            
            {/* Columna Derecha - 40% (2/5) */}
            <div className="lg:col-span-2">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={proyecto.image}
                  alt={proyecto.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección 2: Galería de Estilo de Vida */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-2 lg:gap-3">
            {/* Columna Izquierda - 50% */}
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={proyecto.gallery[1] || proyecto.image}
                alt={`${proyecto.title} - Ambiente 1`}
                fill
                className="object-contain bg-gray-50"
              />
            </div>
          </div>
            
            {/* Columna Derecha - 50% */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={proyecto.gallery[2] || proyecto.image}
                alt={`${proyecto.title} - Con flores`}
                fill
                className="object-contain bg-gray-50"
              />
            </div>
          </div>
        </section>

        {/* Sección 3: Proceso de Elaboración */}
        <section className="pt-1 sm:pt-2 lg:pt-3 space-y-1 sm:space-y-2 lg:space-y-3">
          {/* Bloque 1: Título y Descripción del Proceso */}
          <TextBlock 
            title="Proceso"
            content={proyecto.process[0]}
            showSeparator={true}
          />

          {/* Bloque 2: Imagen del Taller */}
          <div className="w-full">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={proyecto.gallery[3] || proyecto.image}
                alt={`${proyecto.title} - Proceso de elaboración`}
                fill
                className="object-contain bg-gray-50"
              />
            </div>
          </div>

          {/* Bloque 3: Imagen de Materiales */}
          <div className="w-full">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={proyecto.gallery[4] || proyecto.image}
                alt={`${proyecto.title} - Materiales utilizados`}
                fill
                className="object-contain bg-gray-50"
              />
            </div>
          </div>
        </section>

        {/* Sección 4: Vista y Detalle del Diseño */}
        <section className="pt-1 sm:pt-2 lg:pt-3 space-y-1 sm:space-y-2 lg:space-y-3">
          {/* Bloque 1: Título y Concepto de Diseño */}
          <TextBlock 
            title="Diseño con Propósito"
            content={proyecto.impact.economic}
            showSeparator={true}
          />

          {/* Bloque 2: Imágenes de Producto en Detalle */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-2 lg:gap-3">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={proyecto.gallery[5] || proyecto.image}
                alt={`${proyecto.title} - Detalle`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={proyecto.gallery[6] || proyecto.image}
                alt={`${proyecto.title} - Proceso`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Sección 5: Nuestra Red de Colaboradores */}
        <section className="pt-1 sm:pt-2 lg:pt-3 space-y-1 sm:space-y-2 lg:space-y-3">
          {/* Bloque 1: Título y Descripción de la Colaboración */}
          <TextBlock 
            title="Herencia Artesanal"
            content={proyecto.impact.social}
            showSeparator={true}
          />

          {/* Bloque 2: Imagen Contextual de la Comunidad */}
          <div className="w-full">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={proyecto.gallery[7] || proyecto.image}
                alt={`${proyecto.title} - Comunidad`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center py-16 border-t" style={{borderColor: '#CEDBBF'}}>
          <Link 
            href="/proyectos"
            className="flex items-center space-x-3 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            style={{backgroundColor: '#d0ddc3', color: '#000', fontFamily: 'Helvetica Neue, sans-serif'}}
          >
            <span>←</span>
            <span>Ver Todos los Proyectos</span>
          </Link>

          <div className="flex space-x-6">
            {/* Proyecto anterior */}
            {proyectos.findIndex(p => p.id === proyectoId) > 0 && (
              <Link 
                href={`/proyectos/${proyectos[proyectos.findIndex(p => p.id === proyectoId) - 1].id}`}
                className="px-6 py-3 rounded-full transition-colors hover:underline"
                style={{color: '#7C8E60', fontFamily: 'Helvetica Neue LT Pro'}}
              >
                ← Anterior
              </Link>
            )}
            
            {/* Proyecto siguiente */}
            {proyectos.findIndex(p => p.id === proyectoId) < proyectos.length - 1 && (
              <Link 
                href={`/proyectos/${proyectos[proyectos.findIndex(p => p.id === proyectoId) + 1].id}`}
                className="px-6 py-3 rounded-full transition-colors hover:underline"
                style={{color: '#7C8E60', fontFamily: 'Helvetica Neue, sans-serif'}}
              >
                Siguiente →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer con logo gigante */}
      <Footer />
    </div>
  );
}