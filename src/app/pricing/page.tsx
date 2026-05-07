import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for Shopify merchants. Start free — no credit card required. Upgrade as you grow.",
};

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "forever",
    desc: "Perfect for stores just getting started with AI advertising.",
    cta: "Install Free",
    ctaLink: "https://apps.shopify.com/agency-ai",
    highlight: false,
    features: [
      "1 active ad campaign",
      "AI copywriting (5 creatives/mo)",
      "Meta Ads integration",
      "Basic analytics dashboard",
      "Email support",
    ],
    missing: ["Google Ads", "Brand Studio", "AGEN-AI chat", "A/B testing", "Custom audiences"],
  },
  {
    name: "Growth",
    price: "49",
    period: "/month",
    desc: "For growing brands ready to scale their paid advertising.",
    cta: "Start 14-day trial",
    ctaLink: "https://apps.shopify.com/agency-ai",
    highlight: true,
    badge: "Most Popular",
    features: [
      "10 active ad campaigns",
      "Unlimited AI creatives",
      "Meta + Google Ads",
      "Brand Studio (unlimited uploads)",
      "AGEN-AI conversational AI",
      "Advanced analytics & ROAS tracking",
      "A/B creative testing",
      "Priority email & chat support",
    ],
    missing: ["Custom reporting", "Dedicated account manager"],
  },
  {
    name: "Scale",
    price: "149",
    period: "/month",
    desc: "For high-volume brands and agencies managing multiple stores.",
    cta: "Start 14-day trial",
    ctaLink: "https://apps.shopify.com/agency-ai",
    highlight: false,
    features: [
      "Unlimited active campaigns",
      "Unlimited AI creatives",
      "Meta + Google Ads",
      "Brand Studio (multi-brand)",
      "AGEN-AI conversational AI",
      "Custom reporting & exports",
      "Dedicated account manager",
      "Up to 5 Shopify stores",
      "Early access to new features",
      "Slack-based support",
    ],
    missing: [],
  },
];

const faqs = [
  { q: "Is the free plan really free forever?", a: "Yes. The Starter plan is completely free with no time limit. You only pay if you want more campaigns and advanced features." },
  { q: "Do I need a credit card to start?", a: "No credit card required for the free plan. You only need payment info when upgrading to Growth or Scale." },
  { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no cancellation fees. Cancel from your Shopify admin at any time." },
  { q: "What counts as an 'active campaign'?", a: "An active campaign is one currently running or paused in your ad accounts. Completed and deleted campaigns don't count toward your limit." },
  { q: "Do you offer refunds?", a: "We offer a full refund within 14 days of upgrading if you're not satisfied — no questions asked." },
  { q: "Can I manage multiple stores?", a: "The Scale plan supports up to 5 Shopify stores under one Agency AI account. Need more? Contact us for an enterprise quote." },
  { q: "What's included in the Brand Studio?", a: "Upload your brand's logo, colors, fonts, and product images. Agency AI uses these to generate on-brand ad creatives automatically." },
  { q: "How does AGEN-AI work?", a: "AGEN-AI is our conversational AI that monitors your campaigns and suggests optimizations in plain English. You simply approve or reject — no technical knowledge needed." },
];

const IconCheck = ({ muted }: { muted?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="8" fill={muted ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.2)"}/>
    <path d="M5 8l2 2 4-4" stroke={muted ? "rgba(255,255,255,0.2)" : "#818CF8"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="8" fill="rgba(239,68,68,0.1)"/>
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Pricing() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 64, textAlign: "center", position: "relative" }} className="dot-grid">
        <div style={{ position: "absolute", top: "20%", left: "35%", width: 500, height: 300, borderRadius: "50%", background: "rgba(99,102,241,0.1)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <p className="section-label animate-fade-up" style={{ marginBottom: 16 }}>Simple pricing</p>
          <h1 className="animate-fade-up-1" style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", fontWeight: 900, letterSpacing: "-.04em", marginBottom: 20 }}>
            Start free. Pay only<br/>
            <span className="gradient-text">when you scale.</span>
          </h1>
          <p className="animate-fade-up-2" style={{ color: "var(--text-muted)", fontSize: 18, lineHeight: 1.7 }}>
            No contracts. No hidden fees. Cancel anytime. Less than the cost of one hour with a traditional ad agency.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, alignItems: "start" }}>
            {plans.map(({ name, price, period, desc, cta, ctaLink, highlight, badge, features, missing }) => (
              <div
                key={name}
                className={highlight ? "pricing-popular" : "glass hover-card"}
                style={{ borderRadius: 20, padding: "36px 28px", position: "relative", background: highlight ? "rgba(17,22,48,0.95)" : undefined }}
              >
                {badge && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--primary)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 100 }}>
                    {badge}
                  </div>
                )}
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{name}</h2>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 10 }}>
                    <span style={{ fontFamily: "'Onest',sans-serif", fontWeight: 900, fontSize: "clamp(2.4rem,4vw,3rem)", lineHeight: 1 }}>${price}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: 15, paddingBottom: 6 }}>{period}</span>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.6 }}>{desc}</p>
                </div>

                <a
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={highlight ? "btn-primary" : "btn-secondary"}
                  style={{ width: "100%", justifyContent: "center", marginBottom: 28, fontSize: 15 }}
                >
                  {cta}
                </a>

                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {features.map(f => (
                    <div key={f} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <IconCheck/>
                      <span style={{ fontSize: 14, color: "var(--text)" }}>{f}</span>
                    </div>
                  ))}
                  {missing.map(f => (
                    <div key={f} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <IconX/>
                      <span style={{ fontSize: 14, color: "var(--text-dim)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="glass" style={{ borderRadius: 16, padding: "28px 32px", marginTop: 20, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Enterprise</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 15 }}>Managing 5+ stores? Need custom integrations or an SLA? Let&apos;s talk.</p>
            </div>
            <Link href="/contact" className="btn-secondary" style={{ fontSize: 15, padding: "12px 24px" }}>
              Contact Sales →
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section style={{ padding: "80px 24px", background: "var(--bg-2)", position: "relative" }}>
        <div className="divider-glow" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 12 }}>
              Agency AI vs. <span className="gradient-text">traditional agencies</span>
            </h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Feature", "Agency AI", "Traditional Agency"].map((h, i) => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: i === 0 ? "left" : "center", fontWeight: 700, fontSize: 14, color: i === 1 ? "#818CF8" : "var(--text)", borderBottom: "1px solid var(--border)", background: i === 1 ? "rgba(99,102,241,0.08)" : "transparent" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly cost", "From $0", "$3,000–$10,000"],
                  ["Setup time", "10 minutes", "4–6 weeks"],
                  ["Contract required", "None", "3–12 months"],
                  ["AI-powered optimization", "✅ 24/7", "❌ Manual"],
                  ["Brand Studio", "✅ Included", "❌ Extra cost"],
                  ["Real-time analytics", "✅ Included", "❌ Monthly reports"],
                  ["Campaign ownership", "You own everything", "Agency controls"],
                  ["Scale up/down freely", "✅ Any time", "❌ Renegotiate"],
                ].map(([feat, ours, theirs]) => (
                  <tr key={feat as string}>
                    <td style={{ padding: "14px 20px", fontSize: 14.5, color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{feat}</td>
                    <td style={{ padding: "14px 20px", fontSize: 14.5, color: "#10B981", textAlign: "center", fontWeight: 600, borderBottom: "1px solid var(--border)", background: "rgba(99,102,241,0.04)" }}>{ours}</td>
                    <td style={{ padding: "14px 20px", fontSize: 14.5, color: "var(--text-dim)", textAlign: "center", borderBottom: "1px solid var(--border)" }}>{theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="divider-glow" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
      </section>

      {/* FAQ */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-.03em" }}>
              Questions <span className="gradient-text">answered</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map(({ q, a }) => (
              <details key={q} style={{ borderRadius: 12 }} className="glass">
                <summary style={{ padding: "18px 20px", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 600, fontSize: 15, userSelect: "none" }}>
                  {q}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, color: "var(--text-muted)" }}><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <div style={{ padding: "0 20px 18px", color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7 }}>{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 96px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="glass-bright" style={{ borderRadius: 20, padding: "48px 40px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 900, letterSpacing: "-.03em", marginBottom: 16 }}>
              Start growing <span className="gradient-text">today</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 28 }}>Free forever. Upgrade when you&apos;re ready.</p>
            <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "15px 36px" }}>
              Install Free on Shopify
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
