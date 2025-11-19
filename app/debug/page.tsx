import Link from 'next/link';

export default function DebugPage() {
  // Variables de entorno del servidor
  const serverVars = {
    TN_STORE_ID: process.env.TN_STORE_ID,
    TN_ACCESS_TOKEN: process.env.TN_ACCESS_TOKEN ? '***' + process.env.TN_ACCESS_TOKEN.slice(-8) : 'undefined',
    TN_CLIENT_SECRET: process.env.TN_CLIENT_SECRET ? '***' + process.env.TN_CLIENT_SECRET.slice(-8) : 'undefined',
    NEXT_PUBLIC_TN_CLIENT_ID: process.env.NEXT_PUBLIC_TN_CLIENT_ID,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            🔍 Debug - Variables de Entorno
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                📊 Variables del Servidor (Server-side)
              </h2>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <pre>{JSON.stringify(serverVars, null, 2)}</pre>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                🌐 Variables del Cliente (Client-side)
              </h2>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>NEXT_PUBLIC_TN_CLIENT_ID: {process.env.NEXT_PUBLIC_TN_CLIENT_ID || 'undefined'}</div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                ✅ Estado de Configuración
              </h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${
                    serverVars.TN_STORE_ID ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span>TN_STORE_ID: {serverVars.TN_STORE_ID ? '✅ Configurado' : '❌ Faltante'}</span>
                </div>
                
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${
                    serverVars.TN_ACCESS_TOKEN && serverVars.TN_ACCESS_TOKEN !== 'undefined' ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span>TN_ACCESS_TOKEN: {serverVars.TN_ACCESS_TOKEN && serverVars.TN_ACCESS_TOKEN !== 'undefined' ? '✅ Configurado' : '❌ Faltante'}</span>
                </div>
                
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${
                    serverVars.NEXT_PUBLIC_TN_CLIENT_ID ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span>NEXT_PUBLIC_TN_CLIENT_ID: {serverVars.NEXT_PUBLIC_TN_CLIENT_ID ? '✅ Configurado' : '❌ Faltante'}</span>
                </div>
                
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${
                    serverVars.TN_CLIENT_SECRET && serverVars.TN_CLIENT_SECRET !== 'undefined' ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span>TN_CLIENT_SECRET: {serverVars.TN_CLIENT_SECRET && serverVars.TN_CLIENT_SECRET !== 'undefined' ? '✅ Configurado' : '❌ Faltante'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🔧 Instrucciones</h3>
              <p className="text-sm text-blue-700">
                Si alguna variable aparece como &ldquo;Faltante&rdquo;, necesitas reiniciar completamente el servidor 
                después de actualizar el archivo .env.local
              </p>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/test" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                🧪 Ir a Pruebas
              </Link>
              <Link
                href="/"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                🏠 Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}