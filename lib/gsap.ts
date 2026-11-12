"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/lenis";

/**
 * Registro único do plugin. Este módulo é client e só é importado por demos que
 * realmente usam GSAP — a home paga por ele apenas por causa do count-up (E5).
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Liga o Lenis ao ScrollTrigger enquanto o componente estiver montado.
 * Devolve a função de desligar (para usar no cleanup do efeito).
 */
export const bindLenis = (): (() => void) => {
  const lenis = getLenis();
  if (!lenis) return () => undefined;
  const update = () => ScrollTrigger.update();
  lenis.on("scroll", update);
  ScrollTrigger.refresh();
  return () => {
    lenis.off("scroll", update);
  };
};

export { gsap, ScrollTrigger };
