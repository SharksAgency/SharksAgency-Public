"use client"

/**
 * Typographic category navigation — not pills. A thin azure line slides beneath
 * the active label. Reads as an editorial index, not a filter bar.
 */

import { useLayoutEffect, useRef, useState } from "react"

import type { BlogCategory } from "@/types/content"
export function CategoryNav({
  active,
  onChange,
  categories,
}: {
  active: string
  onChange: (key: string) => void
  categories: BlogCategory[]
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [line, setLine] = useState({ width: 0, right: 0 })

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const updateLine = () => {
      const element = wrap.querySelector<HTMLButtonElement>(
        `[data-cat="${active}"]`,
      )
      if (!element) return
      const right = wrap.clientWidth - element.offsetLeft - element.offsetWidth
      setLine({ width: element.offsetWidth, right })
    }

    updateLine()
    const observer = new ResizeObserver(updateLine)
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [active])

  return (
    <div
      dir="rtl"
      className="relative flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-navy/12 pb-4"
      ref={wrapRef}
    >
      {[{ slug: "all", label: "الكل", labelEn: "All" }, ...categories].map((c, i) => (
        <div key={c.slug} className="flex items-center gap-x-6">
          {i > 0 && <span className="select-none text-navy/15">/</span>}
          <button
            type="button"
            data-cat={c.slug}
            data-cursor="link"
            onClick={() => onChange(c.slug)}
            className={
              "py-1 text-lg transition-colors duration-300 md:text-xl " +
              (active === c.slug ? "text-azure" : "text-navy/55 hover:text-navy")
            }
          >
            {c.label}
          </button>
        </div>
      ))}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px block h-[2px] bg-azure transition-all duration-500 ease-brand"
        style={{ width: line.width, right: line.right }}
      />
    </div>
  )
}
