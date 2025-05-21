import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy seguro para comunicarse con el backend HTTP desde el frontend HTTPS
 * Esta función se ejecuta en el servidor, por lo que no hay restricciones de CORS o mixed content
 */
export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    // Construir la URL completa del backend
    const backendUrl = `http://hydrous-alb-1088098552.us-east-1.elb.amazonaws.com/api/${params.path.join('/')}`;
    
    // Obtener los query params de la solicitud original
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const url = queryString ? `${backendUrl}?${queryString}` : backendUrl;
    
    // Obtener los headers de la solicitud original
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      // Excluir headers específicos de Next.js o que puedan causar problemas
      if (!['host', 'connection', 'content-length'].includes(key.toLowerCase())) {
        headers.append(key, value);
      }
    });
    
    // Realizar la solicitud al backend
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    
    // Obtener los datos y los headers de la respuesta
    const data = await response.json();
    
    // Crear la respuesta con los datos del backend
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error('Error en proxy API:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * Implementamos todos los métodos HTTP comunes para que funcione con cualquier endpoint
 */
export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const backendUrl = `http://hydrous-alb-1088098552.us-east-1.elb.amazonaws.com/api/${params.path.join('/')}`;
    
    // Obtener el body de la solicitud original
    const body = await request.json();
    
    // Obtener los headers de la solicitud original
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    request.headers.forEach((value, key) => {
      if (!['host', 'connection', 'content-length'].includes(key.toLowerCase())) {
        headers.append(key, value);
      }
    });
    
    // Realizar la solicitud al backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    
    // Obtener los datos y los headers de la respuesta
    const data = await response.json();
    
    // Crear la respuesta con los datos del backend
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error('Error en proxy API:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// También implementamos PUT, DELETE, PATCH con la misma lógica
export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const backendUrl = `http://hydrous-alb-1088098552.us-east-1.elb.amazonaws.com/api/${params.path.join('/')}`;
    const body = await request.json();
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    request.headers.forEach((value, key) => {
      if (!['host', 'connection', 'content-length'].includes(key.toLowerCase())) {
        headers.append(key, value);
      }
    });
    
    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error en proxy API:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const backendUrl = `http://hydrous-alb-1088098552.us-east-1.elb.amazonaws.com/api/${params.path.join('/')}`;
    
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      if (!['host', 'connection', 'content-length'].includes(key.toLowerCase())) {
        headers.append(key, value);
      }
    });
    
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers,
    });
    
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error en proxy API:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const backendUrl = `http://hydrous-alb-1088098552.us-east-1.elb.amazonaws.com/api/${params.path.join('/')}`;
    const body = await request.json();
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    request.headers.forEach((value, key) => {
      if (!['host', 'connection', 'content-length'].includes(key.toLowerCase())) {
        headers.append(key, value);
      }
    });
    
    const response = await fetch(backendUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error en proxy API:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
