"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ActionButton, DemoLayout, PanelTitle, Readout, Slider, Stage, Toggle } from "./DemoKit";
import { EASE_OUT, clamp } from "@/lib/ease";

const WORDS = ["Movimento", "com", "intenção,", "não", "por", "acaso."];

export default function KineticTypeDemo() {
  const reduce = useReducedMotion();
  const [stagger, setStagger] = useState(0.09);
  const [duration, setDuration] = useState(0.9);
  const [size, setSize] = useState(56);
  const [accent, setAccent] = useState(3);
  const [tilt, setTilt] = useState(true);
  const [upper, setUpper] = useState(false);
  const [round, setRound] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const rotateX = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!tilt || reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set(clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1) * 5);
    my.set(clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1) * -4);
  };

  return (
    <DemoLayout
      note={
        <>
          Cada palavra vive em um <code className="font-mono">span</code> com{" "}
          <code className="font-mono">overflow: hidden</code> e padding inferior — sem isso, o
          &nbsp;g&nbsp; e o &nbsp;p&nbsp; seriam cortados pela máscara.
        </>
      }
      stage={
        <Stage dark className="grid place-items-center p-8">
          <div
            className="w-full"
            style={{ perspective: 900 }}
            onPointerMove={onMove}
            onPointerLeave={() => {
              mx.set(0);
              my.set(0);
            }}
          >
            <motion.p
              key={round}
              className="max-w-[16ch] font-extrabold leading-[1.06] tracking-tight"
              style={{
                fontSize: `clamp(2rem, 6vw, ${size}px)`,
                rotateX: tilt && !reduce ? rotateX : 0,
                rotateY: tilt && !reduce ? rotateY : 0,
                textTransform: upper ? "uppercase" : "none",
              }}
            >
              {WORDS.map((word, index) => (
                <span key={`${word}-${index}`} className="mask-word">
                  <motion.span
                    className={`inline-block ${index === accent ? "text-tangerine" : "text-white"}`}
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration, ease: EASE_OUT, delay: reduce ? 0 : 0.1 + index * stagger }}
                  >
                    {word}
                  </motion.span>
                  {index < WORDS.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
                </span>
              ))}
            </motion.p>
            <p className="mt-8 max-w-md text-[14px] leading-relaxed text-white/50">
              Passe o mouse para ver a reação em rotateX/rotateY. É o mesmo componente do hero da
              home, com os parâmetros expostos.
            </p>
          </div>
        </Stage>
      }
      controls={
        <>
          <PanelTitle>A5 · parâmetros</PanelTitle>
          <Slider label="Stagger" value={stagger} min={0.02} max={0.24} step={0.01} unit="s" onChange={setStagger} />
          <Slider label="Duração" value={duration} min={0.3} max={1.6} step={0.05} unit="s" onChange={setDuration} />
          <Slider label="Corpo do título" value={size} min={32} max={84} step={2} unit="px" onChange={setSize} />
          <Slider label="Palavra em destaque" value={accent} min={0} max={WORDS.length - 1} step={1} onChange={setAccent} />
          <Toggle label="Reação ao mouse" checked={tilt} onChange={setTilt} hint="Molas em rotateX e rotateY." />
          <Toggle label="Caixa alta" checked={upper} onChange={setUpper} />
          <ActionButton onClick={() => setRound((value) => value + 1)}>
            Rodar a máscara de novo
          </ActionButton>
          <Readout
            items={[
              { label: "palavras", value: `${WORDS.length}` },
              { label: "atraso total", value: `${(WORDS.length * stagger).toFixed(2)}s` },
              { label: "propriedade", value: "y" },
              { label: "reduced", value: reduce ? "sem máscara" : "ativo" },
            ]}
          />
        </>
      }
    />
  );
}
