"use client";
import { useState } from "react";
import Link from "next/link";

const reasons = [
  { id: "demo", label: "Book a Demo", icon: "🎯" },
  { id: "sales", label: "Enterprise Sales", icon: "🏢" },
  { id: "support", label: "Technical Support", icon: "🔧" },
  { id: "press", label: "Press & Media", icon: "📰" },
  { id: "partnership", label: "Partnership", icon: "🤝" },
  { id: "other", label: "Other", icon: "💬" },
];

export default function Contact() {
  const [reason, setReason] = useState("demo");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", store: "", message: "" });

  if (done) {
    return (
      <>
        <section style={{ paddingTop: 130, paddingBottom: 100, textAlign: "center", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ maxWidth: 520, padding: "0 24px" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 32 }}>✓</div>
            <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, letterSpacing: "-.04em", marginBottom: 16 }}>Message sent!</h1>
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              We&apos;ll get back to you within one business day. Enterprise and demo requests typically hear back within a few hours.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn btn-blue" style={{ fontSize: 14.5 }}>Install Free Now</a>
              <Link href="/" className="btn btn-outline" style={{ fontSize: 14.5 }}>Back to Home</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 130, paddingBottom: 60, background: "linear-gradient(180deg,var(--blue-pale) 0%,white 100%)", position: "relative" }}>
        <div className="blue-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
          <p className="eyebrow afu" style={{ marginBottom: 14 }}>Get in touch</p>
          <h1 className="afu-1" style={{ fontSize: "clamp(2.2rem,6vw,3.6rem)", letterSpacing: "-.04em", marginBottom: 18 }}>
            We&apos;re here to <span style={{ color: "var(--blue)" }}>help you grow</span>
          </h1>
          <p className="afu-2" style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7 }}>
            From booking a demo to enterprise pricing — whatever you need, our team responds fast.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section style={{ padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 52, alignItems: "start" }}>

          {/* Left: info */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, letterSpacing: "-.03em" }}>Contact info</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
              {[
                { icon: "⚡", title: "Fast response", desc: "We reply within 1 business day. Demos and enterprise within hours." },
                { icon: "📍", title: "Remote-first", desc: "Team distributed across US & EU. Book a video call at any timezone." },
                { icon: "📧", title: "Direct email", desc: "hello@agencyai.app for general inquiries, enterprise@agencyai.app for sales." },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div className="icon-box" style={{ width: 44, height: 44, flexShrink: 0 }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: "var(--ink)" }}>{title}</div>
                    <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-blue" style={{ borderRadius: 14, padding: "22px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Skip the form</div>
              <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.6, marginBottom: 16 }}>
                Already know you want in? Install free and explore without a credit card.
              </p>
              <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn btn-blue" style={{ fontSize: 13.5, padding: "9px 16px" }}>
                Install on Shopify →
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="card" style={{ borderRadius: 20, padding: "36px 32px" }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24, letterSpacing: "-.02em" }}>Send us a message</h3>

            {/* Reason selector */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>
                What can we help with?
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {reasons.map(r => (
                  <button key={r.id} onClick={() => setReason(r.id)}
                    style={{
                      padding: "8px 14px", borderRadius: 10, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
                      border: reason === r.id ? "1.5px solid var(--blue)" : "1.5px solid var(--border)",
                      background: reason === r.id ? "var(--blue-light)" : "transparent",
                      color: reason === r.id ? "var(--blue)" : "var(--muted)",
                      fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
                    }}>
                    <span>{r.icon}</span>{r.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={e => { e.preventDefault(); setDone(true); }}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { key: "name", label: "Your Name", placeholder: "Jane Smith", type: "text" },
                  { key: "email", label: "Email", placeholder: "jane@yourstore.com", type: "email" },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>{label}</label>
                    <input
                      required type={type} placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--border)", fontSize: 14.5, color: "var(--ink)", fontFamily: "inherit", outline: "none", background: "white", boxSizing: "border-box" }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Shopify Store URL (optional)</label>
                <input
                  type="url" placeholder="https://yourstore.myshopify.com"
                  value={form.store}
                  onChange={e => setForm(f => ({ ...f, store: e.target.value }))}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--border)", fontSize: 14.5, color: "var(--ink)", fontFamily: "inherit", outline: "none", background: "white", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Message</label>
                <textarea
                  required rows={4} placeholder="Tell us about your store and what you're trying to achieve..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--border)", fontSize: 14.5, color: "var(--ink)", fontFamily: "inherit", outline: "none", background: "white", resize: "vertical", boxSizing: "border-box" }}
                />
              </div>

              <button type="submit" className="btn btn-blue" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px 0" }}>
                Send Message →
              </button>

              <p style={{ fontSize: 12.5, color: "var(--muted)", textAlign: "center" }}>
                No spam. We read every message personally.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
