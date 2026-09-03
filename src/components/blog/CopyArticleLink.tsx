"use client"

import { useState } from "react"

export function CopyArticleLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.assign(url)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor="link"
      className="transition-colors hover:text-azure"
      aria-label="نسخ رابط المقال"
    >
      {copied ? "✓" : "↗"}
    </button>
  )
}
