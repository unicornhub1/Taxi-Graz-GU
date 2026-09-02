import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Tina Cloud (repo-basierte Medien) liefert Bildfelder als https://assets.tina.io/<clientId>/… aus.
    remotePatterns: [{ protocol: 'https', hostname: 'assets.tina.io' }],
  },
  async rewrites() {
    return [{ source: '/admin', destination: '/admin/index.html' }]
  },
}

export default nextConfig
