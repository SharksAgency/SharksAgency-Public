import { createBrowserClient } from "@supabase/ssr"

import { requireSupabaseConfig } from "@/lib/supabase/env"
import type { Database } from "@/types/database"

export function createClient() {
  const { url, publishableKey } = requireSupabaseConfig()
  return createBrowserClient<Database>(url, publishableKey)
}
