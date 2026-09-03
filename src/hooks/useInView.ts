"use client"

/**
 * Fires once (or continuously) when an element enters the viewport. Used to
 * trigger masked/clip reveals — never a generic fade — as sections arrive.
 */

import { useEffect, useRef, useState } from "react"

import { useReducedMotion } from "@/hooks/useReducedMotion"
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.25 },
  once = true,
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const reducedMotion = useReducedMotion()
  const root = options.root
  const rootMargin = options.rootMargin
  const threshold = options.threshold

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) io.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { root, rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, reducedMotion, root, rootMargin, threshold])

  return { ref, inView: reducedMotion || inView }
}
