"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ActionButton, DemoLayout, PanelTitle, Readout, Segmented, Slider, Stage, Toggle } from "./DemoKit";
import { EASE_OUT } from "@/lib/ease";

type Layout = "bento" | "uniforme" | "duas";

const ITEMS = [
  { title: "Bloco largo", text: "col-span-8: o assunto principal ganha área.", span: 8, tone: "bg-night text-white", tall: true },
  { title: "Coluna estreita", text: "col-span-4 para o dado de apoio.", span: 4, tone: "bg-tangerine-tint text-ink" },
  { title: "Terço", text: "Três blocos iguais fecham a linha.", span: 4, tone: "bg-white text-ink" },
  { title: "Outro terço", text: "Mesma altura, conteúdo diferente.", span: 4, tone: "bg-white text-ink" },
  { title: "Último terço", text: "Sem buraco na grade.", span: 4, tone: "bg-electric/10 text-ink" },
  { title: "Meia linha", text: "col-span-6 fecha a conta em 12.", span: 6, tone: "bg-mist text-ink" },
];

export default function BentoDemo() {
  const reduce = useReducedMotion();
  const [layout, setLayout] = useState<Layout>("bento");
  const [gap, setGap] = useState(16);
  const [radius, setRadius] = useState(24);
  const [count, setCount] = useState(6);
  const [lift, setLift] = useState(true);
  const [borders, setBorders] = useState(true);

  const visible = ITEMS.slice(0, count);

  const spanClass = (item: (typeof ITEMS)[number], index: number) => {
    if (layout === "duas") return "lg:col-span-6";
    if (layout === "uniforme") return "lg:col-span-4";
    if (count < 6 && index === count - 1) return "lg:col-span-12";
    return item.span === 8 ? "lg:col-span-8" : item.span === 6 ? "lg:col-span-6" : "lg:col-span-4";
  };

  return (
    <DemoLayout
      note={
        <>
          Grade de 12 colunas com spans por bloco. No mobile vira coluna única automaticamente; os
          spans só existem a partir de <code className="font-mono">lg</code>.
        </>
      }
      stage={
        <Stage className="p-5">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12"
            style={{ gap }}
          >
            {visible.map((item, index) => (
              <motion.article
                key={item.title}
                className={`relative flex min-h-[132px] flex-col justify-between p-5 ${item.tone} ${
                  borders ? "border border-line" : ""
                } ${spanClass(item, index)} ${item.tall && layout === "bento" ? "lg:row-span-2 lg:min-h-[280px]" : ""}`}
                style={{ borderRadius: radius }}
                whileHover={lift && !reduce ? { y: -4 } : undefined}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                layout={!reduce}
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-60">
                    {spanClass(item, index).replace("lg:", "")}
                  </span>
                  <h3 className="mt-2 text-[16px] font-bold leading-snug">{item.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed opacity-70">{item.text}</p>
                </div>
                <span className="mt-4 font-mono text-[11px] opacity-50">bloco {index + 1}</span>
              </motion.article>
            ))}
          </div>
        </Stage>
      }
      controls={
        <>
          <PanelTitle>C1 · parâmetros</PanelTitle>
          <Segmented
            label="Layout"
            value={layout}
            options={[
              { id: "bento", label: "Bento" },
              { id: "uniforme", label: "Uniforme" },
              { id: "duas", label: "2 colunas" },
            ]}
            onChange={setLayout}
          />
          <Slider label="Blocos" value={count} min={3} max={6} step={1} onChange={setCount} />
          <Slider label="Gap" value={gap} min={0} max={32} step={2} unit="px" onChange={setGap} />
          <Slider label="Raio da borda" value={radius} min={0} max={40} step={2} unit="px" onChange={setRadius} />
          <Toggle label="Hover lift" checked={lift} onChange={setLift} hint="translateY(-4px), nunca height." />
          <Toggle label="Bordas visíveis" checked={borders} onChange={setBorders} />
          <ActionButton
            variant="outline"
            onClick={() => {
              setLayout("bento");
              setGap(16);
              setRadius(24);
              setCount(6);
              setLift(true);
              setBorders(true);
            }}
          >
            Restaurar padrões
          </ActionButton>
          <Readout
            items={[
              { label: "colunas", value: "12" },
              { label: "blocos", value: `${count}` },
              { label: "js", value: "0 (CSS)" },
              { label: "mobile", value: "1 coluna" },
            ]}
          />
        </>
      }
    />
  );
}
