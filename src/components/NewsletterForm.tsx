"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p style={{ color: "#10B981", fontWeight: 600, fontSize: 15 }}>
        ✅ You&apos;re subscribed! Check your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={e => { e.preventDefault(); setDone(true); }}
      style={{ display: "flex", gap: 10, maxWidth: 400, margin: "0 auto" }}
    >
      <input type="email" required placeholder="your@store.com" className="input-field" style={{ flex: 1 }} />
      <button type="submit" className="btn-primary" style={{ padding: "12px 20px", fontSize: 14 }}>
        Subscribe
      </button>
    </form>
  );
}
