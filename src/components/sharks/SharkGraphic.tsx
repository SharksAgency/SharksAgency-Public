import { forwardRef } from "react"

type Props = {
  tailRef: React.RefObject<SVGGElement | null>
  bodyRef: React.RefObject<SVGGElement | null>
  className?: string
}

/**
 * Custom refined 2D shark — a sleek graphic side-profile (navy body, azure gill
 * detail, light-blue back highlight, pale belly). Anatomy is split so motion can
 * drive parts independently: the caudal tail wags with velocity, the body sways.
 * Drawn nose-right; the physics loop rotates/flips the wrapper toward travel.
 */
export const SharkGraphic = forwardRef<HTMLDivElement, Props>(
  function SharkGraphic({ tailRef, bodyRef, className = "" }, ref) {
    return (
      <div
        ref={ref}
        className={"pointer-events-none will-change-transform " + className}
      >
        <svg
          width="380"
          height="210"
          viewBox="0 0 380 210"
          className="block h-auto w-[clamp(180px,18vw,300px)] max-w-[70vw]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient
              id="sharkBody"
              x1="60"
              y1="60"
              x2="320"
              y2="150"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0"
                stopColor="color-mix(in oklab, var(--color-navy) 85%, var(--color-lightblue))"
              />
              <stop offset="1" stopColor="var(--color-navy)" />
            </linearGradient>
          </defs>

          {/* Caudal (tail) fin — wags with velocity, hinged at the body joint */}
          <g ref={tailRef}>
            <path
              d="M126 100 C96 84 60 58 34 34 C44 70 72 96 120 104 Z"
              fill="url(#sharkBody)"
            />
            <path
              d="M126 108 C110 120 92 140 80 160 C102 140 116 122 122 108 Z"
              fill="var(--color-navy)"
            />
          </g>

          {/* Body group — gentle secondary sway */}
          <g ref={bodyRef}>
            {/* Dorsal fin — tall, swept back */}
            <path
              d="M196 62 C204 30 222 12 240 6 C228 26 224 46 230 66 Z"
              fill="url(#sharkBody)"
            />
            {/* Pelvic fin (small, underside rear) */}
            <path
              d="M178 138 C182 154 190 162 200 165 C190 150 186 140 185 130 Z"
              fill="var(--color-navy)"
            />
            {/* Pectoral (side) fin — forward, underside */}
            <path
              d="M224 132 C238 160 258 172 280 175 C260 158 246 140 238 122 Z"
              fill="url(#sharkBody)"
            />

            {/* Main streamlined body, pointed snout to the right */}
            <path
              d="M120 100
               C136 68 176 52 220 54
               C262 56 300 68 336 96
               L346 105
               L336 114
               C300 138 262 150 220 150
               C176 152 136 134 120 108
               C118 105 118 103 120 100 Z"
              fill="url(#sharkBody)"
            />

            {/* Pale belly wedge */}
            <path
              d="M150 140 C200 152 260 148 320 118 C300 138 262 150 220 150 C192 151 168 147 150 140 Z"
              fill="var(--color-white)"
              opacity="0.06"
            />

            {/* Light-blue back highlight */}
            <path
              d="M156 74 C196 60 250 60 300 78"
              stroke="var(--color-lightblue)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* Azure gill slashes */}
            <g
              stroke="var(--color-azure)"
              strokeWidth="2.6"
              strokeLinecap="round"
            >
              <path d="M276 92 L271 110" />
              <path d="M285 90 L280 109" />
              <path d="M294 90 L289 108" />
            </g>

            {/* Eye */}
            <circle cx="316" cy="96" r="3.6" fill="var(--color-white)" />
            <circle cx="317" cy="96" r="1.7" fill="var(--color-azure)" />

            {/* Mouth line */}
            <path
              d="M344 110 C334 116 322 119 310 119"
              stroke="var(--color-white)"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.55"
            />
          </g>
        </svg>
      </div>
    )
  },
)
