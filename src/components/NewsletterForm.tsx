"use client";
import { useState } from "react";

export default function NewsletterForm({ dark }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p style={{ color: dark ? "#6BA3FF" : "var(--blue)", fontWeight: 700, fontSize: 15 }}>
        ✓ You&apos;re subscribed! Growth tips incoming.
      </p>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setDone(true); }}
      style={{ display: "flex", gap: 10, maxWidth: 420, width: "100%" }}>
      <input
        type="email" required placeholder="your@store.com" value={email}
        onChange={e => setEmail(e.target.value)}
        style={{
          flex: 1, padding: "11px 16px", borderRadius: 10, fontSize: 14.5,
          border: dark ? "1.5px solid rgba(255,255,255,0.15)" : "1.5px solid var(--border)",
          background: dark ? "rgba(255,255,255,0.07)" : "white",
          color: dark ? "white" : "var(--ink)",
          fontFamily: "inherit", outline: "none",
        }}
      />
      <button type="submit" className="btn btn-blue" style={{ padding: "11px 20px", fontSize: 14, whiteSpace: "nowrap" }}>
        Subscribe
      </button>
    </form>
  );
}
