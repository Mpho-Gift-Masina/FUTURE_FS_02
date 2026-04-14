import { motion } from "motion/react";

function NotesPage({ filteredLeads }) {
  return (
    <section className="px-6 py-6 md:px-8">
      <div className="rounded-2xl p-6" style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}>
        <h3 className="text-lg font-semibold text-white">Notes</h3>
        <p className="mt-1 text-sm text-slate-500">Recent follow-up notes across leads.</p>

        <div className="mt-6 space-y-3">
          {filteredLeads.length > 0 ? filteredLeads.map((lead, i) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <p className="text-sm font-medium text-slate-200">{lead.name}</p>
                <span className="text-xs text-slate-600">{lead.email}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{lead.note}</p>
            </motion.div>
          )) : (
            <p className="py-8 text-center text-sm text-slate-600">No notes yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default NotesPage;