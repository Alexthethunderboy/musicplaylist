/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co',
      'seed-mix-image.spotifycdn.com',
      'mosaic.scdn.co',
      'image-cdn-ak.spotifycdn.com',
      'wrapped-images.spotifycdn.com'
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;

