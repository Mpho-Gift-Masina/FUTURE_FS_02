import StatCard from "./StatCard";
import LeadsTable from "./LeadsTable";
import { DashboardSkeleton } from "./Skeleton";

function DashboardOverview({
  stats,
  isLoading,
  pageError,
  filteredLeads,
  activeFilter,
  setActiveFilter,
  setSelectedLead,
  sortField,
  sortDirection,
  onSort,
}) {
  if (isLoading) return <DashboardSkeleton rows={6} />;

  return (
    <>
      <section className="px-6 py-6 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
            />
          ))}
        </div>
      </section>

      <section className="px-6 pb-8 md:px-8">
        {pageError ? (
          <div className="rounded-2xl p-10 text-center text-red-400" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            {pageError}
          </div>
        ) : (
          <LeadsTable
            leads={filteredLeads}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onViewLead={setSelectedLead}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        )}
      </section>
    </>
  );
}

export default DashboardOverview;