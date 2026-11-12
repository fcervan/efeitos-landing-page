import type Lenis from "lenis";

/**
 * Singleton do Lenis. O provider global cria/destrói; qualquer componente pode
 * pedir a instância para fazer scrollTo sem criar um segundo loop.
 */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null): void => {
  instance = lenis;
};

export const getLenis = (): Lenis | null => instance;

/** Rolagem centralizada: respeita a navbar fixa e cai no nativo sem Lenis. */
export const scrollToId = (href: string, offset = -88): void => {
  if (typeof window === "undefined") return;
  const id = href.startsWith("#") ? href.slice(1) : href;
  const target = document.getElementById(id);
  if (!target) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = getLenis();

  if (lenis && !reduce) {
    lenis.scrollTo(target, { offset, duration: 1.3 });
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
};
