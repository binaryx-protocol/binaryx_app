/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: false,
  },
  eslint: {
    // to enable eslint checks
    // npm install --save-dev eslint-config-next
    // more info https://nextjs.org/docs/basic-features/eslint
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
