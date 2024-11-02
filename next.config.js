/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.licdn.com', 'placekitten.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  functions: {
    maxDuration: 60,
  },
};

module.exports = nextConfig; 