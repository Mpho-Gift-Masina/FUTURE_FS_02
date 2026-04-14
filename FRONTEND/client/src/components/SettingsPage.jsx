function SettingsPage({ admin }) {
  return (
    <section className="px-6 py-6 md:px-8">
      <div className="rounded-2xl p-6" style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}>
        <h3 className="text-lg font-semibold text-white">Settings</h3>
        <p className="mt-1 text-sm text-slate-500">Admin and application settings.</p>

        <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Signed in as</p>
          <p className="mt-2 font-medium text-slate-200">{admin?.email}</p>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;