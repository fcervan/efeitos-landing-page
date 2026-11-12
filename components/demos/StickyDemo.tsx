"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ActionButton, DemoLayout, PanelTitle, Readout, Slider, Stage, Toggle } from "./DemoKit";

const PANELS = [
  {
    tag: "sem sticky",
    title: "Tudo rola junto",
    text: "O texto e a imagem sobem na mesma velocidade. Para comparar dois estados, o leitor precisa voltar a rolagem — e perde a referência.",
    color: "#FF5A0A",
  },
  {
    tag: "com sticky",
    title: "O palco fica, o texto anda",
    text: "position: sticky prende o palco dentro do wrapper. Cada bloco de texto que passa troca o estado da comparação, sem uma linha de GSAP.",
    color: "#1F6BFF",
  },
  {
    tag: "quando trocar",
    title: "Sticky até precisar de progresso",
    text: "Se você precisa do número do progresso (0 a 1) para animar, aí sim vale o pin do ScrollTrigger. Até lá, CSS resolve com custo zero de JS.",
    color: "#12A150",
  },
];

const STAGE_HEIGHT = 420;

export default function StickyDemo() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [height, setHeight] = useState(300);
  const [offset, setOffset] = useState(0);
  const [guides, setGuides] = useState(true);
  const [swap, setSwap] = useState(true);
  const [fade, setFade] = useState(0.4);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const nodes = blockRefs.current.filter((node): node is HTMLDivElement => node !== null);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index ?? 0);
            setActive(index);
          }
        });
      },
      { root, threshold: 0.55 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [height]);

  const panel = PANELS[swap ? active : 0] ?? PANELS[0]!;

  return (
    <DemoLayout
      note={
        <>
          Nenhum ancestral tem <code className="font-mono">overflow: hidden</code> (o body usa{" "}
          <code className="font-mono">overflow-x: clip</code>), senão o sticky morre. A troca de
          conteúdo vem de IntersectionObserver — sem loop de animação.
        </>
      }
      stage={
        <Stage className="bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-body">
              position: sticky · CSS puro
            </span>
            <span className="font-mono text-[12px] font-bold text-tangerine-dark">
              bloco {active + 1}/{PANELS.length}
            </span>
          </div>

          <div
            ref={scrollerRef}
            data-lenis-prevent
            tabIndex={0}
            role="region"
            aria-label="Área de rolagem da demo sticky"
            className="h-[420px] overflow-y-auto overscroll-contain"
          >
            <div className="relative" style={{ height: (height / 100) * STAGE_HEIGHT }}>
              <div
                className="sticky z-10 flex items-center gap-5 border-b border-line bg-white/95 px-6 backdrop-blur-sm"
                style={{ top: offset, height: STAGE_HEIGHT * 0.55 }}
              >
                <div
                  className="grid h-24 w-24 shrink-0 place-items-center rounded-[24px] text-white transition-colors"
                  style={{ background: panel.color, transitionDuration: `${fade}s` }}
                  aria-hidden="true"
                >
                  <span className="font-mono text-[22px] font-extrabold">{active + 1}</span>
                </div>
                <div
                  className="min-w-0 transition-opacity"
                  style={{ transitionDuration: `${fade}s` }}
                  key={panel.title}
                >
                  <span
                    className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: panel.color }}
                  >
                    {panel.tag}
                  </span>
                  <h3 className="mt-2 text-[19px] font-extrabold leading-tight text-ink">{panel.title}</h3>
                  <p className="mt-2 max-w-md text-[14px] leading-relaxed text-body">{panel.text}</p>
                </div>
              </div>

              <div className="relative px-6 py-8">
                {PANELS.map((item, index) => (
                  <div
                    key={item.tag}
                    data-index={index}
                    ref={(node) => {
                      blockRefs.current[index] = node;
                    }}
                    className={`mb-6 rounded-card border p-5 ${
                      guides ? "border-dashed border-tangerine/40 bg-tangerine-soft/60" : "border-line bg-mist"
                    }`}
                    style={{ minHeight: STAGE_HEIGHT * 0.6 }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-body">
                      gatilho {index + 1} {guides ? "· guia visível" : ""}
                    </span>
                    <p className="mt-3 text-[15px] font-semibold leading-relaxed text-ink">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-body">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Stage>
      }
      controls={
        <>
          <PanelTitle>A4 · parâmetros</PanelTitle>
          <Slider label="Altura do wrapper" value={height} min={200} max={500} step={20} unit="%" onChange={setHeight} />
          <Slider label="Offset do topo" value={offset} min={0} max={80} step={4} unit="px" onChange={setOffset} />
          <Slider label="Duração do crossfade" value={fade} min={0} max={1} step={0.05} unit="s" onChange={setFade} />
          <Toggle label="Mostrar guias" checked={guides} onChange={setGuides} hint="Desenha os blocos-gatilho observados." />
          <Toggle label="Trocar conteúdo" checked={swap} onChange={setSwap} hint="Desligue para ver o palco parado." />
          <ActionButton
            onClick={() => {
              setHeight(300);
              setOffset(0);
              setFade(0.4);
              setGuides(true);
              setSwap(true);
              scrollerRef.current?.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            }}
            variant="outline"
          >
            Restaurar padrões
          </ActionButton>
          <Readout
            items={[
              { label: "js de scroll", value: "0" },
              { label: "observer", value: "1" },
              { label: "bloco", value: `${active + 1}` },
              { label: "altura", value: `${Math.round((height / 100) * STAGE_HEIGHT)}px` },
            ]}
          />
        </>
      }
    />
  );
}
