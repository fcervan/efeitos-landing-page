"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ActionButton, DemoLayout, PanelTitle, Readout, Slider, Stage, Toggle } from "./DemoKit";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EASE_OUT } from "@/lib/ease";

const STEPS = [
  {
    label: "Escolher",
    title: "O efeito entra pelo custo, não pelo brilho",
    text: "No índice, o selo diz se aquilo cabe no seu orçamento. Um tilt em CSS entrega volume sem contexto de GPU; um shader entrega identidade e cobra por isso.",
    accent: "#FF5A0A",
  },
  {
    label: "Isolar",
    title: "Uma rota, um componente, um loop",
    text: "A demo monta sozinha. Nada de dividir a tela com outro canvas, outra seção pinada e mais três camadas de blur competindo pelo mesmo frame.",
    accent: "#FF2D8A",
  },
  {
    label: "Medir",
    title: "O número vem do build, não do chute",
    text: "First Load JS por rota, coletado depois do next build. É o que permite dizer 'este efeito custa 40 kB' em vez de 'acho que é leve'.",
    accent: "#1F6BFF",
  },
  {
    label: "Copiar",
    title: "O prompt já sai com as restrições",
    text: "Transform e opacity, reduced motion, cleanup, fallback. O pedido vira código que passa em revisão porque as regras foram junto.",
    accent: "#7C3AED",
  },
];

const STAGE_HEIGHT = 420;

export default function ScrollytellingDemo() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [pin, setPin] = useState(true);
  const [length, setLength] = useState(320);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const pinned = pin && !reduce && wide;

  useLayoutEffect(() => {
    if (!pinned) return;
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!scroller || !track || !stage) return;

    let mounted = true;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const trigger = ScrollTrigger.create({
        trigger: track,
        scroller,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        pinType: "transform",
        anticipatePin: 1,
        onUpdate: (self) => {
          if (barRef.current) barRef.current.style.transform = `scaleY(${self.progress})`;
          setActive(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)));
        },
      });
      triggerRef.current = trigger;
      return () => {
        trigger.kill();
        triggerRef.current = null;
      };
    });

    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (mounted) ScrollTrigger.refresh();
      });
    }

    return () => {
      mounted = false;
      mm.revert();
      setActive(0);
      if (barRef.current) barRef.current.style.transform = "scaleY(0)";
    };
  }, [pinned, length]);

  const goTo = (index: number) => {
    const trigger = triggerRef.current;
    const scroller = scrollerRef.current;
    if (!trigger || !scroller) {
      setActive(index);
      return;
    }
    const target =
      trigger.start + (trigger.end - trigger.start) * ((index + 0.5) / STEPS.length);
    scroller.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  };

  const step = STEPS[active] ?? STEPS[0]!;

  return (
    <DemoLayout
      note={
        pinned
          ? "O palco está pinado dentro do container (pinType: transform). A barra lateral usa scaleY(progress) e os passos são clicáveis."
          : "Sem pin nesta condição: tela pequena ou movimento reduzido. A narrativa vira lista estática, com o mesmo conteúdo."
      }
      stage={
        <Stage className="bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-body">
              {pinned ? "role dentro do quadro" : "lista estática"}
            </span>
            <span className="font-mono text-[12px] font-bold text-tangerine-dark">
              passo {active + 1}/{STEPS.length}
            </span>
          </div>

          {pinned ? (
            <div
              ref={scrollerRef}
              data-lenis-prevent
              tabIndex={0}
              role="region"
              aria-label="Narrativa guiada pela rolagem"
              className="scroll-dark relative h-[420px] overflow-y-auto overscroll-contain"
            >
              <div ref={trackRef} style={{ height: (length / 100) * STAGE_HEIGHT }}>
                <div
                  ref={stageRef}
                  className="relative flex items-center gap-6 px-6 sm:px-10"
                  style={{ height: STAGE_HEIGHT }}
                >
                  <div className="relative h-56 w-1 shrink-0 overflow-hidden rounded-pill bg-line">
                    <span
                      ref={barRef}
                      className="absolute inset-0 origin-top scale-y-0 rounded-pill bg-tangerine"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -18, scale: 0.99 }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                      >
                        <span
                          className="inline-flex items-center gap-2 rounded-pill px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white"
                          style={{ background: step.accent }}
                        >
                          {String(active + 1).padStart(2, "0")} · {step.label}
                        </span>
                        <h3 className="mt-5 max-w-lg text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-tight text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-body">{step.text}</p>
                      </motion.div>
                    </AnimatePresence>

                    <ol className="mt-8 flex flex-wrap gap-2">
                      {STEPS.map((item, index) => (
                        <li key={item.label}>
                          <button
                            type="button"
                            onClick={() => goTo(index)}
                            aria-current={index === active ? "step" : undefined}
                            className={`rounded-pill border px-3 py-1.5 text-[12px] font-semibold transition-colors duration-300 ${
                              index === active
                                ? "border-transparent bg-ink text-white"
                                : "border-line bg-white text-body hover:border-tangerine/50 hover:text-ink"
                            }`}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div
                    className="hidden h-40 w-40 shrink-0 rounded-[28px] border border-line lg:block"
                    style={{
                      background: `radial-gradient(circle at 32% 28%, ${step.accent}55, ${step.accent}12 60%, transparent 75%)`,
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          ) : (
            <ol className="max-h-[420px] space-y-3 overflow-y-auto p-5">
              {STEPS.map((item, index) => (
                <li key={item.label} className="rounded-card border border-line bg-mist p-5">
                  <span
                    className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: item.accent }}
                  >
                    {String(index + 1).padStart(2, "0")} · {item.label}
                  </span>
                  <h3 className="mt-2 text-[17px] font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-body">{item.text}</p>
                </li>
              ))}
            </ol>
          )}
        </Stage>
      }
      controls={
        <>
          <PanelTitle>A2 · parâmetros</PanelTitle>
          <Toggle
            label="Seção pinada"
            checked={pin}
            onChange={setPin}
            hint={wide ? "ScrollTrigger.create com pin: true." : "Em tela pequena o pin fica desligado de propósito."}
          />
          <Slider label="Comprimento do scroll" value={length} min={180} max={520} step={20} unit="%" onChange={setLength} />
          <div className="flex flex-wrap gap-2">
            {STEPS.map((item, index) => (
              <ActionButton key={item.label} onClick={() => goTo(index)} variant={index === active ? "solid" : "outline"}>
                {item.label}
              </ActionButton>
            ))}
          </div>
          <Readout
            items={[
              { label: "passo ativo", value: `${active + 1}` },
              { label: "pin", value: pinned ? "transform" : "off" },
              { label: "gatilho", value: "scroller" },
              { label: "cleanup", value: "mm.revert()" },
            ]}
          />
        </>
      }
    />
  );
}
