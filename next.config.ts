/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://hydrous-alb-new-915444011.us-east-1.elb.amazonaws.com',
  },
  // Eliminamos rewrites innecesarios - api-client.ts maneja conexión directa
};

module.exports = nextConfig;