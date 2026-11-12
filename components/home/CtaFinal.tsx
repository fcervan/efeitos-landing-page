"use client";

import Aurora from "@/components/ui/Aurora";
import KineticTitle from "@/components/ui/KineticTitle";
import PillButton from "@/components/ui/PillButton";
import CopyPrompt from "@/components/lab/CopyPrompt";
import { bySlug } from "@/lib/effects";

const HIGHLIGHT = bySlug("kinetic-typography");

export default function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-tangerine-soft py-20 sm:py-28">
      <Aurora tone="warm" blur={95} />
      <div className="wrap relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <span aria-hidden="true">◍</span> TÉCNICA · BOTÕES MAGNÉTICOS
          </p>
          <KineticTitle
            as="h2"
            className="h2 mt-5"
            inView
            words={[
              { text: "Escolha" },
              { text: "um" },
              { text: "efeito." },
              { text: "Leve", accent: true },
              { text: "o" },
              { text: "prompt", accent: true },
              { text: "junto." },
            ]}
          />
          <p className="lead mx-auto mt-5 max-w-xl">
            Abra o índice, filtre pelo custo que o seu projeto aguenta e copie a instrução. Sem
            cadastro, sem pacote para instalar, sem componente de terceiros no meio do caminho.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PillButton href="/lab" size="lg">
              Ver o catálogo completo
            </PillButton>
            <PillButton href="/lab/tilt-3d" size="lg" variant="outline">
              Começar pelo tilt 3D
            </PillButton>
          </div>
        </div>

        {HIGHLIGHT ? (
          <div className="mx-auto mt-14 max-w-3xl rounded-card border border-white/70 bg-white/70 p-6 shadow-card backdrop-blur-md sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-body">
              atalho · prompt do efeito em destaque
            </p>
            <p className="mt-3 text-[15px] font-semibold leading-relaxed text-ink">
              “{HIGHLIGHT.summary}”
            </p>
            <div className="mt-5">
              <CopyPrompt text={HIGHLIGHT.prompt} compact />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
