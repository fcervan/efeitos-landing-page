"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { ActionButton, DemoLayout, PanelTitle, Readout, Slider, Stage, Toggle } from "./DemoKit";

const BLOCKS = [
  {
    title: "A roda vira interpolação",
    text: "O Lenis intercepta o delta da roda e transforma em destino. Cada frame caminha uma fração do caminho até lá — por isso a sensação de peso.",
    color: "from-tangerine/20 to-amber/10",
  },
  {
    title: "Um loop, não dois",
    text: "Uma única requestAnimationFrame alimenta a instância. No provider global ela é criada uma vez e destruída no unmount; aqui dentro, o container tem a sua própria.",
    color: "from-electric/15 to-violet/10",
  },
  {
    title: "O teclado continua nativo",
    text: "Setas, Page Down, Home e End não são sequestrados. A barra de rolagem também continua real — nada de scroll falso com transform no body.",
    color: "from-magenta/15 to-tangerine/10",
  },
  {
    title: "Desligar é parte do efeito",
    text: "Em toque e com prefers-reduced-motion, o scroll nativo é melhor. O provider global só liga em ponteiro fino e tela grande; aqui você pode comparar os dois.",
    color: "from-success/15 to-acid/10",
  },
];

export default function LenisDemo() {
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const [smooth, setSmooth] = useState(true);
  const [duration, setDuration] = useState(1.15);
  const [wheel, setWheel] = useState(1);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const paint = (scroll: number, progress: number) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (valueRef.current) valueRef.current.textContent = `${Math.round(scroll)} px`;
    };

    if (!smooth || reduce) {
      const onScroll = () => {
        const limit = wrapper.scrollHeight - wrapper.clientHeight;
        paint(wrapper.scrollTop, limit > 0 ? wrapper.scrollTop / limit : 0);
      };
      wrapper.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => wrapper.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      wrapper,
      content,
      duration,
      wheelMultiplier: wheel,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: true,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const unsubscribe = lenis.on("scroll", (instance: Lenis) => {
      paint(instance.scroll, instance.progress);
    });
    paint(lenis.scroll, lenis.progress);

    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [smooth, duration, wheel, reduce]);

  const goTo = (fraction: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const limit = wrapper.scrollHeight - wrapper.clientHeight;
    const target = limit * fraction;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.3 });
    } else {
      wrapper.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <DemoLayout
      note={
        <>
          O container abaixo tem <code className="font-mono">data-lenis-prevent</code>: a instância
          global do site não interfere nesta demo, que cria a sua própria com{" "}
          <code className="font-mono">wrapper</code> e <code className="font-mono">content</code>.
        </>
      }
      stage={
        <Stage className="bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-body">
              container interno · role com a roda
            </span>
            <span ref={valueRef} className="font-mono text-[12px] font-bold text-tangerine-dark">
              0 px
            </span>
          </div>
          <div className="h-1 w-full bg-line">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-tangerine" />
          </div>

          <div
            ref={wrapperRef}
            data-lenis-prevent
            tabIndex={0}
            role="region"
            aria-label="Área de rolagem da demo Lenis"
            className="h-[380px] overflow-y-auto overscroll-contain px-5 py-6 sm:px-8"
          >
            <div ref={contentRef} className="space-y-5">
              {BLOCKS.map((block, index) => (
                <article
                  key={block.title}
                  className={`rounded-card border border-line bg-gradient-to-br ${block.color} p-6`}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-body">
                    trecho {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[19px] font-bold text-ink">{block.title}</h3>
                  <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-body">{block.text}</p>
                </article>
              ))}
              <p className="pb-4 text-center font-mono text-[12px] text-body">
                fim do container — use os botões ao lado para voltar
              </p>
            </div>
          </div>
        </Stage>
      }
      controls={
        <>
          <PanelTitle>A1 · parâmetros</PanelTitle>
          <Toggle
            label={reduce ? "Smooth scroll (reduced motion ativo)" : "Smooth scroll"}
            checked={smooth && !reduce}
            onChange={setSmooth}
            hint={
              reduce
                ? "O sistema pediu menos movimento: a demo fica no scroll nativo."
                : "Desligue para sentir a diferença do scroll nativo."
            }
          />
          <Slider label="Duração" value={duration} min={0.4} max={2.4} step={0.05} unit="s" onChange={setDuration} />
          <Slider label="Multiplicador da roda" value={wheel} min={0.4} max={2} step={0.1} unit="×" onChange={setWheel} />
          <div className="flex flex-wrap gap-2">
            <ActionButton onClick={() => goTo(0)} variant="outline">
              Topo
            </ActionButton>
            <ActionButton onClick={() => goTo(0.5)} variant="outline">
              Meio
            </ActionButton>
            <ActionButton onClick={() => goTo(1)}>Fim</ActionButton>
          </div>
          <Readout
            items={[
              { label: "easing", value: "1-(1-t)^4" },
              { label: "loop", value: "1 RAF" },
              { label: "toque", value: "syncTouch" },
              { label: "cleanup", value: "destroy()" },
            ]}
          />
        </>
      }
    />
  );
}
