"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { DEMOS } from "@/components/demos";
import type { EffectCost } from "@/lib/effects";
import CostBadge from "@/components/lab/CostBadge";

type Props = {
  slug: string;
  code: string;
  name: string;
  cost: EffectCost;
};

/**
 * Moldura da demo: área de altura fixa, cabeçalho com estado e remount por slug.
 * É o único ponto do site que importa components/demos.
 */
export default function DemoFrame({ slug, code, name, cost }: Props) {
  const [nonce, setNonce] = useState(0);
  const reduce = useReducedMotion();
  const Demo = DEMOS[slug];

  return (
    <section aria-label={`Demonstração de ${name}`} className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-card border border-b-0 border-line bg-white px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-tangerine-dark">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-tangerine opacity-70" />
            </span>
            demo ao vivo · {code}
          </span>
          <CostBadge cost={cost} />
          <span className="hidden font-mono text-[11px] text-body sm:inline">
            {reduce ? "movimento reduzido: versão estática" : "um componente, um loop"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setNonce((value) => value + 1)}
          className="inline-flex items-center gap-2 rounded-pill border border-line bg-mist px-4 py-2 text-[13px] font-semibold text-ink transition-colors duration-300 hover:border-tangerine/50 hover:text-tangerine-dark"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M12.2 7a5.2 5.2 0 1 1-1.6-3.75M12.4 1.6v3.2H9.2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Remontar demo
        </button>
      </div>

      <div className="min-h-[60vh] rounded-b-card border border-line bg-mist p-4 sm:p-6">
        {Demo ? (
          <Demo key={`${slug}-${nonce}`} />
        ) : (
          <p className="p-8 text-center text-body">
            Esta demo ainda não tem componente registrado. Volte ao índice para escolher outro efeito.
          </p>
        )}
      </div>
    </section>
  );
}
