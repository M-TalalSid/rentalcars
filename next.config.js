// const nextConfig = {
//   /* config options here */
//   images: {
//     domains: ["cdn.sanity.io",'images.unsplash.com'],
//   }
// };

// export default nextConfig;
/** 


// @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack(config, { isServer }) {
//     if (!isServer) {
//       config.cache = false; // Disable Webpack cache for the client side
//     }
//       return config
//     },
//     // Disable image domains deprecated warning
//     images: {
//         domains: ["cdn.sanity.io",'images.unsplash.com'],
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "**",
//         },
//       ],
//     },
//   }
  
//   export default nextConfig
  
  /** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.cache = false; // Disable Webpack cache for the client-side
    }
    return config;
  },

  images: {
    domains: ["cdn.sanity.io", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Enable SWC minification for better performance
  swcMinify: true,

  // Enable React Strict Mode for better debugging
  reactStrictMode: true,

  // Optimize font loading
 
};

export default nextConfig;
