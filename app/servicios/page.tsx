'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

// Datos de servicios
const services = [
  {
    id: 'estrategia',
    title: 'Estrategia Circular',
    description: 'Impulsamos la revalorización de recursos como motor de innovación. Diseñamos estrategias que reducen la dependencia de materiales vírgenes y promueven modelos de producción regenerativos. Acompañamos a empresas, organizaciones e instituciones en la transición hacia sistemas circulares que prolongan la vida útil de los materiales y minimizan el desperdicio desde la raíz.',
    image: '/images/hero1.jpg' //
  },
  {
    id: 'alma',
    title: 'Diseño de Objetos con Alma',
    description: 'Creamos productos sostenibles con historia, emoción y propósito. Cada objeto que diseñamos busca establecer un vínculo genuino entre las personas, los materiales y su entorno. Valoramos la calidad, la durabilidad y el sentido profundo detrás de cada forma. Diseñamos para que cada pieza tenga una vida larga y significativa.',
    image: '/images/hero2.jpg'
  },
  {
    id: 'innovacion',
    title: 'Innovación Sostenible',
    description: 'Integramos creatividad y conocimiento técnico para transformar los desafíos ambientales en soluciones concretas. Aplicamos principios de ecodiseño, biomímesis y biodiseño desde la etapa cero del ciclo de vida, con el objetivo de evitar la generación de residuos y reducir el impacto negativo desde el origen. Diseñar es, para nosotras, una forma de anticipar un futuro mejor.',
    image: '/images/hero3.jpg'
  },
  {
    id: 'prototipado',
    title: 'Prototipado y Desarrollo',
    description: 'Materializamos nuestras ideas —y las de nuestros clientes— a través de representaciones visuales precisas y prototipos físicos. Este proceso permite experimentar el diseño en todas sus dimensiones: forma, función y experiencia. Trabajamos de manera iterativa, cuidando cada etapa del desarrollo para llegar a resultados coherentes y funcionales.',
    image: '/images/10work.avif'
  },
  {
    id: 'produccion',
    title: 'Producción Responsable',
    description: 'Ofrecemos soluciones personalizadas que respetan al planeta y a las personas. Producimos diseños propios y ajenos de forma consciente, priorizando procesos éticos, materiales recuperados y colaboraciones con talleres y cooperativas locales. La producción no es solo un resultado: es una declaración de valores.',
    image: '/images/11work.avif'
  }
];

const ServiceStrip = ({ 
  service, 
  index 
}: { 
  service: typeof services[0], 
  index: number 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsOpen(false);
  };

  const handleClick = () => {
    if (isMobile) setIsOpen(!isOpen);
  };

  return (
    <div 
      className="w-full flex flex-col mb-6 last:mb-0 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* 1. TIRA DE IMAGEN */}
      <div className="relative w-full h-[200px] md:h-[300px] lg:h-[380px] rounded-3xl overflow-hidden cursor-pointer bg-gray-200">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority={index < 2}
        />
        
        {/* Título sobre imagen (visible solo cuando está CERRADO) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-500"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
        >
          <h3 
            className="text-3xl md:text-5xl text-white font-medium text-center px-4 drop-shadow-lg tracking-tight"
            style={{fontFamily: 'Helvetica Neue, sans-serif'}}
          >
            {service.title}
          </h3>
        </motion.div>
      </div>

      {/* 2. CONTENIDO EN EL GAP (Fondo del Body) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="py-12 px-2 md:px-0"> {/* Quitamos padding horizontal extra interno para alinear perfecto con grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
                {/* Columna 1-2: Número (Alineado a la izquierda como en referencia) */}
                <div className="hidden lg:block lg:col-span-2">
                  <span className="text-sm text-[#2C2C2C] font-mono border-b border-gray-300 pb-1 inline-block">
                    0{index + 1}
                  </span>
                </div>

                {/* Columna 3-9: Contenido (Título + Texto) 
                    Esto deja las columnas 10-12 vacías a la derecha, creando el "aire" solicitado */}
                <div className="lg:col-span-7 lg:col-start-3">
                  <motion.h2 
                    className="text-3xl md:text-5xl text-[#2C2C2C] font-normal mb-8 leading-tight"
                    style={{fontFamily: 'Helvetica Neue, sans-serif'}}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {service.title}
                  </motion.h2>
                  
                  <motion.div 
                    className="text-lg md:text-xl text-gray-700 leading-relaxed font-light"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p>{service.description}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      
      {/* Header Section */}
      <section className="w-full px-2 sm:px-4 lg:px-6 py-20 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 w-full">
          <div className="lg:col-span-2">
            <h2 className="text-3xl text-[#2C2C2C] font-normal" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
              Servicios
            </h2>
          </div>

          <div className="lg:col-span-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-[#2C2C2C] leading-[1.05] mb-12 tracking-tight" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
              Soluciones estratégicas para un futuro sostenible.
            </h1>
            <div className="max-w-4xl">
              <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light">
                Acompañamos a organizaciones en cada etapa del proceso, desde la conceptualización estratégica hasta la implementación material, siempre con la regeneración como norte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Services List */}
      <section className="w-full px-2 sm:px-4 lg:px-6 pb-24">
        <div className="flex flex-col gap-2 w-full">
          {services.map((service, index) => (
            <ServiceStrip
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}