import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing. Start free — no credit card required.",
};

const plans = [
  {
    name: "Starter", price: "0", sub: "Free forever",
    desc: "Perfect for stores just starting with paid advertising.",
    cta: "Install Free", href: "https://apps.shopify.com/agency-ai", pop: false,
    features: ["1 active campaign", "5 AI creatives/month", "Meta Ads integration", "Basic analytics", "Email support"],
    missing: ["Google Ads", "Brand Studio", "AGEN-AI chat", "A/B testing"],
  },
  {
    name: "Growth", price: "49", sub: "/month",
    desc: "For growing brands ready to scale paid advertising.",
    cta: "Start 14-day trial", href: "https://apps.shopify.com/agency-ai", pop: true,
    features: ["10 active campaigns", "Unlimited AI creatives", "Meta + Google Ads", "Brand Studio", "AGEN-AI conversational AI", "Advanced analytics & ROAS", "A/B creative testing", "Priority support"],
    missing: ["Custom reporting", "Dedicated manager"],
  },
  {
    name: "Scale", price: "149", sub: "/month",
    desc: "For high-volume brands and agencies managing multiple stores.",
    cta: "Start 14-day trial", href: "https://apps.shopify.com/agency-ai", pop: false,
    features: ["Unlimited campaigns", "Unlimited AI creatives", "Meta + Google Ads", "Multi-brand Studio", "AGEN-AI + custom training", "Custom reporting & exports", "Dedicated account manager", "Up to 5 Shopify stores", "Slack support"],
    missing: [],
  },
];

const faqs = [
  { q: "Is the free plan really free forever?", a: "Yes. The Starter plan has no time limit. You only upgrade when you want more campaigns and advanced features." },
  { q: "Do I need a credit card to start?", a: "No credit card required for the Starter plan. Payment info only needed when upgrading to Growth or Scale." },
  { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no cancellation fees. Cancel directly from your Shopify admin." },
  { q: "What counts as an active campaign?", a: "Any campaign currently running or paused. Completed and deleted campaigns don't count toward your limit." },
  { q: "Do you offer refunds?", a: "Full refund within 14 days of upgrading if you're not satisfied — no questions asked." },
  { q: "Can I manage multiple stores?", a: "The Scale plan supports up to 5 Shopify stores. Need more? Contact us for an enterprise quote." },
];

export default function Pricing() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 130, paddingBottom: 60, background: "linear-gradient(180deg,var(--blue-pale) 0%,white 100%)", textAlign: "center", position: "relative" }}>
        <div className="blue-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <p className="eyebrow afu" style={{ marginBottom: 14 }}>Simple pricing</p>
          <h1 className="afu-1" style={{ fontSize: "clamp(2.2rem,6vw,3.8rem)", letterSpacing: "-.04em", marginBottom: 18 }}>
            Start free.<br/>Pay only <span style={{ color: "var(--blue)" }}>when you scale.</span>
          </h1>
          <p className="afu-2" style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7 }}>
            No contracts. No hidden fees. Less than one hour of traditional agency time — per month.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, alignItems: "start" }}>
            {plans.map(({ name, price, sub, desc, cta, href, pop, features, missing }) => (
              <div key={name} className={pop ? "plan-pop card" : "card"} style={{ borderRadius: 20, padding: "36px 28px", position: "relative" }}>
                {pop && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "white", color: "var(--blue)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 100, border: "1.5px solid var(--border-blue)", whiteSpace: "nowrap" }}>
                    Most Popular
                  </div>
                )}
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{name}</h2>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: "2.8rem", lineHeight: 1 }}>${price}</span>
                  <span className="muted" style={{ fontSize: 15, opacity: 0.75 }}>{sub}</span>
                </div>
                <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.6, marginBottom: 24, opacity: 0.8 }}>{desc}</p>

                <a href={href} target="_blank" rel="noopener noreferrer"
                  className={`btn ${pop ? "btn-white" : "btn-blue"}`}
                  style={{ width: "100%", justifyContent: "center", marginBottom: 28, fontSize: 15 }}>
                  {cta}
                </a>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {features.map(f => (
                    <div key={f} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="8" cy="8" r="8" fill={pop ? "rgba(255,255,255,0.2)" : "var(--blue-light)"}/>
                        <path d="M5 8l2 2 4-4" stroke={pop ? "white" : "var(--blue)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ fontSize: 14 }}>{f}</span>
                    </div>
                  ))}
                  {missing.map(f => (
                    <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", opacity: 0.4 }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="8" cy="8" r="8" fill="rgba(0,0,0,0.06)"/>
                        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <span style={{ fontSize: 14 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="card-blue" style={{ borderRadius: 14, padding: "26px 28px", marginTop: 20, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Enterprise</h3>
              <p style={{ color: "var(--muted)", fontSize: 15 }}>5+ stores? Custom integrations? SLA? Let&apos;s talk.</p>
            </div>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize: 14.5 }}>Contact Sales →</Link>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: "80px 24px", background: "var(--blue-pale)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", letterSpacing: "-.03em" }}>
              Agency AI vs. <span style={{ color: "var(--blue)" }}>traditional agencies</span>
            </h2>
          </div>
          <div className="card" style={{ overflow: "hidden", borderRadius: 16, padding: 0 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["", "Agency AI", "Traditional Agency"].map((h, i) => (
                    <th key={h} style={{ padding: "16px 20px", textAlign: i === 0 ? "left" : "center", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: i === 1 ? "var(--blue)" : "var(--ink)", background: i === 1 ? "var(--blue-light)" : "white", borderBottom: "1.5px solid var(--border)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly cost", "From $0", "$3,000–$10,000"],
                  ["Setup time", "10 minutes", "4–6 weeks"],
                  ["Contract required", "Never", "3–12 months"],
                  ["AI-powered optimization", "✅ 24/7 automatic", "❌ Manual, periodic"],
                  ["Creative generation", "✅ Unlimited with AI", "❌ Expensive add-on"],
                  ["Real-time reporting", "✅ Live dashboard", "❌ Monthly PDF report"],
                  ["You own campaigns", "✅ Full ownership", "❌ Agency controls"],
                  ["Cancel anytime", "✅ No friction", "❌ Notice periods apply"],
                ].map(([feat, ours, theirs]) => (
                  <tr key={feat as string} style={{ background: "white" }}>
                    <td style={{ padding: "13px 20px", fontSize: 14.5, color: "var(--muted)", borderBottom: "1px solid var(--border)" }}>{feat}</td>
                    <td style={{ padding: "13px 20px", fontSize: 14.5, color: "var(--green)", textAlign: "center", fontWeight: 600, borderBottom: "1px solid var(--border)", background: "rgba(0,87,255,0.02)" }}>{ours}</td>
                    <td style={{ padding: "13px 20px", fontSize: 14.5, color: "var(--muted)", textAlign: "center", borderBottom: "1px solid var(--border)" }}>{theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-.03em" }}>
              Questions <span style={{ color: "var(--blue)" }}>answered</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map(({ q, a }) => (
              <details key={q} className="card" style={{ borderRadius: 12 }}>
                <summary style={{ padding: "18px 20px", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700, fontSize: 15.5, color: "var(--ink)" }}>
                  {q}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.2" style={{ flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <div style={{ padding: "0 20px 18px", color: "var(--muted)", fontSize: 15, lineHeight: 1.75 }}>{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "0 24px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div className="card-blue" style={{ borderRadius: 20, padding: "48px 40px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", letterSpacing: "-.03em", marginBottom: 14 }}>
              Start free today
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 28 }}>No credit card. No commitment. Real results.</p>
            <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn btn-blue" style={{ fontSize: 15.5 }}>
              Install Free on Shopify
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
