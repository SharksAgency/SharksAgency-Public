"use client"

/**
 * The manifesto is a scroll-controlled editorial sequence. The section pins in
 * the viewport while each line is revealed in order; once the sequence ends,
 * ScrollTrigger releases the page and normal scrolling continues.
 */

import type { ReactNode } from "react"
import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { SiteContent } from "@/types/content"

function Line({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden">
      <div
        data-manifesto-line
        className="will-change-transform"
        style={{ opacity: 0.3, transform: "translateY(110%)" }}
      >
        {children}
      </div>
    </div>
  )
}

function Mark({ children }: { children: ReactNode }) {
  return <span className="mark">{children}</span>
}

export function Manifesto({ content }: { content: SiteContent["manifesto"] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const lines = section
      ? Array.from(
          section.querySelectorAll<HTMLDivElement>("[data-manifesto-line]"),
        )
      : []
    if (!section || !lines.length || reducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      // Every line starts below its mask and enters only as the user scrolls
      // through the pinned sequence.
      gsap.set(lines, { y: "110%", opacity: 0.3 })

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 2.1, 1400)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      lines.forEach((line, index) => {
        const mark = line.querySelector<HTMLElement>(".mark")
        const at = index * 1.05
        timeline.addLabel(`manifesto-${index}`, at)
        timeline.to(line, { y: "0%", opacity: 1, duration: 0.85 }, at)
        if (mark) {
          timeline.to(
            mark,
            { color: "var(--color-azure)", duration: 0.35 },
            at + 0.35,
          )
        }
      })
    }, section)

    return () => context.revert()
  }, [reducedMotion, content.lines])

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      dir="rtl"
      className="relative z-0 flex min-h-[100svh] items-center overflow-hidden bg-canvas px-6 py-32 md:px-12 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-20 flex items-center gap-5 font-meta text-[11px] uppercase tracking-[0.25em] text-navy/50">
          <span>{content.eyebrow}</span>
          <div className="h-px flex-1 bg-navy/15" />
        </div>

        <div className="space-y-2 text-[8vw] font-semibold leading-[1.12] tracking-tight text-navy md:space-y-3 md:text-[3.6vw]">
          {content.lines.map((segments, lineIndex) => (
            <Line key={lineIndex}>
              {segments.map((segment, segmentIndex) => {
                if (segment.highlight) {
                  return <Mark key={segmentIndex}>{segment.text}</Mark>
                }
                return (
                  <span
                    key={segmentIndex}
                    className={
                      segment.tone === "muted" ? "text-navy/40" : undefined
                    }
                  >
                    {segment.text}
                  </span>
                )
              })}
            </Line>
          ))}
        </div>
      </div>
    </section>
  )
}
