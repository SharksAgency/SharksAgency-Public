export function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-canvas px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-center gap-4">
          <span className="font-meta text-[11px] uppercase tracking-[0.4em] text-azure">
            Sharks Journal
          </span>
          <span className="h-px w-10 bg-azure/50" />
          <span className="font-meta text-[11px] uppercase tracking-[0.3em] text-navy/45">
            / المدونة
          </span>
        </div>

        <div className="relative mt-10 grid grid-cols-12 items-end gap-6">
          <h1 className="col-span-12 max-w-[15ch] text-[15vw] font-bold leading-[0.92] tracking-tight text-navy md:col-span-9 md:text-[7.5vw]">
            نكتب عن الأشياء التي تغيّر{" "}
            <span className="text-azure">الاتجاه</span>.
          </h1>
          <div className="col-span-12 flex flex-wrap gap-x-6 gap-y-1 font-meta text-[11px] uppercase tracking-[0.25em] text-navy/40 md:col-span-3 md:flex-col md:items-end md:gap-y-2">
            {["Strategy", "Design", "Branding", "Digital", "Culture"].map(
              (label) => (
                <span key={label}>{label}</span>
              ),
            )}
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-navy/10">
          <span className="block h-px w-1/3 bg-azure" />
        </div>
      </div>
    </section>
  )
}
