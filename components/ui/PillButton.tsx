"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { SPRING_MAGNET, clamp } from "@/lib/ease";

const MotionLink = motion.create(Link);

type Variant = "solid" | "outline" | "dark" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  ariaLabel?: string;
  type?: "button" | "submit";
  magnetic?: boolean;
};

const VARIANTS: Record<Variant, string> = {
  solid: "bg-tangerine text-white shadow-cta hover:bg-tangerine-dark",
  outline: "border border-ink/15 bg-white text-ink hover:border-tangerine/60",
  dark: "bg-ink text-white hover:bg-carbon",
  ghost: "bg-white/10 text-white border border-white/25 hover:bg-white/20",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.5 8h10M9 4.5 12.5 8 9 11.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * D1 — Botão magnético com parallax interno.
 * Continua sendo <a>/<button> de verdade: teclado, foco e leitor de tela intactos.
 */
export default function PillButton({
  children,
  href,
  onClick,
  variant = "solid",
  size = "md",
  className = "",
  icon,
  ariaLabel,
  type = "button",
  magnetic = true,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);
  const sx = useSpring(x, SPRING_MAGNET);
  const sy = useSpring(y, SPRING_MAGNET);
  const six = useSpring(ix, { ...SPRING_MAGNET, stiffness: 160 });
  const siy = useSpring(iy, { ...SPRING_MAGNET, stiffness: 160 });

  const active = magnetic && !reduce;

  const onMove = (event: React.PointerEvent) => {
    if (!active || event.pointerType === "touch") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(clamp(dx * 0.28, -12, 12));
    y.set(clamp(dy * 0.35, -12, 12));
    ix.set(clamp(dx * 0.12, -6, 6));
    iy.set(clamp(dy * 0.16, -6, 6));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    ix.set(0);
    iy.set(0);
  };

  const classes = `group relative inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors duration-300 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const content = (
    <motion.span style={{ x: six, y: siy }} className="inline-flex items-center gap-2">
      {children}
      <span className="transition-transform duration-500 ease-out group-hover:translate-x-0.5">
        {icon ?? <Arrow />}
      </span>
    </motion.span>
  );

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
      className="inline-block"
      data-motion
    >
      {href ? (
        <MotionLink
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={classes}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          transition={SPRING_MAGNET}
        >
          {content}
        </MotionLink>
      ) : (
        <motion.button
          type={type}
          onClick={onClick}
          aria-label={ariaLabel}
          className={classes}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          transition={SPRING_MAGNET}
        >
          {content}
        </motion.button>
      )}
    </motion.span>
  );
}
