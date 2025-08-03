import { NextResponse } from 'next/server';

// URL base del backend
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.h2oassistant.com';

export async function GET() {
  try {
    console.log('Verificando estado del backend...');
    
    // Enviar la solicitud al backend
    const response = await fetch(`${BACKEND_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Establecer un timeout razonable
      signal: AbortSignal.timeout(10000),
    });
    
    console.log('Respuesta del backend:', response.status);
    
    // Procesar la respuesta
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error al verificar estado del backend:', error);
    return NextResponse.json(
      { 
        message: 'Error al verificar estado del backend', 
        error: String(error) 
      }, 
      { status: 500 }
    );
  }
}
