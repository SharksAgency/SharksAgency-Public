import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  active?: boolean
  className?: string
}

/**
 * Service/discipline tag. Thin outlined rectangle with a single cut corner —
 * not a rounded pill. On hover a thin azure fill tracks across the label.
 */
export function Tag({ children, active = false, className = "" }: Props) {
  const clip = "polygon(7px 0, 100% 0, 100% 100%, 0 100%, 0 7px)"
  return (
    <span
      className={
        "group relative inline-flex select-none items-center overflow-hidden px-3 py-1 " +
        "font-meta text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 " +
        (active
          ? "border border-azure text-white"
          : "border border-navy/30 text-navy ") +
        className
      }
      style={{ clipPath: clip }}
    >
      <span
        aria-hidden
        className={
          "absolute inset-0 origin-right scale-x-0 bg-azure transition-transform duration-[400ms] ease-brand group-hover:scale-x-100 " +
          (active ? "scale-x-100" : "")
        }
      />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
    </span>
  )
}
