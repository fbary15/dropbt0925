"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/rich";

export function CopyButton({ value, label, copiedLabel, className }: { value: string; label: string; copiedLabel: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {}
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper",
        className,
      )}
    >
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
