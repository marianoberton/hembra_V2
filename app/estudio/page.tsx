'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

// Componente de Acordeón
const AccordionItem = ({ title, isOpen, onClick, children }: { title: string, isOpen: boolean, onClick: () => void, children: React.ReactNode }) => {
  return (
    <div className="border-t border-gray-300">
      <button 
        onClick={onClick}
        className="w-full py-8 flex justify-between items-center text-left group transition-colors"
      >
        <span className="text-2xl md:text-3xl text-[#2C2C2C] font-light group-hover:text-[#3D4A3D] transition-colors" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
          {title}
        </span>
        <span className="text-3xl font-light text-[#718355]">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-10 text-lg text-gray-700 leading-relaxed max-w-full font-light">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function EstudioPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      
      {/* 1. HERO SECTION: ESTUDIO */}
      <section className="w-full px-2 sm:px-4 lg:px-6 py-20 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 w-full">
          {/* Label Col */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl text-[#2C2C2C] font-normal" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
              Estudio
            </h2>
          </div>

          {/* Content Col */}
          <div className="lg:col-span-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-[#2C2C2C] leading-[1.05] mb-16 tracking-tight" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
              Diseño para un futuro circular
            </h1>
            
            {/* Single Column Text - Full Width */}
            <div className="w-full space-y-8 text-xl text-gray-800 leading-relaxed font-light">
              <p>
                Nuestra misión es crear proyectos con un fuerte enfoque en la sustentabilidad. A través de soluciones innovadoras, ayudamos a empresas e instituciones a materializar y comunicar su compromiso con un futuro más consciente.
              </p>
              <p>
                Vemos el diseño como una poderosa herramienta para transformar la realidad: una forma de dar respuesta a los problemas insostenibles y, a la vez, de reeducar y asumir una responsabilidad ineludible.
              </p>
              <p>
                Creemos que la economía circular es una oportunidad, no solo una responsabilidad. Por eso, nuestra filosofía se basa en el storydoing: pasamos del discurso a la acción. Colaboramos con nuestros clientes para convertir sus desafíos ambientales en soluciones de triple impacto —valiosas para el planeta, la sociedad y el negocio—.
              </p>
              <p>
                Cada estrategia nace de un pensamiento circular, donde a través del Ecodiseño y la revalorización de materiales, extendemos la vida de los recursos. En colaboración con una red de producción local, co-creamos objetos y productos que cuentan historias reales de cambio y agregan un valor tangible y auténtico a cada marca.
              </p>
              <p className="font-medium text-[#3D4A3D]">
                Bienvenido a una nueva forma de crear valor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISUAL BREAK - 2 Columns Full Width (movido más abajo entre Bio y Misión) */}

      {/* 3. PRINCIPIOS (Acordeón) */}
      <section className="w-full px-2 sm:px-4 lg:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 w-full">
          <div className="lg:col-span-2">
            <h2 className="text-3xl text-[#2C2C2C] font-normal" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
              Principios
            </h2>
          </div>
          
          <div className="lg:col-span-10">
            {/* Item 1 */}
            <AccordionItem 
              title="¿Qué es el Diseño Regenerativo?" 
              isOpen={openSection === 'diseno-regenerativo'} 
              onClick={() => toggleSection('diseno-regenerativo')}
            >
              <p className="mb-4">
                Mientras que la sostenibilidad busca no dañar o reducir el impacto negativo, el Diseño Regenerativo busca reparar y mejorar activamente los sistemas naturales y sociales.
              </p>
              <p>
                Se trata de convertir el acto de diseñar y producir en una fuerza de restauración positiva.
              </p>
            </AccordionItem>

            {/* Item 2 */}
            <AccordionItem 
              title="¿Qué significa ‘Comenzar con el final’?" 
              isOpen={openSection === 'comenzar-final'} 
              onClick={() => toggleSection('comenzar-final')}
            >
              <p className="mb-4">
                Comenzamos cada proyecto considerando su ciclo de vida completo, desde la concepción hasta su disposición final.
              </p>
              <p>
                Antes de definir cómo se construirá un producto, nos preguntamos: ¿cómo se transformará?, ¿cómo se podrá desarmar, reparar o compostar al final de su uso? Eliminamos el concepto de “residuo” desde su origen y lo convertimos en el punto de partida de una nueva oportunidad de diseño.
              </p>
            </AccordionItem>

            {/* Item 3 */}
            <AccordionItem 
              title="¿Por qué la Economía Circular es una oportunidad?" 
              isOpen={openSection === 'economia-circular'} 
              onClick={() => toggleSection('economia-circular')}
            >
              <p className="mb-4">
                La Economía Circular nos invita a repensar nuestra relación con el mundo y los objetos que nos rodean. Es una oportunidad para pasar de un modelo de &quot;usar y tirar&quot; a uno que genera beneficios concretos en todos los aspectos de nuestra vida.
              </p>
              <p>
                Es una forma de vivir que reconecta nuestras acciones con sus consecuencias, generando un triple beneficio: cuidamos los recursos del planeta, apostamos por un valor más duradero y local, y nos convertimos en creadores más conscientes e ingeniosos en nuestro día a día.
              </p>
            </AccordionItem>
            
            {/* Item 4 */}
            <AccordionItem 
              title="¿Cómo es el proceso de trabajo de Hembra?" 
              isOpen={openSection === 'proceso-trabajo'} 
              onClick={() => toggleSection('proceso-trabajo')}
            >
              <p>
                Nuestro proceso de trabajo es un viaje integral y colaborativo. Comenzamos con la investigación para entender el desafío y diagnosticar oportunidades. Luego, en la etapa de diseño, co-creamos conceptos y los validamos. Finalmente, en la implementación, producimos la solución junto a nuestra red de expertos y trabajadores locales. Por último medimos su triple impacto y lo comunicamos.
              </p>
            </AccordionItem>
            
            <div className="border-t border-gray-300"></div>
          </div>
        </div>
      </section>

      {/* 4. BIO */}
      <section className="w-full px-2 sm:px-4 lg:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 w-full">
          <div className="lg:col-span-2">
             <h2 className="text-3xl text-[#2C2C2C] font-normal" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
              Bio
            </h2>
          </div>
          <div className="lg:col-span-10">
            <div className="w-full space-y-8 text-xl text-gray-800 leading-relaxed font-light">
              <p>
                Soy <span className="font-medium text-[#3D4A3D]">Ornella Casoy</span>, Diseñadora Industrial recibida en la Universidad de Buenos Aires y fundadora de Hembra Estudio. Me dedico a transformar ideas en productos y sistemas sostenibles, buscando que cada creación genere un impacto positivo y cuente una nueva historia más consciente.
              </p>
              <p>
                Fundé Hembra en 2019, y su propósito actual es el resultado de una continua exploración. El punto de inflexión fue descubrir el potencial del supra-reciclaje (upcycling) y la economía circular, lo que redefinió por completo la misión del estudio. Esa búsqueda, que sigue hasta hoy, es la que nos mantiene en constante evolución, abiertos a nuevas formas de crear con conciencia.
              </p>
              <p>
                Para consolidar esa visión, realicé una Maestría en Economía Circular, lo que me dio las herramientas para transformar a Hembra en el estudio que es hoy. Actualmente, además de liderar los proyectos del estudio, transmito esta mirada integral como docente en la Universidad Torcuato Di Tella, buscando siempre colaborar en proyectos que, como nosotros, quieran rediseñar un futuro más consciente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.1 VISUAL BREAK (entre Bio y Misión) */}
      <section className="w-full mb-24 px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="relative h-[600px] md:h-[800px] w-full overflow-hidden rounded-3xl">
            <Image
              src="/images/estudio/1.jpg"
              alt="Detalle de proceso"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.src = "/images/placeholder.svg";
              }}
            />
          </div>
          <div className="relative h-[600px] md:h-[800px] w-full overflow-hidden rounded-3xl">
            <Image
              src="/images/estudio/2.jpg"
              alt="Detalle de taller"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.src = "/images/placeholder.svg";
              }}
            />
          </div>
        </div>
      </section>

      {/* 5. MISIÓN */}
      <section className="w-full px-2 sm:px-4 lg:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 w-full">
          <div className="lg:col-span-2">
             <h2 className="text-3xl text-[#2C2C2C] font-normal" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
              Misión
            </h2>
          </div>
          <div className="lg:col-span-10">
            <div className="text-xl text-gray-800 leading-relaxed font-light w-full space-y-12">
              <p className="text-xl md:text-2xl">
                Ayudar a nuestros clientes a transmitir su compromiso con la sostenibilidad, integrando este concepto desde la concepción de cada proyecto. Cada propuesta de diseño está pensada para ser parte de un sistema circular, donde los materiales extienden su durabilidad y se ahorran recursos.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-2xl font-medium mb-2 text-[#3D4A3D]">Residuos Actuales</h4>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Planificamos soluciones innovadoras para los residuos que se generan hoy, ofreciendo alternativas creativas para optimizar su gestión.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-2xl font-medium mb-2 text-[#3D4A3D]">Producciones Futuras</h4>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Alineamos la creatividad con los principios de Ecodiseño y Diseño Regenerativo, considerando la “etapa cero” del diseño para evitar residuos desde su origen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FILOSOFÍA */}
      <section className="w-full px-2 sm:px-4 lg:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 w-full">
          <div className="lg:col-span-2">
             <h2 className="text-3xl text-[#2C2C2C] font-normal" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
              Filosofía
            </h2>
          </div>
          <div className="lg:col-span-10">
            <p className="text-4xl md:text-6xl lg:text-7xl text-[#2C2C2C] font-normal leading-[1.1] mb-16 tracking-tight" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
              Consideramos que el pensamiento circular es una necesidad urgente y no una opción.
            </p>
            
            <div className="w-full space-y-8">
              <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light">
                Reconocemos que el reciclaje es vital para abordar los problemas actuales de residuos, pero nuestro objetivo final es trascender este modelo.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light">
                Nos enfocamos en la "etapa cero" del ciclo de vida, el diseño, para evitar la generación de desechos desde su origen. En Hembra, no solo buscamos solucionar los problemas existentes, sino reeducar y asumir la responsabilidad de un compromiso ineludible con el futuro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL IMAGES GRID - 2 Cols Full Width */}
      <section className="w-full px-2 sm:px-4 lg:px-6 pb-20">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="aspect-[4/5] relative rounded-3xl overflow-hidden">
               <Image 
                 src="/images/estudio/3.jpg" 
                 alt="Detalle de proceso" 
                 fill 
                 className="object-cover hover:scale-105 transition-transform duration-1000" 
                 onError={(e) => {
                   const img = e.currentTarget as HTMLImageElement;
                   img.src = "/images/placeholder.svg";
                 }}
               />
            </div>
            <div className="aspect-[4/5] relative rounded-3xl overflow-hidden">
               <Image 
                 src="/images/estudio/4.jpg" 
                 alt="Detalle de materiales" 
                 fill 
                 className="object-cover hover:scale-105 transition-transform duration-1000" 
                 onError={(e) => {
                   const img = e.currentTarget as HTMLImageElement;
                   img.src = "/images/placeholder.svg";
                 }}
               />
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}