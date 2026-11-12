"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ActionButton, DemoLayout, PanelTitle, Readout, Slider, Stage, Toggle } from "./DemoKit";
import { EASE_OUT } from "@/lib/ease";

const CARDS = [
  { title: "Título revelado", text: "whileInView com once: true — dispara e nunca mais volta.", color: "#FF5A0A" },
  { title: "Card que sobe", text: "y: 28 → 0 com easing de saída. Um dono por elemento.", color: "#FF2D8A" },
  { title: "Número contado", text: "Entrada única: o valor final fica no HTML desde o servidor.", color: "#1F6BFF" },
  { title: "Selo que aparece", text: "viewport com margin negativa antecipa o disparo.", color: "#7C3AED" },
];

export default function ScrollDrivenDemo() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(120);
  const [rotation, setRotation] = useState(180);
  const [soft, setSoft] = useState(true);
  const [margin, setMargin] = useState(60);
  const [once, setOnce] = useState(true);
  const [duration, setDuration] = useState(0.7);
  const [round, setRound] = useState(0);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const progress = soft && !reduce ? smoothProgress : scrollYProgress;
  const y = useTransform(progress, [0, 1], [0, -parallax]);
  const yBack = useTransform(progress, [0, 1], [0, -parallax * 0.4]);
  const rotate = useTransform(progress, [0, 1], [0, rotation]);
  const scale = useTransform(progress, [0, 1], [0.9, 1.15]);

  return (
    <DemoLayout
      note={
        <>
          Esquerda: <strong>scrub</strong> — a animação é uma função do progresso e volta quando você
          volta. Direita: <strong>triggered</strong> — dispara na entrada e segue sozinha. O scroll
          acontece dentro do quadro, com <code className="font-mono">useScroll(container)</code>.
        </>
      }
      stage={
        <Stage className="bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-body">
              duas famílias, um container
            </span>
            <motion.span className="font-mono text-[12px] font-bold text-tangerine-dark">
              scrub + triggered
            </motion.span>
          </div>

          <div
            ref={containerRef}
            data-lenis-prevent
            tabIndex={0}
            role="region"
            aria-label="Área de rolagem da demo de scroll"
            className="grid h-[420px] grid-cols-1 gap-0 overflow-y-auto overscroll-contain md:grid-cols-2"
          >
            <div className="relative border-b border-line md:border-b-0 md:border-r">
              <div className="sticky top-0 flex h-[420px] items-center justify-center overflow-hidden">
                <motion.div
                  className="absolute h-56 w-56 rounded-[40px] bg-tangerine/12"
                  style={reduce ? undefined : { y: yBack, scale }}
                  aria-hidden="true"
                />
                <motion.div
                  className="relative grid h-32 w-32 place-items-center rounded-[28px] border border-tangerine/30 bg-white shadow-lift"
                  style={reduce ? undefined : { y, rotate }}
                >
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-tangerine-dark">
                    scrub
                  </span>
                </motion.div>
                <div className="absolute inset-x-6 bottom-6">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-body">
                    progresso
                  </p>
                  <div className="h-1.5 overflow-hidden rounded-pill bg-line">
                    <motion.span
                      className="block h-full origin-left rounded-pill bg-gradient-to-r from-tangerine to-magenta"
                      style={{ scaleX: progress }}
                    />
                  </div>
                </div>
              </div>
              <div className="h-[520px]" aria-hidden="true" />
            </div>

            <div className="space-y-4 p-5" key={round}>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-body">
                triggered · role para disparar
              </p>
              {CARDS.map((card, index) => (
                <motion.article
                  key={card.title}
                  className="rounded-card border border-line bg-mist p-5"
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ root: containerRef, once, margin: `-${margin}px`, amount: 0.4 }}
                  transition={{ duration, ease: EASE_OUT, delay: index * 0.05 }}
                >
                  <span
                    className="inline-block h-2 w-8 rounded-pill"
                    style={{ background: card.color }}
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 text-[16px] font-bold text-ink">{card.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-body">{card.text}</p>
                </motion.article>
              ))}
              <div className="h-24" aria-hidden="true" />
            </div>
          </div>
        </Stage>
      }
      controls={
        <>
          <PanelTitle>A3 · parâmetros</PanelTitle>
          <Slider label="Parallax (scrub)" value={parallax} min={0} max={200} step={10} unit="px" onChange={setParallax} />
          <Slider label="Rotação (scrub)" value={rotation} min={0} max={360} step={15} unit="°" onChange={setRotation} />
          <Toggle label="Scrub com mola" checked={soft} onChange={setSoft} hint="useSpring sobre o scrollYProgress." />
          <Slider label="Margem do gatilho" value={margin} min={0} max={160} step={10} unit="px" onChange={setMargin} />
          <Toggle label="Disparar uma vez" checked={once} onChange={setOnce} hint="viewport.once — desligue para reanimar na volta." />
          <Slider label="Duração do triggered" value={duration} min={0.2} max={1.6} step={0.1} unit="s" onChange={setDuration} />
          <ActionButton onClick={() => setRound((value) => value + 1)}>Rearmar triggered</ActionButton>
          <Readout
            items={[
              { label: "scrub", value: soft ? "spring" : "direto" },
              { label: "triggered", value: once ? "once" : "sempre" },
              { label: "dono", value: "framer" },
              { label: "reduced", value: reduce ? "estático" : "ativo" },
            ]}
          />
        </>
      }
    />
  );
}
