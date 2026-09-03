import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

import { requireSupabaseConfig } from "@/lib/supabase/env"
import type { Database } from "@/types/database"

export async function createClient() {
  const cookieStore = await cookies()
  const { url, publishableKey } = requireSupabaseConfig()

  return createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server Components cannot write cookies. Server Actions and Route
          // Handlers can, and public content reads do not require a session.
        }
      },
    },
  })
}
