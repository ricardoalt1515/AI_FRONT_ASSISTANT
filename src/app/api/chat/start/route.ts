import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Obtener URL del backend
    const backendUrl = process.env.BACKEND_URL || "https://backend-chatbot-owzs.onrender.com/api";
    console.log(`Iniciando conversación en: ${backendUrl}/chat/start`);

    // Hacer la petición al backend
    const response = await fetch(`${backendUrl}/chat/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.error(`Error del backend: ${response.status}`);
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Conversación iniciada con ID:", data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error iniciando conversación:", error);
    return NextResponse.json(
      { error: "No se pudo iniciar la conversación" },
      { status: 500 }
    );
  }
}
