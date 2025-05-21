import { NextRequest, NextResponse } from 'next/server';

// URL base del backend
const BACKEND_BASE_URL = 'http://hydrous-alb-1088098552.us-east-1.elb.amazonaws.com';

// Función para manejar todas las peticiones
async function proxyRequest(request: NextRequest, params: { path: string[] }, method: string) {
  try {
    // Construir URL
    const pathStr = params.path.join('/');
    const backendUrl = `${BACKEND_BASE_URL}/api/${pathStr}`;
    
    // Obtener query params
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const url = queryString ? `${backendUrl}?${queryString}` : backendUrl;
    
    // Configurar headers
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    // Añadir token de autenticación si existe
    if (request.headers.has('authorization')) {
      headers.append('Authorization', request.headers.get('authorization')!);
    }
    
    console.log(`Enviando solicitud a: ${url}`);
    
    // Configurar opciones
    const options: RequestInit = { 
      method, 
      headers,
      // Establecer un timeout razonable
      signal: AbortSignal.timeout(30000),
    };
    
    // Añadir body para métodos que lo requieren
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        const body = await request.json();
        options.body = JSON.stringify(body);
      } catch (e) {
        console.log('No se pudo parsear body como JSON');
      }
    }
    
    // Hacer petición al backend
    const response = await fetch(url, options);
    
    // Manejar respuesta
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }
    
    try {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (e) {
      const text = await response.text();
      return new NextResponse(text, {
        status: response.status,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  } catch (error) {
    console.error('Error en proxy API:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor', error: String(error) },
      { status: 500 }
    );
  }
}

// Implementar métodos HTTP
export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params, 'GET');
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params, 'POST');
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params, 'PUT');
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params, 'DELETE');
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params, 'PATCH');
}

// Configuración para CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}