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
};

module.exports = nextConfig;