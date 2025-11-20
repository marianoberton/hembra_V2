'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LoaderProps {
  className?: string;
  showText?: boolean;
}

export default function Loader({ className = '', showText = false }: LoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Logo Container con animación de "respiración" (Fade & Scale sutil) */}
      <motion.div
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [0.98, 1.02, 0.98]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-48 h-24 md:w-64 md:h-32"
      >
        <Image
          src="/hembra_estudio.svg"
          alt="Hembra Estudio"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
      
      {/* Barra de progreso minimalista usando el color Accent Oscuro (#3D4A3D) */}
      <div className="mt-8 h-[2px] w-32 bg-[#f2f2f2] overflow-hidden rounded-full relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#3D4A3D] w-full"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        />
      </div>
      
      {/* Texto opcional */}
      {showText && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-[#333333] font-light tracking-widest uppercase"
          style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
        >
          Cargando
        </motion.p>
      )}
    </div>
  );
}