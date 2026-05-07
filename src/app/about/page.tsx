import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the team behind Agency AI — founders with $25M+ in Shopify sales and 20,000+ app users building the future of e-commerce marketing.",
};

const team = [
  { name: "Founder & CEO", initials: "JD", gradient: "linear-gradient(135deg,#6366F1,#8B5CF6)", bio: "Led $25M+ in Shopify-driven revenue across multiple successful DTC brands. Fortune 500 optimization background." },
  { name: "CTO", initials: "MS", gradient: "linear-gradient(135deg,#0EA5E9,#6366F1)", bio: "Built and scaled apps to 20,000+ users. Expert in AI-driven ad automation and ML-based bid optimization." },
  { name: "Head of Growth", initials: "AK", gradient: "linear-gradient(135deg,#EC4899,#8B5CF6)", bio: "7 years optimizing paid media for Shopify brands. Specialist in Meta and Google Ads performance marketing." },
  { name: "Head of Design", initials: "RN", gradient: "linear-gradient(135deg,#F59E0B,#EF4444)", bio: "Former agency creative director. Designed ad creatives generating over $10M in attributed revenue." },
];

const values = [
  { emoji: "🎯", title: "Results first", desc: "Every feature we build is measured against one question: does it help merchants make more money?" },
  { emoji: "🤖", title: "AI with purpose", desc: "We build AI that amplifies human creativity — not replaces it. Your brand voice stays yours." },
  { emoji: "⚡", title: "Speed obsessed", desc: "E-commerce moves fast. Our platform is built to match that pace — launch in minutes, not weeks." },
  { emoji: "💚", title: "Merchant-first", desc: "We came from e-commerce. We know the pressures. Everything we build, we'd use ourselves." },
];

const milestones = [
  { year: "2021", event: "Company founded by e-commerce operators tired of expensive agencies" },
  { year: "2022", event: "Order Automator hits 10,000 users — proving Shopify app expertise" },
  { year: "2023", event: "Agency AI v1 launches with AI-powered ad creation for Meta" },
  { year: "2024", event: "Google Ads integration launched. 15,000 active users across all products" },
  { year: "2025", event: "AGEN-AI launches — the first conversational AI CMO for e-commerce" },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", paddingTop: 140, paddingBottom: 80, overflow: "hidden", textAlign: "center" }} className="dot-grid">
        <div style={{ position: "absolute", top: "30%", left: "25%", width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.12)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <p className="section-label animate-fade-up" style={{ marginBottom: 16 }}>Our story</p>
          <h1 className="animate-fade-up-1" style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.08, marginBottom: 24 }}>
            Built by merchants,<br/>
            <span className="gradient-text">for merchants</span>
          </h1>
          <p className="animate-fade-up-2" style={{ color: "var(--text-muted)", fontSize: 18, lineHeight: 1.75, maxWidth: 580, margin: "0 auto" }}>
            We didn&apos;t start as a software company. We started as Shopify store owners who were sick of paying agencies $5,000/month for mediocre results — so we built something better.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 32, textAlign: "center" }}>
            {[
              { num: "$25M+", label: "Shopify sales driven" },
              { num: "20K+", label: "App users served" },
              { num: "3+", label: "Years of expertise" },
              { num: "500+", label: "Brands grown" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="stat-num" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginBottom: 6 }}>{num}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 14 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <p className="section-label" style={{ marginBottom: 14 }}>Our mission</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 20, lineHeight: 1.15 }}>
              Level the playing field for<br/><span className="gradient-text">independent brands</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              Enterprise brands can afford teams of media buyers, designers, and analysts. Independent Shopify merchants can&apos;t — but they deserve the same results.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.8 }}>
              Agency AI is our answer: institutional-grade AI that gives every Shopify store access to Fortune 500-level marketing intelligence at a fraction of the cost.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Agency fees", val: "$4,000/mo", color: "#EF4444", icon: "📉" },
              { label: "Agency AI", val: "$49/mo", color: "#10B981", icon: "✅" },
              { label: "Agency setup", val: "4–6 weeks", color: "#EF4444", icon: "⏳" },
              { label: "Agency AI setup", val: "10 minutes", color: "#10B981", icon: "⚡" },
            ].map(({ label, val, color, icon }) => (
              <div key={label} className="glass hover-card" style={{ borderRadius: 14, padding: "24px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>{label}</div>
                <div style={{ fontFamily: "'Onest',sans-serif", fontWeight: 800, fontSize: 20, color }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 24px", background: "var(--bg-2)", position: "relative" }}>
        <div className="divider-glow" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>The team</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-.03em" }}>
              Operators who <span className="gradient-text">know what works</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {team.map(({ name, initials, gradient, bio }) => (
              <div key={name} className="glass hover-card" style={{ borderRadius: 16, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'Onest',sans-serif" }}>{initials}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{name}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{bio}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="divider-glow" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
      </section>

      {/* Values */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>What drives us</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-.03em" }}>
              Our <span className="gradient-text">core values</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {values.map(({ emoji, title, desc }) => (
              <div key={title} className="glass hover-card" style={{ borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{emoji}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "80px 24px 96px", background: "var(--bg-2)", position: "relative" }}>
        <div className="divider-glow" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>Our journey</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-.03em" }}>
              Building the future of<br/><span className="gradient-text">e-commerce marketing</span>
            </h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, var(--primary), transparent)" }} />
            {milestones.map(({ year, event }, i) => (
              <div key={year} style={{ display: "flex", gap: 24, marginBottom: 32, paddingLeft: 12 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: i === milestones.length - 1 ? "var(--primary)" : "var(--surface-2)", border: `2px solid ${i === milestones.length - 1 ? "var(--primary)" : "var(--border)"}`, boxShadow: i === milestones.length - 1 ? "0 0 12px var(--primary-glow)" : "none" }} />
                </div>
                <div className="glass" style={{ borderRadius: 12, padding: "18px 20px", flex: 1 }}>
                  <div style={{ fontFamily: "'Onest',sans-serif", fontWeight: 700, fontSize: 13, color: "var(--primary-bright)", marginBottom: 6 }}>{year}</div>
                  <p style={{ color: "var(--text)", fontSize: 15, lineHeight: 1.6 }}>{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, letterSpacing: "-.03em", marginBottom: 20 }}>
            Join our <span className="gradient-text">growing community</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 17, marginBottom: 36 }}>
            Ready to see what Agency AI can do for your store?
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "15px 32px" }}>
              Install Free on Shopify
            </a>
            <Link href="/contact" className="btn-secondary" style={{ fontSize: 16, padding: "15px 32px" }}>
              Talk to the team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
