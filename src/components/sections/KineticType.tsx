"use client"

/**
 * Full-width kinetic type. Each line translates at its own scroll-linked speed
 * (some running off-viewport) — reactive, not a marquee — and the azure
 * highlight steps from word to word as you scroll through.
 */

import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { EditorialContent } from "@/types/content"

const SPEEDS = [-420, 300, -140, 360, -300, 180]
export function KineticType({
  content,
}: {
  content: EditorialContent["kinetic"]
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRefs = useRef<Array<HTMLDivElement | null>>([])
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      lineRefs.current.slice(0, content.words.length).forEach((line, index) => {
        if (!line) return
        const speed = SPEEDS[index % SPEEDS.length]
        gsap.fromTo(
          line,
          { x: -speed / 2 },
          {
            x: speed / 2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      })

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: ({ progress }) => {
          const next = Math.min(
            content.words.length - 1,
            Math.floor(progress * content.words.length),
          )
          if (next !== activeRef.current) {
            activeRef.current = next
            setActive(next)
          }
        },
      })
    }, section)

    return () => context.revert()
  }, [reducedMotion, content.words])

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative overflow-hidden bg-canvas py-40"
    >
      <div className="mb-16 px-6 md:px-12">
        <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-navy/50">
          {content.eyebrow}
        </span>
      </div>

      <div className="flex flex-col gap-1 md:gap-2">
        {content.words.map((word, i) => (
          <div
            key={word}
            ref={(element) => {
              lineRefs.current[i] = element
            }}
            className="whitespace-nowrap will-change-transform"
          >
            <span
              className={
                "inline-block text-[16vw] font-bold leading-[0.92] tracking-tight transition-colors duration-500 md:text-[11vw] " +
                (i === active ? "text-azure" : "text-navy")
              }
            >
              {word}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
