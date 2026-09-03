type Props = {
  vertical?: boolean
  className?: string
  /** Delay before the line grows in, seconds. */
  delay?: number
  animate?: boolean
}

/**
 * The recurring azure "direction line" — represents direction, movement and
 * continuity across the site. Grows from its origin rather than fading in.
 */
export function DirectionLine({
  vertical = false,
  className = "",
  delay = 0,
  animate = true,
}: Props) {
  return (
    <span
      className={
        "block bg-azure " +
        (vertical ? "w-px origin-top " : "h-px w-full origin-right ") +
        className
      }
      style={
        animate
          ? {
              animation: `${
                vertical ? "line-grow-y" : "line-grow"
              } 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s both`,
            }
          : undefined
      }
    />
  )
}
