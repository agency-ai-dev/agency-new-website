"use client";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer>
      {/* Blue CTA band */}
      <div className="section-blue" style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div className="chip" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderColor: "rgba(255,255,255,0.2)", marginBottom: 24 }}>
            Free forever plan available
          </div>
          <h2 style={{ fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 800, letterSpacing: "-.03em", color: "white", marginBottom: 16 }}>
            Ready to grow your store?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, marginBottom: 36 }}>
            Join 20,000+ Shopify merchants automating their ads with Agency AI.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn btn-white" style={{ fontSize: 15 }}>
              Install Free on Shopify
            </a>
            <Link href="/contact" className="btn btn-outline-white" style={{ fontSize: 15 }}>
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div style={{ background: "var(--ink)", padding: "56px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 40, marginBottom: 52 }}>
            {/* Brand */}
            <div style={{ gridColumn: "span 1" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.4 5.2H18l-4.4 3.4 1.6 5.4L10 13l-5.2 3 1.6-5.4L2 7.2h5.6L10 2z" fill="white"/></svg>
                </div>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 17, color: "white" }}>agency<span style={{ color: "#6BA3FF" }}>AI</span></span>
              </Link>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13.5, lineHeight: 1.7, maxWidth: 200 }}>
                AI-powered growth for Shopify stores. Launch faster, scale smarter.
              </p>
            </div>

            {[
              { title: "Product", links: [{ href: "/#features", l: "Features" }, { href: "/pricing", l: "Pricing" }, { href: "/#integrations", l: "Integrations" }] },
              { title: "Company", links: [{ href: "/about", l: "About" }, { href: "/blog", l: "Blog" }, { href: "/contact", l: "Contact" }] },
              { title: "Legal", links: [{ href: "/privacy", l: "Privacy Policy" }, { href: "/terms", l: "Terms" }] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 11.5, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>{col.title}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(l => (
                    <li key={l.l}><Link href={l.href} style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>{l.l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 11.5, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Newsletter</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13.5, marginBottom: 14 }}>Growth tips, delivered weekly.</p>
              {done ? (
                <p style={{ color: "#6BA3FF", fontSize: 14, fontWeight: 600 }}>✓ Subscribed!</p>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setDone(true); }} style={{ display: "flex", gap: 8 }}>
                  <input type="email" required placeholder="you@store.com" value={email} onChange={e => setEmail(e.target.value)}
                    style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "9px 12px", color: "white", fontSize: 13.5, outline: "none", fontFamily: "inherit" }} />
                  <button type="submit" style={{ background: "var(--blue)", color: "white", border: "none", borderRadius: 8, padding: "9px 14px", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 13 }}>→</button>
                </form>
              )}
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 24 }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>© 2025 Agency AI. All rights reserved.</p>
            <div style={{ display: "flex", gap: 16 }}>
              {[{ href: "/privacy", l: "Privacy" }, { href: "/terms", l: "Terms" }].map(({ href, l }) => (
                <Link key={l} href={href} style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
