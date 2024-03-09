/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";
const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50MB",
    },
  },
};

export default nextConfig;
