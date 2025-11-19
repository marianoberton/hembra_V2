import Link from 'next/link';
import Image from 'next/image';
import { proyectos } from '../../data/proyectos';
import Footer from '../components/Footer';

export default function ProyectosPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f2f2f2' }}>
      {/* Navigation Bar - Simple header like Florero Betty */}
      <div className="w-full border-b border-gray-200" style={{backgroundColor: '#f2f2f2'}}>
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <Link 
            href="/"
            className="text-sm font-medium tracking-wide hover:underline"
            style={{color: '#2C2C2C', fontFamily: 'Helvetica Neue, sans-serif'}}
          >
            ← Inicio
          </Link>
        </div>
      </div>

      <section className="pt-4" style={{ paddingTop: '20px' }}>
        <div className="w-full px-2 sm:px-4 lg:px-6 pb-12">
          
          {/* Mobile: Single column stack */}
          <div className="block lg:hidden space-y-1 sm:space-y-2 lg:space-y-3">
            {proyectos.map((proyecto) => (
              <Link 
                key={proyecto.id}
                href={`/proyectos/${proyecto.id}`}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-xl bg-white transition-all duration-500 hover:scale-[1.01] hover:shadow-lg min-h-[400px] sm:min-h-[480px] lg:min-h-[560px]">
                  <Image
                    src={proyecto.image}
                    alt={proyecto.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  
                  {/* Label - White by default, white on hover */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 transition-colors duration-500 prowl-label-white">
                    Proyectos
                  </div>

                  {/* Title Overlay - Always visible on mobile, hover on desktop */}
                  <div className="absolute inset-0 bg-black/50 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="text-center px-6 transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
                      <h2 className="text-headline-white">
                        {proyecto.title}
                      </h2>
                    </div>
                  </div>

                  {/* Arrow - Always visible on mobile, hover on desktop */}
                  <div className="absolute inset-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                      <span style={{ color: '#ffffff', fontSize: '28px', fontWeight: 100, fontFamily: '"Helvetica Neue", sans-serif' }}>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop: Two column layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-1 sm:gap-2 lg:gap-3">
            
            {/* LEFT COLUMN - 4 cards of standard height */}
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
              {proyectos.slice(0, 4).map((proyecto) => (
                <Link 
                  key={proyecto.id}
                  href={`/proyectos/${proyecto.id}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-white transition-all duration-500 hover:scale-[1.01] hover:shadow-lg h-[32rem]">
                    <Image
                      src={proyecto.image}
                      alt={proyecto.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    
                    {/* Label - White by default, white on hover */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 transition-colors duration-500 prowl-label-white">
                      Proyectos
                    </div>

                    {/* Title Overlay - Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-black/50 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="text-center px-6 transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
                        <h2 className="text-headline-white">
                          {proyecto.title}
                        </h2>
                      </div>
                    </div>

                    {/* Arrow - Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <span style={{ color: '#ffffff', fontSize: '28px', fontWeight: 100, fontFamily: '"Helvetica Neue", sans-serif' }}>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* RIGHT COLUMN - 2 cards of standard height + 1 double height */}
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
              {/* First 2 cards - standard height */}
              {proyectos.slice(4, 6).map((proyecto) => (
                <Link 
                  key={proyecto.id}
                  href={`/proyectos/${proyecto.id}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-white transition-all duration-500 hover:scale-[1.01] hover:shadow-lg h-[32rem]">
                    <Image
                      src={proyecto.image}
                      alt={proyecto.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    
                    {/* Label - White by default, white on hover */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 transition-colors duration-500 prowl-label-white">
                      Proyectos
                    </div>

                    {/* Title Overlay - Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-black/50 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="text-center px-6 transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
                        <h2 className="text-headline-white">
                          {proyecto.title}
                        </h2>
                      </div>
                    </div>

                    {/* Arrow - Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <span style={{ color: '#ffffff', fontSize: '28px', fontWeight: 100, fontFamily: '"Helvetica Neue", sans-serif' }}>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Last card - double height */}
              {proyectos[6] && (
                <Link 
                  href={`/proyectos/${proyectos[6].id}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-white transition-all duration-500 hover:scale-[1.01] hover:shadow-lg h-[64rem]">
                    <Image
                      src={proyectos[6].image}
                      alt={proyectos[6].title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    
                    {/* Label - White by default, white on hover */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 transition-colors duration-500 prowl-label-white">
                      Proyectos
                    </div>

                    {/* Title Overlay - Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-black/50 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="text-center px-6 transform translate-y-0 lg:translate-y-6 lg:group-hover:translate-y-0 transition-transform duration-500">
                        <h2 className="text-headline-white">
                          {proyectos[6].title}
                        </h2>
                      </div>
                    </div>

                    {/* Arrow - Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <span style={{ color: '#ffffff', fontSize: '28px', fontWeight: 100, fontFamily: '"Helvetica Neue", sans-serif' }}>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Footer con logo gigante */}
      <Footer />
    </div>
  );
}
