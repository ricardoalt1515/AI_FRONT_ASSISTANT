import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Hacer una petición simple al endpoint de salud
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.h2oassistant.com'}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Establecer un timeout más corto para la prueba
      signal: AbortSignal.timeout(10000),
    });

    // Si la respuesta es exitosa, retornar los datos
    if (response.ok) {
      const data = await response.json();
      console.log('Respuesta exitosa:', data);
      return NextResponse.json({ success: true, data });
    } else {
      console.error('Error en la respuesta:', response.status);
      return NextResponse.json({ success: false, error: `Error: ${response.status}` }, { status: response.status });
    }
  } catch (error) {
    console.error('Error en proxy de prueba:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
