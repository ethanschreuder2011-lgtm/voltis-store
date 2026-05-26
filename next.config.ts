import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Default device sizes — needed for full-bleed hero images on all screens
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Default image sizes — covers fixed-size images and the logo
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Prefer WebP for smaller file sizes at equivalent quality
    formats: ["image/webp"],
    // Slightly higher global quality for a premium feel (default is 75)
    qualities: [90],
    // Allow Shopify CDN images (used when rendering Shopify product images via next/image)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};

export default nextConfig;
