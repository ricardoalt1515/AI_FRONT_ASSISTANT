import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Para manejar FormData, obtenemos directamente del request
    const formData = await request.formData();

    // Hacer la petición a tu API real
    const response = await fetch("https://backend-chatbot-owzs.onrender.com/api/documents/upload", {
      method: "POST",
      body: formData // Next.js maneja FormData correctamente
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error subiendo el documento" },
      { status: 500 }
    );
  }
}
