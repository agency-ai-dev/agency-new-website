import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agency AI — AI-Powered E-commerce Growth",
  description: "Automate Meta & Google Ads with AI. Built for Shopify stores.",
};

const features = [
  { icon: "⚡", title: "AI Ad Creation", desc: "Generate scroll-stopping Meta and Google creatives in seconds — perfectly matched to your brand's colors, fonts, and voice." },
  { icon: "🎯", title: "Smart Targeting", desc: "AGEN-AI builds custom and lookalike audiences from your top customers, then continuously refines them as you scale." },
  { icon: "📊", title: "Unified Analytics", desc: "Every Meta, Google, and Shopify metric in a single clean dashboard. No more spreadsheets or agency reports." },
  { icon: "🎨", title: "Brand Studio", desc: "Upload your assets once. Every ad generated stays pixel-perfect to your brand guidelines, every time." },
  { icon: "💬", title: "Chat to Launch", desc: "Describe a campaign in plain English. AGEN-AI handles the brief, creative, targeting, and go-live in minutes." },
  { icon: "💰", title: "Transparent Pricing", desc: "Fraction of what an agency charges. No contracts, no retainers, no surprises. Cancel anytime." },
];

const testimonials = [
  { quote: "Agency AI has outperformed both our internal ad efforts and every agency we've ever worked with.", name: "Lola Hemp", store: "lolahemplolahemp.com", tag: "200% ROAS" },
  { quote: "Since launching with Agency AI we've seen an almost 200% increase in ROI. Worth every penny.", name: "Vapor95", store: "vapor95.com", tag: "200% ROI" },
  { quote: "Great marketing app — improved our Meta ROAS and saves our team a ton of time every single week.", name: "Epic Hoodie", store: "epichoodie.com", tag: "Saved 15hrs/wk" },
  { quote: "Finally replaced our expensive agency. Better results, 80% cost reduction, full transparency.", name: "Peak Supply", store: "peaksupply.com", tag: "80% cost cut" },
  { quote: "The brand studio alone is worth it. Every creative looks like it came from a top-tier design team.", name: "Bloom Co.", store: "bloomcollective.shop", tag: "Pro creatives" },
  { quote: "Our CPA dropped 40% in the first 30 days. The AI targeting is genuinely impressive.", name: "Urban Threads", store: "urbanthreads.co", tag: "−40% CPA" },
];

const steps = [
  { n: 1, title: "Connect your store", body: "Link Shopify in one click. We pull your products, brand assets, and historical performance automatically." },
  { n: 2, title: "Describe your goal", body: "Tell AGEN-AI what you want — more sales, retargeting, brand awareness — in plain English. No forms." },
  { n: 3, title: "Launch & optimize", body: "AI generates creatives, sets targeting, launches campaigns, and monitors performance while you focus on your business." },
];

const stats = [
  { val: "$25M+", label: "In Shopify sales driven" },
  { val: "20K+", label: "Active app users" },
  { val: "200%", label: "Avg. ROI increase" },
  { val: "−40%", label: "Avg. CPA reduction" },
];

const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="9" fill="var(--blue-light)"/>
    <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 0, overflow: "hidden" }}>
        {/* Blue radial bg */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 600, background: "linear-gradient(180deg, var(--blue-pale) 0%, white 100%)", zIndex: 0 }} />
        <div className="blue-grid" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 600, zIndex: 0, opacity: 0.5 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "40px 24px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", minHeight: "60vh" }}>
            {/* Left */}
            <div>
              <div className="chip afu" style={{ marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue)", display: "inline-block" }} />
                Now on the Shopify App Store
              </div>
              <h1 className="afu-1" style={{ fontSize: "clamp(2.6rem, 5.5vw, 4rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.07, marginBottom: 20 }}>
                Your store&apos;s<br/>
                <span style={{ color: "var(--blue)" }}>AI growth</span><br/>
                engine
              </h1>
              <p className="afu-2" style={{ fontSize: "clamp(1rem,1.8vw,1.15rem)", color: "var(--muted)", lineHeight: 1.75, marginBottom: 32, maxWidth: 460 }}>
                Agency AI automates your Meta and Google Ads with a brand-aware AI studio. Launch campaigns in minutes. Optimize automatically. Pay a fraction of agency rates.
              </p>
              <div className="afu-3" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
                <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn btn-blue" style={{ fontSize: 15.5 }}>
                  Install Free on Shopify <IconArrow/>
                </a>
                <Link href="/contact" className="btn btn-outline" style={{ fontSize: 15.5 }}>
                  See a Demo
                </Link>
              </div>
              <div className="afu-4" style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {Array(5).fill(0).map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B"><path d="M7 1l1.5 4H13L9.5 7.5 11 12 7 9.5 3 12l1.5-4.5L1 5h4.5L7 1z"/></svg>)}
                  <span style={{ fontSize: 13.5, color: "var(--muted)", marginLeft: 4 }}>4.9 rating</span>
                </div>
                <span style={{ color: "var(--border)", fontSize: 18 }}>|</span>
                <span style={{ fontSize: 13.5, color: "var(--muted)" }}>20,000+ merchants</span>
                <span style={{ color: "var(--border)", fontSize: 18 }}>|</span>
                <span style={{ fontSize: 13.5, color: "var(--muted)" }}>Free to install</span>
              </div>
            </div>

            {/* Right — floating UI mockup */}
            <div className="afu-2 float-y" style={{ position: "relative" }}>
              {/* Main card */}
              <div className="card" style={{ borderRadius: 20, padding: 24, boxShadow: "0 24px 64px rgba(0,87,255,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "1.5px solid var(--border)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.4 5.2H18l-4.4 3.4 1.6 5.4L10 13l-5.2 3 1.6-5.4L2 7.2h5.6L10 2z" fill="white"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>AGEN-AI Dashboard</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>Live campaign overview</div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#059669" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#059669" }} /> Live
                  </div>
                </div>
                {/* Metrics row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {[
                    { label: "ROAS", val: "4.2×", delta: "+0.8", good: true },
                    { label: "Spend", val: "$2,840", delta: "this week", good: null },
                    { label: "CPA", val: "$18.40", delta: "−23%", good: true },
                  ].map(m => (
                    <div key={m.label} style={{ background: "var(--blue-pale)", borderRadius: 10, padding: "14px 12px" }}>
                      <div style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 18, color: "var(--ink)" }}>{m.val}</div>
                      {m.delta && <div style={{ fontSize: 11, color: m.good ? "#059669" : "var(--muted)", fontWeight: 600, marginTop: 2 }}>{m.delta}</div>}
                    </div>
                  ))}
                </div>
                {/* Campaign list */}
                {[
                  { name: "Summer Sale — Retargeting", status: "Active", roas: "5.1×", color: "#059669" },
                  { name: "New Collection — Awareness", status: "Optimizing", roas: "3.4×", color: "#F59E0B" },
                  { name: "Lookalike — Top Customers", status: "Active", roas: "4.8×", color: "#059669" },
                ].map(c => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: "var(--ink)", flex: 1, fontWeight: 500 }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)", background: "var(--blue-pale)", padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>{c.status}</span>
                    <span style={{ fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: "var(--blue)" }}>{c.roas}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", background: "var(--blue-light)", borderRadius: 10, border: "1.5px solid var(--border-blue)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  <span style={{ fontSize: 13, color: "var(--blue-dark)", fontWeight: 500 }}>AGEN-AI: Your retargeting ROAS is up 18% this week →</span>
                </div>
              </div>

              {/* Floating badge */}
              <div style={{ position: "absolute", top: -16, right: -16, background: "white", borderRadius: 12, padding: "10px 14px", boxShadow: "0 8px 28px rgba(0,87,255,0.14)", border: "1.5px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>📈</span>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 16, color: "#059669" }}>+200% ROI</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>vs. last month</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="wave-divider" style={{ position: "relative", marginTop: 48 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
            <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="var(--blue-pale)"/>
          </svg>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{ background: "var(--blue-pale)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 40, textAlign: "center" }}>
          {stats.map(({ val, label }) => (
            <div key={label}>
              <div className="big-num" style={{ fontSize: "clamp(2.2rem,4vw,3rem)", marginBottom: 6 }}>{val}</div>
              <div style={{ color: "var(--muted)", fontSize: 14.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VIDEO ═══ */}
      <section style={{ padding: "100px 24px 80px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="accent-bar" />
            <p className="eyebrow" style={{ marginBottom: 12 }}>Watch it in action</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-.03em", marginBottom: 16 }}>
              The e-commerce owner&apos;s dilemma — <span style={{ color: "var(--blue)" }}>finally solved</span>
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
              Watch how Shopify store owners go from zero to high-performing ad campaigns in under 10 minutes.
            </p>
          </div>

          <div style={{ borderRadius: 20, overflow: "hidden", border: "1.5px solid var(--border)", boxShadow: "0 20px 60px rgba(0,87,255,0.1)", background: "var(--blue-pale)" }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", background: "linear-gradient(135deg, var(--blue-pale), #dce8ff)" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 12px rgba(0,87,255,0.12)", cursor: "pointer" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <span style={{ color: "var(--muted)", fontSize: 14.5 }}>Play the 3-minute overview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding: "80px 24px 100px", background: "var(--blue-pale)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Simple process</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-.03em" }}>
              From sign-up to live campaign in <span style={{ color: "var(--blue)" }}>3 steps</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 24 }}>
            {steps.map(({ n, title, body }) => (
              <div key={n} className="card" style={{ padding: "36px 28px", position: "relative" }}>
                <div className="num-circle" style={{ marginBottom: 20 }}>{n}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.7 }}>{body}</p>
                {n < 3 && (
                  <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", color: "var(--blue)", zIndex: 1, display: "none" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 90 }}>
              <span className="accent-bar" />
              <p className="eyebrow" style={{ marginBottom: 14 }}>Full platform</p>
              <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-.03em", marginBottom: 20 }}>
                Everything you need to dominate paid ads
              </h2>
              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                One platform. Every tool your Shopify brand needs to outperform your competitors on Meta and Google.
              </p>
              <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn btn-blue" style={{ fontSize: 14.5 }}>
                Start for free <IconArrow/>
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {features.map(({ icon, title, desc }) => (
                <div key={title} className="card" style={{ padding: "24px 22px" }}>
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AGEN-AI FEATURE ═══ */}
      <section style={{ padding: "80px 24px 100px", background: "var(--blue-pale)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Chat mockup */}
          <div className="card" style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,87,255,0.1)" }}>
            <div style={{ background: "var(--blue)", padding: "18px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.4 5.2H18l-4.4 3.4 1.6 5.4L10 13l-5.2 3 1.6-5.4L2 7.2h5.6L10 2z" fill="white"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: "white" }}>AGEN-AI</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Your AI CMO — always on</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.15)", padding: "4px 10px", borderRadius: 100, fontSize: 12, color: "white", fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} /> Active
              </div>
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { role: "ai", text: "📊 Your Meta ROAS dropped 18% over the last 3 days — I've identified audience fatigue on your top ad set." },
                { role: "user", text: "What's your recommendation?" },
                { role: "ai", text: "I've drafted 3 fresh creative variations and rebuilt the lookalike from your highest-LTV customers. Want me to launch them?" },
                { role: "user", text: "Yes, go ahead!" },
                { role: "ai", text: "✅ Done! New creatives are live. I'll report back in 24 hours with performance data." },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "78%", padding: "11px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? "var(--blue)" : "white", fontSize: 13.5, lineHeight: 1.6, color: m.role === "user" ? "white" : "var(--ink)", border: m.role === "ai" ? "1.5px solid var(--border)" : "none" }}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <div style={{ flex: 1, background: "var(--blue-pale)", borderRadius: 10, padding: "11px 14px", fontSize: 13, color: "var(--muted-2)", border: "1.5px solid var(--border)" }}>Ask AGEN-AI anything...</div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="accent-bar" />
            <p className="eyebrow" style={{ marginBottom: 14 }}>Meet AGEN-AI</p>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-.03em", marginBottom: 20 }}>
              Your AI CMO,<br/>available <span style={{ color: "var(--blue)" }}>24/7</span>
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
              AGEN-AI proactively monitors every campaign, spots problems before they cost you money, and suggests optimizations you can approve in one tap. It&apos;s like having a senior media buyer on call, always.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {[
                "No marketing experience needed",
                "Approve changes with a single tap",
                "Identifies budget leaks in real-time",
                "Drafts new campaigns from plain English",
              ].map(item => (
                <li key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <IconCheck/>
                  <span style={{ color: "var(--ink)", fontSize: 15 }}>{item}</span>
                </li>
              ))}
            </ul>
            <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn btn-blue">
              Try AGEN-AI Free <IconArrow/>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ INTEGRATIONS ═══ */}
      <section id="integrations" style={{ padding: "100px 24px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: 12 }}>Native integrations</p>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-.03em", marginBottom: 16 }}>
            Connects to where you <span style={{ color: "var(--blue)" }}>sell & advertise</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginBottom: 56, maxWidth: 500, margin: "0 auto 56px" }}>
            Deep two-way sync with every platform your business runs on.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {[
              { name: "Shopify", emoji: "🛍️", desc: "Products, orders & audiences sync automatically" },
              { name: "Meta Ads", emoji: "📘", desc: "Facebook & Instagram campaigns, fully managed" },
              { name: "Google Ads", emoji: "🔍", desc: "Search, Shopping & Display — all in one place" },
            ].map(({ name, emoji, desc }) => (
              <div key={name} className="card" style={{ width: 220, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>{emoji}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{name}</h3>
                <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: "80px 24px 100px", background: "var(--ink)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="eyebrow" style={{ marginBottom: 12, color: "#6BA3FF" }}>Social proof</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-.03em", color: "white" }}>
              Merchants love Agency AI
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 20 }}>
            {testimonials.map(({ quote, name, store, tag }) => (
              <div key={name} style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  {Array(5).fill(0).map((_, i) => <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="#F59E0B"><path d="M7 1l1.5 4H13L9.5 7.5 11 12 7 9.5 3 12l1.5-4.5L1 5h4.5L7 1z"/></svg>)}
                  <span style={{ marginLeft: 4, background: "rgba(0,87,255,0.3)", color: "#90B9FF", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>{tag}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>&ldquo;{quote}&rdquo;</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>{name}</div>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)" }}>{store}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING PREVIEW ═══ */}
      <section style={{ padding: "100px 24px", background: "white" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: 12 }}>Transparent pricing</p>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-.03em", marginBottom: 16 }}>
            Less than one hour of agency fees
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginBottom: 52, maxWidth: 460, margin: "0 auto 52px" }}>
            No contracts. No retainers. Cancel anytime.
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            {[
              { name: "Starter", price: "$0", sub: "forever", features: ["1 campaign", "5 AI creatives/mo", "Meta Ads"] },
              { name: "Growth", price: "$49", sub: "/month", features: ["10 campaigns", "Unlimited creatives", "Meta + Google", "AGEN-AI"], pop: true },
              { name: "Scale", price: "$149", sub: "/month", features: ["Unlimited campaigns", "Multi-brand studio", "5 stores", "Priority support"] },
            ].map(({ name, price, sub, features, pop }) => (
              <div key={name} className={pop ? "plan-pop card" : "card"} style={{ padding: "28px 24px", minWidth: 200, borderRadius: 16 }}>
                {pop && <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>Most Popular</div>}
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 16 }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "2.2rem" }}>{price}</span>
                  <span style={{ fontSize: 14, opacity: 0.7 }}>{sub}</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                  {features.map(f => (
                    <li key={f} style={{ fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3.5 3.5 5.5-6" stroke={pop ? "rgba(255,255,255,0.9)" : "var(--blue)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--blue)", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            See full comparison <IconArrow/>
          </Link>
        </div>
      </section>
    </>
  );
}
