import { Fragment, type ReactNode } from "react";

/** Renders `*accent*` segments of a copy string as italic serif accents. */
export function rich(text: string, accentClassName = "accent"): ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className={accentClassName}>
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Strips accent markers, e.g. for metadata and aria labels. */
export const plain = (text: string) => text.replace(/\*/g, "");

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
