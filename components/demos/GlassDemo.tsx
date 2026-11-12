"use client";

import { useState } from "react";
import { ActionButton, DemoLayout, PanelTitle, Readout, SelectRow, Slider, Stage, Toggle } from "./DemoKit";

const BACKGROUNDS: Record<string, string> = {
  aurora:
    "radial-gradient(circle at 20% 25%, #2B4EFF 0%, transparent 55%), radial-gradient(circle at 78% 30%, #E11D74 0%, transparent 52%), radial-gradient(circle at 50% 85%, #2563EB 0%, transparent 55%), #070B14",
  foto:
    "linear-gradient(140deg, #2563EB 0%, #7C3AED 38%, #E11D74 68%, #F59E0B 100%)",
  claro:
    "radial-gradient(circle at 25% 20%, #F59E0B 0%, transparent 55%), radial-gradient(circle at 80% 70%, #B9E824 0%, transparent 50%), #F3F6FF",
  xadrez:
    "repeating-conic-gradient(#0E1116 0% 25%, #F5F6F8 0% 50%) 0 0 / 44px 44px",
};

const CARDS = [
  { title: "Sessão ao vivo", value: "3 pessoas", note: "latência 42 ms" },
  { title: "Progresso", value: "78%", note: "meta da semana" },
  { title: "Próximo passo", value: "Revisar prompt", note: "em 2 dias" },
];

export default function GlassDemo() {
  const [blur, setBlur] = useState(18);
  const [opacity, setOpacity] = useState(12);
  const [saturate, setSaturate] = useState(140);
  const [radius, setRadius] = useState(22);
  const [edge, setEdge] = useState(true);
  const [scrim, setScrim] = useState(true);
  const [background, setBackground] = useState("aurora");

  const light = background === "claro" || background === "xadrez";

  return (
    <DemoLayout
      note={
        <>
          O blur é aplicado uma vez por card e nunca animado. Compare com o fundo xadrez: é onde o
          vidro fica mais caro — e onde o contraste do texto mais easily cai.
        </>
      }
      stage={
        <Stage className="p-0">
          <div
            className="relative flex min-h-[420px] flex-col justify-between gap-6 p-6 sm:p-8"
            style={{ background: BACKGROUNDS[background] ?? BACKGROUNDS.aurora }}
          >
            {scrim ? (
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: light ? "rgba(255,255,255,0.35)" : "rgba(11,11,15,0.42)" }}
                aria-hidden="true"
              />
            ) : null}

            <div className="relative">
              <p
                className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
                  light ? "text-ink/70" : "text-white/70"
                }`}
              >
                fundo · {background}
              </p>
              <h3
                className={`mt-2 max-w-md text-[26px] font-extrabold leading-tight ${
                  light ? "text-ink" : "text-white"
                }`}
              >
                Vidro só funciona quando o fundo tem o que mostrar.
              </h3>
            </div>

            <div className="relative grid gap-3 sm:grid-cols-3">
              {CARDS.map((card) => (
                <article
                  key={card.title}
                  className="p-4"
                  style={{
                    borderRadius: radius,
                    background: light ? `rgba(255,255,255,${opacity / 100 + 0.25})` : `rgba(255,255,255,${opacity / 100})`,
                    backdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
                    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
                    border: edge ? "1px solid rgba(255,255,255,0.35)" : "1px solid transparent",
                    boxShadow: edge
                      ? "inset 0 1px 0 rgba(255,255,255,0.45), 0 18px 40px rgba(11,11,15,0.28)"
                      : "0 18px 40px rgba(11,11,15,0.22)",
                  }}
                >
                  <p className={`text-[12px] font-semibold ${light ? "text-ink/70" : "text-white/75"}`}>
                    {card.title}
                  </p>
                  <p className={`mt-2 text-[22px] font-extrabold ${light ? "text-ink" : "text-white"}`}>
                    {card.value}
                  </p>
                  <p className={`mt-1 text-[12px] ${light ? "text-ink/60" : "text-white/60"}`}>{card.note}</p>
                </article>
              ))}
            </div>
          </div>
        </Stage>
      }
      controls={
        <>
          <PanelTitle>C2 · parâmetros</PanelTitle>
          <SelectRow
            label="Fundo"
            value={background}
            onChange={setBackground}
            options={[
              { id: "aurora", label: "Aurora escura" },
              { id: "foto", label: "Gradiente forte" },
              { id: "claro", label: "Fundo claro" },
              { id: "xadrez", label: "Xadrez (pior caso)" },
            ]}
          />
          <Slider label="Blur" value={blur} min={0} max={40} step={1} unit="px" onChange={setBlur} />
          <Slider label="Opacidade do vidro" value={opacity} min={0} max={40} step={1} unit="%" onChange={setOpacity} />
          <Slider label="Saturação" value={saturate} min={100} max={220} step={5} unit="%" onChange={setSaturate} />
          <Slider label="Raio" value={radius} min={0} max={36} step={2} unit="px" onChange={setRadius} />
          <Toggle label="Borda interna iluminada" checked={edge} onChange={setEdge} />
          <Toggle label="Scrim de contraste" checked={scrim} onChange={setScrim} hint="Escurece (ou clareia) o fundo atrás do texto." />
          <ActionButton
            variant="outline"
            onClick={() => {
              setBlur(18);
              setOpacity(12);
              setSaturate(140);
              setRadius(22);
              setEdge(true);
              setScrim(true);
              setBackground("aurora");
            }}
          >
            Restaurar padrões
          </ActionButton>
          <Readout
            items={[
              { label: "cards com blur", value: "3" },
              { label: "área", value: "pequena" },
              { label: "blur animado", value: "não" },
              { label: "fallback", value: "@supports" },
            ]}
          />
        </>
      }
    />
  );
}
