/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  experimental: {
    newNextLinkBehavior: false,
  },
  eslint: {
    // to enable eslint checks
    // npm install --save-dev eslint-config-next
    // more info https://nextjs.org/docs/basic-features/eslint
    ignoreDuringBuilds: true,
  },
  // typescript:{
  //   ignoreBuildErrors: true
  // }
}

module.exports = nextConfig
