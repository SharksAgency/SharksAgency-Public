"use client"
/** Wrapper that gets translated + rotated toward the cursor. */
/** Body group for organic secondary sway. */

/**
 * Cursor-follow with real swimming physics. The cursor is a *destination*, not
 * an anchor: the shark eases toward it with spring inertia, banks and rotates
 * toward its travel direction, stretches when accelerating, and its tail wags
 * harder — and biases toward the turn — the faster it swims. A constant gentle
 * undulation keeps it alive at rest. Everything is mutated on refs inside one
 * rAF loop, so React never re-renders on pointer move.
 */

// Spring feel: responsive but with a trailing, weighty follow.

// Rotate toward travel direction (shortest path) only while moving.
// Smooth the curve signal used for tail bias + banking.

// The sprite is drawn nose-right. When the heading points leftward we
// mirror it *horizontally* (never vertically) so it stays upright and the
// nose keeps leading the travel direction; the rotation is offset by 180°
// to compensate for the mirror. This is the fix for the shark appearing to
// face the opposite way — a vertical flip used to reverse its heading.

// Squash & stretch: elongate along the heading when fast (x is the shark's
// long axis), roughly volume-preserving via the vertical squash.
// Banking: subtle roll into turns read as a vertical squash pulse.

// Tail wag: constant sway + velocity amplitude + a bias toward the turn.

// Body counter-sway for life.
import { useEffect } from "react"
import type { RefObject } from "react"

export type SharkMotionMode = "pointer" | "autonomous" | "static"

type Options = {
  wrapperRef: RefObject<HTMLDivElement | null>
  tailRef: RefObject<SVGGElement | null>
  bodyRef?: RefObject<SVGGElement | null>
  mode: SharkMotionMode
}
export function useSharkPhysics({
  wrapperRef,
  tailRef,
  bodyRef,
  mode,
}: Options) {
  useEffect(() => {
    const wrap = wrapperRef.current
    if (!wrap) return

    let viewportWidth = window.innerWidth
    let viewportHeight = window.innerHeight
    let x = viewportWidth * 0.55
    let y = viewportHeight * 0.42
    let tx = x
    let ty = y
    let vx = 0
    let vy = 0
    let angle = 180
    let curveBias = 0
    let raf = 0
    const start = performance.now()

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const onResize = () => {
      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight
    }
    if (mode === "pointer")
      window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    const pointerStiffness = 0.055
    const pointerDamping = 0.82

    const loop = (now: number) => {
      const t = (now - start) / 1000

      if (mode === "autonomous") {
        tx =
          viewportWidth * 0.52 +
          Math.sin(t * 0.34) * Math.min(viewportWidth * 0.22, 140)
        ty =
          viewportHeight * 0.42 +
          Math.cos(t * 0.46) * Math.min(viewportHeight * 0.12, 70)
      }

      if (mode !== "static") {
        const stiffness = mode === "pointer" ? pointerStiffness : 0.018
        const damping = mode === "pointer" ? pointerDamping : 0.92
        const ax = (tx - x) * stiffness
        const ay = (ty - y) * stiffness
        vx = (vx + ax) * damping
        vy = (vy + ay) * damping
        x += vx
        y += vy
      }

      const speed = Math.hypot(vx, vy)
      let turn = 0
      if (speed > 0.4) {
        const target = (Math.atan2(vy, vx) * 180) / Math.PI
        let diff = ((target - angle + 540) % 360) - 180
        diff = Math.max(-9, Math.min(9, diff))
        turn = diff
        angle += diff * 0.18
      }
      curveBias += (turn - curveBias) * 0.1
      const norm = ((angle % 360) + 360) % 360
      const facingLeft = norm > 90 && norm < 270
      const stretch = 1 + Math.min(speed * 0.012, 0.16)
      const bank = 1 - Math.min(Math.abs(curveBias) * 0.01, 0.08)
      const idleBob = mode === "static" ? 0 : Math.sin(t * 1.6) * 1.2

      const sx = (facingLeft ? -1 : 1) * stretch
      const sy = bank / Math.sqrt(stretch)
      const rot = (facingLeft ? angle - 180 : angle) + idleBob

      wrap.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) ` +
        `rotate(${rot}deg) scale(${sx}, ${sy})`
      if (tailRef.current) {
        const amp = mode === "static" ? 0 : 4 + Math.min(speed * 2.4, 24)
        const freq = 4.5 + Math.min(speed * 0.45, 6)
        const wag = Math.sin(t * freq) * amp - curveBias * 1.1
        tailRef.current.style.transform = `rotate(${wag}deg)`
        tailRef.current.style.transformOrigin = "124px 104px"
      }
      if (bodyRef?.current) {
        const sway =
          mode === "static"
            ? 0
            : Math.sin(t * 2.4 + 0.5) * (1 + Math.min(speed * 0.18, 2))
        bodyRef.current.style.transform = `translateY(${sway}px)`
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("resize", onResize)
    }
  }, [wrapperRef, tailRef, bodyRef, mode])
}
