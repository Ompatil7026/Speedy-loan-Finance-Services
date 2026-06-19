/** @type {import('next').NextConfig} */
// const basePath = "/symposium-nextjs";
const basePath = "";
const nextConfig = {
  // Static export for Netlify (no server required — Gemini called client-side)
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
