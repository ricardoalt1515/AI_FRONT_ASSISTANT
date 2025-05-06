import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Enviando mensaje a conversación:", body.conversation_id);

    // Hacer la petición al backend
    const backendUrl = process.env.BACKEND_URL || "https://backend-chatbot-owzs.onrender.com/api";
    console.log(`Enviando a: ${backendUrl}/chat/message`);

    const response = await fetch(`${backendUrl}/chat/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error del backend: ${response.status}`, errorText);
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error enviando mensaje:", error);
    return NextResponse.json(
      { error: "Error procesando el mensaje" },
      { status: 500 }
    );
  }
}
