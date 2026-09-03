"use client"

import Link from "next/link"

import { useInView } from "@/hooks/useInView"

export function NextArticle({
  slug,
  title,
  category,
}: {
  slug: string
  title: string
  category: string
}) {
  const { ref, inView } = useInView<HTMLAnchorElement>({ threshold: 0.3 })

  return (
    <Link
      href={`/blog/${slug}`}
      data-cursor="cta"
      ref={ref}
      className="group relative block overflow-hidden bg-night px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-4 font-meta text-[11px] uppercase tracking-[0.35em] text-white/50">
          <span>Up Next</span>
          <span
            className="block h-px bg-azure transition-all duration-[800ms] ease-brand"
            style={{ width: inView ? "5rem" : "0rem" }}
          />
          <span className="text-azure">{category}</span>
        </div>
        <h2 className="mt-6 max-w-[18ch] text-[10vw] font-bold leading-[1.02] tracking-tight text-white transition-transform duration-500 ease-brand group-hover:translate-x-[-0.75rem] md:text-[4.5vw]">
          {title}
          <span className="mr-4 inline-block text-azure transition-transform duration-500 group-hover:-translate-x-2">
            ↖
          </span>
        </h2>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[-30%] w-1/3 -skew-x-12 bg-azure/15 opacity-0 transition-all duration-700 ease-out group-hover:right-full group-hover:opacity-100"
      />
    </Link>
  )
}
