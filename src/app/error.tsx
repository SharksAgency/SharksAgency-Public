"use client"

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="flex min-h-[80svh] flex-col items-start justify-center px-6 md:px-12">
      <span className="font-meta text-[11px] uppercase tracking-[0.4em] text-azure">
        Something shifted
      </span>
      <h1 className="mt-6 max-w-[18ch] text-[11vw] font-bold leading-[0.95] tracking-tight text-navy md:text-[5vw]">
        انحرف المسار قليلًا. دعنا نعيد{" "}
        <span className="text-azure">الاتجاه</span>.
      </h1>
      <button
        type="button"
        onClick={reset}
        data-cursor="cta"
        className="mt-10 border-b border-navy/20 pb-1 text-lg text-navy transition-colors hover:border-azure hover:text-azure"
      >
        المحاولة مرة أخرى ↖
      </button>
    </section>
  )
}
