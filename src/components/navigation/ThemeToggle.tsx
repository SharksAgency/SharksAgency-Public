"use client"

/**
 * Minimal light/dark switch. Sun rays retract and a moon crescent carves out as
 * you cross into dark — sharp, geometric, in the Sharks language (no pill/track).
 */

import { useTheme } from "@/hooks/useTheme"
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const dark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="cta"
      aria-label={
        dark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"
      }
      aria-pressed={dark}
      className={
        "group relative flex h-9 w-9 items-center justify-center border border-navy/20 text-navy transition-colors duration-300 hover:border-azure hover:text-azure " +
        className
      }
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r={dark ? 7 : 5}
          fill="currentColor"
          className="transition-all duration-500 ease-brand"
        />
        <circle
          cx={dark ? 15 : 24}
          cy={dark ? 9 : 4}
          r="6"
          fill="var(--color-canvas)"
          className="transition-all duration-500 ease-brand"
        />
        <g
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="transition-opacity duration-300"
          style={{ opacity: dark ? 0 : 1 }}
        >
          <line x1="12" y1="1.5" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22.5" y2="12" />
          <line x1="4.2" y1="4.2" x2="6" y2="6" />
          <line x1="18" y1="18" x2="19.8" y2="19.8" />
          <line x1="19.8" y1="4.2" x2="18" y2="6" />
          <line x1="6" y1="18" x2="4.2" y2="19.8" />
        </g>
      </svg>
    </button>
  )
}
