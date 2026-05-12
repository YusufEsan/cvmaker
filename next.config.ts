import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/cvmaker' : '',
  assetPrefix: isProd ? '/cvmaker' : '',
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
