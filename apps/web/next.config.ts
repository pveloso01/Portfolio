import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler for better performance
  reactCompiler: true,

  // Static export for GitHub Pages deployment
  output: "export",

  // GitHub Pages serves from a subdirectory (repo name)
  basePath: "/portfolio",
  assetPrefix: "/portfolio",

  // Image optimization - use unoptimized for static export
  images: {
    unoptimized: true,
  },

  // Strict mode for better development experience
  reactStrictMode: true,

  // Production optimization
  poweredByHeader: false,

  // Type checking during build
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
