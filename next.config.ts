import type { NextConfig } from "next"

const supabaseHost = (() => {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!value) return null
  try {
    return new URL(value).hostname
  } catch {
    return null
  }
})()

const remotePatterns = [
  {
    protocol: "https" as const,
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
]

if (supabaseHost) {
  remotePatterns.push({
    protocol: "https" as const,
    hostname: supabaseHost,
    pathname: "/storage/v1/object/public/**",
  })
}

const nextConfig: NextConfig = {
  agentRules: false,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns,
  },
}

export default nextConfig
