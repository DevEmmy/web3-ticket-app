import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'encrypted-tbn0.gstatic.com',
      'other-domain.com',
      // Add any other domains you need
    ],
  },
};

export default nextConfig;
