import type { ReactNode } from "react"
import Link from "next/link"

type Props = {
  children: ReactNode
  href?: string
  variant?: "solid" | "outline"
  className?: string
}

/**
 * Primary Sharks CTA. Not a pill: a rectangle with one angled (fin) corner.
 * On hover an azure fill sweeps in from the trailing edge (right → left, the
 * forward direction in RTL), the arrow advances, and the whole shape nudges
 * toward its heading — a feeling of forward motion. Text stays stable.
 */
export function SharkButton({
  children,
  href = "/contact",
  variant = "solid",
  className = "",
}: Props) {
  const solid = variant === "solid"
  // Angled leading (left) corner — the "fin cut".
  const clip = "polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px))"

  return (
    <Link
      href={href}
      data-cursor="cta"
      aria-label={typeof children === "string" ? children : undefined}
      className={
        "group relative inline-flex items-center gap-3 overflow-hidden px-7 py-3.5 " +
        "text-[15px] font-medium tracking-tight transition-transform duration-500 " +
        "ease-brand hover:-translate-x-1 " +
        (solid ? "bg-navy" : "border border-navy text-navy ") +
        className
      }
      style={{
        clipPath: clip,
        borderRadius: "2px",
        // Keep the CTA legible even while the theme tokens are being bootstrapped.
        color: solid ? "var(--color-canvas)" : "var(--color-navy)",
      }}
    >
      {/* Azure fill travelling right → left */}
      <span
        aria-hidden
        className="absolute inset-0 origin-right scale-x-0 bg-azure transition-transform duration-500 ease-brand group-hover:scale-x-100"
      />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
      <span
        aria-hidden
        className="relative z-10 inline-block transition-transform duration-500 ease-brand group-hover:translate-x-1.5 group-hover:-translate-y-1 group-hover:text-white"
      >
        ↗
      </span>
    </Link>
  )
}
