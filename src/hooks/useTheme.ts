"use client"

/**
 * Theme state backed by `html.dark` + localStorage. Defaults to light.
 * The `--color-*` overrides under `html.dark` (see globals.css) flip the whole
 * site, so nothing here touches individual components.
 */
// Storage can be unavailable in privacy-restricted contexts.

import { useSyncExternalStore } from "react"

export type Theme = "light" | "dark"
const STORAGE_KEY = "sharks-theme"
export function useTheme() {
  const theme = useSyncExternalStore<Theme>(
    (onStoreChange) => {
      const observer = new MutationObserver(onStoreChange)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })
      return () => observer.disconnect()
    },
    () =>
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    () => "light",
  )

  const applyTheme = (nextTheme: Theme) => {
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {}
  }

  return {
    theme,
    toggle: () => applyTheme(theme === "dark" ? "light" : "dark"),
  }
}
