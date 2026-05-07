"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background .3s ease, border-color .3s ease, backdrop-filter .3s ease",
        background: scrolled ? "rgba(7,9,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#6366F1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9C3 5.686 5.686 3 9 3s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z" stroke="white" strokeWidth="1.5"/>
              <path d="M9 6v3l2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="9" r="1.5" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Onest',sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "-.02em" }}>
            agency<span style={{ color: "#818CF8" }}>ai</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden md:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: active ? 600 : 500,
                color: active ? "#fff" : "rgba(240,242,255,0.62)",
                background: active ? "rgba(99,102,241,0.18)" : "transparent",
                textDecoration: "none",
                transition: "color .2s, background .2s",
              }}
              onMouseEnter={e => { if (!active) { (e.target as HTMLElement).style.color = "#fff"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}}
              onMouseLeave={e => { if (!active) { (e.target as HTMLElement).style.color = "rgba(240,242,255,0.62)"; (e.target as HTMLElement).style.background = "transparent"; }}}
              >{label}</Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a
            href="https://apps.shopify.com/agency-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: "10px 20px", fontSize: 14 }}
          >
            <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11V5l5 5-5 5v-2H6V7h3z"/></svg>
            Get Free App
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#fff", display: "flex", alignItems: "center" }}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "rgba(7,9,26,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "16px 24px 24px" }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{ display: "block", padding: "12px 0", fontSize: 16, fontWeight: 500, color: pathname === href ? "#818CF8" : "rgba(240,242,255,0.8)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {label}
            </Link>
          ))}
          <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
            Get Free App
          </a>
        </div>
      )}
    </header>
  );
}
