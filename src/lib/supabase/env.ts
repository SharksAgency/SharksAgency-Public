const placeholderPattern = /your-project|your-publishable/i

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()

  if (
    !url ||
    !publishableKey ||
    placeholderPattern.test(url) ||
    placeholderPattern.test(publishableKey)
  ) {
    return null
  }

  return { url, publishableKey }
}

export function requireSupabaseConfig() {
  const config = getSupabaseConfig()
  if (!config) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    )
  }
  return config
}
