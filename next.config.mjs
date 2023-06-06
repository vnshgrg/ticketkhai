import nextTranslate from "next-translate-plugin"

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate({
  reactStrictMode: true,
  experimental: {
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin"] },
      },
    ],
  },
  i18n: {
    locales: ["jp", "en"],
    defaultLocale: "jp",
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
