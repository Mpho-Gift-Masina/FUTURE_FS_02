import { motion } from "motion/react";

const statusStyle = {
  New: { background: "rgba(6,182,212,0.15)", color: "#22d3ee" },
  Contacted: { background: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  Converted: { background: "rgba(16,185,129,0.15)", color: "#34d399" },
};

function LeadsTable({
  leads,
  activeFilter,
  setActiveFilter,
  onViewLead,
  sortField,
  sortDirection,
  onSort,
}) {
  const filters = ["All", "New", "Contacted", "Converted"];

  const getSortLabel = (field, label) => {
    if (sortField !== field) return label;
    return `${label} ${sortDirection === "asc" ? "↑" : "↓"}`;
  };

  const SortButton = ({ field, label }) => (
    <button
      type="button"
      onClick={() => onSort(field)}
      className="font-medium text-slate-400 hover:text-slate-200 transition-colors"
    >
      {getSortLabel(field, label)}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="overflow-hidden rounded-2xl"
      style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div
        className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div>
          <h3 className="text-base font-semibold text-white">Recent Leads</h3>
          <p className="text-sm text-slate-500">View and manage your latest incoming leads.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((label) => {
            const isActive = activeFilter === label;
            return (
              <motion.button
                key={label}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveFilter(label)}
                className="rounded-xl px-4 py-1.5 text-sm font-medium transition-all"
                style={
                  isActive
                    ? { background: "rgba(99,102,241,0.2)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.4)" }
                    : { background: "rgba(255,255,255,0.04)", color: "#64748b", border: "1px solid rgba(255,255,255,0.07)" }
                }
              >
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-200 w-full text-left">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                <SortButton field="name" label="Name" />
              </th>
              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                <SortButton field="email" label="Email" />
              </th>
              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                <SortButton field="source" label="Source" />
              </th>
              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                <SortButton field="status" label="Status" />
              </th>
              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">Last Note</th>
              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.length > 0 ? (
              leads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: index * 0.04 }}
                  className="group transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-200">{lead.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{lead.email}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{lead.source}</td>
                  <td className="px-5 py-4">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={statusStyle[lead.status] || statusStyle.New}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400 max-w-45 truncate">{lead.note}</td>
                  <td className="px-5 py-4">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onViewLead(lead)}
                      className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:text-white"
                      style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
                    >
                      View
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-5 py-14 text-center text-sm text-slate-600">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default LeadsTable;
