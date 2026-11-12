import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import EffectsGrid from "@/components/lab/EffectsGrid";
import EffectCard from "@/components/lab/EffectCard";
import CostBadge from "@/components/lab/CostBadge";
import { COSTS, COST_HINT, COST_LABEL, EFFECTS } from "@/lib/effects";
import { buildSpans } from "@/lib/bento";
import { BUILD_REPORT } from "@/lib/weights";

export const metadata: Metadata = {
  title: "Laboratório de efeitos",
  description:
    "29 efeitos de scroll, 3D, estética e micro-interação. Filtre por categoria e custo, veja o peso medido no build e abra cada demo em uma página isolada.",
};

const SPANS = buildSpans(EFFECTS.length);

/** Mesmo grid, sem filtros: é o que aparece antes da hidratação e sem JS. */
function StaticGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(230px,auto)] lg:grid-cols-12">
      {EFFECTS.map((effect, index) => (
        <EffectCard key={effect.slug} effect={effect} span={SPANS[index] ?? 4} />
      ))}
    </div>
  );
}

export default function LabPage() {
  return (
    <main className="pt-[72px]">
      <section className="relative overflow-hidden border-b border-line bg-mist py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 dotgrid opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-[80px]"
          aria-hidden="true"
        />
        <div className="wrap relative">
          <nav aria-label="Trilha" className="mb-6">
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-body transition-colors hover:text-accent-dark"
            >
              ← início
            </Link>
          </nav>

          <p className="eyebrow">
            <span aria-hidden="true">◍</span> Laboratório
          </p>
          <h1 className="h1 mt-4 max-w-[18ch]">
            Efeitos que você pode <span className="text-accent">pedir</span> a qualquer LLM.
          </h1>
          <p className="lead mt-5 max-w-2xl">
            Cada demo abre em uma página isolada, com ficha técnica, custo declarado e prompt
            copiável. Aqui no índice nada é montado: você vê o pôster, o peso e decide o que vale a
            pena abrir.
          </p>

          <dl className="mt-10 grid gap-3 sm:grid-cols-3">
            {COSTS.map((cost) => (
              <div key={cost} className="rounded-card border border-line bg-white p-4">
                <dt>
                  <CostBadge cost={cost} />
                </dt>
                <dd className="mt-3 text-[13.5px] leading-relaxed text-body">{COST_HINT[cost]}</dd>
              </div>
            ))}
          </dl>

          {BUILD_REPORT.shared ? (
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-body">
              base compartilhada do Next: {BUILD_REPORT.shared} · números de First Load JS medidos no
              build {BUILD_REPORT.next}
            </p>
          ) : null}
        </div>
      </section>

      <section id="catalogo" className="wrap py-14 sm:py-16">
        <h2 className="sr-only">Catálogo de efeitos</h2>
        <Suspense fallback={<StaticGrid />}>
          <EffectsGrid effects={EFFECTS} />
        </Suspense>

        <div className="mt-14 rounded-card border border-line bg-accent-soft p-6 sm:p-8">
          <h2 className="h3 text-ink">Por que cada demo tem página própria?</h2>
          <p className="lead mt-3 max-w-3xl">
            Porque o custo é por página, não por site. Em uma rota única, loops de animação, seções
            pinadas, camadas de blur e contextos WebGL rodam ao mesmo tempo — e o celular mediano
            paga a conta. Isolando, o Three só carrega na própria demo, cada página tem um loop e o
            peso de cada efeito fica mensurável.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Um canvas WebGL por página", value: "no máximo" },
              { label: "Render pausado fora da tela", value: "IntersectionObserver" },
              { label: "Loops encerrados no unmount", value: "cleanup obrigatório" },
            ].map((item) => (
              <li key={item.label} className="rounded-2xl border border-white/70 bg-white/70 p-4">
                <p className="text-[13.5px] font-semibold text-ink">{item.label}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-dark">
                  {item.value}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-body">
            {COST_LABEL.leve}, {COST_LABEL.medio} e {COST_LABEL.pesado} são classificações de custo
            relativo: bundle, GPU e trabalho por frame. O número em kB ao lado de cada card é o
            First Load JS real daquela rota.
          </p>
        </div>
      </section>
    </main>
  );
}
