'use client'; // Convertimos a Client Component para las animaciones

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { proyectos } from '../../data/proyectos';
import Footer from '../components/Footer';

// Variantes de animación para la entrada escalonada
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Retraso entre cada tarjeta
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.04, 0.62, 0.23, 0.98] // Curva suave "Premium"
    }
  }
};

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* Navigation Bar */}
      <div className="w-full border-b border-gray-200 bg-[#f2f2f2]">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <Link 
            href="/"
            className="text-sm font-medium tracking-wide hover:text-[#718355] transition-colors"
            style={{color: '#2C2C2C', fontFamily: 'Helvetica Neue, sans-serif'}}
          >
            ← Inicio
          </Link>
        </div>
      </div>

      <section className="pt-4 lg:pt-8">
        <motion.div 
          className="w-full px-2 sm:px-4 lg:px-6 pb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Mobile: Single column stack */}
          <div className="block lg:hidden space-y-4">
            {proyectos.map((proyecto, index) => (
              <motion.div key={proyecto.id} variants={itemVariants}>
                <Link href={`/proyectos/${proyecto.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-xl bg-white min-h-[400px] sm:min-h-[480px]">
                    <Image
                      src={proyecto.image}
                      alt={proyecto.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 2} // Prioridad a las primeras 2 imágenes
                    />
                    
                    {/* Mobile Overlay (Siempre visible o sutil) */}
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-500 flex flex-col justify-between p-6">
                      <div className="self-center mt-8">
                        <span className="prowl-label-white bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">Proyectos</span>
                      </div>
                      <div className="text-center">
                        <h2 className="text-headline-white drop-shadow-md">{proyecto.title}</h2>
                      </div>
                      <div className="self-center mb-4">
                        <span className="text-white text-3xl font-light">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-4">
            
            {/* LEFT COLUMN */}
            <div className="space-y-4">
              {proyectos.slice(0, 4).map((proyecto, index) => (
                <motion.div key={proyecto.id} variants={itemVariants}>
                  <Link href={`/proyectos/${proyecto.id}`} className="block group">
                    <div className="relative overflow-hidden rounded-xl bg-white h-[32rem] cursor-pointer">
                      <Image
                        src={proyecto.image}
                        alt={proyecto.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority={index < 2} // Prioridad de carga
                      />
                      
                      {/* Label */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 prowl-label-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Proyectos
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h2 className="text-headline-white">{proyecto.title}</h2>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-white text-3xl font-light">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4">
              {/* First 2 standard cards */}
              {proyectos.slice(4, 6).map((proyecto) => (
                <motion.div key={proyecto.id} variants={itemVariants}>
                  <Link href={`/proyectos/${proyecto.id}`} className="block group">
                    <div className="relative overflow-hidden rounded-xl bg-white h-[32rem] cursor-pointer">
                      <Image
                        src={proyecto.image}
                        alt={proyecto.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      
                      {/* Hover Elements (Label, Title, Arrow) */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 prowl-label-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Proyectos
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h2 className="text-headline-white">{proyecto.title}</h2>
                        </div>
                      </div>
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-white text-3xl font-light">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Last card - Double height */}
              {proyectos[6] && (
                <motion.div variants={itemVariants}>
                  <Link href={`/proyectos/${proyectos[6].id}`} className="block group">
                    <div className="relative overflow-hidden rounded-xl bg-white h-[65rem] cursor-pointer"> {/* Ajustado height para alinear con el gap */}
                      <Image
                        src={proyectos[6].image}
                        alt={proyectos[6].title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 prowl-label-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Proyectos
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h2 className="text-headline-white">{proyectos[6].title}</h2>
                        </div>
                      </div>
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-white text-3xl font-light">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

        </motion.div>
      </section>

      <Footer />
    </div>
  );
}