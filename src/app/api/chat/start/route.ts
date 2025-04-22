import { NextResponse } from "next/server";

// Obtener URL del backend desde variable de entorno
const BACKEND_URL = process.env.BACKEND_URL || "https://backend-chatbot-owzs.onrender.com/api";

export async function POST() {
  try {
    // Hacer la petición a tu API real
    const response = await fetch(`${BACKEND_URL}/chat/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "No se pudo iniciar la conversación" },
      { status: 500 }
    );
  }
}
