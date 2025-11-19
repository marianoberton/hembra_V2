// utils/tiendanube.ts
import { TiendanubeFetchOptions } from '../types/tiendanube';

const STORE_ID        = process.env.TN_STORE_ID;
const TN_ACCESS_TOKEN = process.env.TN_ACCESS_TOKEN;

export async function tiendanubeFetch<T = any>(
  endpoint: string, 
  options: TiendanubeFetchOptions = {}
): Promise<T> {
  if (!STORE_ID || !TN_ACCESS_TOKEN) {
    throw new Error('Faltan las variables de entorno TN_STORE_ID o TN_ACCESS_TOKEN');
  }

  // Usar la versión oficial 2025-03 según documentación
  const url = `https://api.tiendanube.com/2025-03/${STORE_ID}/${endpoint}`;
  const headers = {
    // Usar 'Authentication' según documentación oficial (no 'Authorization')
    'Authentication': `bearer ${TN_ACCESS_TOKEN}`,
    // User-Agent obligatorio según formato especificado
    'User-Agent':     'tienda_demo (marianoberton.ds@gmail.com)',
    'Content-Type':   'application/json',
    ...(options.headers || {})
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error en la petición a Tiendanube: ${res.status} ${errorText}`);
  }

  return res.json();
}
