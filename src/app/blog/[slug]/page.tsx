import type { Metadata } from "next";
import Link from "next/link";

const posts: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  emoji: string;
  color: string;
  content: string;
}> = {
  "meta-ads-shopify-2025-guide": {
    title: "The Complete Meta Ads Guide for Shopify Stores in 2025",
    excerpt: "Everything you need to know about running profitable Meta ad campaigns — from campaign structure to creative strategy and budget scaling.",
    category: "Meta Ads",
    readTime: "12 min read",
    date: "May 2, 2025",
    emoji: "📘",
    color: "#6366F1",
    content: `Meta Ads remain one of the highest-ROI advertising channels for Shopify stores — when done right. In this guide, we cover everything from campaign structure to creative strategy.

## Campaign Structure: The Foundation

A well-structured Meta Ads account follows the CBO (Campaign Budget Optimization) model:

**Top of Funnel (TOF)**: Broad audiences, new customer acquisition, brand awareness. Use Advantage+ audiences for maximum reach.

**Middle of Funnel (MOF)**: Engaged audiences — people who visited your store, watched a video, or engaged with your Instagram. Warm them up with social proof.

**Bottom of Funnel (BOF)**: Retargeting. Add-to-cart abandoners, product page visitors, past purchasers for cross-sell. This is where you close.

## Creative Strategy in 2025

Meta's algorithm is now heavily weighted toward creative performance. The days of "set and forget" targeting are over — your creatives drive targeting now.

**What works in 2025:**
- UGC-style content outperforms polished studio shots by 30–40%
- Video under 15 seconds with a strong hook in the first 2 seconds
- Text overlays on static images — especially on mobile
- Before/after formats for problem-solving products

## Budget Scaling

Start small, validate, then scale. Our recommended approach:
1. Test with $20–50/day per ad set
2. Let algorithms optimize for 5–7 days minimum
3. Scale winners by 20% every 3–4 days
4. Never kill a campaign mid-learning phase

## Using AI to 10x Your Output

Manual ad creation can't keep up with the volume Meta's algorithm needs to test. Agency AI generates dozens of creative variations automatically, letting the algorithm find your winners faster.

The result: lower CPAs, higher ROAS, and more time to focus on your product and customers.`,
  },
  "vapor95-case-study": {
    title: "Case Study: How Vapor95 Achieved 200% ROI Increase with Agency AI",
    excerpt: "A deep dive into how the retro-futuristic apparel brand transformed its paid advertising performance.",
    category: "Case Study",
    readTime: "7 min read",
    date: "Apr 15, 2025",
    emoji: "🚀",
    color: "#EC4899",
    content: `Vapor95 is a beloved retro-futuristic apparel brand with a cult following. But despite a passionate community, their paid advertising wasn't performing.

## The Challenge

Before Agency AI, Vapor95 was:
- Spending $8,000/month on Meta Ads
- Achieving a 1.2x ROAS — barely breaking even
- Manually creating 4–6 ad variations per month
- Struggling to keep creatives fresh for their niche audience

## The Agency AI Solution

After installing Agency AI, Vapor95's marketing team connected their Shopify store and uploaded their brand assets in under 10 minutes.

Within the first week:
- AGEN-AI identified their audience was experiencing creative fatigue
- AI generated 28 new creative variations in their signature aesthetic
- New lookalike audiences were built from their highest-LTV customers

## The Results

After 90 days with Agency AI:

**ROAS**: 1.2x → 3.6x (200% increase)
**CPA**: Reduced by 45%
**Weekly ad creatives**: 4 → 28 (700% increase)
**Time spent on ads**: 20hrs/week → 3hrs/week

## Key Learnings

The biggest win wasn't the automation — it was the creative volume. Meta's algorithm needs variety to find winning combinations. By generating 7x more creatives, Vapor95 gave the algorithm what it needed to optimize.

"Agency AI has outperformed both our internal ad efforts and every agency we've ever worked with." — Vapor95 team`,
  },
};

// Fallback for other slugs
const defaultPost = {
  title: "E-commerce Growth Insights",
  excerpt: "Strategies, tips, and playbooks for growing your Shopify store with paid advertising.",
  category: "Strategy",
  readTime: "8 min read",
  date: "Apr 2025",
  emoji: "💡",
  color: "#F59E0B",
  content: `This article covers proven strategies for growing your Shopify store with paid advertising on Meta and Google.

## Understanding Your Funnel

Every successful e-commerce paid advertising strategy maps to your customer journey: awareness → consideration → conversion → retention.

## Meta vs. Google: Where to Start

For most Shopify stores, Meta Ads offer the faster path to profitability because of their visual format and precise audience targeting. Google Shopping Ads are essential for high-intent, product-search traffic.

## The Role of AI in Modern Advertising

AI-powered tools like Agency AI are changing the game by automating the most time-consuming parts of campaign management — creative generation, audience research, bid optimization, and performance monitoring.

The result: merchants who previously spent 15–20 hours per week on their ads are now spending less than 3 hours while achieving better results.`,
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug] || defaultPost;
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug] || defaultPost;

  const paragraphs = post.content.trim().split("\n\n");

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 48, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: `linear-gradient(180deg, ${post.color}08 0%, transparent 100%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          {/* Back */}
          <Link href="/blog" className="btn-ghost" style={{ marginBottom: 32, display: "inline-flex" }}>
            ← Back to Blog
          </Link>

          {/* Meta */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 24 }}>
            <span style={{ padding: "4px 12px", borderRadius: 100, background: post.color + "20", color: post.color, fontSize: 12.5, fontWeight: 600 }}>{post.category}</span>
            <span style={{ color: "var(--text-dim)", fontSize: 13 }}>{post.date}</span>
            <span style={{ color: "var(--text-dim)" }}>·</span>
            <span style={{ color: "var(--text-dim)", fontSize: 13 }}>{post.readTime}</span>
          </div>

          <h1 style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.12, marginBottom: 20 }}>{post.title}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 18, lineHeight: 1.7 }}>{post.excerpt}</p>
        </div>
      </section>

      {/* Hero image */}
      <div style={{ maxWidth: 900, margin: "0 auto 64px", padding: "0 24px" }}>
        <div style={{ borderRadius: 16, height: 320, background: `linear-gradient(135deg, ${post.color}15, ${post.color}30)`, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 96 }}>{post.emoji}</span>
        </div>
      </div>

      {/* Content */}
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ fontSize: 16.5, lineHeight: 1.85, color: "var(--text-muted)" }}>
          {paragraphs.map((p, i) => {
            if (p.startsWith("## ")) {
              return <h2 key={i} style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "var(--text)", marginTop: 48, marginBottom: 18, letterSpacing: "-.03em" }}>{p.replace("## ", "")}</h2>;
            }
            if (p.startsWith("**") && p.endsWith("**")) {
              return <p key={i} style={{ fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{p.replace(/\*\*/g, "")}</p>;
            }
            if (p.startsWith("- ")) {
              const items = p.split("\n").filter(l => l.startsWith("- "));
              return (
                <ul key={i} style={{ listStyle: "none", marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {items.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--primary-bright)", marginTop: 2 }}>→</span>
                      <span style={{ fontSize: 15.5 }} dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--text);font-weight:700">$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} style={{ marginBottom: 20, fontSize: 16.5 }}
                dangerouslySetInnerHTML={{ __html: p.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--text);font-weight:700">$1</strong>') }}
              />
            );
          })}
        </div>

        {/* Divider */}
        <div className="divider-glow" style={{ margin: "56px 0 40px" }} />

        {/* Author/CTA */}
        <div className="glass" style={{ borderRadius: 16, padding: "28px 24px", display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#6366F1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Onest',sans-serif", fontWeight: 800, color: "#fff", flexShrink: 0, fontSize: 16 }}>AI</div>
          <div>
            <p style={{ fontWeight: 700, marginBottom: 4 }}>Agency AI Team</p>
            <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.65 }}>
              Want to put this into practice without the manual work? Agency AI automates everything in this article for your Shopify store.
            </p>
            <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 14, fontSize: 14, padding: "10px 20px" }}>
              Try Agency AI Free →
            </a>
          </div>
        </div>

        {/* Back */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link href="/blog" className="btn-secondary">
            ← More Articles
          </Link>
        </div>
      </article>
    </>
  );
}
