/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.h2oassistant.com',
  },
  // Eliminamos rewrites innecesarios - api-client.ts maneja conexión directa
};

module.exports = nextConfig;