/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  env: {
    BACKEND_URL: 'https://api.h2oassistant.com',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.h2oassistant.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;