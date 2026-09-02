"use client"

/**
 * Full-screen editorial Hero. Asymmetric RTL composition, huge Arabic statement
 * with one azure word, scattered metadata. The shark swims in front of the
 * headline but BEHIND a giant ghost wordmark — genuine layered depth. Scrolling
 * choreographs the phrases apart and drives the shark toward the edge.
 */

// Play the masked headline reveal once the loader hands off.
/* Shark layer (z-20) — full-width so cursor coords map 1:1 to viewport.
          Sits in front of the headline (z-10) but behind the ghost word (z-30). */

import { useEffect, useRef, useState } from "react"

import { useFinePointer, useReducedMotion } from "@/hooks/useReducedMotion"
import { useSharkPhysics, type SharkMotionMode } from "@/hooks/useSharkPhysics"
import { SharkGraphic } from "@/components/sharks/SharkGraphic"
import { DirectionLine } from "@/components/ui/DirectionLine"
import { SharkButton } from "@/components/ui/SharkButton"
export function Hero({ ready }: { ready: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tailRef = useRef<SVGGElement>(null)
  const bodyRef = useRef<SVGGElement>(null)
  const reducedMotion = useReducedMotion()
  const finePointer = useFinePointer()
  const [revealed, setRevealed] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!ready) return
    const timer = window.setTimeout(
      () => setRevealed(true),
      reducedMotion ? 0 : 60,
    )
    return () => window.clearTimeout(timer)
  }, [ready, reducedMotion])

  const mode: SharkMotionMode =
    !ready || reducedMotion ? "static" : finePointer ? "pointer" : "autonomous"

  useSharkPhysics({ wrapperRef, tailRef, bodyRef, mode })

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setProgress(Math.min(window.scrollY / window.innerHeight, 1))
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      dir="rtl"
      data-cursor-dim
      className="relative min-h-[100svh] w-full overflow-hidden bg-canvas"
    >
      <div className="absolute inset-0 z-20">
        <SharkGraphic ref={wrapperRef} tailRef={tailRef} bodyRef={bodyRef} />
      </div>
      <div className="relative mx-auto min-h-[100svh] max-w-[1600px] px-6 pt-32 md:px-12">
        <div className="pointer-events-none absolute inset-0 z-10 px-6 md:px-12">
          <div
            className="absolute left-6 top-32 font-meta text-[11px] uppercase leading-relaxed tracking-[0.2em] text-navy/60 md:left-12"
            style={{
              transform: `translateY(${progress * -40}px)`,
              opacity: 1 - progress * 0.8,
            }}
          >
            Sharks Agency
            <br />
            <span className="text-azure">●</span> Palestine
          </div>

          <div
            className="absolute bottom-28 left-6 hidden font-meta text-[11px] uppercase tracking-[0.2em] text-navy/60 md:block md:left-12"
            style={{ opacity: 1 - progress }}
          >
            Creative / Strategy / Digital
          </div>

          <div
            className="absolute bottom-10 right-6 font-meta text-[11px] uppercase tracking-[0.35em] text-navy/60 md:right-12"
            style={{ opacity: 1 - progress }}
          >
            © 2026
          </div>
          <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 md:block">
            <span
              className="font-meta text-[10px] uppercase tracking-[0.4em] text-navy/40"
              style={{ writingMode: "vertical-rl" }}
            >
              Selected — Creative Direction
            </span>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-4 left-0 z-30 select-none overflow-hidden"
          style={{ transform: `translateX(${progress * -120}px)` }}
        >
          <span className="font-meta text-[22vw] font-semibold leading-none tracking-tighter text-navy/[0.04] md:text-[16vw]">
            SHARKS
          </span>
        </div>
        <div className="relative z-10 flex min-h-[70svh] flex-col justify-center">
          <h1 className="max-w-[16ch] text-[15vw] font-bold leading-[0.95] tracking-tight text-navy sm:text-[12vw] md:text-[8.5vw]">
            <span
              className={"block clip-reveal " + (revealed ? "is-in" : "")}
              style={{ transform: `translateY(${progress * -80}px)` }}
            >
              لا نلاحق <span className="text-azure">الاتجاه</span>.
            </span>
            <span
              className={"block clip-reveal " + (revealed ? "is-in" : "")}
              style={{
                transform: `translateX(${progress * 90}px)`,
                transitionDelay: "0.12s",
              }}
            >
              نصنعه.
            </span>
          </h1>

          <div
            className="mt-10 flex items-center gap-6"
            style={{ opacity: 1 - progress }}
          >
            <SharkButton href="/contact">لنتحدث</SharkButton>
            <div className="hidden w-40 sm:block">
              <DirectionLine delay={0.9} />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 z-40 h-px w-full origin-right">
          <span
            className="block h-px bg-azure"
            style={{ width: `${20 + progress * 80}%`, marginRight: "auto" }}
          />
        </div>
        <div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: 1 - progress * 2 }}
        >
          <span className="font-meta text-[10px] uppercase tracking-[0.3em] text-navy/50">
            Scroll
          </span>
          <span className="h-8 w-px animate-pulse bg-navy/40" />
        </div>
      </div>
    </section>
  )
}
