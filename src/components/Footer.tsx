"use client";
import Link from "next/link";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/#integrations", label: "Integrations" },
      { href: "/#testimonials", label: "Testimonials" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
      { href: "/contact", label: "Schedule Demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", paddingTop: 64, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#6366F1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9C3 5.686 5.686 3 9 3s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z" stroke="white" strokeWidth="1.5"/>
                  <circle cx="9" cy="9" r="1.5" fill="white"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Onest',sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>
                agency<span style={{ color: "#818CF8" }}>ai</span>
              </span>
            </Link>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, maxWidth: 220 }}>
              AI-powered growth engine for Shopify stores. Launch, optimize, and scale with confidence.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {[
                { label: "X", href: "https://twitter.com/agencyai", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg> },
                { label: "LinkedIn", href: "https://linkedin.com", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{ width: 36, height: 36, borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", textDecoration: "none", transition: "color .2s, border-color .2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: "'Onest',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 16 }}>{col.title}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ color: "var(--text-muted)", fontSize: 14, textDecoration: "none", transition: "color .2s" }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}
                    >{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <p style={{ fontFamily: "'Onest',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 16 }}>Stay Updated</p>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 14 }}>Growth tips & product updates.</p>
            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", gap: 8 }}>
              <input type="email" placeholder="you@store.com" className="input-field" style={{ flex: 1, fontSize: 14, padding: "10px 14px" }} />
              <button type="submit" style={{ background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 14px", cursor: "pointer", flexShrink: 0, fontFamily: "'Onest',sans-serif", fontWeight: 600, fontSize: 13, transition: "background .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.background = "#4F46E5"}
                onMouseLeave={e => (e.target as HTMLElement).style.background = "var(--primary)"}
              >→</button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-glow" style={{ marginBottom: 28 }} />

        {/* Bottom */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ color: "var(--text-dim)", fontSize: 13 }}>© 2025 Agency AI. All rights reserved. Built for Shopify merchants.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ color: "var(--text-dim)", fontSize: 13, textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text)"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-dim)"}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
