import type { NextConfig } from "next";

/**
 * Static export: every route is pre-rendered to HTML in `out/`.
 * `trailingSlash` makes each route a folder with index.html, so direct
 * navigation and refresh work on any static host (Vercel, Netlify, S3, nginx).
 * `images.unoptimized` is required for `output: "export"`; assets are
 * pre-sized in /public instead.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
