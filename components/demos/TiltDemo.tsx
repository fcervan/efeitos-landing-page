"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ActionButton, DemoLayout, PanelTitle, Readout, Slider, Stage, Toggle } from "./DemoKit";
import { clamp } from "@/lib/ease";

export default function TiltDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(12);
  const [perspective, setPerspective] = useState(1200);
  const [depth, setDepth] = useState(1);
  const [hoverScale, setHoverScale] = useState(true);
  const [guides, setGuides] = useState(false);
  const [glow, setGlow] = useState(true);
  const [stiffness, setStiffness] = useState(150);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness, damping: 18, mass: 0.7 });
  const rotateY = useSpring(ry, { stiffness, damping: 18, mass: 0.7 });

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    ry.set(clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1) * max);
    rx.set(clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1) * -max);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const z = (value: number) => `${value * depth}px`;

  return (
    <DemoLayout
      note={
        <>
          Perspective no pai, <code className="font-mono">preserve-3d</code> no filho e{" "}
          <code className="font-mono">translateZ</code> nas camadas. Nenhum contexto WebGL, nenhum
          listener global — e em toque o efeito fica desligado.
        </>
      }
      stage={
        <Stage className="grid place-items-center overflow-visible p-10">
          <div
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={reset}
            style={{ perspective: `${perspective}px` }}
            className="w-full max-w-[420px]"
          >
            <motion.div
              className="preserve-3d relative aspect-[4/3.4] w-full"
              style={{ rotateX, rotateY }}
              whileHover={hoverScale && !reduce ? { scale: 1.03 } : undefined}
              transition={{ type: "spring", stiffness, damping: 20 }}
            >
              <div
                className={`absolute inset-0 rounded-[30px] border bg-white dotgrid ${
                  guides ? "border-dashed border-electric/60" : "border-line"
                } shadow-card`}
                style={{ transform: `translateZ(${z(0)})` }}
                aria-hidden="true"
              />

              <div
                className="absolute inset-x-6 top-8 rounded-[24px] border border-smoke bg-night p-5 text-white shadow-lift"
                style={{ transform: `translateZ(${z(60)})` }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  camada · translateZ {z(60)}
                </p>
                <p className="mt-3 text-[20px] font-extrabold leading-tight">
                  Profundidade sem<br />
                  <span className="text-accent">WebGL</span>
                </p>
                <div className="mt-4 flex gap-1.5" aria-hidden="true">
                  {["#2B4EFF", "#E11D74", "#2563EB", "#B9E824"].map((color) => (
                    <span key={color} className="h-1.5 flex-1 rounded-pill" style={{ background: color }} />
                  ))}
                </div>
              </div>

              <div
                className="absolute -right-3 top-2 rounded-pill border border-line bg-white px-3 py-2 text-[12px] font-bold text-ink shadow-lift"
                style={{ transform: `translateZ(${z(120)})` }}
              >
                camada {z(120)}
              </div>

              <div
                className={`absolute bottom-4 left-2 h-16 w-16 rounded-full ${glow ? "shadow-glow" : "shadow-card"}`}
                style={{
                  transform: `translateZ(${z(160)})`,
                  background: "radial-gradient(circle at 32% 28%, #C9D4FF, #2B4EFF 48%, #1D3ACC 80%)",
                }}
                aria-hidden="true"
              />

              <div
                className="absolute -bottom-3 right-6 rounded-2xl border border-line bg-white px-3 py-2 shadow-lift"
                style={{ transform: `translateZ(${z(140)})` }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-body">fps</p>
                <p className="text-[16px] font-extrabold text-ink">60</p>
              </div>
            </motion.div>
          </div>
        </Stage>
      }
      controls={
        <>
          <PanelTitle>B4 · parâmetros</PanelTitle>
          <Slider label="Ângulo máximo" value={max} min={0} max={24} step={1} unit="°" onChange={setMax} />
          <Slider label="Perspective" value={perspective} min={400} max={2400} step={50} unit="px" onChange={setPerspective} />
          <Slider label="Profundidade das camadas" value={depth} min={0} max={1.8} step={0.1} unit="×" onChange={setDepth} />
          <Slider label="Rigidez da mola" value={stiffness} min={60} max={400} step={10} onChange={setStiffness} />
          <Toggle label="Escala no hover" checked={hoverScale} onChange={setHoverScale} />
          <Toggle label="Glow na esfera" checked={glow} onChange={setGlow} />
          <Toggle label="Guias da camada base" checked={guides} onChange={setGuides} />
          <ActionButton onClick={reset} variant="outline">
            Zerar inclinação
          </ActionButton>
          <Readout
            items={[
              { label: "contexto webgl", value: "0" },
              { label: "camadas", value: "5" },
              { label: "listeners", value: "1 local" },
              { label: "toque", value: "desligado" },
            ]}
          />
        </>
      }
    />
  );
}
