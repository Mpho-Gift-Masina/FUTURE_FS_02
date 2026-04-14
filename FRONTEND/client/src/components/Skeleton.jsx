// Reusable skeleton primitives — all use the .skeleton CSS class for the shimmer sweep.

/** A single shimmer block. Pass className for size/shape. */
export function SkeletonBlock({ className = "", style = {} }) {
  return <div className={`skeleton ${className}`} style={style} />;
}

/** 4 stat-card skeletons matching the StatCard grid layout. */
export function StatCardsSkeleton() {
  return (
    <section className="px-6 py-6 md:px-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl p-5"
            style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* top row: dot + badge */}
            <div className="mb-4 flex items-center justify-between">
              <SkeletonBlock className="h-2 w-2 rounded-full" />
              <SkeletonBlock className="h-5 w-16 rounded-full" />
            </div>
            {/* value */}
            <SkeletonBlock className="mb-2 h-8 w-14 rounded-lg" />
            {/* title */}
            <SkeletonBlock className="h-3 w-24 rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Skeleton for the leads table — card + N placeholder rows. */
export function TableSkeleton({ rows = 6 }) {
  return (
    <section className="px-6 pb-8 md:px-8">
      <div
        className="overflow-hidden rounded-2xl"
        style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* filter bar */}
        <div
          className="flex items-center gap-2 px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-7 w-20 rounded-xl" />
          ))}
          <SkeletonBlock className="ml-auto h-7 w-32 rounded-xl" />
        </div>

        {/* header row */}
        <div
          className="grid px-5 py-3"
          style={{
            gridTemplateColumns: "2fr 2fr 1.2fr 1.2fr 1fr 1fr",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-3 w-16 rounded-md" />
          ))}
        </div>

        {/* data rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid items-center px-5 py-4"
            style={{
              gridTemplateColumns: "2fr 2fr 1.2fr 1.2fr 1fr 1fr",
              borderBottom: i < rows - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              opacity: 1 - i * 0.1,
            }}
          >
            {/* name + email stacked */}
            <div className="flex flex-col gap-1.5">
              <SkeletonBlock className="h-3 w-28 rounded-md" />
              <SkeletonBlock className="h-2.5 w-36 rounded-md" />
            </div>
            <SkeletonBlock className="h-3 w-32 rounded-md" />
            {/* status badge */}
            <SkeletonBlock className="h-5 w-20 rounded-full" />
            <SkeletonBlock className="h-3 w-16 rounded-md" />
            <SkeletonBlock className="h-3 w-24 rounded-md" />
            <SkeletonBlock className="h-7 w-14 rounded-xl" />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Combined dashboard skeleton — stat cards + table. */
export function DashboardSkeleton({ rows = 6 }) {
  return (
    <>
      <StatCardsSkeleton />
      <TableSkeleton rows={rows} />
    </>
  );
}
