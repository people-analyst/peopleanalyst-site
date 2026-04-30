"use client";

export function PrintButton({ label = "Save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="font-mono text-xs uppercase tracking-[0.15em] text-accent hover:underline"
    >
      ↓ {label}
    </button>
  );
}
