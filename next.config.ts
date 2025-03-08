import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.assets.so',

      },
      {
        protocol: 'https',
        hostname: 'dev-geniusclass2.pantheonsite.io',
      },
      
      {
        protocol: 'https',
        hostname: 'storyset.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },  
    ],
    domains: ['via.assets.so', 'via.placeholder.com', 'dev-geniusclass2.pantheonsite.io', 'storyset.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  /* config options here */
};


export default nextConfig;
