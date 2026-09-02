"use client"

import Image from "next/image"

import type { Block } from "@/data/blog"
import { useInView } from "@/hooks/useInView"

export function ArticleImage({
  block,
}: {
  block: Extract<Block, { type: "image" }>
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <figure ref={ref} className={block.break ? "md:-mx-24" : ""}>
      <div
        className="relative aspect-[16/10] overflow-hidden bg-navy/5"
        style={{
          clipPath: inView ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Image
          src={block.src}
          alt={block.caption ?? ""}
          fill
          sizes="(min-width: 768px) 70vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out"
          style={{ transform: inView ? "scale(1)" : "scale(1.06)" }}
        />
      </div>
      {block.caption && (
        <figcaption className="mt-3 font-meta text-[11px] uppercase tracking-[0.2em] text-navy/40">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
}

export function ArticleCover({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div ref={ref} className="mt-12 px-6 md:mt-16 md:px-12">
      <div
        className="relative mx-auto aspect-[16/9] max-w-[1400px] overflow-hidden bg-navy/5"
        style={{
          clipPath: inView
            ? "polygon(0 0,100% 0,100% 92%,96% 100%,0 100%)"
            : "inset(0 0 100% 0)",
          transition: "clip-path 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1400px) 1400px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}
