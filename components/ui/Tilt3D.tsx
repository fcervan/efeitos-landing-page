"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { clamp } from "@/lib/ease";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  perspective?: number;
  scale?: number;
};

/**
 * B4 — Tilt 3D em CSS. perspective no pai, preserve-3d no filho,
 * molas independentes em rotateX/rotateY. Sem listener global, sem toque.
 */
export default function Tilt3D({
  children,
  className = "",
  max = 10,
  perspective = 1200,
  scale = 1.02,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.7 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.7 });

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    px.set(clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1));
    py.set(clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1));
    ry.set(px.get() * max);
    rx.set(-py.get() * max);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: `${perspective}px` }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        style={{ rotateX, rotateY }}
        whileHover={reduce ? undefined : { scale }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
