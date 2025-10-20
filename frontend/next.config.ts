/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['driveeasy.pythonanywhere.com'],
    unoptimized: true, // optional to stop image optimization
  },
};

export default nextConfig;
