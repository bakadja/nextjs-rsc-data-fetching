/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
      },
    ],
  },
  experimental: {
    taint: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  cacheComponents: true
}

const withMDX = createMDX()

export default withMDX(nextConfig)
