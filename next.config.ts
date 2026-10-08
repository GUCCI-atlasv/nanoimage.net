import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    optimizePackageImports: ['jszip', 'pdf-lib', 'exifr'],
  },
  // The transformers.js runtime (AI tools merged from ai.nanoimage.net)
  // references node-only modules behind feature checks; stub them out for the
  // browser bundle so static export succeeds.
  webpack: (config) => {
    config.resolve = config.resolve ?? {}
    config.resolve.fallback = {
      ...(config.resolve.fallback ?? {}),
      fs: false,
      path: false,
      crypto: false,
    }
    return config
  },
}

export default nextConfig
