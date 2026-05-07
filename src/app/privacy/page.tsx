import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Agency AI collects, uses, and protects your data.",
};

export default function Privacy() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 100 }}>
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-.04em", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 56 }}>Last updated: January 1, 2025</p>
        {[
          { h: "Information We Collect", p: "We collect information you provide directly (name, email, Shopify store URL), usage data through our platform, and advertising performance data from Meta and Google Ads APIs that you authorize us to access." },
          { h: "How We Use Your Data", p: "We use your data to operate and improve Agency AI, generate ad creatives and campaign recommendations, provide analytics, and communicate with you about your account. We never sell your data to third parties." },
          { h: "Shopify Integration", p: "When you install Agency AI through the Shopify App Store, we access order data, product catalogs, and customer segments solely to power advertising features. This data is processed under Shopify's API terms and your store's privacy policy." },
          { h: "Data Retention", p: "We retain your data for as long as your account is active. You can request deletion of your account and associated data at any time by contacting hello@agencyai.app." },
          { h: "Security", p: "We use industry-standard encryption (TLS 1.3+) for data in transit and AES-256 for data at rest. Our infrastructure undergoes regular security audits." },
          { h: "Contact", p: "For privacy questions, email privacy@agencyai.app or write to Agency AI, Inc., 340 S Lemon Ave #4033, Walnut, CA 91789." },
        ].map(({ h, p }) => (
          <div key={h} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 12 }}>{h}</h2>
            <p style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.8 }}>{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
