import { TypographyCard, CardTitleSubtitle } from './components/cards';
import ThreeDTextCard from './components/ui/3d-text-card';
import ImageCardHover from './components/ui/image-card-hover';
import ImageCardHorizontal from './components/ui/image-card-horizontal';
import ImageCardDecorative from './components/ui/image-card-decorative';
import Image from 'next/image';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Cards grid responsive */}
      <div className="w-full px-2 sm:px-4 lg:px-4 pb-12 pt-4" style={{ paddingTop: '20px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 sm:gap-2 lg:gap-3 max-w-none">
          {/* COLUMN 1 (Left) - 8 cards */}
          <div className="space-y-1 sm:space-y-2 lg:space-y-3">
            {/* 1. Hembra Estudio - CON SVG */}
            <ThreeDTextCard
              label="Estudio"
              backgroundColor="#f2f2f2"
              textColor="#333333"
              showArrow={true}
              href="/estudio"
              svgPath="/hembra.svg"
            />

            {/* 2. Florero Betty - IMAGE HOVER */}
            <ImageCardHover
              src="/images/1. Florero Betty/Copia de Betty Vase Colours.jpg"
              alt="Florero Betty - Diseño Sustentable"
              title="Florero Betty"
              label="Proyectos"
              href="/proyectos/florero-betty?from=home"
              showArrow={true}
            />

            {/* 3. Estrategia Circular - TYPOGRAPHY (TIPO 4) */}
            <TypographyCard
              items={[
                { text: "Estrategia Circular", className: "text-headline", color: "#000000" }
              ]}
              label="Servicios"
              backgroundColor="#dfe6d4ff"
              showArrow={true}
              href="/servicios"
            />



            {/* 5. Sustainability Statement - NO 3D TEXT */}
            <ThreeDTextCard
              label="Estudio"
              title="Creamos proyectos con un profundo enfoque en la sustentabilidad, ofreciendo soluciones estratégicas, creativas e innovadoras"
              backgroundColor="#f2f2f2"
              textColor="#333333"
              showArrow={true}
              href="/estudio"
              compactText={false}
              cardVariant="card-5"
            />

            {/* 6. Línea de Complementos - IMAGE HORIZONTAL */}
            <ImageCardHorizontal
              src="/images/linea-complementos-chapa.jpeg"
              alt="Línea de Complementos en Chapa - Repusaje Artesanal"
              title="Línea de Complementos en Chapa"
              label="Proyectos"
              href="/proyectos/linea-complementos-chapa?from=home"
              showArrow={true}
            />

            {/* 7. Prototipado y Desarrollo - TYPOGRAPHY (TIPO 4) */}
            <TypographyCard
              items={[
                { text: "Prototipado y Desarrollo", className: "text-headline", color: "#000000" }
              ]}
              label="Servicios"
              backgroundColor="#d0ddc3ff"
              showArrow={true}
              href="/servicios"
            />

            {/* 8. Cooperativa Superarte - IMAGE HORIZONTAL */}
            <ImageCardHorizontal
              src="/images/cooperativa-superarte.JPG"
              alt="Cooperativa Superarte - Trabajo Colaborativo"
              title="Cooperativa Superarte"
              label="Proyectos"
              href="/proyectos/cooperativa-superarte?from=home"
              showArrow={true}
            />
          </div>

          {/* COLUMN 2 (Center) - 5 cards + 3 elementos especiales = 8 elementos */}
          <div className="space-y-1 sm:space-y-2 lg:space-y-3">
            {/* 9. Upcycled Luminarias - IMAGE HOVER */}
            <ImageCardHover
              src="/images/upcycled-luminarias.JPG"
              alt="Upcycled Luminarias - Iluminación Consciente"
              title="Upcycled Luminarias"
              label="Proyectos"
              href="/proyectos/upcycled-luminarias?from=home"
              showArrow={true}
            />

            {/* 10. Innovación Sostenible (intercambiada desde posición 14) */}
            <TypographyCard
              items={[
                { text: "Innovación Sostenible", className: "text-headline", color: "#000000" }
              ]}
              label="Servicios"
              backgroundColor="#dfe6d4ff"
              showArrow={true}
              href="/servicios"
            />

            {/* 11. Imagen Vertical - DECORATIVA (sin interactividad) */}
            <ImageCardDecorative
              src="/images/ilustracion.jpg"
              alt="Imagen decorativa"
            />

            {/* 12. Imagen Vertical - DECORATIVA (sin interactividad) */}
            <ImageCardDecorative
              src="/11.jpeg"
              alt="Imagen decorativa"
            />

            {/* 13. Mesa Bea - IMAGE HOVER */}
            <ImageCardHover
              src="/images/mesa-bea.jpg"
              alt="Mesa Bea - Diseño Funcional"
              title="Mesa Bea"
              label="Proyectos"
              href="/proyectos/mesa-bea?from=home"
              showArrow={true}
            />

          </div>

          {/* COLUMN 3 (Right) - 8 cards */}
          <div className="space-y-1 sm:space-y-2 lg:space-y-3">
            {/* 16. Diseño de Objetos con Alma - TYPOGRAPHY (TIPO 4) */}
            <TypographyCard
              items={[
                { text: "Diseño de Objetos con Alma", className: "text-headline", color: "#000000" }
              ]}
              label="Servicios"
              backgroundColor="#d0ddc3ff"
              showArrow={true}
              href="/servicios"
            />

            {/* 17. RECAP - IMAGE HORIZONTAL */}
            <ImageCardHorizontal
              src="/images/recap.jpg"
              alt="RECAP - Proyecto Integral"
              title="RECAP"
              label="Proyectos"
              href="/proyectos/recap?from=home"
              showArrow={true}
            />

            {/* 18. Orne Project - IMAGE HOVER */}
            <ImageCardHover
              src="/images/orne.JPG"
              alt="Orne - Proyecto Artesanal"
              title="Estudio"
              label="Estudio"
              href="/estudio"
              showArrow={true}
            />

            {/* 19. VIDEO CENTRAL - Solo desktop */}
            <div className="hidden lg:block">
              <div className="h-80 sm:h-96 lg:h-[500px] rounded-xl relative overflow-hidden">
                <video
                  src="/19.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '12px' }}
                />
              </div>
            </div>

            {/* 19. Mobile: Cooperativa Superarte en lugar del video - IMAGE HOVER */}
            <div className="block lg:hidden">
              <ImageCardHover
                src="/images/cooperativa-superarte.JPG"
                alt="Cooperativa Superarte - Trabajo Colaborativo"
                title="Cooperativa Superarte"
                label="Proyectos"
                href="/proyectos/cooperativa-superarte?from=home"
                showArrow={true}
              />
            </div>



            {/* 21. Línea Vasos - IMAGE HORIZONTAL */}
            <ImageCardHorizontal
              src="/images/linea-vasos.JPG"
              alt="Línea Vasos - Vidrio Recuperado"
              title="Línea Vasos"
              label="Proyectos"
              href="/proyectos/linea-vasos?from=home"
              showArrow={true}
            />

            {/* 22. Producción Responsable - TYPOGRAPHY (TIPO 4) */}
            <TypographyCard
              items={[
                { text: "Producción Responsable", className: "text-headline", color: "#000000" }
              ]}
              label="Servicios"
              backgroundColor="#dfe6d4ff"
              showArrow={true}
              href="/servicios"
            />

            {/* 20. Pensamiento Circular - CLONADA DE CARD 5 CON NUEVO COPY */}
            <ThreeDTextCard
              label="Estudio"
              title="El pensamiento circular es urgente, no opcional. Desde la etapa cero evitamos desechos en su origen"
              backgroundColor="#f2f2f2"
              textColor="#333333"
              showArrow={true}
              href="/estudio"
              compactText={false}
              cardVariant="card-20"
            />

          </div>
        </div>
      </div>

      {/* Footer con logo gigante */}
      <Footer />
    </div>
  );
}
