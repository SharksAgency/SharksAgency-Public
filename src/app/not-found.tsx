import Link from "next/link"

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-start justify-center px-6 md:px-12">
      <span className="font-meta text-[11px] uppercase tracking-[0.4em] text-azure">
        404 — Off Course
      </span>
      <h1 className="mt-6 max-w-[16ch] text-[12vw] font-bold leading-[0.95] tracking-tight text-navy md:text-[6vw]">
        هذه الصفحة خارج <span className="text-azure">الاتجاه</span>.
      </h1>
      <Link
        href="/"
        data-cursor="cta"
        className="group mt-10 inline-flex items-center gap-2 font-meta text-sm uppercase tracking-[0.25em] text-navy transition-colors hover:text-azure"
      >
        العودة إلى الرئيسية
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          ↖
        </span>
      </Link>
    </section>
  )
}
