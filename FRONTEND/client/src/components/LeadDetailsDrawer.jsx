import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const INPUT_STYLE = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#f1f5f9",
};

const statusStyle = {
  New: { background: "rgba(6,182,212,0.15)", color: "#22d3ee" },
  Contacted: { background: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  Converted: { background: "rgba(16,185,129,0.15)", color: "#34d399" },
};

function LeadDetailsDrawer({
  selectedLead,
  onClose,
  onUpdateStatus,
  onAddNote,
  onDeleteLead,
}) {
  const [noteText, setNoteText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!selectedLead) return null;

  const handleStatusChange = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const nextStatus =
        selectedLead.status === "New" ? "Contacted"
        : selectedLead.status === "Contacted" ? "Converted"
        : "New";
      await onUpdateStatus(selectedLead.id, nextStatus);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setError("");
    setIsSubmitting(true);
    try {
      await onAddNote(selectedLead.id, noteText);
      setNoteText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await onDeleteLead(selectedLead.id);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex justify-end"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="h-full w-full max-w-xl overflow-y-auto"
          style={{ background: "#0d0d16", borderLeft: "1px solid rgba(255,255,255,0.07)" }}
          initial={{ x: 420 }}
          animate={{ x: 0 }}
          exit={{ x: 420 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex items-center justify-between px-6 py-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div>
              <h3 className="text-lg font-semibold text-white">Lead Details</h3>
              <p className="text-sm text-slate-500">Review contact info and notes.</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Close
            </button>
          </div>

          <div className="space-y-4 px-6 py-6">
            {/* Header card */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-2xl font-bold text-white">{selectedLead.name}</h4>
                  <p className="mt-1 text-sm text-slate-400">{selectedLead.email}</p>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-medium" style={statusStyle[selectedLead.status]}>
                  {selectedLead.status}
                </span>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { label: "Source", value: selectedLead.source },
                { label: "Phone", value: selectedLead.phone || "Not provided" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-1.5 text-sm font-medium text-slate-200">{value}</p>
                </div>
              ))}
            </div>

            {/* Latest Note */}
            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">Latest Note</p>
              <p className="text-sm leading-relaxed text-slate-300">{selectedLead.note}</p>
            </div>

            {/* Add Note */}
            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Add Note
              </label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows="4"
                placeholder="Write a follow-up note..."
                className="w-full rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none resize-none transition-colors"
                style={INPUT_STYLE}
                onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm text-red-400" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleStatusChange}
                disabled={isSubmitting}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}
              >
                {selectedLead.status === "New" ? "Mark as Contacted"
                  : selectedLead.status === "Contacted" ? "Mark as Converted"
                  : "Reset to New"}
              </button>

              <button
                onClick={handleAddNote}
                disabled={isSubmitting}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors disabled:opacity-50"
                style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
              >
                Save Note
              </button>

              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                style={{ border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)" }}
              >
                Delete Lead
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default LeadDetailsDrawer;
