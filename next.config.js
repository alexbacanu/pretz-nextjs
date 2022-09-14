/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "tailwindui.com",
      "s13emagst.akamaized.net",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "api.lorem.space",
    ],
  },
};

module.exports = nextConfig;

