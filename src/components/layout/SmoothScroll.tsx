"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -96 }, stopInertiaOnNavigate: true }}
    >
      <MotionConfig reducedMotion="user">
        <ScrollReset />
        {children}
      </MotionConfig>
    </ReactLenis>
  );
}
