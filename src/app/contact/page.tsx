"use client";
import { useState } from "react";
import Link from "next/link";

const reasons = [
  { emoji: "📅", title: "Schedule a Demo", desc: "See Agency AI in action with a 20-minute live walkthrough tailored to your store." },
  { emoji: "💬", title: "Sales Questions", desc: "Not sure which plan is right for you? Our team will help you find the perfect fit." },
  { emoji: "🛠️", title: "Technical Support", desc: "Having issues with your setup? Our team has you covered, usually within 2 hours." },
  { emoji: "🤝", title: "Partnership", desc: "Agency, developer, or integration partner? Let's explore how we can work together." },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", store: "", subject: "demo", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 64, textAlign: "center", position: "relative" }} className="dot-grid">
        <div style={{ position: "absolute", top: "25%", left: "35%", width: 500, height: 300, borderRadius: "50%", background: "rgba(99,102,241,0.1)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <p className="section-label animate-fade-up" style={{ marginBottom: 14 }}>Get in touch</p>
          <h1 className="animate-fade-up-1" style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)", fontWeight: 900, letterSpacing: "-.04em", marginBottom: 18 }}>
            Let&apos;s grow your<br/>
            <span className="gradient-text">Shopify store</span>
          </h1>
          <p className="animate-fade-up-2" style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.7 }}>
            Whether you want a demo, have questions, or need help — we&apos;re here for you. Usually respond within 2 hours.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }}>

            {/* Left */}
            <div>
              <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 8 }}>
                How can we help?
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: 15.5, marginBottom: 32, lineHeight: 1.7 }}>
                Our team of e-commerce and advertising experts is ready to help you achieve your growth goals.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
                {reasons.map(({ emoji, title, desc }) => (
                  <div key={title} className="glass hover-card" style={{ borderRadius: 14, padding: "20px 18px", display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 26, flexShrink: 0 }}>{emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div className="glass" style={{ borderRadius: 14, padding: "20px 18px" }}>
                <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "var(--text-muted)" }}>QUICK ACTIONS</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: 14 }}>
                    → Install Agency AI on Shopify
                  </a>
                  <Link href="/pricing" className="btn-ghost" style={{ fontSize: 14 }}>
                    → Compare pricing plans
                  </Link>
                  <Link href="/blog" className="btn-ghost" style={{ fontSize: 14 }}>
                    → Read our growth guides
                  </Link>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="glass-bright" style={{ borderRadius: 20, padding: "40px 36px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Message sent!</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
                    Thanks for reaching out. Our team will get back to you within 2 hours during business hours.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-secondary" style={{ fontSize: 14 }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 4 }}>Send us a message</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14.5, marginBottom: 8 }}>We&apos;ll reply within 2 business hours.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-muted)" }}>Your name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Smith"
                        className="input-field"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-muted)" }}>Email address *</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@mystore.com"
                        className="input-field"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-muted)" }}>Shopify store URL</label>
                    <input
                      type="text"
                      placeholder="mystore.myshopify.com"
                      className="input-field"
                      value={form.store}
                      onChange={e => setForm(f => ({ ...f, store: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-muted)" }}>How can we help?</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {[
                        { val: "demo", label: "📅 Schedule Demo" },
                        { val: "sales", label: "💬 Sales Question" },
                        { val: "support", label: "🛠️ Support" },
                        { val: "partnership", label: "🤝 Partnership" },
                      ].map(({ val, label }) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, subject: val }))}
                          style={{
                            padding: "7px 14px",
                            borderRadius: 100,
                            fontSize: 13,
                            border: "1px solid " + (form.subject === val ? "var(--primary)" : "var(--border)"),
                            background: form.subject === val ? "rgba(99,102,241,0.15)" : "transparent",
                            color: form.subject === val ? "#818CF8" : "var(--text-muted)",
                            cursor: "pointer",
                            transition: "all .2s",
                            fontFamily: "inherit",
                          }}
                        >{label}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-muted)" }}>Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your store, your current ad setup, and what you'd like to achieve..."
                      className="input-field"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ fontSize: 16, padding: "15px 28px", justifyContent: "center" }}>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                  </button>

                  <p style={{ color: "var(--text-dim)", fontSize: 12.5, textAlign: "center", lineHeight: 1.6 }}>
                    By submitting, you agree to our{" "}
                    <Link href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>Privacy Policy</Link>.
                    We never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cal embed placeholder */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="glass" style={{ borderRadius: 20, padding: "40px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 12 }}>
              Prefer to book directly?
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 28, lineHeight: 1.7, maxWidth: 460, margin: "0 auto 28px" }}>
              Schedule a 20-minute demo call and see Agency AI transform your ads in real time.
            </p>
            <a
              href="https://cal.com/agencyai/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: 16, padding: "15px 32px" }}
            >
              Book a Demo Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
