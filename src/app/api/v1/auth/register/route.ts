import { NextResponse } from 'next/server';

// URL base del backend
const BACKEND_BASE_URL = 'http://hydrous-alb-1088098552.us-east-1.elb.amazonaws.com';

export async function POST(request: Request) {
  try {
    console.log('Procesando solicitud de registro...');
    
    // Obtener el cuerpo de la solicitud
    const body = await request.json();
    console.log('Datos de registro:', JSON.stringify(body));
    
    // Enviar la solicitud al backend
    const response = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // Establecer un timeout razonable
      signal: AbortSignal.timeout(30000),
    });
    
    console.log('Respuesta del backend:', response.status);
    
    // Procesar la respuesta
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error en la solicitud de registro:', error);
    return NextResponse.json(
      { 
        message: 'Error al procesar la solicitud de registro', 
        error: String(error) 
      }, 
      { status: 500 }
    );
  }
}
