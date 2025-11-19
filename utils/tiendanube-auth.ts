const CLIENT_ID = process.env.NEXT_PUBLIC_TN_CLIENT_ID;
const CLIENT_SECRET = process.env.TN_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_TN_REDIRECT_URI || 'http://localhost:3001/auth/callback';

export interface TiendaNubeAuthResponse {
  store_id: string;
  access_token: string;
  scope: string;
}

export function generateAuthUrl(country: 'ar' | 'br' = 'ar'): string {
  if (!CLIENT_ID) {
    throw new Error('NEXT_PUBLIC_TN_CLIENT_ID no está configurado');
  }

  const baseUrl = country === 'br' 
    ? 'https://www.nuvemshop.com.br/apps/authorize'
    : 'https://www.tiendanube.com/apps/authorize';

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'read_products,read_orders,read_customers,read_store'
  });

  return `${baseUrl}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string): Promise<TiendaNubeAuthResponse> {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('CLIENT_ID o CLIENT_SECRET no están configurados');
  }

  const response = await fetch('https://www.tiendanube.com/apps/authorize/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al obtener access token: ${response.status} ${errorText}`);
  }

  return response.json();
}

export function getAuthInstructions() {
  return {
    steps: [
      '1. Ve a tu panel de TiendaNube: Admin → Aplicaciones → Desarrolladores',
      '2. Crea una nueva aplicación con estos datos:',
      `   - Nombre: "Mi App Next.js"`,
      `   - URL de redirección: ${REDIRECT_URI}`,
      '3. Copia el CLIENT_ID y CLIENT_SECRET',
      '4. Agrega estas variables a tu .env.local:',
      '   NEXT_PUBLIC_TN_CLIENT_ID=tu_client_id',
      '   TN_CLIENT_SECRET=tu_client_secret',
      '5. Usa el botón de abajo para autorizar tu aplicación',
    ],
    needsConfig: !CLIENT_ID || !CLIENT_SECRET
  };
} 