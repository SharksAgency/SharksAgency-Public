type Props = {
  className?: string
  color?: string
}

/**
 * Reusable abstract shark-fin silhouette — a sharp rising curve / directional
 * cut, not a literal fin illustration. Reserved for section transitions
 * (enters from bottom, slices through, reveals the next section).
 */
export function FinShape({
  className = "",
  color = "var(--color-azure)",
}: Props) {
  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      {/* Rising sharp curve with a directional trailing cut */}
      <path
        d="M0 200 L0 190 C120 190 210 150 300 40 C320 16 340 4 360 0 L400 60 L400 200 Z"
        fill={color}
      />
    </svg>
  )
}
