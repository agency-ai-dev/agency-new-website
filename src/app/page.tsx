import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agency AI — AI-Powered E-commerce Growth Engine",
  description: "Automate your Meta and Google Ads with an AI design studio built around your Shopify brand. Launch faster, optimize automatically.",
};

/* ─── inline SVG icons ─── */
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="rgba(99,102,241,0.2)"/>
    <path d="M5 8l2 2 4-4" stroke="#818CF8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B">
    <path d="M7 1l1.5 4H13L9.5 7.5 11 12 7 9.5 3 12l1.5-4.5L1 5h4.5L7 1z"/>
  </svg>
);
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconBarChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconBrush = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 014.03 4.03l-8.06 8.08"/><path d="M7.07 14.94C5.79 16.2 4.5 16.5 3.32 16.5c0 0 1.18 3.5 5.18 3.5 1.5 0 3-.5 4-1.5"/>
  </svg>
);
const IconMessage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

const features = [
  { icon: <IconZap/>, title: "AI Ad Creation", desc: "Generate scroll-stopping Meta and Google ad creatives in seconds — tailored to your brand's colors, fonts, and voice." },
  { icon: <IconTarget/>, title: "Auto-Optimization", desc: "AGEN-AI monitors campaigns 24/7 and suggests improvements. Approve changes with one tap." },
  { icon: <IconBarChart/>, title: "Unified Analytics", desc: "All your Meta, Google, and Shopify data in one clean dashboard. No more tab-switching." },
  { icon: <IconBrush/>, title: "Brand Studio", desc: "Upload your assets once. Every ad generated stays perfectly on-brand, every time." },
  { icon: <IconMessage/>, title: "Chat to Launch", desc: "Describe your campaign in plain English. AGEN-AI handles the setup, targeting, and launch." },
  { icon: <IconZap/>, title: "Affordable Plans", desc: "Fraction of what an agency charges. No contracts. Cancel anytime." },
];

const testimonials = [
  { quote: "Agency AI has outperformed both our internal ad efforts and every agency we've ever worked with.", author: "Lola Hemp", handle: "lolahemplolahemp.com", stars: 5, logo: "LH" },
  { quote: "Since launching with Agency AI we've seen an almost 200% increase in ROI from our Meta campaigns.", author: "Vapor95", handle: "vapor95.com", stars: 5, logo: "V9" },
  { quote: "Great marketing app, improved our Meta ROAS and saves our marketing team a ton of time each week.", author: "Epic Hoodie", handle: "epichoodie.com", stars: 5, logo: "EH" },
  { quote: "Finally an AI tool that actually understands e-commerce. Our CPA dropped 40% in the first month.", author: "Urban Threads", handle: "urbanthreads.co", stars: 5, logo: "UT" },
  { quote: "Replaced our entire ads agency. Better results, 80% less cost. This is the future of e-com marketing.", author: "Peak Supply", handle: "peaksupply.com", stars: 5, logo: "PS" },
  { quote: "The brand studio alone is worth it. Every creative looks like it was made by a top design team.", author: "Bloom Collective", handle: "bloomcollective.shop", stars: 5, logo: "BC" },
];

const stats = [
  { num: "$25M+", label: "In Shopify sales driven" },
  { num: "20K+", label: "Active app users" },
  { num: "200%", label: "Avg. ROI increase" },
  { num: "40%", label: "Avg. CPA reduction" },
];

const steps = [
  { n: "01", title: "Connect your store", desc: "Link Shopify in one click. We pull your products, brand assets, and past performance data automatically." },
  { n: "02", title: "Describe your goal", desc: "Tell AGEN-AI what you want to achieve — more sales, brand awareness, or retargeting — in plain English." },
  { n: "03", title: "Launch & optimize", desc: "AI generates creatives, sets targeting, launches campaigns, and keeps optimizing while you sleep." },
];

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }} className="dot-grid">
        {/* Orbs */}
        <div className="orb" style={{ position: "absolute", top: "10%", left: "15%", width: 500, height: 500, background: "rgba(99,102,241,0.18)" }} />
        <div className="orb" style={{ position: "absolute", bottom: "5%", right: "10%", width: 400, height: 400, background: "rgba(168,85,247,0.14)", animationDelay: "-4s" }} />
        <div className="orb" style={{ position: "absolute", top: "50%", left: "55%", width: 280, height: 280, background: "rgba(255,92,40,0.08)", animationDelay: "-8s" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
          {/* Badge */}
          <div className="animate-fade-up" style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 100, fontSize: 13, fontWeight: 500, color: "#818CF8" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#818CF8", boxShadow: "0 0 8px #818CF8" }} />
              Now live on the Shopify App Store
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-1" style={{ textAlign: "center", fontSize: "clamp(2.6rem, 7vw, 5.2rem)", fontFamily: "'Onest',sans-serif", fontWeight: 900, letterSpacing: "-.035em", lineHeight: 1.06, marginBottom: 24 }}>
            The E-commerce<br/>
            <span className="gradient-text">Growth Engine</span><br/>
            <span style={{ color: "rgba(240,242,255,0.7)", fontWeight: 400, fontSize: "0.85em" }}>Powered by AI</span>
          </h1>

          {/* Sub */}
          <p className="animate-fade-up-2" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 40px", fontSize: "clamp(1rem, 2vw, 1.18rem)", color: "var(--text-muted)", lineHeight: 1.7 }}>
            Agency AI automates your Meta and Google Ads with a brand-aware AI design studio and copy generator. Launch campaigns in minutes, not days.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-3" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 56 }}>
            <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "15px 32px" }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              Install Free on Shopify
            </a>
            <Link href="/contact" className="btn-secondary" style={{ fontSize: 16, padding: "15px 32px" }}>
              Schedule a Demo <IconArrow/>
            </Link>
          </div>

          {/* Social proof */}
          <div className="animate-fade-up-4" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {Array(5).fill(0).map((_, i) => <IconStar key={i}/>)}
              <span style={{ color: "var(--text-muted)", fontSize: 14, marginLeft: 4 }}>4.9 on Shopify App Store</span>
            </div>
            <span style={{ color: "var(--text-dim)" }}>•</span>
            <span style={{ color: "var(--text-muted)", fontSize: 14 }}>20,000+ active users</span>
            <span style={{ color: "var(--text-dim)" }}>•</span>
            <span style={{ color: "var(--text-muted)", fontSize: 14 }}>Free to install</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="animate-bounce-down" style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", color: "var(--text-dim)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, textAlign: "center" }}>
            {stats.map(({ num, label }) => (
              <div key={label}>
                <div className="stat-num" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 6 }}>{num}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 14 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO SECTION ═══ */}
      <section id="video" style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>See it in action</p>
            <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 16 }}>
              The E-Commerce Owner&apos;s<br/>
              <span className="gradient-text">Dilemma — Solved</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
              Watch how Shopify store owners go from zero to high-performing ad campaigns in under 10 minutes.
            </p>
          </div>

          <div className="video-glow" style={{ borderRadius: 16, overflow: "hidden", position: "relative", background: "var(--surface)" }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", background: "linear-gradient(135deg, #111630, #1A2040)" }}>
              {/* Play button overlay — placeholder for real video embed */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(99,102,241,0.2)", border: "2px solid rgba(99,102,241,0.5)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .2s, background .2s" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#818CF8"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: 14 }}>Watch the 3-minute overview</span>
              </div>
              {/* Real video tag */}
              <video
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0 }}
                preload="none"
                poster=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding: "80px 24px 96px", background: "var(--bg-2)", position: "relative" }}>
        <div className="divider-glow" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>Simple workflow</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 16 }}>
              Launch campaigns in <span className="gradient-text">3 simple steps</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>
              No marketing degree. No agency. Just results.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="glass hover-card" style={{ borderRadius: 16, padding: "36px 28px", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontFamily: "'Onest',sans-serif", fontWeight: 900, color: "rgba(99,102,241,0.08)", position: "absolute", top: 12, right: 20, lineHeight: 1, userSelect: "none" }}>{n}</div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: "#818CF8" }}>
                  {n === "01" ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                   : n === "02" ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                   : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: "-.02em" }}>{title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="divider-glow" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>Everything you need</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 16 }}>
              Replace your <span className="gradient-text">entire marketing stack</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
              One platform. Every tool you need to dominate paid ads and grow your Shopify revenue.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="glass hover-card" style={{ borderRadius: 14, padding: "28px 24px" }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "#818CF8" }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: "-.02em" }}>{title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTEGRATIONS ═══ */}
      <section id="integrations" style={{ padding: "80px 24px", background: "var(--bg-2)", position: "relative" }}>
        <div className="divider-glow" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p className="section-label" style={{ marginBottom: 12 }}>Native integrations</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 16 }}>
            Seamlessly connected to<br/><span className="gradient-text">where you sell & advertise</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 56, maxWidth: 460, margin: "0 auto 56px" }}>
            All the tools e-commerce brands rely on, unified in one intelligent platform.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
            {[
              { name: "Shopify", color: "#96BF48", icon: "🛍️", desc: "Sync products, orders & audiences" },
              { name: "Meta Ads", color: "#1877F2", icon: "📘", desc: "Facebook & Instagram campaigns" },
              { name: "Google Ads", color: "#4285F4", icon: "🔍", desc: "Search, Shopping & Display" },
            ].map(({ name, icon, desc }) => (
              <div key={name} className="glass hover-card" style={{ borderRadius: 16, padding: "32px 28px", width: 220, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{name}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="divider-glow" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>Social proof</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 16 }}>
              Shopify merchants love <span className="gradient-text">Agency AI</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 17 }}>Real results from real stores.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {testimonials.map(({ quote, author, handle, stars, logo }) => (
              <div key={author} className="glass hover-card" style={{ borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", gap: 3 }}>{Array(stars).fill(0).map((_, i) => <IconStar key={i}/>)}</div>
                <p style={{ color: "var(--text)", fontSize: 15, lineHeight: 1.7, flex: 1 }}>&ldquo;{quote}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#6366F1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{logo}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{author}</div>
                    <div style={{ color: "var(--text-dim)", fontSize: 12 }}>{handle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURE HIGHLIGHT (AGEN-AI) ═══ */}
      <section style={{ padding: "80px 24px", background: "var(--bg-2)", position: "relative" }}>
        <div className="divider-glow" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <p className="section-label" style={{ marginBottom: 14 }}>Meet AGEN-AI</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 20, lineHeight: 1.15 }}>
              Your AI CMO,<br/><span className="gradient-text">available 24/7</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.75, marginBottom: 32 }}>
              AGEN-AI proactively monitors your campaigns and identifies ways to improve performance. Approve optimizations with one tap. Launch new campaigns with a simple message.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              {[
                "No marketing degree needed — AI handles complexity",
                "Works like texting a friend, not filling out forms",
                "Approve changes with one tap, not 50 clicks",
                "Identifies budget leaks before they cost you",
              ].map(item => (
                <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <IconCheck/>
                  <span style={{ color: "var(--text-muted)", fontSize: 15 }}>{item}</span>
                </li>
              ))}
            </ul>
            <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Try AGEN-AI Free <IconArrow/>
            </a>
          </div>

          {/* Mock AI chat UI */}
          <div className="glass-bright" style={{ borderRadius: 20, padding: "24px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6366F1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" stroke="white" strokeWidth="1.5"/><circle cx="9" cy="9" r="2" fill="white"/></svg>
              </div>
              <span style={{ fontWeight: 600, fontSize: 14 }}>AGEN-AI</span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#10B981" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981" }} />
                Active
              </span>
            </div>
            {[
              { role: "ai", text: "📊 Your Meta ROAS dropped 18% over the last 3 days. I've identified the cause: your best-performing audience has audience fatigue." },
              { role: "user", text: "What do you suggest?" },
              { role: "ai", text: "I've drafted 3 new creative variations and a fresh lookalike audience. Want me to launch them now?" },
              { role: "user", text: "Yes, go ahead!" },
              { role: "ai", text: "✅ Done! New creatives are live. I'll monitor performance and report back in 24 hours." },
            ].map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                <div style={{ maxWidth: "78%", padding: "10px 14px", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: msg.role === "user" ? "var(--primary)" : "var(--surface-2)", fontSize: 13.5, lineHeight: 1.6, color: msg.role === "user" ? "#fff" : "var(--text)" }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1, background: "var(--surface)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "var(--text-dim)", border: "1px solid var(--border)" }}>Ask AGEN-AI anything...</div>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="divider-glow" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
      </section>

      {/* ═══ PRICING PREVIEW ═══ */}
      <section style={{ padding: "96px 24px 80px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p className="section-label" style={{ marginBottom: 12 }}>Pricing</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 16 }}>
            Start free. Scale as you grow.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 17, marginBottom: 36 }}>
            Fraction of what an agency charges. No contracts, no surprise fees.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 40 }}>
            {[
              { plan: "Free", price: "$0", note: "Forever" },
              { plan: "Growth", price: "$49", note: "/month", highlight: true },
              { plan: "Scale", price: "$149", note: "/month" },
            ].map(({ plan, price, note, highlight }) => (
              <div key={plan} className={highlight ? "pricing-popular" : "glass hover-card"} style={{ borderRadius: 16, padding: "28px 32px", minWidth: 180, background: highlight ? "rgba(17,22,48,0.9)" : undefined }}>
                {highlight && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#818CF8", marginBottom: 10 }}>Most Popular</div>}
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{plan}</div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)", marginTop: 6 }}>$</span>
                  <span className="stat-num" style={{ fontSize: "2.4rem" }}>{price.replace("$", "")}</span>
                  <span style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 14 }}>{note}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="btn-ghost" style={{ fontSize: 16 }}>
            See full pricing comparison <IconArrow/>
          </Link>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ padding: "80px 24px 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div className="glass-bright" style={{ borderRadius: 24, padding: "64px 48px", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg,#6366F1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.1 }}>
              Ready to 10x your<br/>
              <span className="gradient-text">e-commerce growth?</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 17, maxWidth: 420 }}>
              Join 20,000+ Shopify merchants using AI to outperform their competition. Free to start, no credit card required.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "15px 32px" }}>
                Install Free on Shopify
              </a>
              <Link href="/contact" className="btn-secondary" style={{ fontSize: 16, padding: "15px 32px" }}>
                Schedule Demo
              </Link>
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
              {["Free install", "No credit card", "Cancel anytime"].map(t => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: 13 }}>
                  <IconCheck/> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
