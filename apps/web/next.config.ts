import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@dada-lab/shared"],
  images: {
    loader: "cloudinary",
    path: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`,
  },
};

export default nextConfig;
