import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Hacer la petición a tu API real
    const response = await fetch("https://backend-chatbot-owzs.onrender.com/api/chat/start", {
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
