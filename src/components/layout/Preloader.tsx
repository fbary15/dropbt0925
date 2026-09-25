"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/assets/site/logo.png";
import { markIntroDone } from "@/components/motion/intro";

type Phase = "drop" | "logo" | "lift" | "done";
const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

// Read once per page load: whether the intro already played earlier in this browser session.
// Kept at module level so React's dev-mode double effect run can't mistake its own write for a repeat visit.
let seenThisSession: boolean | null = null;
function introSeenBefore() {
  if (seenThisSession === null) {
    try {
      seenThisSession = sessionStorage.getItem("drop-intro") === "1";
      sessionStorage.setItem("drop-intro", "1");
    } catch {
      seenThisSession = false;
    }
  }
  return seenThisSession;
}

/**
 * First-visit intro: an ink drop falls, ripples out into the DROP logo,
 * then the page is revealed with a two-layer curtain. Skipped for the rest
 * of the session and for users who prefer reduced motion.
 */
export function Preloader() {
  const [phase, setPhase] = useState<Phase>("drop");
  // Switching language re-mounts the root layout on the client. If the intro has
  // already played in this tab, render nothing from the very first frame.
  // (During the initial hydration the flag is unset, so this matches the server HTML.)
  const [skipped, setSkipped] = useState(() => typeof window !== "undefined" && Boolean(window.__dropIntroDone));

  useEffect(() => {
    const seen = introSeenBefore();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced || window.__dropIntroDone) {
      const t = window.setTimeout(() => {
        setSkipped(true);
        markIntroDone();
      }, 0);
      return () => window.clearTimeout(t);
    }

    const timers = [
      window.setTimeout(() => setPhase("logo"), 720),
      window.setTimeout(() => {
        setPhase("lift");
        markIntroDone();
      }, 1750),
      window.setTimeout(() => setPhase("done"), 2800),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const lifting = phase === "lift";
  const afterDrop = phase !== "drop";

  if (skipped) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          aria-hidden
          className="preloader pointer-events-none fixed inset-0 z-[90]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-wine"
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={lifting ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
            transition={{ duration: 1, ease: EASE_CURTAIN, delay: 0.12 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-paper"
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={lifting ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
            transition={{ duration: 0.9, ease: EASE_CURTAIN }}
          >
            <div className="relative flex h-40 w-40 items-center justify-center">
              {/* Falling drop */}
              <motion.svg
                viewBox="0 0 40 56"
                className="absolute h-14 w-10 text-wine"
                initial={{ y: "-46vh", scaleY: 1.35, opacity: 1 }}
                animate={afterDrop ? { y: 0, scale: 0, opacity: 0 } : { y: 0, scaleY: 1 }}
                transition={
                  afterDrop
                    ? { duration: 0.25, ease: "easeOut" }
                    : { duration: 0.7, ease: [0.55, 0, 1, 0.45] }
                }
              >
                <path d="M20 0C20 0 0 25 0 36a20 20 0 0 0 40 0C40 25 20 0 20 0Z" fill="currentColor" />
              </motion.svg>

              {/* Ripples */}
              {afterDrop &&
                [0, 0.16, 0.32].map((delay) => (
                  <motion.span
                    key={delay}
                    className="absolute h-24 w-24 rounded-full border border-wine"
                    initial={{ scale: 0.1, opacity: 0.7 }}
                    animate={{ scale: 4.2, opacity: 0 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay }}
                  />
                ))}

              {/* Logo */}
              <motion.div
                className="absolute"
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={afterDrop ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              >
                <Image src={logo} alt="" className="h-auto w-36" preload />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
