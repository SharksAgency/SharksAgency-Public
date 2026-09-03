import type { SiteContent } from "@/types/content"

export function Contact({
  asPage = false,
  content,
}: {
  asPage?: boolean
  content: Pick<SiteContent, "contact" | "socialLinks">
}) {
  const Heading = asPage ? "h1" : "h2"

  return (
    <section
      id="contact"
      dir="rtl"
      className="relative scroll-mt-24 overflow-hidden bg-canvas px-6 py-40 md:px-12"
    >
      <div className="mx-auto max-w-[1600px]">
        <Heading className="max-w-[20ch] text-[8vw] font-semibold leading-[1.1] tracking-tight text-navy md:text-[3.4vw]">
          {content.contact.headingBefore}
          <span className="text-azure">
            {content.contact.headingHighlight}
          </span>
          {content.contact.headingAfter}
        </Heading>

        {/* Massive interactive word */}
        <a
          href={`mailto:${content.contact.email}`}
          data-cursor="cta"
          className="group relative mt-8 inline-block"
        >
          <span className="block origin-right text-[26vw] font-bold leading-none tracking-tighter text-navy transition-all duration-500 ease-brand group-hover:[transform:scaleX(1.06)] group-hover:text-azure md:text-[18vw]">
            {content.contact.ctaLabel}
            <span className="inline-block transition-transform duration-500 ease-brand group-hover:translate-x-6">
              ↗
            </span>
          </span>

          {/* azure line underneath */}
          <span className="absolute -bottom-2 right-0 block h-1 w-0 bg-azure transition-[width] duration-500 ease-brand group-hover:w-full" />

          {/* fin cut sweeping through */}
          <span className="pointer-events-none absolute left-[-30%] top-0 h-full w-1/4 -skew-x-12 bg-azure/20 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
        </a>

        {/* Contact info */}
        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-navy/12 pt-12 lg:grid-cols-4">
          {content.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              data-cursor="link"
              className="group flex flex-col gap-2"
            >
              <span className="font-meta text-[11px] uppercase tracking-[0.25em] text-navy/40">
                {link.label}
              </span>
              <span className="flex items-center gap-2 text-lg text-navy transition-colors duration-300 group-hover:text-azure md:text-xl">
                <bdi
                  dir={link.href.startsWith("tel:") ? "ltr" : undefined}
                  className={
                    link.href.startsWith("tel:")
                      ? "whitespace-nowrap text-base md:text-xl"
                      : undefined
                  }
                >
                  {link.value}
                </bdi>
                <span className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
