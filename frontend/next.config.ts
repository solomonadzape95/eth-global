import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Handle crypto module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      stream: false,
      util: false,
      buffer: false,
      process: false,
    };

    // Handle ESM modules
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Ignore problematic crypto modules
    config.ignoreWarnings = [
      /Module not found: Package path \.\/sha2/,
      /Attempted import error/,
    ];

    return config;
  },
  transpilePackages: ['@noble/hashes', '@noble/curves', 'viem'],
  // experimental: {
  //   esmExternals: false,
  // },
};

export default nextConfig;
