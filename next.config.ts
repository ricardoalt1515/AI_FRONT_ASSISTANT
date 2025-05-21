/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ¡IMPORTANTE! Configuración que ignora errores de tipos durante el build
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  // Esta configuración ayuda a manejar CORS redirigiendo las solicitudes a la API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_USE_LOCAL_BACKEND === 'true'
          ? 'http://localhost:8000/api/:path*'  // Para desarrollo local
          : `${process.env.BACKEND_URL || 'https://glyu7ck52i.execute-api.us-east-1.amazonaws.com/prod'}/api/:path*`, // Conexión a través del API Gateway (HTTPS)
      },
    ];
  },
};

module.exports = nextConfig;
