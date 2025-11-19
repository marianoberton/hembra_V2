'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  // Verificar autenticación al cargar la página
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('admin-auth');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Autenticación básica - en producción usar JWT/NextAuth
    if (credentials.username === 'admin' && credentials.password === 'hembra2024') {
      setIsAuthenticated(true);
      setError('');
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin-auth', 'true');
      }
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin-auth');
    }
  };

  // Mostrar loading mientras verificamos autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3D4A3D]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#3D4A3D] mb-2">Panel de Administración</h1>
            <p className="text-[#2C2C2C] opacity-70">Hembra Studio</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#3D4A3D] mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-3 py-2 border border-[#cedbbf] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D4A3D]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#3D4A3D] mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-3 py-2 border border-[#cedbbf] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D4A3D]"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            
            <button
              type="submit"
              className="w-full bg-[#3D4A3D] text-white py-2 px-4 rounded-md hover:bg-[#2C3A2C] transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* Header del Admin */}
      <header className="bg-white shadow-sm border-b border-[#cedbbf]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-[#3D4A3D]">Panel de Administración</h1>
              <span className="text-sm text-[#2C2C2C] opacity-70">Hembra Studio</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="text-[#3D4A3D] hover:text-[#2C3A2C] transition-colors"
              >
                Ver Sitio
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card Blog */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#3D4A3D] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#3D4A3D]">Blog</h3>
            </div>
            <p className="text-[#2C2C2C] opacity-70 mb-4">
              Gestiona los artículos del blog, crea nuevos posts y edita contenido existente.
            </p>
            <button 
              onClick={() => router.push('/admin/blog')}
              className="w-full bg-[#3D4A3D] text-white py-2 px-4 rounded-md hover:bg-[#2C3A2C] transition-colors"
            >
              Gestionar Blog
            </button>
          </div>

          {/* Card Productos */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#D1A38E] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#3D4A3D]">Productos</h3>
            </div>
            <p className="text-[#2C2C2C] opacity-70 mb-4">
              Sincronización con TiendaNube y gestión de productos destacados.
            </p>
            <button 
              onClick={() => router.push('/admin/productos')}
              className="w-full bg-[#D1A38E] text-white py-2 px-4 rounded-md hover:bg-[#C1938E] transition-colors"
            >
              Ver Productos
            </button>
          </div>

          {/* Card Configuración */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#718355] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#3D4A3D]">Configuración</h3>
            </div>
            <p className="text-[#2C2C2C] opacity-70 mb-4">
              Ajustes generales del sitio, SEO y configuraciones avanzadas.
            </p>
            <button 
              onClick={() => router.push('/admin/configuracion')}
              className="w-full bg-[#718355] text-white py-2 px-4 rounded-md hover:bg-[#5F7147] transition-colors"
            >
              Configurar
            </button>
          </div>

        </div>

        {/* Estadísticas Rápidas */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-[#3D4A3D] mb-4">Estadísticas Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#3D4A3D]">0</div>
              <div className="text-sm text-[#2C2C2C] opacity-70">Posts del Blog</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D1A38E]">2</div>
              <div className="text-sm text-[#2C2C2C] opacity-70">Productos Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#718355]">0</div>
              <div className="text-sm text-[#2C2C2C] opacity-70">Visitas Hoy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#2C2C2C]">0</div>
              <div className="text-sm text-[#2C2C2C] opacity-70">Comentarios</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 