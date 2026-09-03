"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useReducedMotion } from "@/hooks/useReducedMotion"

export function SmoothScroll() {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (reducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      anchors: true,
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    })
    lenisRef.current = lenis

    const update = (time: number) => lenis.raf(time * 1000)
    const refresh = () => ScrollTrigger.refresh()

    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    window.addEventListener("resize", refresh, { passive: true })

    return () => {
      window.removeEventListener("resize", refresh)
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  useEffect(() => {
    const hash = window.location.hash
    let frame = 0
    let observer: MutationObserver | undefined

    const cleanup = () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener("wheel", cleanup)
      window.removeEventListener("touchstart", cleanup)
      window.removeEventListener("keydown", cleanup)
    }

    const position = (target: HTMLElement | null) => {
      if (!reducedMotion) ScrollTrigger.refresh()
      lenisRef.current?.resize()
      if (lenisRef.current) {
        // Measure browser coordinates after recalculating pinned spacing.
        const top = target
          ? target.getBoundingClientRect().top + window.scrollY
          : 0
        const margin = target
          ? parseFloat(getComputedStyle(target).scrollMarginTop) || 0
          : 0
        lenisRef.current.scrollTo(top - margin, { immediate: true })
      } else if (target) {
        target.scrollIntoView()
      } else {
        window.scrollTo(0, 0)
      }
      cleanup()
    }

    const findTarget = () => {
      const target = document.getElementById(hash.slice(1))
      if (!target?.getClientRects().length) return
      // Server HTML arrives before the homepage animation components hydrate.
      // The existing intro signals readiness after those layout effects run.
      if (
        pathname === "/" &&
        document.getElementById("hero")?.dataset.scrollReady !== "true"
      ) return
      observer?.disconnect()
      // Streamed sections must mount and initialize their pins before measuring.
      frame = requestAnimationFrame(() => position(target))
    }

    frame = requestAnimationFrame(() => {
      if (!hash) {
        position(null)
        return
      }

      observer = new MutationObserver(findTarget)
      observer.observe(document.getElementById("main-content") ?? document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-scroll-ready"],
      })
      window.addEventListener("wheel", cleanup, { passive: true })
      window.addEventListener("touchstart", cleanup, { passive: true })
      window.addEventListener("keydown", cleanup)
      findTarget()
    })

    return cleanup
  }, [pathname, reducedMotion])

  return null
}
