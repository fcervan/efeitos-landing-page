"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import PillButton from "@/components/ui/PillButton";
import { EASE_OUT } from "@/lib/ease";
import { getLenis } from "@/lib/lenis";
import { EFFECTS } from "@/lib/effects";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/lab", label: "Laboratório" },
  { href: "/lab/kinetic-typography", label: "Em destaque: A5" },
];

export default function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const lenis = getLenis();
    lenis?.stop();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-500 ${
        scrolled ? "shadow-[0_8px_30px_rgba(17,17,17,0.08)]" : ""
      }`}
    >
      <div
        className={`border-b backdrop-blur-md transition-colors duration-500 ${
          scrolled ? "border-line bg-white/90" : "border-transparent bg-white/70"
        }`}
      >
        <nav className="wrap flex h-[72px] items-center justify-between gap-4" aria-label="Principal">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Cadência, página inicial">
            <span className="relative grid h-9 w-9 place-items-center rounded-[12px] bg-tangerine text-white shadow-cta">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M2 12.5c2.6 0 2.6-7 5.2-7s2.6 7 5.2 7c1.3 0 1.95-1.75 2.6-3.5"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-[17px] font-extrabold tracking-tight">
              Cadência<span className="text-tangerine">.</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative rounded-pill px-3.5 py-2 text-sm font-semibold transition-colors duration-300 ${
                    isActive(link.href) ? "text-tangerine-dark" : "text-body hover:text-ink"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-pill bg-tangerine-tint"
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <PillButton href="/lab" size="sm">
              Ver os {EFFECTS.length} efeitos
            </PillButton>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-pill border border-line bg-white text-ink md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <motion.span
                className="absolute left-0 top-0 block h-0.5 w-5 rounded bg-ink"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
              <motion.span
                className="absolute left-0 top-[6px] block h-0.5 w-5 rounded bg-ink"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-[12px] block h-0.5 w-5 rounded bg-ink"
                animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </span>
          </button>
        </nav>

        <div className="relative h-[2px] w-full bg-line/70" aria-hidden="true">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-tangerine via-magenta to-electric"
            style={{ scaleX: reduce ? scrollYProgress : progress }}
          />
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            className="wrap overflow-hidden md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE_OUT }}
          >
            <ul className="mb-4 mt-2 space-y-1 rounded-card border border-line bg-white p-3 shadow-lift">
              {LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.05 + index * 0.06, ease: EASE_OUT, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-semibold ${
                      isActive(link.href) ? "bg-tangerine-soft text-tangerine-dark" : "text-ink"
                    }`}
                  >
                    {link.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </motion.li>
              ))}
              <li className="px-1 pb-1 pt-2">
                <PillButton href="/lab" size="md" className="w-full">
                  Ver os {EFFECTS.length} efeitos
                </PillButton>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
