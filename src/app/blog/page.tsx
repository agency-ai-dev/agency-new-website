import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Blog",
  description: "E-commerce growth tactics, Shopify ad strategy, and AI marketing insights from the Agency AI team.",
};

const posts = [
  {
    slug: "meta-ads-shopify-2025-guide",
    cat: "Meta Ads", badge: "#0057FF",
    title: "The 2025 Meta Ads Playbook for Shopify Stores",
    excerpt: "Everything that's changed in Meta's algorithm since iOS 17 — and the exact creative formats that are outperforming in 2025.",
    date: "Apr 28, 2025", read: "9 min read",
    author: "Head of Growth", featured: true,
  },
  {
    slug: "vapor95-case-study",
    cat: "Case Study", badge: "#7C3AED",
    title: "How Vapor95 Cut Ad Spend 40% While Growing Revenue 3×",
    excerpt: "The Shopify streetwear brand that replaced their entire agency with Agency AI — and the metrics that followed.",
    date: "Apr 18, 2025", read: "6 min read",
    author: "CEO", featured: false,
  },
  {
    slug: "google-shopping-optimization",
    cat: "Google Ads", badge: "#059669",
    title: "Google Shopping Feed Optimization for Shopify in 2025",
    excerpt: "Title formulas, image requirements, and bidding structures that move the needle on Shopping campaigns.",
    date: "Apr 10, 2025", read: "7 min read",
    author: "Head of Growth", featured: false,
  },
  {
    slug: "ai-ad-creative-guide",
    cat: "Creative", badge: "#D97706",
    title: "Writing AI Ad Briefs That Actually Convert",
    excerpt: "The prompt structures our AI uses internally — and how you can use them to brief any creative resource.",
    date: "Mar 30, 2025", read: "5 min read",
    author: "Head of Design", featured: false,
  },
  {
    slug: "roas-benchmarks-2025",
    cat: "Analytics", badge: "#0891B2",
    title: "Shopify Ad ROAS Benchmarks by Category — 2025 Edition",
    excerpt: "Data from 5,000+ campaigns across 12 product categories. Know if your numbers are good, average, or broken.",
    date: "Mar 20, 2025", read: "8 min read",
    author: "CTO", featured: false,
  },
  {
    slug: "shopify-ab-testing",
    cat: "Testing", badge: "#BE185D",
    title: "A/B Testing Ad Creatives Without Burning Your Budget",
    excerpt: "A structured framework for testing creatives that reaches statistical significance in days, not months.",
    date: "Mar 8, 2025", read: "6 min read",
    author: "Head of Growth", featured: false,
  },
];

const cats = ["All", "Meta Ads", "Google Ads", "Case Study", "Analytics", "Creative", "Testing"];

export default function Blog() {
  const featured = posts.find(p => p.featured)!;
  const rest = posts.filter(p => !p.featured);

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 130, paddingBottom: 60, background: "linear-gradient(180deg,var(--blue-pale) 0%,white 100%)", position: "relative" }}>
        <div className="blue-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
          <p className="eyebrow afu" style={{ marginBottom: 14 }}>From the team</p>
          <h1 className="afu-1" style={{ fontSize: "clamp(2.2rem,6vw,3.6rem)", letterSpacing: "-.04em", marginBottom: 18 }}>
            Growth insights for <span style={{ color: "var(--blue)" }}>Shopify brands</span>
          </h1>
          <p className="afu-2" style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7 }}>
            Tactics, case studies, and data from the people who run 15,000+ Shopify ad campaigns.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section style={{ padding: "0 24px", position: "sticky", top: 66, zIndex: 10, background: "white", borderBottom: "1.5px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 6, overflowX: "auto", padding: "14px 0", scrollbarWidth: "none" }}>
          {cats.map((c, i) => (
            <button key={c} style={{
              padding: "7px 16px", borderRadius: 100, fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap",
              border: i === 0 ? "none" : "1.5px solid var(--border)",
              background: i === 0 ? "var(--blue)" : "transparent",
              color: i === 0 ? "white" : "var(--muted)", cursor: "pointer", fontFamily: "inherit",
            }}>{c}</button>
          ))}
        </div>
      </section>

      {/* Featured post */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 18 }}>Featured</p>
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none" }}>
            <div className="card" style={{ borderRadius: 20, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 300 }}>
              <div style={{ background: "linear-gradient(135deg,var(--blue) 0%,#003BB5 100%)", padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ background: "rgba(255,255,255,0.15)", color: "white", fontSize: 11.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 100 }}>
                    {featured.cat}
                  </span>
                  <h2 style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 800, color: "white", marginTop: 24, letterSpacing: "-.03em", lineHeight: 1.3 }}>{featured.title}</h2>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15.5, lineHeight: 1.7, marginTop: 16 }}>{featured.excerpt}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32 }}>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5 }}>{featured.date}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5 }}>{featured.read}</span>
                  <span style={{ marginLeft: "auto", color: "white", fontSize: 13.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>Read →</span>
                </div>
              </div>
              <div style={{ background: "var(--blue-pale)", padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { label: "Key finding", value: "Video creatives outperform static by 3.2× in 2025" },
                    { label: "Biggest change", value: "Advantage+ audiences now beat manual targeting for 80% of stores" },
                    { label: "Quick win", value: "Switching to Reels placement alone dropped CPM 34% on average" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ borderLeft: "3px solid var(--blue)", paddingLeft: 16 }}>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.5 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Post grid */}
      <section style={{ padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 20 }}>
            {rest.map(({ slug, cat, badge, title, excerpt, date, read, author }) => (
              <Link key={slug} href={`/blog/${slug}`} style={{ textDecoration: "none" }}>
                <article className="card" style={{ borderRadius: 16, padding: "28px 26px", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <span style={{ background: badge + "18", color: badge, fontSize: 11.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 100 }}>
                      {cat}
                    </span>
                    <span style={{ color: "var(--muted)", fontSize: 12.5 }}>{read}</span>
                  </div>
                  <h2 style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)", lineHeight: 1.4, marginBottom: 12, letterSpacing: "-.02em" }}>{title}</h2>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--blue)" }}>
                        {author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{author}</div>
                        <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{date}</div>
                      </div>
                    </div>
                    <span style={{ color: "var(--blue)", fontSize: 13, fontWeight: 700 }}>Read →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "80px 24px", background: "var(--ink)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#6BA3FF", marginBottom: 14 }}>Stay sharp</p>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: "white", letterSpacing: "-.03em", marginBottom: 14 }}>
            Weekly growth tactics,<br/>delivered free
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginBottom: 32 }}>
            No fluff. One actionable insight per week from brands running real campaigns.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <NewsletterForm dark />
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12.5, marginTop: 16 }}>3,200+ subscribers · Unsubscribe anytime</p>
        </div>
      </section>
    </>
  );
}
