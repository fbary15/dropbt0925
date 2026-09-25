import { ViewTransition, type ReactNode } from "react";

/** Wraps a page so route changes cross-fade with a gentle rise (see globals.css). */
export function PageTransition({ id, children }: { id: string; children: ReactNode }) {
  return (
    <ViewTransition key={id} enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
