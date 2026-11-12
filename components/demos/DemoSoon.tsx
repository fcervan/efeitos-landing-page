"use client";

import { useState } from "react";
import { DemoLayout, PanelTitle, Readout, Stage, Toggle } from "./DemoKit";

type Props = {
  code: string;
  name: string;
  summary: string;
  deps: string[];
};

/**
 * Placeholder funcional das demos ainda não implementadas.
 * Mantém o padrão do DemoKit (palco + controles) para que a rota já possa ser
 * navegada, medida e revisada sem quebrar o build.
 */
export default function DemoSoon({ code, name, summary, deps }: Props) {
  const [motion, setMotion] = useState(true);

  return (
    <DemoLayout
      note={
        <>
          Esta rota já está no ar com ficha técnica completa, custo, prompt copiável e navegação. A
          demo interativa entra na próxima leva — o componente é carregado só aqui, então o resto do
          site não paga esse peso.
        </>
      }
      stage={
        <Stage dark className="p-0">
          <div className="relative grid min-h-[420px] place-items-center overflow-hidden bg-night p-8 text-center">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <span
                className="absolute -left-[10%] -top-[20%] h-72 w-72 rounded-full bg-accent/30 blur-[70px] animate-driftA"
                style={{ animationPlayState: motion ? "running" : "paused" }}
              />
              <span
                className="absolute -right-[8%] top-[4%] h-64 w-64 rounded-full bg-electric/25 blur-[70px] animate-driftB"
                style={{ animationPlayState: motion ? "running" : "paused" }}
              />
              <span
                className="absolute bottom-[-16%] right-[14%] h-60 w-60 rounded-full bg-violet/25 blur-[70px] animate-driftC"
                style={{ animationPlayState: motion ? "running" : "paused" }}
              />
            </div>

            <div className="relative max-w-md">
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                demo em construção
              </span>

              <p className="mt-6 font-mono text-[64px] font-extrabold leading-none text-white/10">
                {code}
              </p>
              <h3 className="mt-2 text-[clamp(1.4rem,2.6vw,1.9rem)] font-extrabold leading-tight text-white">
                {name}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{summary}</p>
            </div>
          </div>
        </Stage>
      }
      controls={
        <>
          <div>
            <PanelTitle>Ficha da demo</PanelTitle>
            <div className="mt-3">
              <Readout
                items={[
                  { label: "código", value: code },
                  { label: "status", value: "stub" },
                ]}
              />
            </div>
          </div>

          <div>
            <PanelTitle>Dependências</PanelTitle>
            <ul className="mt-3 flex flex-wrap gap-2">
              {(deps.length ? deps : ["nenhuma — CSS e React"]).map((dep) => (
                <li
                  key={dep}
                  className="rounded-lg border border-line bg-mist px-2.5 py-1.5 font-mono text-[12px] text-ink"
                >
                  {dep}
                </li>
              ))}
            </ul>
          </div>

          <Toggle
            label="Movimento"
            checked={motion}
            onChange={setMotion}
            hint="Pausa o fundo animado deste palco."
          />

          <p className="border-t border-line pt-4 text-[11.5px] leading-relaxed text-body">
            Já funcionando: ficha técnica, custo declarado, prompt copiável, navegação entre efeitos
            e o loop de render isolado por rota.
          </p>
        </>
      }
    />
  );
}
