import { socialLinks } from "@/data/socials"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      dir="rtl"
      className="relative overflow-hidden px-6 pb-8 pt-28 md:px-12"
      style={{ backgroundColor: "var(--color-night)" }}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="font-meta text-[11px] uppercase leading-loose tracking-[0.25em] text-white/60">
            Sharks Agency
            <br />
            Palestine — {year}
          </div>
          <nav
            className="flex gap-8 font-meta text-[11px] uppercase tracking-[0.2em] text-white/60"
            aria-label="روابط Sharks Agency"
          >
            {socialLinks
              .filter((link) => link.label !== "Email")
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="transition-colors hover:text-azure"
                >
                  {link.label}
                </a>
              ))}
          </nav>
        </div>

        {/* Enormous cropped wordmark */}
        <div className="pointer-events-none mt-10 select-none overflow-hidden leading-[0.72]">
          <span className="block translate-y-[16%] text-[27vw] font-bold tracking-tighter text-white">
            SHARKS
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between font-meta text-[10px] uppercase tracking-[0.2em] text-white/30">
          <span>© {year} — All rights reserved</span>
          <span className="text-azure">●</span>
        </div>
      </div>
    </footer>
  )
}
