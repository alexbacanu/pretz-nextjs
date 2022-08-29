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
    ],
  },
  experimental: { images: { allowFutureImage: true } },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
