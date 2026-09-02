"use client"

/** One line that clip-reveals on entry and lights its marked words azure when
 *  it reaches the active center band of the viewport. */

import type { ReactNode } from "react"

import { useInView } from "@/hooks/useInView"
function Line({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>(
    { threshold: 0, rootMargin: "-38% 0px -38% 0px" },
    false,
  )
  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={
          "transition-all duration-700 ease-brand " +
          (inView ? "translate-y-0 opacity-100" : "translate-y-full opacity-30")
        }
        style={{ transitionDelay: `${delay}s` }}
        data-active={inView}
      >
        {children}
      </div>
    </div>
  )
}
function Mark({ children }: { children: ReactNode }) {
  return <span className="mark">{children}</span>
}

export function Manifesto() {
  return (
    <section dir="rtl" className="relative bg-canvas px-6 py-40 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-20 flex items-center gap-5 font-meta text-[11px] uppercase tracking-[0.25em] text-navy/50">
          <span>Sharks / Creative Agency / 2026</span>
          <div className="h-px flex-1 bg-navy/15" />
        </div>

        <div className="space-y-2 text-[8vw] font-semibold leading-[1.12] tracking-tight text-navy md:space-y-3 md:text-[3.6vw]">
          <Line>نحن لا نضيف ضوضاء جديدة إلى السوق.</Line>
          <Line delay={0.05}>
            <span className="text-navy/40">نفهم ما يحدث،</span>
          </Line>
          <Line delay={0.05}>
            <span className="text-navy/40">نحدّد أين تكمن </span>
            <Mark>الفرصة</Mark>
            <span className="text-navy/40">،</span>
          </Line>
          <Line delay={0.05}>
            ثم نبني <Mark>الاتجاه</Mark> الذي يستحق أن تتحرك نحوه العلامة.
          </Line>
        </div>
      </div>
    </section>
  )
}
