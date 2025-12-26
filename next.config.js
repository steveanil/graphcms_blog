/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Only allow secure HTTP requests
        hostname: 'media.graphassets.com', // The trusted hostname
      },
      {
        protocol: 'https', // Only allow secure HTTP requests
        hostname: 'ca-central-1.graphassets.com', // The trusted hostname
      },
    ],
  },
};
