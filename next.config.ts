/** @type {import('next').NextConfig} */
const nextConfig = {
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
