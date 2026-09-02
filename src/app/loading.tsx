export default function Loading() {
  return (
    <div
      className="flex min-h-[70svh] items-center justify-center bg-canvas"
      role="status"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="font-meta text-xs font-medium uppercase tracking-[0.6em] text-navy">
          Sharks
        </span>
        <span className="h-px w-40 origin-right animate-[line-grow_1s_ease-in-out_infinite] bg-azure" />
        <span className="sr-only">جارٍ التحميل</span>
      </div>
    </div>
  )
}
