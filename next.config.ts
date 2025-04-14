import type { NextConfig } from "next";
// images.unsplash.com
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      //awostzzbwsraxxsjdpnx.supabase.co
      //tous les urls disponibles
      // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzPQ9oAPXAPUOT-Wv1TWev5eWMsjXHZ1wEaA&s
      // https://lefinancierdafrique.com
      // https://sunucode.com
      {
        protocol: 'https',
        hostname: 'lefinancierdafrique.com',
      },
      {
        protocol: 'https',
        hostname: 'sunucode.com',
      },
      {
        protocol: 'https',
        hostname: 'localhost-academy.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'via.assets.so',

      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
    domains: ['via.assets.so', 'lefinancierdafrique.com', 'sunucode.com', 'encrypted-tbn0.gstatic.com', 'images.unsplash.com', 'awostzzbwsraxxsjdpnx.supabase.co', 'via.placeholder.com', 'dev-geniusclass2.pantheonsite.io', 'storyset.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  /* config options here */
};


export default nextConfig;
