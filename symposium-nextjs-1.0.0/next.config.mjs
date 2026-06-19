/** @type {import('next').NextConfig} */
// const basePath = "/symposium-nextjs";
const basePath = "";
const nextConfig = {
  // Removed output:"export" — needed for API routes to work as Netlify serverless functions
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
