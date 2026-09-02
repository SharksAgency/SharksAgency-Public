"use client"

/** SVG geometry that morphs with the step: line → sharp angle → forward arrow. */

import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useReducedMotion } from "@/hooks/useReducedMotion"

const STEPS = [
  {
    no: "01",
    title: "نكتشف ونفهم",
    desc: "نغوص في السوق والجمهور والمنافسة قبل أن نرسم أي خط.",
  },
  {
    no: "02",
    title: "نحدّد ونبني",
    desc: "نحوّل الفهم إلى اتجاه واضح، ثم نبني المنظومة حوله.",
  },
  {
    no: "03",
    title: "نطلق ونتطوّر",
    desc: "ندفع العمل إلى السوق، ونقرأ الأثر، ونصقل الحركة.",
  },
]
function Geometry({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 200 120" className="h-24 w-full" fill="none">
      <path
        d={
          step === 0
            ? "M10 60 L190 60"
            : step === 1
              ? "M10 90 L100 90 L190 30"
              : "M10 60 L160 60 M160 60 L140 42 M160 60 L140 78"
        }
        stroke="var(--color-azure)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}
      />
    </svg>
  )
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: ({ progress }) => {
          setStep(
            Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length)),
          )
        },
      })
    }, section)

    return () => context.revert()
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <section dir="rtl" className="bg-canvas px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-navy/50">
            كيف نتحرك؟
          </span>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {STEPS.map((item) => (
              <article key={item.no} className="border-t border-navy/12 pt-6">
                <span className="font-meta text-6xl text-azure">{item.no}</span>
                <h3 className="mt-5 text-3xl font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-navy/60">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas"
      style={{ height: "300vh" }}
    >
      <div
        dir="rtl"
        className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-6 md:px-12"
      >
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-12 items-center gap-8">
          <div className="col-span-12 mb-10 flex items-center gap-4 md:col-span-3 md:mb-0 md:flex-col md:items-start">
            <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-navy/50">
              كيف نتحرك؟
            </span>
            <div className="flex gap-2 md:mt-4 md:flex-col">
              {STEPS.map((s, i) => (
                <div
                  key={s.no}
                  className="h-1 w-10 transition-colors duration-500 md:h-10 md:w-1"
                  style={{
                    backgroundColor:
                      i <= step
                        ? "var(--color-azure)"
                        : "var(--color-lightblue)",
                    opacity: i <= step ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="col-span-4 md:col-span-4">
            <div className="relative h-[26vw] md:h-[20vw]">
              {STEPS.map((s, i) => (
                <span
                  key={s.no}
                  className="absolute inset-0 text-[26vw] font-bold leading-none tracking-tighter transition-all duration-700 ease-brand md:text-[20vw]"
                  style={{
                    color:
                      i === step ? "var(--color-azure)" : "var(--color-navy)",
                    opacity: i === step ? 1 : 0,
                    transform: `translateY(${(i - step) * 40}px)`,
                  }}
                >
                  {s.no}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-8 md:col-span-5">
            <div className="relative h-[3.2em] overflow-hidden">
              {STEPS.map((s, i) => (
                <h3
                  key={s.no}
                  className="absolute inset-0 text-[7vw] font-bold leading-[1.1] tracking-tight text-navy transition-all duration-700 ease-brand md:text-[3vw]"
                  style={{
                    opacity: i === step ? 1 : 0,
                    transform: `translateY(${(i - step) * 100}%)`,
                  }}
                >
                  {s.title}
                </h3>
              ))}
            </div>
            <p className="mt-6 max-w-[40ch] text-lg text-navy/60 md:text-xl">
              {STEPS[step].desc}
            </p>
            <div className="mt-10 max-w-sm">
              <Geometry step={step} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
