import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  New: "#22d3ee",
  Contacted: "#fbbf24",
  Converted: "#34d399",
};

const PIE_COLORS = ["#818cf8", "#22d3ee", "#f43f5e", "#34d399", "#fbbf24", "#c084fc"];

const darkTooltipStyle = {
  contentStyle: {
    background: "#16161f",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "#f1f5f9",
    fontSize: "13px",
  },
  cursor: { fill: "rgba(255,255,255,0.04)" },
};

const SummaryCard = ({ label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="relative overflow-hidden rounded-2xl p-5"
    style={{
      background: "#111118",
      border: `1px solid ${color}40`,
      boxShadow: `0 0 24px ${color}20`,
    }}
  >
    <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${color}18 0%, transparent 60%)` }} />
    <p className="relative text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
    <p className="relative mt-2 text-4xl font-bold text-white">{value}</p>
    <div className="absolute -right-3 -top-3 h-14 w-14 rounded-full opacity-10" style={{ background: color }} />
  </motion.div>
);

function AnalyticsPage({ leads }) {
  const statusData = [
    { name: "New", value: leads.filter((l) => l.status === "New").length },
    { name: "Contacted", value: leads.filter((l) => l.status === "Contacted").length },
    { name: "Converted", value: leads.filter((l) => l.status === "Converted").length },
  ];

  const sourceMap = leads.reduce((acc, lead) => {
    const source = lead.source || "Unknown";
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  const sourceData = Object.entries(sourceMap).map(([name, value]) => ({ name, value }));

  const totalLeads = leads.length;
  const convertedCount = leads.filter((l) => l.status === "Converted").length;
  const conversionRate = totalLeads > 0 ? `${Math.round((convertedCount / totalLeads) * 100)}%` : "0%";

  return (
    <section className="px-6 py-6 md:px-8">
      <div className="space-y-6">

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard label="Total Leads" value={totalLeads} color="#818cf8" delay={0} />
          <SummaryCard label="Converted Leads" value={convertedCount} color="#34d399" delay={0.08} />
          <SummaryCard label="Conversion Rate" value={conversionRate} color="#22d3ee" delay={0.16} />
        </div>

        {/* Charts */}
        <div className="grid gap-6 xl:grid-cols-2">

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl p-6"
            style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h4 className="text-base font-semibold text-white">Status Breakdown</h4>
            <p className="mt-1 text-sm text-slate-500">Current pipeline distribution</p>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} barSize={36}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} allowDecimals={false} />
                  <Tooltip {...darkTooltipStyle} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {statusData.map((entry) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || "#818cf8"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl p-6"
            style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h4 className="text-base font-semibold text-white">Lead Sources</h4>
            <p className="mt-1 text-sm text-slate-500">Where your leads are coming from</p>
            <div className="mt-4 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData.length > 0 ? sourceData : [{ name: "No data", value: 1 }]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={4}
                    strokeWidth={0}
                  >
                    {(sourceData.length > 0 ? sourceData : [{ name: "No data" }]).map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={sourceData.length > 0 ? PIE_COLORS[index % PIE_COLORS.length] : "#1e1e2e"}
                      />
                    ))}
                  </Pie>
                  <Tooltip {...darkTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 space-y-2">
              {sourceData.length > 0 ? sourceData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl px-4 py-2.5"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[index % PIE_COLORS.length] }} />
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </div>
              )) : (
                <p className="text-center text-sm text-slate-600 py-2">No source data yet</p>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default AnalyticsPage;
