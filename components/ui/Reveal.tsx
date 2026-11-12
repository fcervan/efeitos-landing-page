"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/ease";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  y?: number;
};

/**
 * E1 — Reveal em cascata. O conteúdo já está no HTML do servidor;
 * o noscript global devolve opacity/transform caso o JS esteja desligado.
 */
export default function Reveal({ children, delay = 0, className, as = "div", y = 28 }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: Math.min(delay, 0.4) }}
      data-motion
    >
      {children}
    </Tag>
  );
}
