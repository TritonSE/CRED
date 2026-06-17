import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the tracing root to this app so Next doesn't infer it from a stray
  // parent-directory lockfile (silences the multi-lockfile build warning).
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Serve AVIF/WebP (smaller than the WebP-only default) for all next/image assets.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
