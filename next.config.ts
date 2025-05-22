/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ¡IMPORTANTE! Configuración que ignora errores de tipos durante el build
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'https://gjyu74s2i.execute-api.us-east-1.amazonaws.com/prod',
  },
  // Proxy al API Gateway
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://gjyu74s2i.execute-api.us-east-1.amazonaws.com/prod/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;