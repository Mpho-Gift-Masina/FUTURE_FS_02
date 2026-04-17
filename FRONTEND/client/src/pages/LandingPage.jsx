import { useState } from "react";
import { motion } from "motion/react";
import { sendContactMessage } from "../lib/api";

const ICON_COLORS = ["#818cf8", "#22d3ee", "#f59e0b", "#34d399"];

const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Lead Capture",
    description:
      "Add new leads in seconds with a clean, distraction-free form. Every opportunity enters your pipeline organised from day one.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Pipeline Tracking",
    description:
      "See exactly where each lead stands — new, contacted, or converted. No confusion, no outdated spreadsheets.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Analytics Dashboard",
    description:
      "Track conversion rates, lead sources, and team activity from a single clean view updated in real time.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Notes & Context",
    description:
      "Attach notes to every lead so your team always knows what was said, what was promised, and what comes next.",
  },
];

const steps = [
  { number: "01", title: "Create your account", description: "Sign up in under a minute with just an email and password." },
  { number: "02", title: "Add your first lead", description: "Capture a prospect's details and drop them straight into your pipeline." },
  { number: "03", title: "Track and follow up", description: "Move leads through statuses, add notes, and never miss a follow-up." },
];

export default function LandingPage({ onGoToLogin, onGoToSignup, hasSession, onGoToDashboard }) {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState(null); // null | "sending" | "sent" | "error"

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      setContactStatus("sending");

      await sendContactMessage(contactForm);

      setContactStatus("sent");
      setContactForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      setContactStatus("error");
    }
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: "#09090f", color: "#f1f5f9" }}>

      {/* floating blob decorators */}
      <div
        className="blob-1 pointer-events-none fixed left-[-20%] top-[-15%] h-150 w-150 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", zIndex: 0 }}
      />
      <div
        className="blob-2 pointer-events-none fixed right-[-15%] top-[20%] h-125 w-125 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)", zIndex: 0 }}
      />

      {/* NAV */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-sm"
        style={{ background: "rgba(9,9,15,0.8)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold tracking-tight text-white">TechSol CRM</span>
          <div className="hidden items-center gap-8 text-sm text-slate-400 sm:flex">
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-200 transition-colors">How it works</a>
            <a href="#contact" className="hover:text-slate-200 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onGoToSignup}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Sign Up
            </button>
            <button
              onClick={hasSession ? onGoToDashboard : onGoToLogin}
              className="rounded-xl px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 pb-28 pt-20 text-center" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}
          >
            Simple tech solutions for growing teams
          </span>
          <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
            Manage leads with{" "}
            <span className="shimmer-text">clarity</span>{" "}
            and focus.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            A lightweight tool that keeps your pipeline organised, your team aligned,
            and your follow-ups on time — without the bloat.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={onGoToSignup}
              className="w-full rounded-2xl px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 6px 24px rgba(99,102,241,0.4)" }}
            >
              Create free account
            </button>
            <button
              onClick={hasSession ? onGoToDashboard : onGoToLogin}
              className="w-full rounded-2xl px-8 py-3.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors sm:w-auto"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Go to Dashboard
            </button>
          </div>
        </motion.div>

        {/* MOCK STATS */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "1.5rem",
          }}
        >
          {[
            { label: "Total Leads", value: "All in one place" },
            { label: "Pipeline Stages", value: "New → Converted" },
            { label: "Setup Time", value: "Under 2 minutes" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="px-6 py-8 text-center"
              style={i !== 2 ? { borderRight: "1px solid rgba(255,255,255,0.07)" } : {}}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{stat.label}</p>
              <p className="mt-1.5 text-sm font-semibold text-slate-300">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative px-6 py-24" style={{ zIndex: 1 }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.04) 50%, transparent 100%)" }}
        />
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Everything you need to close more deals
            </h2>
            <p className="mt-3 text-base text-slate-400">
              Built for small teams who want speed, clarity, and less friction in their sales process.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-3xl p-6"
                style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ background: `${ICON_COLORS[i]}22`, color: ICON_COLORS[i] }}
                >
                  {f.icon}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative px-6 py-24" style={{ zIndex: 1 }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Up and running in minutes</h2>
          <p className="mt-3 text-base text-slate-400">
            No training required. No complex setup. Just sign up and start capturing leads.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-4xl grid gap-5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative rounded-3xl p-8"
              style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span className="text-4xl font-bold" style={{ color: "rgba(99,102,241,0.25)" }}>{step.number}</span>
              <h3 className="mt-3 text-sm font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEVELOPER */}
      <section className="relative overflow-hidden px-6 py-28" style={{ zIndex: 1 }}>
        {/* section bg glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.05) 50%, transparent 100%)" }}
        />

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative grid items-center gap-12 lg:grid-cols-2"
          >

            {/* LEFT — big name + role */}
            <div>
              <span
                className="mb-5 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }}
              >
                About the Developer
              </span>

              <h2
                className="mb-2 text-6xl font-black leading-none tracking-tight text-white sm:text-7xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                Mpho
              </h2>
              <h2
                className="mb-6 text-6xl font-black leading-none tracking-tight sm:text-7xl"
                style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Masina
              </h2>

              <p className="text-lg font-medium tracking-wide text-slate-400 uppercase" style={{ letterSpacing: "0.15em" }}>
                Aspiring Full Stack Software Developer
              </p>

              {/* divider */}
              <div
                className="my-6 h-px w-16"
                style={{ background: "linear-gradient(90deg, #6366f1, transparent)" }}
              />

              {/* social links */}
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    label: "GitHub",
                    href: "https://github.com/Mpho-Gift-Masina",
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    ),
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/mpho-masina",
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Portfolio",
                    href: "https://mphomasina.netlify.app/",
                    icon: (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    ),
                  },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:text-white hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {icon}
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT — bio card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl p-8"
              style={{
                background: "linear-gradient(135deg, #111118 0%, #16162a 100%)",
                border: "1px solid rgba(99,102,241,0.18)",
                boxShadow: "0 0 80px rgba(99,102,241,0.1)",
              }}
            >
              {/* decorative glow blobs inside card */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #c084fc 0%, transparent 70%)" }}
              />

              <div className="relative">
                <p className="mb-6 text-base leading-relaxed text-slate-300">
                  An aspiring full stack software developer currently in his second year of study at the{" "}
                  <span className="font-semibold text-white">University of the Western Cape</span> — also a realistic artist bringing you organised and dynamic solutions for your business.
                </p>
                <p className="text-base leading-relaxed text-slate-400">
                  Passionate about clean interfaces, strong backend logic, and building tools that genuinely make a difference. Get in contact today!
                </p>

                {/* stats row */}
                <div
                  className="mt-8 grid grid-cols-3 divide-x"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", divideColor: "rgba(255,255,255,0.07)" }}
                >
                  {[
                    { value: "2nd Year", label: "UWC Student" },
                    { value: "Full Stack", label: "Specialisation" },
                    { value: "Artist", label: "Also a..." },
                  ].map((s, i) => (
                    <div
                      key={s.label}
                      className="px-4 text-center first:pl-0 last:pr-0"
                      style={i !== 2 ? { borderRight: "1px solid rgba(255,255,255,0.07)" } : {}}
                    >
                      <p className="text-sm font-bold text-white">{s.value}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* CTA BAND */}
      <section
        className="relative mx-5 mb-24 rounded-3xl px-8 py-16 text-center sm:mx-auto sm:max-w-4xl"
        style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)" , border: "1px solid rgba(99,102,241,0.25)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.2) 0%, transparent 60%)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Start organising your pipeline today.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-indigo-200">
            Free to use, fast to set up, and built to keep your team moving forward.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={onGoToSignup}
              className="w-full rounded-2xl px-8 py-3.5 text-sm font-semibold text-indigo-900 hover:opacity-90 transition-opacity sm:w-auto"
              style={{ background: "#fff" }}
            >
              Create free account
            </button>
            <button
              onClick={onGoToLogin}
              className="w-full rounded-2xl px-8 py-3.5 text-sm font-semibold text-indigo-200 hover:text-white transition-colors sm:w-auto"
              style={{ border: "1px solid rgba(165,180,252,0.35)" }}
            >
              Log in
            </button>
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative px-6 py-24" style={{ zIndex: 1 }}>
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">Get in touch</h2>
              <p className="mt-3 text-base text-slate-400">
                Have a question or want to learn more? Drop us a message.
              </p>
            </div>

            {contactStatus === "sent" ? (
              <div
                className="rounded-3xl px-8 py-12 text-center"
                style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}
              >
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(52,211,153,0.15)" }}
                >
                  <svg width="22" height="22" fill="none" stroke="#34d399" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-white">Message sent!</h3>
                <p className="mt-1 text-sm text-slate-400">We'll be in touch shortly.</p>
                <button
                  onClick={() => setContactStatus(null)}
                  className="mt-6 rounded-2xl px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                className="rounded-3xl p-8 space-y-5"
                style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    { label: "Name", name: "name", type: "text", placeholder: "Your name" },
                    { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
                  ].map(({ label, name, type, placeholder }) => (
                    <div key={name}>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={contactForm[name]}
                        onChange={handleContactChange}
                        placeholder={placeholder}
                        required
                        className="w-full rounded-2xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="How can we help you?"
                    required
                    rows={5}
                    className="w-full resize-none rounded-2xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactStatus === "sending"}
                  className="w-full rounded-2xl px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }}
                >
                  {contactStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="relative px-6 py-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)", zIndex: 1 }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <span className="font-medium text-slate-300">TechSol CRM</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-200 transition-colors">How it works</a>
            <a href="#contact" className="hover:text-slate-200 transition-colors">Contact</a>
            <button onClick={onGoToLogin} className="hover:text-slate-200 transition-colors">Log In</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
