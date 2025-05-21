/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ¡IMPORTANTE! Configuración que ignora errores de tipos durante el build
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://hydrous-alb-1088098552.us-east-1.elb.amazonaws.com',
  },
  // Proxy directo al backend (método BFF - Backend for Frontend)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://hydrous-alb-1088098552.us-east-1.elb.amazonaws.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
