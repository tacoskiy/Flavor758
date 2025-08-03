import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
      ignoreDuringBuilds: true, // ✅ ESLint をビルド時に無視
  },
};

export default nextConfig;
