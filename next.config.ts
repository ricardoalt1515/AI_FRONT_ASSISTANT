/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  env: {
    BACKEND_URL: 'https://api.h2oassistant.com',
  },
  // Eliminamos los rewrites ya que ahora nos conectamos directamente al backend
};

module.exports = nextConfig;