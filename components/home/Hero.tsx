"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Aurora from "@/components/ui/Aurora";
import KineticTitle, { type KineticWord } from "@/components/ui/KineticTitle";
import PillButton from "@/components/ui/PillButton";
import Tilt3D from "@/components/ui/Tilt3D";
import { EFFECTS, homeEffects } from "@/lib/effects";
import { EASE_OUT } from "@/lib/ease";
import { scrollToId } from "@/lib/lenis";

const HEADLINE: KineticWord[] = [
  { text: "O" },
  { text: "efeito" },
  { text: "certo," },
  { text: "com" },
  { text: "o" },
  { text: "custo", accent: true },
  { text: "à" },
  { text: "vista." },
];

const FACTS = [
  { value: String(EFFECTS.length), label: "demos isoladas" },
  { value: String(homeEffects().length), label: "efeitos nesta home" },
  { value: "0", label: "contexto WebGL aqui" },
];

const MOCK_LINES = [
  { width: "82%", color: "bg-tangerine" },
  { width: "58%", color: "bg-magenta" },
  { width: "70%", color: "bg-electric" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-tangerine-soft pb-20 pt-[104px] sm:pt-[128px]">
      <Aurora tone="warm" blur={90} />
      <div className="pointer-events-none absolute inset-0 dotgrid opacity-[0.35]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white"
        aria-hidden="true"
      />

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="flex flex-wrap items-center gap-3"
            data-motion
          >
            <Link
              href="/lab"
              className="inline-flex items-center gap-2 rounded-pill border border-tangerine/25 bg-white/80 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-tangerine-dark backdrop-blur-sm transition-colors duration-300 hover:border-tangerine/60"
            >
              TÉCNICA · KINETIC TYPOGRAPHY
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/lab/kinetic-typography"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-body underline decoration-tangerine/40 underline-offset-4 transition-colors hover:text-tangerine-dark"
            >
              ver demo
            </Link>
          </motion.div>

          <KineticTitle words={HEADLINE} className="h1 mt-6 max-w-[15ch]" tilt />

          <motion.p
            className="lead mt-6 max-w-xl"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.55 }}
            data-motion
          >
            Cadência é um laboratório de interface. Cada efeito tem demo isolada, ficha técnica e o
            prompt pronto para colar em qualquer LLM — com o peso real declarado, medido no build.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.68 }}
            data-motion
          >
            <PillButton href="/lab" size="lg">
              Abrir o laboratório
            </PillButton>
            <PillButton
              size="lg"
              variant="outline"
              onClick={() => scrollToId("como-funciona")}
              icon={<span aria-hidden="true">↓</span>}
            >
              Como funciona
            </PillButton>
          </motion.div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-ink/10 pt-6">
            {FACTS.map((fact, index) => (
              <motion.div
                key={fact.label}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.8 + index * 0.08 }}
                data-motion
              >
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block text-2xl font-extrabold tracking-tight text-ink">
                    {fact.value}
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-body">{fact.label}</span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.25 }}
            data-motion
          >
            <Tilt3D className="mx-auto w-full max-w-[520px]" max={9}>
              <div className="relative aspect-[5/5.4] w-full">
                {/* camada 0 — fundo */}
                <div
                  className="absolute inset-x-4 inset-y-6 rounded-[32px] border border-white/70 bg-white/55 dotgrid shadow-card backdrop-blur-[2px]"
                  aria-hidden="true"
                />

                {/* camada 60 — card principal */}
                <div
                  className="absolute inset-x-8 top-12 rounded-[28px] border border-smoke bg-night p-5 text-white shadow-lift sm:p-6"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
                      <span className="rounded-md bg-tangerine px-1.5 py-0.5 font-bold text-white">
                        A5
                      </span>
                      kinetic typography
                    </span>
                    <span className="badge border-success/40 bg-success/15 text-[#7EE2A8]">leve</span>
                  </div>

                  <div className="mt-6 space-y-2.5" aria-hidden="true">
                    {MOCK_LINES.map((line) => (
                      <span
                        key={line.color}
                        className={`block h-3 rounded-pill ${line.color}`}
                        style={{ width: line.width }}
                      />
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                    <p className="font-mono text-[11px] leading-relaxed text-white/70">
                      <span className="text-tangerine-light">prompt</span> crie kinetic typography no
                      hero: palavras reveladas por máscara com stagger
                      <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-tangerine" />
                    </p>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                        first load js
                      </p>
                      <p className="text-lg font-extrabold">demo leve</p>
                    </div>
                    <svg width="104" height="34" viewBox="0 0 104 34" fill="none" aria-hidden="true">
                      <path
                        d="M1 28C10 28 12 12 21 12s11 14 20 14 11-22 20-22 11 18 20 18 10-8 22-8"
                        stroke="url(#heroSpark)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="heroSpark" x1="0" y1="0" x2="104" y2="0">
                          <stop stopColor="#FF5A0A" />
                          <stop offset="0.55" stopColor="#FF2D8A" />
                          <stop offset="1" stopColor="#1F6BFF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* camada 130 — selo de prompt */}
                <div
                  className="absolute -right-1 top-4 flex items-center gap-2 rounded-pill border border-line bg-white px-3.5 py-2 shadow-lift sm:right-2"
                  style={{ transform: "translateZ(130px)" }}
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-success text-white">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path
                        d="M2 6.4 4.6 9 10 3.4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[12px] font-bold text-ink">prompt copiado</span>
                </div>

                {/* camada 160 — chip de fps */}
                <div
                  className="absolute bottom-6 left-0 rounded-2xl border border-line bg-white px-4 py-3 shadow-lift sm:-left-2"
                  style={{ transform: "translateZ(160px)" }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-body">alvo</p>
                  <p className="text-xl font-extrabold leading-none text-ink">
                    60<span className="text-tangerine">fps</span>
                  </p>
                  <div className="mt-2 flex items-end gap-[3px]" aria-hidden="true">
                    {[10, 16, 12, 18, 14, 20, 17].map((height, index) => (
                      <span
                        key={index}
                        className="w-[4px] rounded-sm bg-tangerine/70"
                        style={{ height }}
                      />
                    ))}
                  </div>
                </div>

                {/* camada 110 — esfera */}
                <div
                  className="absolute -bottom-2 right-6 h-20 w-20 rounded-full shadow-glow sm:right-10"
                  style={{
                    transform: "translateZ(110px)",
                    background:
                      "radial-gradient(circle at 32% 28%, #FFB08A, #FF5A0A 45%, #E64A00 78%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </Tilt3D>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
