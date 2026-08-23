import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
