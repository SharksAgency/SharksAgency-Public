"use client"

/**
 * Nearly empty screen — whitespace dominates. A single large statement, its
 * last word azure. The shark returns exactly once here, crossing behind the
 * word and exiting. On scroll the phrase scales subtly.
 */

import { useEffect, useRef, useState } from "react"

import { useInView } from "@/hooks/useInView"
import { SharkGraphic } from "@/components/sharks/SharkGraphic"
export function Philosophy() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })
  const tailRef = useRef<SVGGElement>(null)
  const bodyRef = useRef<SVGGElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        const p = (vh / 2 - (r.top + r.height / 2)) / vh
        setScale(1 + Math.max(-0.06, Math.min(0.06, p * 0.12)))
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref])

  return (
    <section
      dir="rtl"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-canvas px-6 md:px-12"
    >
      <div ref={ref} className="mx-auto w-full max-w-[1600px]">
        <span className="font-meta text-[11px] uppercase tracking-[0.4em] text-navy/50">
          Sharks Move Forward.
        </span>

        <div className="relative mt-10">
          {inView && (
            <div
              ref={wrapRef}
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-y-1/2"
              style={{
                animation:
                  "shark-cross 4s cubic-bezier(0.45,0,0.55,1) 0.3s both",
              }}
            >
              <SharkGraphic
                tailRef={tailRef}
                bodyRef={bodyRef}
                className="opacity-90"
              />
            </div>
          )}

          <h2
            className="relative z-10 max-w-[18ch] text-[11vw] font-bold leading-[1.02] tracking-tight text-navy transition-transform duration-300 md:text-[6vw]"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "right center",
            }}
          >
            لا ننتظر الموجة.
            <br />
            نحدّد <span className="text-azure">اتجاهها</span>.
          </h2>
        </div>
      </div>
    </section>
  )
}
