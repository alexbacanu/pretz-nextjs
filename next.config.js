/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "tailwindui.com",
      "s13emagst.akamaized.net",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: { images: { allowFutureImage: true } },
};

