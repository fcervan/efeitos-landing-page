"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

/**
 * A1 — Smooth scroll global.
 * Liga só onde faz sentido: ponteiro fino, tela ≥ 1024px e sem prefers-reduced-motion.
 * Um único requestAnimationFrame; destruído no cleanup e ao trocar de mídia.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const deviceQuery = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    let lenis: Lenis | null = null;
    let frame = 0;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lenis?.destroy();
      lenis = null;
      setLenis(null);
    };

    const start = () => {
      stop();
      if (motionQuery.matches || !deviceQuery.matches) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.4,
      });
      setLenis(lenis);
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    start();
    motionQuery.addEventListener("change", start);
    deviceQuery.addEventListener("change", start);

    return () => {
      motionQuery.removeEventListener("change", start);
      deviceQuery.removeEventListener("change", start);
      stop();
    };
  }, []);

  return <>{children}</>;
}
