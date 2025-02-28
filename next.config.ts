import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Отключаем проверку ESLint во время сборки
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
