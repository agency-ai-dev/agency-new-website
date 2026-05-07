import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Blog",
  description: "E-commerce marketing insights, Meta & Google Ads strategies, and Shopify growth tips from the Agency AI team.",
};

const posts = [
  {
    slug: "meta-ads-shopify-2025-guide",
    title: "The Complete Meta Ads Guide for Shopify Stores in 2025",
    excerpt: "Everything you need to know about running profitable Meta ad campaigns — from campaign structure to creative strategy and budget scaling.",
    category: "Meta Ads",
    readTime: "12 min read",
    date: "May 2, 2025",
    featured: true,
    color: "#6366F1",
    emoji: "📘",
  },
  {
    slug: "ai-ad-creative-shopify",
    title: "How AI-Generated Ad Creatives Are Outperforming Human Designers",
    excerpt: "New data shows AI-generated ad creatives achieve 40% higher CTR on average. Here's why, and how to leverage it for your Shopify store.",
    category: "AI & Automation",
    readTime: "8 min read",
    date: "Apr 28, 2025",
    featured: false,
    color: "#8B5CF6",
    emoji: "🤖",
  },
  {
    slug: "google-shopping-ads-guide",
    title: "Google Shopping Ads for Shopify: A Step-by-Step Setup Guide",
    excerpt: "Product listing ads are still the highest-ROI channel for most e-commerce brands. Here's how to set them up and optimize them.",
    category: "Google Ads",
    readTime: "10 min read",
    date: "Apr 20, 2025",
    featured: false,
    color: "#0EA5E9",
    emoji: "🔍",
  },
  {
    slug: "vapor95-case-study",
    title: "Case Study: How Vapor95 Achieved 200% ROI Increase with Agency AI",
    excerpt: "A deep dive into how the retro-futuristic apparel brand transformed its paid advertising performance using Agency AI's automation.",
    category: "Case Study",
    readTime: "7 min read",
    date: "Apr 15, 2025",
    featured: false,
    color: "#EC4899",
    emoji: "🚀",
  },
  {
    slug: "reduce-ad-spend-waste",
    title: "7 Ways Shopify Merchants Are Wasting Their Ad Budget (and How to Stop)",
    excerpt: "From audience overlap to creative fatigue — these are the most common ad budget drains we see, and how AI automation prevents them.",
    category: "Strategy",
    readTime: "9 min read",
    date: "Apr 10, 2025",
    featured: false,
    color: "#F59E0B",
    emoji: "💡",
  },
  {
    slug: "retargeting-shopify-strategy",
    title: "The Ultimate Retargeting Strategy for Shopify Stores in 2025",
    excerpt: "Abandoned carts are leaving money on the table. Here's a proven retargeting funnel that recovers 15–25% of lost sales.",
    category: "Strategy",
    readTime: "11 min read",
    date: "Apr 5, 2025",
    featured: false,
    color: "#10B981",
    emoji: "🔄",
  },
];

const categories = ["All", "Meta Ads", "Google Ads", "AI & Automation", "Strategy", "Case Study"];

export default function Blog() {
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 64, textAlign: "center", position: "relative" }} className="dot-grid">
        <div style={{ position: "absolute", top: "30%", left: "30%", width: 400, height: 300, borderRadius: "50%", background: "rgba(99,102,241,0.1)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <p className="section-label animate-fade-up" style={{ marginBottom: 14 }}>The Agency AI Blog</p>
          <h1 className="animate-fade-up-1" style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", fontWeight: 900, letterSpacing: "-.04em", marginBottom: 18 }}>
            Grow smarter.<br/>
            <span className="gradient-text">Advertise better.</span>
          </h1>
          <p className="animate-fade-up-2" style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.7 }}>
            Meta Ads strategies, Google Ads playbooks, AI automation tips — written by people who&apos;ve spent millions in e-commerce ads.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Category filter */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
            {categories.map((cat, i) => (
              <span key={cat} style={{ padding: "7px 16px", borderRadius: 100, fontSize: 13.5, fontWeight: 500, cursor: "pointer", background: i === 0 ? "var(--primary)" : "var(--surface)", color: i === 0 ? "#fff" : "var(--text-muted)", border: "1px solid " + (i === 0 ? "var(--primary)" : "var(--border)"), transition: "all .2s", userSelect: "none" }}>
                {cat}
              </span>
            ))}
          </div>

          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} className="blog-card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 20, overflow: "hidden", textDecoration: "none", marginBottom: 32, border: "1px solid var(--border)", background: "var(--surface)" }}>
            <div className="blog-img-wrap" style={{ minHeight: 300, background: `linear-gradient(135deg, ${featured.color}22, ${featured.color}44)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 80 }}>{featured.emoji}</span>
            </div>
            <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
                <span style={{ padding: "4px 12px", borderRadius: 100, background: featured.color + "22", color: featured.color, fontSize: 12, fontWeight: 600 }}>
                  ★ Featured
                </span>
                <span style={{ padding: "4px 12px", borderRadius: 100, background: "var(--surface-2)", color: "var(--text-muted)", fontSize: 12, fontWeight: 500 }}>
                  {featured.category}
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 14, lineHeight: 1.25, color: "var(--text)" }}>
                {featured.title}
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{featured.excerpt}</p>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text-dim)" }}>{featured.date}</span>
                <span style={{ color: "var(--text-dim)" }}>·</span>
                <span style={{ fontSize: 13, color: "var(--text-dim)" }}>{featured.readTime}</span>
                <span style={{ marginLeft: "auto", color: "var(--primary-bright)", fontSize: 14, fontWeight: 600 }}>Read article →</span>
              </div>
            </div>
          </Link>

          {/* Rest of posts */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {rest.map(({ slug, title, excerpt, category, readTime, date, color, emoji }) => (
              <Link key={slug} href={`/blog/${slug}`} className="blog-card glass" style={{ borderRadius: 16, overflow: "hidden", textDecoration: "none", display: "flex", flexDirection: "column" }}>
                <div className="blog-img-wrap" style={{ height: 180, background: `linear-gradient(135deg, ${color}18, ${color}30)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 56 }}>{emoji}</span>
                </div>
                <div style={{ padding: "24px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{ padding: "3px 10px", borderRadius: 100, background: color + "18", color, fontSize: 11.5, fontWeight: 600, marginBottom: 14, alignSelf: "flex-start" }}>
                    {category}
                  </span>
                  <h3 style={{ fontSize: 16.5, fontWeight: 700, letterSpacing: "-.02em", marginBottom: 10, lineHeight: 1.35, color: "var(--text)" }}>{title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{excerpt}</p>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12.5, color: "var(--text-dim)" }}>
                    <span>{date}</span>
                    <span>·</span>
                    <span>{readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="glass-bright" style={{ borderRadius: 20, padding: "48px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📬</div>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 12 }}>
              Get growth tips in your inbox
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 24, lineHeight: 1.7 }}>
              Weekly e-commerce marketing insights. No spam, unsubscribe anytime.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
