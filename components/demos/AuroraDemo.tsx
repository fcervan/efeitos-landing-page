"use client";

import { useState } from "react";
import { ActionButton, DemoLayout, PanelTitle, Readout, SelectRow, Slider, Stage, Toggle } from "./DemoKit";

const PALETTES: Record<string, string[]> = {
  cobalto: ["#2B4EFF", "#E11D74", "#F59E0B", "#7C3AED"],
  neon: ["#7C3AED", "#2563EB", "#E11D74", "#B9E824"],
  floresta: ["#0F9D6E", "#B9E824", "#2563EB", "#F59E0B"],
  magenta: ["#E11D74", "#7C3AED", "#2B4EFF", "#B9E824"],
};

const SLOTS = [
  { pos: "left-[-10%] top-[-20%]", size: "58%", anim: "driftA" },
  { pos: "right-[-8%] top-[4%]", size: "48%", anim: "driftB" },
  { pos: "left-[18%] bottom-[-26%]", size: "52%", anim: "driftC" },
  { pos: "right-[14%] bottom-[-16%]", size: "40%", anim: "driftA" },
];

export default function AuroraDemo() {
  const [blobs, setBlobs] = useState(4);
  const [blur, setBlur] = useState(80);
  const [speed, setSpeed] = useState(28);
  const [palette, setPalette] = useState("cobalto");
  const [dark, setDark] = useState(true);
  const [running, setRunning] = useState(true);
  const [grain, setGrain] = useState(true);

  const colors = PALETTES[palette] ?? PALETTES.cobalto!;

  return (
    <DemoLayout
      note={
        <>
          O valor do blur é fixo: o que se move é <code className="font-mono">translate3d</code> e{" "}
          <code className="font-mono">scale</code>. Animar <code className="font-mono">filter</code>{" "}
          em área grande é o jeito mais rápido de derrubar o FPS.
        </>
      }
      stage={
        <Stage dark={dark} className="p-0">
          <div className={`relative min-h-[420px] overflow-hidden contain-paint ${dark ? "bg-night" : "bg-accent-soft"}`}>
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {SLOTS.slice(0, blobs).map((slot, index) => (
                <span
                  key={slot.pos}
                  className={`absolute rounded-full`}
                  style={{
                    left: slot.pos.includes("left-") ? undefined : undefined,
                    width: slot.size,
                    height: slot.size,
                    background: `radial-gradient(circle at 40% 40%, ${colors[index % colors.length]}, transparent 68%)`,
                    filter: `blur(${blur}px)`,
                    animation: `${slot.anim} ${speed + index * 4}s cubic-bezier(0.45,0,0.55,1) infinite`,
                    animationPlayState: running ? "running" : "paused",
                    ...(slot.pos.includes("left-[-10%]") ? { left: "-10%", top: "-20%" } : {}),
                    ...(slot.pos.includes("right-[-8%]") ? { right: "-8%", top: "4%" } : {}),
                    ...(slot.pos.includes("left-[18%]") ? { left: "18%", bottom: "-26%" } : {}),
                    ...(slot.pos.includes("right-[14%]") ? { right: "14%", bottom: "-16%" } : {}),
                  }}
                />
              ))}
            </div>

            {grain ? (
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
            ) : null}

            <div className="relative flex min-h-[420px] flex-col justify-end p-8">
              <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${dark ? "text-white/50" : "text-body"}`}>
                {blobs} blobs · blur {blur}px · {speed}s
              </p>
              <h3
                className={`mt-3 max-w-lg text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold leading-tight ${
                  dark ? "text-white" : "text-ink"
                }`}
              >
                Cor em movimento lento, texto em superfície firme.
              </h3>
              <p className={`mt-3 max-w-md text-[14.5px] leading-relaxed ${dark ? "text-white/60" : "text-body"}`}>
                Repare que o título continua legível mesmo quando a mancha mais clara passa atrás:
                o contraste foi medido no pior caso, não no médio.
              </p>
            </div>
          </div>
        </Stage>
      }
      controls={
        <>
          <PanelTitle>C3 · parâmetros</PanelTitle>
          <Slider label="Quantidade de blobs" value={blobs} min={1} max={4} step={1} onChange={setBlobs} />
          <Slider label="Blur (fixo)" value={blur} min={20} max={140} step={5} unit="px" onChange={setBlur} />
          <Slider label="Período do movimento" value={speed} min={8} max={60} step={2} unit="s" onChange={setSpeed} />
          <SelectRow
            label="Paleta"
            value={palette}
            onChange={setPalette}
            options={[
              { id: "cobalto", label: "Cobalto" },
              { id: "neon", label: "Neon" },
              { id: "floresta", label: "Floresta" },
              { id: "magenta", label: "Magenta" },
            ]}
          />
          <Toggle label="Fundo escuro" checked={dark} onChange={setDark} />
          <Toggle label="Movimento" checked={running} onChange={setRunning} hint="Pausa a animação sem remover o gradiente." />
          <Toggle label="Grain por cima" checked={grain} onChange={setGrain} />
          <ActionButton
            variant="outline"
            onClick={() => {
              setBlobs(4);
              setBlur(80);
              setSpeed(28);
              setPalette("cobalto");
              setDark(true);
              setRunning(true);
              setGrain(true);
            }}
          >
            Restaurar padrões
          </ActionButton>
          <Readout
            items={[
              { label: "propriedades", value: "transform" },
              { label: "blur animado", value: "não" },
              { label: "contain", value: "paint" },
              { label: "cliques", value: "none" },
            ]}
          />
        </>
      }
    />
  );
}
