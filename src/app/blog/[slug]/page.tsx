import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, {
  title: string; date: string; read: string; cat: string; badge: string; author: string; role: string;
  intro: string; body: string[];
}> = {
  "meta-ads-shopify-2025-guide": {
    title: "The 2025 Meta Ads Playbook for Shopify Stores",
    date: "April 28, 2025", read: "9 min read", cat: "Meta Ads", badge: "#0057FF",
    author: "Sarah Kim", role: "Head of Growth",
    intro: "Meta's ad platform has shifted dramatically since iOS 17 dropped. Privacy changes, algorithm updates, and new placement formats mean strategies from even 12 months ago are underperforming. Here's what we've found works in 2025 across 15,000+ Shopify campaigns.",
    body: [
      "## The algorithm shift you can't ignore",
      "Advantage+ audiences have become Meta's flagship targeting option — and for most Shopify stores, they outperform manual interest targeting by 20–40%. The AI has gotten good enough that your detailed targeting is often just a starting signal, not a constraint.",
      "Our data shows stores that switch from manual to Advantage+ see an average 28% improvement in ROAS within the first 30 days. The key is feeding it enough purchase event data first — at least 50 purchases per week before trusting it fully.",
      "## Creative is now the targeting",
      "With broad audiences, your creative determines who sees your ad. Every element of your creative signals intent: who shot it, what environment it's in, the caption style, the music. This is why creative testing matters more than ever.",
      "The formats winning right now: raw UGC-style videos under 15 seconds, before/after demos, and creator-style hooks with captions. Polished brand videos are losing to authentic content by a 3:1 margin in our dataset.",
      "## Placement hierarchy in 2025",
      "Reels is the dominant placement. If you're not running Reels-optimized creative (9:16 vertical, hook in first 2 seconds), you're paying more for worse results. Our campaigns see 30–45% lower CPMs on Reels vs. feed for the same audience.",
      "Stories still work for retargeting. Feed placements have gotten expensive — use them selectively for prospecting only when you have proven creative.",
      "## Budget structure that's working",
      "Campaign Budget Optimization (CBO) over Ad Set Budget Optimization (ABO) for scaling. Start new creatives in an ABO testing campaign ($20–50/day per ad set), then graduate winners to your CBO campaign.",
      "Keep your CBO campaigns clean: 3–5 ad sets maximum, each testing a different angle (price, social proof, problem/solution). Kill underperformers at the 72-hour mark if they haven't hit your ROAS threshold.",
      "## What's not working anymore",
      "Interest-only targeting stacks (too restrictive for the algorithm), single-image static ads as top-of-funnel, and retargeting audiences under 1,000 people. The platform has scaled — your strategies need to match.",
    ],
  },
  "vapor95-case-study": {
    title: "How Vapor95 Cut Ad Spend 40% While Growing Revenue 3×",
    date: "April 18, 2025", read: "6 min read", cat: "Case Study", badge: "#7C3AED",
    author: "Marcus Rivera", role: "CEO",
    intro: "Vapor95 is a Shopify streetwear brand specializing in vaporwave-aesthetic clothing. They were spending $18,000/month with a boutique agency and generating roughly $45,000 in ad-attributed revenue — a 2.5× ROAS that looked fine until they switched to Agency AI.",
    body: [
      "## The problem with their agency relationship",
      "Vapor95 founder Jake Chen knew something was off. His account manager changed every 3 months, campaign changes took a week to execute, and the 'custom strategy' he was paying for was essentially templated ad sets he'd seen in every industry blog.",
      "'I was paying $4,000/month in retainer fees for something I could configure in an afternoon,' Jake told us. The final straw: their agency ran the same Black Friday creative from 2023 in 2024, word for word.",
      "## The switch",
      "Vapor95 moved to Agency AI in January 2025. Setup took 23 minutes — connecting their Shopify store, Meta account, and uploading their brand assets to Brand Studio. The first campaigns launched within the hour.",
      "## Results at 90 days",
      "The numbers were stark. Monthly ad spend dropped from $18,000 to $10,800 as Agency AI's optimization eliminated waste in underperforming audiences. Ad-attributed revenue grew from $45,000 to $136,000 — a 3× increase.",
      "ROAS jumped from 2.5× to 12.6×. CPM dropped 34% as Advantage+ targeting found Vapor95's core audience more efficiently than the manually-built lookalikes their agency had been using.",
      "## What made the difference",
      "Three things stood out. First, the AI was running creative tests continuously — Vapor95's agency had been testing maybe 2 new creatives per month; Agency AI tested 40+ in the first 30 days. Second, the AGEN-AI assistant flagged a budget reallocation opportunity on day 14 that shifted 60% of spend toward their best-performing product line. Third, no retainer — the $49/month Growth plan gave Vapor95 $3,950/month to reinvest in creative production.",
      "## Jake's take",
      "'I used to dread my monthly agency call. Now I just look at the dashboard. We 3Xed revenue and I got my weekends back.'",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.intro.slice(0, 155) };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 110, paddingBottom: 56, background: "linear-gradient(180deg,var(--blue-pale) 0%,white 100%)", position: "relative" }}>
        <div className="blue-grid" style={{ position: "absolute", inset: 0, opacity: 0.35 }} />
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <Link href="/blog" style={{ color: "var(--muted)", fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              ← Back to Blog
            </Link>
            <span style={{ color: "var(--border)", fontSize: 14 }}>·</span>
            <span style={{ background: post.badge + "18", color: post.badge, fontSize: 11.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 100 }}>
              {post.cat}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.2, marginBottom: 20 }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: post.badge + "22", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 13, color: post.badge }}>
              {post.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{post.author}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{post.role}</div>
            </div>
            <span style={{ color: "var(--border)", marginLeft: 4 }}>·</span>
            <span style={{ color: "var(--muted)", fontSize: 13.5 }}>{post.date}</span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span style={{ color: "var(--muted)", fontSize: 13.5 }}>{post.read}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "56px 24px 100px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          {/* Intro */}
          <p style={{ fontSize: 18, color: "var(--ink)", lineHeight: 1.8, marginBottom: 40, fontWeight: 500, borderLeft: "3px solid var(--blue)", paddingLeft: 20 }}>
            {post.intro}
          </p>

          {/* Body */}
          {post.body.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} style={{ fontSize: "clamp(1.3rem,2.5vw,1.7rem)", fontWeight: 800, letterSpacing: "-.03em", marginTop: 48, marginBottom: 16, color: "var(--ink)" }}>
                  {block.slice(3)}
                </h2>
              );
            }
            return (
              <p key={i} style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.85, marginBottom: 20 }}>
                {block}
              </p>
            );
          })}

          {/* CTA */}
          <div className="card-blue" style={{ borderRadius: 16, padding: "36px 32px", marginTop: 64, textAlign: "center" }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, letterSpacing: "-.02em" }}>
              Put this into practice with Agency AI
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 24 }}>
              Run everything in this guide automatically — no media buyer required.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://apps.shopify.com/agency-ai" target="_blank" rel="noopener noreferrer" className="btn btn-blue" style={{ fontSize: 14.5 }}>
                Install Free on Shopify
              </a>
              <Link href="/blog" className="btn btn-outline" style={{ fontSize: 14.5 }}>
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
