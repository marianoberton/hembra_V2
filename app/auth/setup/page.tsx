'use client';
export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { generateAuthUrl, getAuthInstructions } from '../../../utils/tiendanube-auth';

function AuthSetupClient() {
  const [instructions, setInstructions] = useState<unknown>(null);
  const [authUrl, setAuthUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const authInstructions = getAuthInstructions();
    setInstructions(authInstructions);

    try {
      const url = generateAuthUrl('ar');
      setAuthUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generando URL');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              🔧 Configuración TiendaNube
            </h1>
            <p className="text-blue-100 mt-1">
              Configura la integración con tu tienda TiendaNube
            </p>
          </div>

          <div className="p-6">
            {/* Current Status */}
            <div className="mb-8 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                📊 Estado Actual
              </h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${
                    (instructions && typeof instructions === 'object' && 'needsConfig' in instructions && (instructions as {needsConfig: boolean}).needsConfig) ? 'bg-red-500' : 'bg-green-500'
                  }`}></span>
                  <span className="text-sm">
                    Configuración OAuth: {(instructions && typeof instructions === 'object' && 'needsConfig' in instructions && (instructions as {needsConfig: boolean}).needsConfig) ? 'Pendiente' : 'Completa'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 bg-red-500"></span>
                  <span className="text-sm">
                    Token de acceso: Inválido (401 Unauthorized)
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📋 Instrucciones paso a paso
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <ol className="space-y-3">
                  {(instructions && typeof instructions === 'object' && 'steps' in instructions && Array.isArray((instructions as {steps: string[]}).steps)) ? 
                    (instructions as {steps: string[]}).steps.map((step: string, index: number) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    )) : null}
                </ol>
              </div>
            </div>

            {/* Environment Variables */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🔐 Variables de entorno requeridas
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                <div className="text-green-400"># Agrega estas líneas a tu .env.local</div>
                <div className="mt-2 space-y-1">
                  <div>NEXT_PUBLIC_TN_CLIENT_ID=tu_client_id_aqui</div>
                  <div>TN_CLIENT_SECRET=tu_client_secret_aqui</div>
                  <div>TN_STORE_ID=tu_store_id_aqui</div>
                  <div>TN_ACCESS_TOKEN=se_generara_automaticamente</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {(instructions && typeof instructions === 'object' && 'needsConfig' in instructions && (instructions as {needsConfig: boolean}).needsConfig) ? (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-800 mb-3">
                    ⚠️ Necesitas configurar CLIENT_ID y CLIENT_SECRET antes de continuar
                  </p>
                  <p className="text-sm text-orange-700">
                    Después de agregar las variables de entorno, recarga esta página.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    🚀 Autorizar aplicación
                  </h3>
                  
                  <div className="flex space-x-4">
                    <a
                      href={authUrl}
                      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      Autorizar en TiendaNube 🇦🇷
                    </a>
                    
                    <a
                      href={generateAuthUrl('br')}
                      className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
                    >
                      Autorizar en NuvemShop 🇧🇷
                    </a>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Serás redirigido a TiendaNube para autorizar tu aplicación
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">❌ Error: {error}</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  ← Volver al inicio
                </Link>
                
                <Link
                  href="/test"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Probar integración →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthSetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Cargando configuración...</h2>
        </div>
      </div>
    }>
      <AuthSetupClient />
    </Suspense>
  );
}