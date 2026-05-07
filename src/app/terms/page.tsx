import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Agency AI platform.",
};

export default function Terms() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 100 }}>
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-.04em", marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 56 }}>Last updated: January 1, 2025</p>
        {[
          { h: "Acceptance of Terms", p: "By installing or using Agency AI, you agree to these Terms. If you don't agree, don't use our service. These Terms apply to all users of the platform." },
          { h: "Use of the Service", p: "Agency AI grants you a non-exclusive, non-transferable license to use the platform for your Shopify store's advertising needs. You may not resell, sublicense, or use the service to build a competing product." },
          { h: "Subscription & Billing", p: "Paid plans are billed monthly through the Shopify Billing API. You can cancel anytime from your Shopify admin. Refunds are available within 14 days of any paid upgrade — no questions asked." },
          { h: "Ad Platform Compliance", p: "You're responsible for ensuring your ads comply with Meta's and Google's advertising policies. Agency AI is not liable for ad account suspensions resulting from policy violations in your ad content or targeting." },
          { h: "Limitation of Liability", p: "Agency AI's liability is limited to the fees you paid in the 3 months prior to any claim. We're not liable for indirect, incidental, or consequential damages including lost revenue from ad campaigns." },
          { h: "Changes to Terms", p: "We may update these Terms with 30 days' notice. Continued use after notice constitutes acceptance. For questions, contact legal@agencyai.app." },
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
