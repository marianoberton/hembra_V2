import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dcdn-us.mitiendanube.com',
        port: '',
        pathname: '/stores/**',
      },
    ],
  },
};

export default nextConfig;
