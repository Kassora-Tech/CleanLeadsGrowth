import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add external domains here if needed, e.g. for client-provided CDN images
    remotePatterns: [],
    // Serve hero image at correct dimensions to prevent CLS
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
  },
  // Strict mode catches potential issues early
  reactStrictMode: true,
};

export default nextConfig;
