import Link from "next/link";
import { EFFECTS } from "@/lib/effects";

const ITEMS = EFFECTS.map((effect) => `${effect.code} · ${effect.name}`);

/**
 * E3 — Marquee em CSS puro: linha duplicada, translateX(0 → -50%), pausa no hover.
 * A segunda cópia é aria-hidden; nada aqui é foco de teclado.
 */
export default function Marquee() {
  return (
    <section className="on-dark relative overflow-hidden border-y border-smoke bg-night py-10">
      <div className="wrap relative mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow eyebrow-dark">
          <span aria-hidden="true">◍</span> TÉCNICA · MARQUEE INFINITO
        </p>
        <Link
          href="/lab/marquee"
          className="group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-white"
        >
          ver demo
          <span className="transition-transform duration-500 ease-out group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </div>

      <div className="marquee-host marquee-mask relative overflow-hidden" aria-label="Lista de efeitos do laboratório">
        <div className="marquee-track animate-marquee gap-3 pr-3">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-3" aria-hidden={copy === 1 ? "true" : undefined}>
              {ITEMS.map((item) => (
                <li
                  key={`${copy}-${item}`}
                  className="flex shrink-0 items-center gap-2 rounded-pill border border-white/12 bg-white/[0.04] px-5 py-2.5 text-[14px] font-semibold text-white/80"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <p className="wrap mt-6 text-[13px] text-white/45">
        Passe o mouse (ou o foco) para pausar. Com <code className="font-mono">prefers-reduced-motion</code>,
        a faixa fica parada e a lista completa continua no índice.
      </p>
    </section>
  );
}
