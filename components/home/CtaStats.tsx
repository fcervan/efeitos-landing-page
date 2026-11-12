"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Aurora from "@/components/ui/Aurora";
import SectionHead from "@/components/ui/SectionHead";
import { EFFECTS, homeEffects } from "@/lib/effects";
import { numberBR } from "@/lib/format";
import { gsap, ScrollTrigger, bindLenis } from "@/lib/gsap";

const STATS = [
  {
    value: EFFECTS.length,
    suffix: "",
    label: "efeitos com página própria",
    note: "cada um com ficha, custo e prompt",
  },
  {
    value: EFFECTS.length + 2,
    suffix: "",
    label: "rotas geradas no build",
    note: "home, índice e uma por efeito",
  },
  {
    value: homeEffects().length,
    suffix: "",
    label: "técnicas usadas nesta home",
    note: "zero WebGL, zero seção pinada",
  },
  {
    value: 60,
    suffix: " fps",
    label: "alvo de quadros por segundo",
    note: "só transform e opacity em loop",
  },
];

export default function CtaStats() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const numbers = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    if (reduce) return;
    const node = root.current;
    if (!node) return;
    let mounted = true;
    const unbind = bindLenis();

    const ctx = gsap.context(() => {
      numbers.current.forEach((target, index) => {
        if (!target) return;
        const stat = STATS[index];
        if (!stat) return;
        const counter = { v: 0 };
        target.textContent = "0";
        gsap.to(counter, {
          v: stat.value,
          duration: 1.7,
          ease: "power2.out",
          scrollTrigger: { trigger: target, start: "top 92%", once: true },
          onUpdate: () => {
            target.textContent = numberBR(counter.v);
          },
          onComplete: () => {
            target.textContent = numberBR(stat.value);
          },
        });
      });
    }, root);

    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (mounted) ScrollTrigger.refresh();
      });
    }

    return () => {
      mounted = false;
      unbind();
      ctx.revert();
    };
  }, [reduce]);

  return (
    <section
      id="numeros"
      ref={root}
      className="on-dark relative overflow-hidden bg-night py-20 text-white sm:py-28"
    >
      <Aurora tone="night" blur={100} />
      <div className="pointer-events-none absolute inset-0 dotgrid-dark opacity-40" aria-hidden="true" />

      <div className="wrap relative">
        <SectionHead
          slug="count-up"
          tone="dark"
          title="Os números do próprio laboratório."
          lead="Nada de métrica inventada: estes valores saem do registro de efeitos e do build. É o mesmo count-up que você pode copiar para o seu bloco de estatísticas."
        />

        <dl className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="border-t border-white/15 pt-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="text-[clamp(2.6rem,5vw,3.6rem)] font-extrabold leading-none tracking-tight">
                  <span
                    ref={(element) => {
                      numbers.current[index] = element;
                    }}
                  >
                    {numberBR(stat.value)}
                  </span>
                  <span className="text-tangerine">{stat.suffix}</span>
                </p>
                <p className="mt-3 text-[15px] font-semibold text-white/85">{stat.label}</p>
                <p className="mt-1 text-[13px] text-white/45">{stat.note}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
