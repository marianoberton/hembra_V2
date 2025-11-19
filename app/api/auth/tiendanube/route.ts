import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from '../../../../utils/tiendanube-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Código de autorización requerido' },
        { status: 400 }
      );
    }

    // Intercambiar código por token
    const tokenData = await exchangeCodeForToken(code);

    return NextResponse.json({
      success: true,
      data: tokenData,
      message: 'Token obtenido exitosamente'
    });

  } catch (error) {
    console.error('Error en OAuth:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al obtener el token de acceso',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Endpoint para intercambio de código OAuth de TiendaNube',
    method: 'POST',
    body: {
      code: 'string - Código de autorización de TiendaNube'
    }
  });
} 