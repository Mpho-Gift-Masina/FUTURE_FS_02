import { motion } from "motion/react";

const colorMap = {
  "Total Leads": {
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(17,17,26,0) 65%)",
    border: "rgba(99,102,241,0.25)",
    dot: "#818cf8",
    badge: { background: "rgba(99,102,241,0.15)", color: "#818cf8" },
    glow: "rgba(99,102,241,0.2)",
  },
  "New": {
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.14) 0%, rgba(17,17,26,0) 65%)",
    border: "rgba(6,182,212,0.25)",
    dot: "#22d3ee",
    badge: { background: "rgba(6,182,212,0.15)", color: "#22d3ee" },
    glow: "rgba(6,182,212,0.2)",
  },
  "Contacted": {
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(17,17,26,0) 65%)",
    border: "rgba(245,158,11,0.25)",
    dot: "#fbbf24",
    badge: { background: "rgba(245,158,11,0.15)", color: "#fbbf24" },
    glow: "rgba(245,158,11,0.2)",
  },
  "Converted": {
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.14) 0%, rgba(17,17,26,0) 65%)",
    border: "rgba(16,185,129,0.25)",
    dot: "#34d399",
    badge: { background: "rgba(16,185,129,0.15)", color: "#34d399" },
    glow: "rgba(16,185,129,0.2)",
  },
};

const fallback = {
  gradient: "linear-gradient(135deg, rgba(100,116,139,0.14) 0%, rgba(17,17,26,0) 65%)",
  border: "rgba(100,116,139,0.25)",
  dot: "#94a3b8",
  badge: { background: "rgba(100,116,139,0.15)", color: "#94a3b8" },
  glow: "rgba(100,116,139,0.15)",
};

function StatCard({ title, value, change }) {
  const c = colorMap[title] || fallback;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl p-5"
      style={{
        background: "#111118",
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 30px ${c.glow}`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: c.gradient }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full" style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }} />
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{title}</p>
        </div>
        <p className="text-4xl font-bold tracking-tight text-white">{value}</p>
        <span
          className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
          style={c.badge}
        >
          {change}
        </span>
      </div>
    </motion.div>
  );
}

export default StatCard;
