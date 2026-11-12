"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { EASE_OUT, clamp } from "@/lib/ease";

export type KineticWord = { text: string; accent?: boolean };

type Props = {
  words: KineticWord[];
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  inView?: boolean;
  tilt?: boolean;
};

/**
 * A5 — Kinetic typography.
 * Split manual por palavra, máscara com padding para descendentes e reação leve ao mouse.
 */
export default function KineticTitle({
  words,
  as = "h1",
  className = "",
  delay = 0.1,
  inView = false,
  tilt = false,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });
  const rotateY = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const Tag = motion[as];

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!tilt || reduce || event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    mx.set(clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1) * 4);
    my.set(clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1) * -3);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={tilt ? { perspective: 900 } : undefined}
    >
      <Tag className={className} style={tilt && !reduce ? { rotateX, rotateY } : undefined} data-motion>
        {words.map((word, index) => (
          <span key={`${word.text}-${index}`} className="mask-word">
            <motion.span
              className={`inline-block ${word.accent ? "text-tangerine" : ""}`}
              initial={reduce ? false : { y: "110%" }}
              {...(inView && !reduce
                ? { whileInView: { y: "0%" }, viewport: { once: true, margin: "-80px" } }
                : { animate: { y: "0%" } })}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: reduce ? 0 : delay + index * 0.09 }}
            >
              {word.text}
            </motion.span>
            {index < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
          </span>
        ))}
      </Tag>
    </div>
  );
}
