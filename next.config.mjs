import nextTranslate from "next-translate-plugin"

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate({
  reactStrictMode: true,
  experimental: {},
  i18n: {
    locales: ["en", "jp"],
    defaultLocale: "en",
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      os: false,
    }
    return config
  },
})

export default nextConfig
