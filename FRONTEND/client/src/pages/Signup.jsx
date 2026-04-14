import { useState } from "react";
import { motion } from "motion/react";
import { registerAdmin, setAdminData, setAuthToken } from "../lib/api";

function Signup({ onSignupSuccess, onGoToLogin, onGoToLanding }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await registerAdmin(formData.email, formData.password);
      setAuthToken(data.token);
      setAdminData(data.admin);
      onSignupSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocus = (e) => (e.target.style.borderColor = "rgba(99,102,241,0.5)");
  const handleBlur = (e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)");
  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9" };

  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "#09090f" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md rounded-3xl p-8"
        style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <button
          onClick={onGoToLanding}
          className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to home
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Create account</h1>
          <p className="mt-2 text-sm text-slate-500">Get started with your free TechSol CRM workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
            { label: "Password", name: "password", type: "password", placeholder: "At least 6 characters" },
            { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Repeat your password" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="w-full rounded-2xl px-4 py-3 text-sm placeholder-slate-600 outline-none transition-colors"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          ))}

          {error && (
            <div className="rounded-2xl px-4 py-3 text-sm text-red-400" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <button onClick={onGoToLogin} className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
