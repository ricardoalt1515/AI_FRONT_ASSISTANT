import { NextResponse } from 'next/server';

// URL base del backend
const BACKEND_BASE_URL = 'http://hydrous-alb-1088098552.us-east-1.elb.amazonaws.com';

export async function POST(request: Request) {
  try {
    console.log('------------------------------');
    console.log('Procesando solicitud de login...');
    
    // Obtener el cuerpo de la solicitud
    let body;
    try {
      body = await request.json();
      console.log('Datos de login recibidos:', JSON.stringify({
        email: body.email,
        password: body.password ? '*****' : undefined
      }));
    } catch (parseError) {
      console.error('Error al parsear el cuerpo de la solicitud:', parseError);
      return NextResponse.json(
        { message: 'Error al parsear el cuerpo de la solicitud', error: String(parseError) },
        { status: 400 }
      );
    }
    
    // Validar que todos los campos requeridos estén presentes
    if (!body.email || !body.password) {
      console.error('Faltan campos requeridos en la solicitud');
      return NextResponse.json(
        { message: 'Faltan campos requeridos (email, password)' },
        { status: 400 }
      );
    }
    
    // Preparar los datos para el backend
    const backendData = {
      username: body.email, // El backend probablemente espera 'username' en lugar de 'email'
      password: body.password
    };
    
    console.log('Enviando datos al backend:', JSON.stringify({
      ...backendData,
      password: '*****'
    }));
    
    // Enviar la solicitud al backend
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData),
        // Establecer un timeout razonable
        signal: AbortSignal.timeout(30000),
      });
      
      console.log('Respuesta del backend:', response.status);
      
      // Manejar respuesta según el status
      if (response.status === 204) {
        return new NextResponse(null, { status: 204 });
      }
      
      try {
        const data = await response.json();
        console.log('Datos de respuesta:', JSON.stringify(data));
        return NextResponse.json(data, { status: response.status });
      } catch (jsonError) {
        // Si no se puede parsear como JSON
        const text = await response.text();
        console.log('Respuesta texto:', text);
        return new NextResponse(text, {
          status: response.status,
          headers: { 'Content-Type': 'text/plain' },
        });
      }
    } catch (fetchError) {
      console.error('Error al conectar con el backend:', fetchError);
      return NextResponse.json(
        { message: 'Error al conectar con el backend', error: String(fetchError) },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('Error general en la solicitud de login:', error);
    return NextResponse.json(
      { 
        message: 'Error interno del servidor', 
        error: String(error) 
      }, 
      { status: 500 }
    );
  }
}
