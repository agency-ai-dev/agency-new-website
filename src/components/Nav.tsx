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
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "white",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1.5px solid #E2E8F8" : "1.5px solid transparent",
      transition: "border-color .3s, box-shadow .3s",
      boxShadow: scrolled ? "0 2px 20px rgba(0,87,255,0.06)" : "none",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2l2.4 5.2H18l-4.4 3.4 1.6 5.4L10 13l-5.2 3 1.6-5.4L2 7.2h5.6L10 2z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 18, color: "var(--ink)", letterSpacing: "-.02em" }}>
            agency<span style={{ color: "var(--blue)" }}>AI</span>
          </span>
        </Link>

        {/* Desktop */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden md:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} style={{
                padding: "7px 15px", borderRadius: 8, fontSize: 14.5, fontWeight: active ? 700 : 500,
                color: active ? "var(--blue)" : "var(--muted)",
                background: active ? "var(--blue-light)" : "transparent",
                textDecoration: "none", transition: "all .2s",
              }}>
                {label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer"
            className="btn btn-blue hidden md:inline-flex" style={{ padding: "10px 20px", fontSize: 14 }}>
            Install Free
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <button onClick={() => setOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--ink)", display: "flex" }} className="md:hidden">
            {open
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: "white", borderTop: "1.5px solid var(--border)", padding: "16px 24px 24px" }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{ display: "block", padding: "13px 0", fontSize: 16, fontWeight: 600, color: pathname === href ? "var(--blue)" : "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>
              {label}
            </Link>
          ))}
          <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn btn-blue" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
            Install Free on Shopify
          </a>
        </div>
      )}
    </header>
  );
}
