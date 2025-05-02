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
  // Esta configuración ayuda si tu API tiene CORS habilitado
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'https://backend-chatbot-owzs.onrender.com/api'}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
