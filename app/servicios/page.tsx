import CardServicioV2 from '../components/ui/card-servicio-v2';
import Footer from '../components/Footer';

export default function ServiciosPage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#f2f2f2'}}>
      
      {/* Main Header Section */}
      <div className="w-full px-2 sm:px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left - About Section */}
          <div>
            <h1 className="prowl-label mb-4 uppercase" style={{fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: '600'}}>
              Servicios
            </h1>
          </div>
          
        </div>
      </div>
      
      {/* Services content */}
      <div className="w-full px-2 sm:px-4 lg:px-6 py-4 space-y-3 sm:space-y-4 lg:space-y-6">
          
          {/* Service 1: Estrategia Circular */}
          <CardServicioV2
            title="Estrategia Circular"
            description="Impulsamos la revalorización de recursos como motor de innovación. Diseñamos estrategias que reducen la dependencia de materiales vírgenes y promueven modelos de producción regenerativos. Acompañamos a empresas, organizaciones e instituciones en la transición hacia sistemas circulares que prolongan la vida útil de los materiales y minimizan el desperdicio desde la raíz."
            backgroundColor="#718355"
            imageSrc="/images/hero1.jpg"
            imageAlt="Estrategia Circular"
          />

          {/* Service 2: Diseño de Objetos con Alma */}
          <CardServicioV2
            title="Diseño de Objetos con Alma"
            description="Creamos productos sostenibles con historia, emoción y propósito. Cada objeto que diseñamos busca establecer un vínculo genuino entre las personas, los materiales y su entorno. Valoramos la calidad, la durabilidad y el sentido profundo detrás de cada forma. Diseñamos para que cada pieza tenga una vida larga y significativa."
            backgroundColor="#7c8e60"
            imageSrc="/images/hero2.jpg"
            imageAlt="Diseño de Objetos con Alma"
          />

          {/* Service 3: Innovación Sostenible */}
          <CardServicioV2
            title="Innovación Sostenible"
            description="Integramos creatividad y conocimiento técnico para transformar los desafíos ambientales en soluciones concretas. Aplicamos principios de ecodiseño, biomímesis y biodiseño desde la etapa cero del ciclo de vida, con el objetivo de evitar la generación de residuos y reducir el impacto negativo desde el origen. Diseñar es, para nosotras, una forma de anticipar un futuro mejor."
            backgroundColor="#b3c1a2"
            imageSrc="/images/hero3.jpg"
            imageAlt="Innovación Sostenible"
          />

          {/* Service 4: Prototipado y Desarrollo */}
          <CardServicioV2
            title="Prototipado y Desarrollo"
            description="Materializamos nuestras ideas —y las de nuestros clientes— a través de representaciones visuales precisas y prototipos físicos. Este proceso permite experimentar el diseño en todas sus dimensiones: forma, función y experiencia. Trabajamos de manera iterativa, cuidando cada etapa del desarrollo para llegar a resultados coherentes y funcionales."
            backgroundColor="#909b82"
            imageSrc="/images/hero2.jpg"
            imageAlt="Prototipado y Desarrollo"
          />

          {/* Service 5: Producción Responsable */}
          <CardServicioV2
            title="Producción Responsable"
            description="Ofrecemos soluciones personalizadas que respetan al planeta y a las personas. Producimos diseños propios y ajenos de forma consciente, priorizando procesos éticos, materiales recuperados y colaboraciones con talleres y cooperativas locales. La producción no es solo un resultado: es una declaración de valores."
            backgroundColor="#a2ae92"
            imageSrc="/images/hero3.jpg"
            imageAlt="Producción Responsable"
          />

      </div>

      {/* Footer con logo gigante */}
      <Footer />
    </div>
  );
}