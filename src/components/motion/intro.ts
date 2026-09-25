"use client";

import { useSyncExternalStore } from "react";

// Tiny shared flag: page-load animations wait until the intro curtain has lifted.
declare global {
  interface Window {
    __dropIntroDone?: boolean;
  }
}

const EVENT = "drop:intro-done";

export function markIntroDone() {
  if (window.__dropIntroDone) return;
  window.__dropIntroDone = true;
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}

export function useIntroReady() {
  return useSyncExternalStore(
    subscribe,
    () => Boolean(window.__dropIntroDone),
    () => false,
  );
}
