import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/cvmaker',
  assetPrefix: '/cvmaker',
  images: {
    unoptimized: true,
  },
  devIndicators: {
    appIsrStatus: false,
  } as any,
};

export default nextConfig;
