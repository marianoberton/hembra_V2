import Loader from './components/ui/Loader';

export default function Loading() {
  return (
    // Fondo blanco con un toque de transparencia para el efecto 'glass' si hay contenido detrás
    // Z-index alto para asegurar que cubra todo
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <Loader />
    </div>
  );
}