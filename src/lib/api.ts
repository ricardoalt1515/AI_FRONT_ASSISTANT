// src/lib/api.ts
import axios from 'axios'

// Configurar la URL base desde variable de entorno o valor por defecto
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-chatbot-owzs.onrender.com/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
