import { useEffect, useState } from "react";

function SettingsPage({ admin }) {
  // Theme is stored in localStorage and applied via the `light-theme` class on <html>.
  // This component provides a secondary control so users can change theme from Settings.
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.classList.add('light-theme'); else root.classList.remove('light-theme');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  return (
    <section className="px-6 py-6 md:px-8">
      <div className="rounded-2xl p-6" style={{ background: 'var(--panel-bg)', border: '1px solid var(--border)' }}>
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Settings</h3>
        <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>Admin and application settings.</p>

        <div className="mt-6 rounded-xl p-4" style={{ background: 'var(--panel-bg)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Signed in as</p>
          <p className="mt-2 font-medium" style={{ color: 'var(--text)' }}>{admin?.email}</p>
        </div>

        <div className="mt-6 rounded-xl p-4" style={{ background: 'var(--panel-bg)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Appearance</p>
          <div className="mt-3 flex items-center gap-3">
            <p className="text-sm" style={{ color: 'var(--text)' }}>Theme</p>
            <div className="ml-auto">
              <button
                onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
                className="rounded-xl px-3 py-2 text-sm font-medium"
                style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }}
              >
                {theme === 'light' ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;