"use client"

/**
 * Editorial article directory — large horizontal rows, strong separators, no
 * cards. On desktop, hovering a row summons a small image preview that trails
 * the cursor with spring inertia (never glued to it). Restrained hover state:
 * category + separator pick up azure, a fin marker travels, the arrow appears.
 */

// Spring-follow preview (desktop, fine pointer only).
// Offset so the frame sits just ahead of the cursor's travel side (RTL: left).

// Track visibility via a data attribute set on hover changes.
/* Floating cursor preview (desktop) */

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import type { ArticlePreview } from "@/data/blog"
export function ArticleIndex({ articles }: { articles: ArticlePreview[] }) {
  const previewRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine) return
    const el = previewRef.current
    if (!el) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let px = mx
    let py = my
    let raf = 0
    let visible = false

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    const loop = () => {
      px += (mx - px) * 0.12
      py += (my - py) * 0.12
      el.style.transform = `translate3d(${px - 150}px, ${
        py - 110
      }px, 0) rotate(${(mx - px) * 0.03}deg)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    const obs = new MutationObserver(() => {
      const on = el.getAttribute("data-on") === "true"
      if (on !== visible) visible = on
    })
    obs.observe(el, { attributes: true, attributeFilter: ["data-on"] })

    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  const activeArticle = articles.find((a) => a.slug === hovered)

  return (
    <div className="relative">
      <div
        ref={previewRef}
        data-on={hovered ? "true" : "false"}
        aria-hidden
        className={
          "pointer-events-none fixed left-0 top-0 z-[400] hidden aspect-[4/3] w-[300px] overflow-hidden bg-navy will-change-transform md:block " +
          (hovered ? "opacity-100" : "opacity-0")
        }
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 88%, 92% 100%, 0 100%)",
          transition: "opacity 0.4s ease",
        }}
      >
        {activeArticle && (
          <Image
            src={activeArticle.coverImage}
            alt=""
            fill
            sizes="300px"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="border-t border-navy/12">
        {articles.map((a, i) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            data-cursor="link"
            onPointerEnter={() => setHovered(a.slug)}
            onPointerLeave={() => setHovered((h) => (h === a.slug ? null : h))}
            className="group relative block border-b border-navy/12 py-8 md:py-10"
          >
            <div className="grid grid-cols-12 items-baseline gap-4 md:gap-8">
              <span className="col-span-2 font-meta text-sm tabular-nums text-navy/35 transition-colors duration-300 group-hover:text-azure md:col-span-1">
                0{i + 1}
              </span>
              <span className="col-span-10 font-meta text-[11px] uppercase tracking-[0.25em] text-navy/45 transition-colors duration-300 group-hover:text-azure md:col-span-2">
                {a.category}
              </span>
              <div className="col-span-12 md:col-span-6">
                <h3 className="text-[6vw] font-bold leading-[1.08] tracking-tight text-navy transition-transform duration-500 ease-brand group-hover:translate-x-[-0.5rem] md:text-[2.4vw]">
                  {a.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-navy/55 md:text-lg">
                  {a.excerpt}
                </p>
              </div>
              <div className="col-span-12 flex items-baseline justify-between md:col-span-3 md:flex-col md:items-end md:gap-2">
                <div className="font-meta text-[11px] uppercase tracking-[0.2em] text-navy/40">
                  <span dir="ltr">{a.publishLabel}</span>
                  <span className="mx-2 text-navy/20">—</span>
                  <span dir="ltr">{a.readingTime}</span>
                </div>
                <span className="text-xl text-navy opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-azure group-hover:opacity-100">
                  ↖
                </span>
              </div>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-azure transition-transform duration-[700ms] ease-brand group-hover:scale-x-100"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 block h-[7px] w-3 -translate-y-[3px] bg-azure opacity-0 transition-all duration-[700ms] ease-brand group-hover:right-[calc(100%-12px)] group-hover:opacity-100"
              style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
