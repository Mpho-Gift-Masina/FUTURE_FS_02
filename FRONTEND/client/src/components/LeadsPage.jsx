import LeadsTable from "./LeadsTable";

function LeadsPage({
  filteredLeads,
  activeFilter,
  setActiveFilter,
  setSelectedLead,
  sortField,
  sortDirection,
  onSort,
}) {
  return (
    <section className="px-6 py-6 md:px-8">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">All Leads</h3>
        <p className="mt-1 text-sm text-slate-500">Manage your full lead list here.</p>
      </div>
      <LeadsTable
        leads={filteredLeads}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onViewLead={setSelectedLead}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={onSort}
      />
    </section>
  );
}

export default LeadsPage;