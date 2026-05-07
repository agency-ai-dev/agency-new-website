import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the team behind Agency AI — founders with $25M+ in Shopify sales building the future of e-commerce marketing.",
};

const team = [
  { init: "JD", name: "Founder & CEO", bio: "Led $25M+ in Shopify revenue. Former Fortune 500 digital marketing director.", color: "#0057FF" },
  { init: "MS", name: "CTO", bio: "Built apps to 20,000+ users. Expert in AI ad automation and ML bid optimization.", color: "#7C3AED" },
  { init: "AK", name: "Head of Growth", bio: "7 years optimizing paid media for Shopify DTC brands. Meta & Google specialist.", color: "#0891B2" },
  { init: "RN", name: "Head of Design", bio: "Former agency creative director. Designed creatives generating $10M+ in revenue.", color: "#059669" },
];

const values = [
  { icon: "🎯", title: "Results First", desc: "Every feature is measured against one question: does it help merchants make more money?" },
  { icon: "🤖", title: "AI with Purpose", desc: "We build AI that amplifies your creativity — not replaces it. Your brand voice stays yours." },
  { icon: "⚡", title: "Speed Obsessed", desc: "E-commerce moves fast. We built our platform to match — launch campaigns in minutes, not weeks." },
  { icon: "💚", title: "Merchant-First", desc: "We came from e-commerce. We know the pressures. We'd use Agency AI ourselves — and we do." },
];

const timeline = [
  { year: "2021", event: "Founded by e-commerce operators tired of paying $5,000/month for mediocre agency results." },
  { year: "2022", event: "Order Automator reaches 10,000 users, proving our Shopify app expertise." },
  { year: "2023", event: "Agency AI v1 launches with AI-powered ad creation for Meta Ads." },
  { year: "2024", event: "Google Ads integration added. Platform serves 15,000+ active merchants." },
  { year: "2025", event: "AGEN-AI launches — the first conversational AI CMO built for Shopify." },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 130, paddingBottom: 80, background: "linear-gradient(180deg,var(--blue-pale) 0%,white 100%)", position: "relative" }}>
        <div className="blue-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
          <span className="accent-bar afu" style={{ display: "block", margin: "0 auto 16px" }} />
          <p className="eyebrow afu" style={{ marginBottom: 16 }}>Our story</p>
          <h1 className="afu-1" style={{ fontSize: "clamp(2.4rem,6vw,4rem)", letterSpacing: "-.04em", marginBottom: 24 }}>
            Built by merchants,<br/><span style={{ color: "var(--blue)" }}>for merchants</span>
          </h1>
          <p className="afu-2" style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            We didn&apos;t start as a software company. We started as Shopify store owners sick of paying agencies $5,000/month for results we could beat ourselves — so we built the tool we wished existed.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--blue)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 32, textAlign: "center" }}>
          {[
            { val: "$25M+", label: "Shopify sales driven" },
            { val: "20K+", label: "App users" },
            { val: "4+", label: "Years building" },
            { val: "500+", label: "Brands grown" },
          ].map(({ val, label }) => (
            <div key={label}>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: "white", lineHeight: 1 }}>{val}</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <span className="accent-bar" />
            <p className="eyebrow" style={{ marginBottom: 14 }}>Our mission</p>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-.03em", marginBottom: 20 }}>
              Leveling the playing field for <span style={{ color: "var(--blue)" }}>independent brands</span>
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8, marginBottom: 18 }}>
              Enterprise brands hire teams of media buyers, designers, and analysts. Independent Shopify merchants can&apos;t — but they deserve the same results.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8 }}>
              Agency AI gives every Shopify store access to Fortune 500-level marketing intelligence at a fraction of the cost.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Typical agency fee", val: "$4,000/mo", bad: true },
              { label: "Agency AI Growth plan", val: "$49/mo", good: true },
              { label: "Agency setup time", val: "4–6 weeks", bad: true },
              { label: "Agency AI setup", val: "10 minutes", good: true },
            ].map(({ label, val, bad, good }) => (
              <div key={label} className={good ? "card-blue" : "card"} style={{ padding: "24px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 8, fontWeight: 600 }}>{label}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 22, color: good ? "var(--blue)" : "#EF4444" }}>{val}</div>
                {bad && <div style={{ fontSize: 12, color: "#EF4444", fontWeight: 600, marginTop: 4 }}>❌ Too expensive</div>}
                {good && <div style={{ fontSize: 12, color: "var(--green)", fontWeight: 600, marginTop: 4 }}>✅ With Agency AI</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 24px 100px", background: "var(--blue-pale)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>The team</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-.03em" }}>
              Operators who <span style={{ color: "var(--blue)" }}>know what works</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
            {team.map(({ init, name, bio, color }) => (
              <div key={name} className="card" style={{ padding: "32px 24px", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 20, color: "white" }}>{init}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{name}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>What drives us</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-.03em" }}>
              Our <span style={{ color: "var(--blue)" }}>core values</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: "28px 24px" }}>
                <div className="icon-box" style={{ marginBottom: 18 }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "80px 24px 100px", background: "var(--ink)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="eyebrow" style={{ color: "#6BA3FF", marginBottom: 12 }}>Our journey</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-.03em", color: "white" }}>
              Building the future of<br/><span style={{ color: "#6BA3FF" }}>e-commerce marketing</span>
            </h2>
          </div>
          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg,var(--blue),rgba(0,87,255,0))" }} />
            {timeline.map(({ year, event }, i) => (
              <div key={year} style={{ position: "relative", marginBottom: 32, display: "flex", gap: 20 }}>
                <div style={{ position: "absolute", left: -23, top: 4, width: 14, height: 14, borderRadius: "50%", background: i === timeline.length - 1 ? "var(--blue)" : "rgba(255,255,255,0.15)", border: `2px solid ${i === timeline.length - 1 ? "var(--blue)" : "rgba(255,255,255,0.2)"}`, boxShadow: i === timeline.length - 1 ? "0 0 12px rgba(0,87,255,0.6)" : "none" }} />
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "18px 20px", flex: 1 }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 13, color: "#6BA3FF", marginBottom: 6 }}>{year}</div>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.6 }}>{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-.03em", marginBottom: 20 }}>
            Join 20,000+ merchants growing with <span style={{ color: "var(--blue)" }}>Agency AI</span>
          </h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn btn-blue" style={{ fontSize: 15.5 }}>Install Free on Shopify</a>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize: 15.5 }}>Talk to the team</Link>
          </div>
        </div>
      </section>
    </>
  );
}
