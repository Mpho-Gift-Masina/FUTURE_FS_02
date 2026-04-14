import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const INPUT_CLASS = "w-full rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors";
const INPUT_STYLE = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" };

function AddLeadModal({ isOpen, onClose, onAddLead }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", source: "", status: "New", note: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email) return;
    onAddLead({ id: Date.now(), ...formData });
    setFormData({ name: "", email: "", phone: "", source: "", status: "New", note: "" });
    onClose();
  };

  const handleFocus = (e) => (e.target.style.borderColor = "rgba(99,102,241,0.5)");
  const handleBlur = (e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl rounded-2xl"
            style={{ background: "#0d0d16", border: "1px solid rgba(255,255,255,0.09)" }}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div>
                <h3 className="text-lg font-semibold text-white">Add New Lead</h3>
                <p className="text-sm text-slate-500">Capture a new client lead into TechSol CRM.</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
                  { label: "Email Address", name: "email", type: "email", placeholder: "john@example.com" },
                  { label: "Phone", name: "phone", type: "text", placeholder: "+1 234 567 8900" },
                  { label: "Source", name: "source", type: "text", placeholder: "Website, Referral..." },
                ].map(({ label, name, type, placeholder }) => (
                  <div key={name}>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={INPUT_CLASS}
                      style={INPUT_STYLE}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                    style={{ ...INPUT_STYLE, colorScheme: "dark" }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">Note</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add an initial note..."
                  className={`${INPUT_CLASS} resize-none`}
                  style={INPUT_STYLE}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}
                >
                  Save Lead
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddLeadModal;
