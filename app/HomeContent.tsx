'use client';

import { motion } from 'framer-motion';
import { TypographyCard } from './components/cards';
import ThreeDTextCard from './components/ui/3d-text-card';
import ImageCardHover from './components/ui/image-card-hover';
import ImageCardHorizontal from './components/ui/image-card-horizontal';
import ImageCardDecorative from './components/ui/image-card-decorative';
import LogoCard from './components/cards/LogoCard';
import Footer from './components/Footer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }
  }
};

const cardWrapperClass = "relative rounded-2xl hover:z-50 transition-all duration-300";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      
      <motion.div 
        className="w-full px-2 sm:px-4 lg:px-4 pb-12 pt-4"
        style={{ paddingTop: '20px' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 max-w-none auto-rows-fr">
          
          {/* COLUMN 1 */}
          <div className="flex flex-col gap-2">
            {/* 1. Logo Card - Altura estándar 300px */}
            <motion.div variants={itemVariants} className={cardWrapperClass}>
              <LogoCard
                label="Estudio"
                backgroundColor="#f2f2f2"
                textColor="#333333"
                href="/estudio"
                className="rounded-2xl"
              />
            </motion.div>

            {/* 2. Florero Betty */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} overflow-hidden rounded-2xl`}>
              <ImageCardHover
                src="/images/1. Florero Betty/Copia de Betty Vase Colours.jpg"
                alt="Florero Betty"
                title="Florero Betty"
                label="Proyectos"
                href="/proyectos/florero-betty?from=home"
                showArrow={true}
              />
            </motion.div>

            {/* 3. Estrategia Circular */}
            <motion.div variants={itemVariants} className={cardWrapperClass}>
              <TypographyCard
                items={[{ text: "Estrategia Circular", color: "#000000" }]}
                label="Servicios"
                backgroundColor="#dfe6d4ff"
                showArrow={true}
                href="/servicios"
                className="rounded-2xl"
              />
            </motion.div>

            {/* 5. Sustainability Statement - Altura estándar 300px */}
            <motion.div variants={itemVariants} className={cardWrapperClass}>
              <ThreeDTextCard
                label="Estudio"
                title="Creamos proyectos con un profundo enfoque en la sustentabilidad, ofreciendo soluciones estratégicas, creativas e innovadoras"
                backgroundColor="#f2f2f2"
                textColor="#333333"
                showArrow={true}
                href="/estudio"
                compactText={false}
                cardVariant="card-5"
                className="rounded-2xl"
              />
            </motion.div>

            {/* 6. Línea de Complementos */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} overflow-hidden rounded-2xl`}>
              <ImageCardHorizontal
                src="/images/linea-complementos-chapa.jpeg"
                alt="Línea de Complementos"
                title="Línea de Complementos"
                label="Proyectos"
                href="/proyectos/linea-complementos-chapa?from=home"
                showArrow={true}
              />
            </motion.div>

            {/* 7. Prototipado */}
            <motion.div variants={itemVariants} className={cardWrapperClass}>
              <TypographyCard
                items={[{ text: "Prototipado y Desarrollo", color: "#000000" }]}
                label="Servicios"
                backgroundColor="#d0ddc3ff"
                showArrow={true}
                href="/servicios"
                className="rounded-2xl"
              />
            </motion.div>

            {/* 8. Cooperativa Superarte */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} overflow-hidden rounded-2xl`}>
              <ImageCardHorizontal
                src="/images/cooperativa-superarte.JPG"
                alt="Cooperativa Superarte"
                title="Cooperativa Superarte"
                label="Proyectos"
                href="/proyectos/cooperativa-superarte?from=home"
                showArrow={true}
              />
            </motion.div>
          </div>

          {/* COLUMN 2 */}
          <div className="flex flex-col gap-2">
            {/* 9. Upcycled Luminarias */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} overflow-hidden rounded-2xl`}>
              <ImageCardHover
                src="/images/upcycled-luminarias.JPG"
                alt="Upcycled Luminarias"
                title="Upcycled Luminarias"
                label="Proyectos"
                href="/proyectos/upcycled-luminarias?from=home"
                showArrow={true}
              />
            </motion.div>

            {/* 10. Innovación Sostenible */}
            <motion.div variants={itemVariants} className={cardWrapperClass}>
              <TypographyCard
                items={[{ text: "Innovación Sostenible", color: "#000000" }]}
                label="Servicios"
                backgroundColor="#dfe6d4ff"
                showArrow={true}
                href="/servicios"
                className="rounded-2xl"
              />
            </motion.div>

            {/* 11. Decorativa 1 */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} overflow-hidden rounded-2xl`}>
              <ImageCardDecorative
                src="/images/ilustracion.jpg"
                alt="Decorativa"
              />
            </motion.div>

            {/* 12. Decorativa 2 */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} overflow-hidden rounded-2xl`}>
              <ImageCardDecorative
                src="/11.jpeg"
                alt="Imagen decorativa"
              />
            </motion.div>

            {/* 13. Mesa Bea */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} overflow-hidden rounded-2xl`}>
              <ImageCardHover
                src="/images/mesa-bea.jpg"
                alt="Mesa Bea"
                title="Mesa Bea"
                label="Proyectos"
                href="/proyectos/mesa-bea?from=home"
                showArrow={true}
              />
            </motion.div>
          </div>

          {/* COLUMN 3 */}
          <div className="flex flex-col gap-2">
            {/* 16. Diseño de Objetos */}
            <motion.div variants={itemVariants} className={cardWrapperClass}>
              <TypographyCard
                items={[{ text: "Diseño de Objetos con Alma", color: "#000000" }]}
                label="Servicios"
                backgroundColor="#d0ddc3ff"
                showArrow={true}
                href="/servicios"
                className="rounded-2xl"
              />
            </motion.div>

            {/* 17. RECAP */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} overflow-hidden rounded-2xl`}>
              <ImageCardHorizontal
                src="/images/recap.jpg"
                alt="RECAP"
                title="RECAP"
                label="Proyectos"
                href="/proyectos/recap?from=home"
                showArrow={true}
              />
            </motion.div>

            {/* 18. Orne Project */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} overflow-hidden rounded-2xl`}>
              <ImageCardHover
                src="/images/orne.JPG"
                alt="Orne"
                title="Estudio"
                label="Estudio"
                href="/estudio"
                showArrow={true}
              />
            </motion.div>

            {/* 19. VIDEO CENTRAL */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} hidden lg:block overflow-hidden rounded-2xl min-h-[360px]`}>
              <div className="absolute inset-0">
                <video
                  src="/19.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {/* Mobile alternative for video */}
            <motion.div variants={itemVariants} className="block lg:hidden rounded-2xl overflow-hidden">
               <ImageCardHover
                src="/images/cooperativa-superarte.JPG"
                alt="Cooperativa Superarte"
                title="Cooperativa Superarte"
                label="Proyectos"
                href="/proyectos/cooperativa-superarte?from=home"
                showArrow={true}
              />
            </motion.div>

            {/* 21. Línea Vasos */}
            <motion.div variants={itemVariants} className={`${cardWrapperClass} overflow-hidden rounded-2xl`}>
              <ImageCardHorizontal
                src="/images/linea-vasos.JPG"
                alt="Línea Vasos"
                title="Línea Vasos"
                label="Proyectos"
                href="/proyectos/linea-vasos?from=home"
                showArrow={true}
              />
            </motion.div>

            {/* 22. Producción Responsable */}
            <motion.div variants={itemVariants} className={cardWrapperClass}>
              <TypographyCard
                items={[{ text: "Producción Responsable", color: "#000000" }]}
                label="Servicios"
                backgroundColor="#dfe6d4ff"
                showArrow={true}
                href="/servicios"
                className="rounded-2xl"
              />
            </motion.div>

            {/* 20. Pensamiento Circular */}
            <motion.div variants={itemVariants} className={cardWrapperClass}>
              <ThreeDTextCard
                label="Estudio"
                title="El pensamiento circular es urgente, no opcional. Desde la etapa cero evitamos desechos en su origen"
                backgroundColor="#f2f2f2"
                textColor="#333333"
                showArrow={true}
                href="/estudio"
                compactText={false}
                cardVariant="card-20"
                className="rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}