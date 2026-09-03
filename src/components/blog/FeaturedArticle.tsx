"use client"

/**
 * The dominant featured story — an editorial spread, never a card. Cover image
 * holds ~65% width with a Sharks-clipped corner; the opposite column carries the
 * label, title (revealed line-by-line), meta and CTA. Motion is directional and
 * restrained: image clips open, azure line expands toward the copy.
 */

import Image from "next/image"
import Link from "next/link"

import type { ArticlePreview } from "@/types/content"
import { useInView } from "@/hooks/useInView"
export function FeaturedArticle({ article }: { article: ArticlePreview }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section
      dir="rtl"
      className="relative bg-canvas px-6 py-24 md:px-12 md:py-32"
    >
      <div ref={ref} className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 items-center gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-7">
            <Link
              href={`/blog/${article.slug}`}
              data-cursor="cta"
              className="group relative block overflow-hidden"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 90%, 94% 100%, 0 100%)",
              }}
            >
              <div
                className="relative aspect-[16/11] overflow-hidden bg-navy/5"
                style={{
                  clipPath: inView ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                  transition: "clip-path 1s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  priority
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-[1.03]"
                />
              </div>
            </Link>
          </div>
          <div className="col-span-12 md:col-span-5 md:pr-4">
            <div className="flex items-center gap-4">
              <span className="font-meta text-[11px] uppercase tracking-[0.35em] text-azure">
                Featured / 01
              </span>
              <span
                className="block h-px bg-azure transition-all duration-[900ms] ease-brand"
                style={{ width: inView ? "4rem" : "0rem" }}
              />
            </div>

            <div className="mt-6 overflow-hidden">
              <h2
                className="text-[9vw] font-bold leading-[1.06] tracking-tight text-navy transition-transform duration-[900ms] ease-brand md:text-[3.4vw]"
                style={{
                  transform: inView ? "translateY(0)" : "translateY(110%)",
                }}
              >
                {article.title}
              </h2>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-meta text-[11px] uppercase tracking-[0.2em] text-navy/45">
              <span className="text-navy/70">{article.category}</span>
              <span className="text-navy/20">—</span>
              <span dir="ltr">{article.publishLabel}</span>
              <span className="text-navy/20">—</span>
              <span dir="ltr">{article.readingTime}</span>
            </div>

            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-navy/65">
              {article.excerpt}
            </p>

            <Link
              href={`/blog/${article.slug}`}
              data-cursor="cta"
              className="group mt-8 inline-flex items-center gap-3 text-xl font-semibold text-navy transition-colors duration-300 hover:text-azure"
            >
              اقرأ المقال
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                ↖
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
