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

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withTM = require("next-transpile-modules")(["react-daisyui"]);

module.exports = withTM(nextConfig);
