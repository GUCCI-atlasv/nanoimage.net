import type { NextConfig } from 'next'
import path from 'path'

/**
 * ai.nanoimage.net is intentionally an isolated build target so that the heavy
 * on-device model runtime (WebGPU / WASM via @huggingface/transformers) never
 * ships with — or slows down — the main nanoimage.net site.
 *
 * Static export → deployed as its own Cloudflare Pages project.
 */
const nextConfig: NextConfig = {
  output: 'export',
  outputFileTracingRoot: path.join(__dirname, '../..'),
  eslint: {
    // ESLint config-next circular-JSON warning is a tooling compat issue, not a code bug.
    // Run linting separately with `npx eslint .` during CI.
    ignoreDuringBuilds: true,
  },
  trailingSlash: false,
  images: { unoptimized: true },
  // The transformers.js runtime references node-only modules behind feature
  // checks; stub them out for the browser bundle so static export succeeds.
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
