/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = withPWA({ ...nextConfig });
