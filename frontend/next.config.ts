import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP (smaller than the WebP-only default) for all next/image assets.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
