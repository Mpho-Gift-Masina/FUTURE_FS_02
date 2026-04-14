import { AnimatePresence, motion } from "motion/react";

function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          className="fixed right-5 top-5 z-60"
        >
          <div
            className="min-w-80 rounded-2xl px-4 py-4 shadow-2xl"
            style={{
              background: toast.type === "error" ? "rgba(239,68,68,0.12)" : "rgba(52,211,153,0.1)",
              border: toast.type === "error" ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(52,211,153,0.25)",
              color: toast.type === "error" ? "#fca5a5" : "#6ee7b7",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">
                  {toast.type === "error" ? "Something went wrong" : "Success"}
                </p>
                <p className="mt-1 text-sm">{toast.message}</p>
              </div>

              <button
                onClick={onClose}
                className="text-sm font-medium opacity-70 hover:opacity-100"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;