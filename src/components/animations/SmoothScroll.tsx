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
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target ?? 0, { immediate: true })
      } else if (target) {
        target.scrollIntoView()
      } else {
        window.scrollTo(0, 0)
      }
      if (!reducedMotion) ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, reducedMotion])

  return null
}
