import { getSupabaseConfig } from "@/lib/supabase/env"

const absoluteUrl = /^https?:\/\//i

export function resolveMediaUrl(path: string | null | undefined) {
  if (!path) return ""
  if (absoluteUrl.test(path) || /^\/(?![\/\\])/.test(path)) return path
  if (/^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith("//")) return ""

  const config = getSupabaseConfig()
  if (!config) return path

  const normalized = path.split("/").map(encodeURIComponent).join("/")
  return `${config.url}/storage/v1/object/public/website-media/${normalized}`
}
