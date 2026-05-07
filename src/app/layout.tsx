import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Agency AI — AI-Powered E-commerce Growth Engine",
    template: "%s | Agency AI",
  },
  description:
    "Agency AI automates your Meta and Google Ads with an AI design studio and copy generator built around your brand. Launch faster, optimize automatically, track everything.",
  keywords: ["Shopify marketing", "AI ads automation", "Meta ads", "Google ads", "e-commerce growth"],
  openGraph: {
    type: "website",
    url: "https://agencyai.app",
    siteName: "Agency AI",
    title: "Agency AI — AI-Powered E-commerce Growth Engine",
    description: "The most affordable AI growth platform for Shopify stores.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
