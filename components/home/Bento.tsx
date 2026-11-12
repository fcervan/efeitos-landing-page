"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { EASE_OUT } from "@/lib/ease";

const MotionLink = motion.create(Link);

type Card = {
  title: string;
  text: string;
  href: string;
  span: string;
  kind: "chart" | "prompt" | "routes" | "a11y" | "transform" | "weight";
  dark?: boolean;
};

const CARDS: Card[] = [
  {
    title: "O custo aparece antes do código",
    text: "Cada efeito carrega um selo de custo — leve, médio ou pesado — e o First Load JS medido no build. Você decide com o número na mão, não no susto depois do deploy.",
    href: "/lab/webgl",
    span: "lg:col-span-7 lg:row-span-2",
    kind: "chart",
    dark: true,
  },
  {
    title: "Prompt pronto para colar",
    text: "Um bloco de código com a instrução completa: receitas, cuidados e o que não fazer.",
    href: "/lab/kinetic-typography",
    span: "lg:col-span-5",
    kind: "prompt",
  },
  {
    title: "Uma rota por efeito",
    text: "Nada de página única acumulando loops. Three e Spline só existem dentro da própria demo.",
    href: "/lab/lenis",
    span: "lg:col-span-5",
    kind: "routes",
  },
  {
    title: "Acessível de fábrica",
    text: "Reduced motion, foco visível, contraste AA e teclado em todos os controles.",
    href: "/lab/marquee",
    span: "lg:col-span-4",
    kind: "a11y",
  },
  {
    title: "Só transform e opacity",
    text: "Nenhum loop anima width, height, top ou left. O alvo é 60fps em celular mediano.",
    href: "/lab/hover-lift",
    span: "lg:col-span-4",
    kind: "transform",
  },
  {
    title: "Orçamento por rota",
    text: "Home até 220 kB, índice e demos leves até 200 kB. O 3D estoura de propósito — e assume.",
    href: "/lab/spline-3d",
    span: "lg:col-span-4",
    kind: "weight",
  },
];

const BARS = [
  { label: "leve", value: 34, color: "#B9E824", note: "CSS + transform" },
  { label: "médio", value: 62, color: "#F59E0B", note: "blur / scroll" },
  { label: "pesado", value: 100, color: "#E11D74", note: "WebGL + runtime" },
];

function Visual({ kind }: { kind: Card["kind"] }) {
  if (kind === "chart") {
    return (
      <div className="mt-8">
        <div className="flex items-end gap-4 sm:gap-7">
          {BARS.map((bar) => (
            <div key={bar.label} className="flex-1">
              <div className="flex h-32 items-end sm:h-40">
                <span
                  className="w-full rounded-t-xl"
                  style={{
                    height: `${bar.value}%`,
                    background: `linear-gradient(180deg, ${bar.color}, ${bar.color}44)`,
                    boxShadow: `0 0 30px ${bar.color}44`,
                  }}
                />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
                {bar.label}
              </p>
              <p className="text-[12px] leading-snug text-white/45">{bar.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 border-t border-white/10 pt-4 font-mono text-[11px] text-white/40">
          altura = custo relativo de bundle + GPU, não o valor em kB
        </p>
      </div>
    );
  }

  if (kind === "prompt") {
    return (
      <div className="mt-6 rounded-2xl border border-line bg-mist p-3.5 font-mono text-[11.5px] leading-relaxed text-body">
        <span className="text-accent-dark">›</span> crie um tilt 3D em CSS com perspective +
        preserve-3d e camadas em translateZ…
        <span className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          copiar prompt
        </span>
      </div>
    );
  }

  if (kind === "routes") {
    return (
      <ul className="mt-6 flex flex-wrap gap-2 font-mono text-[11px]">
        {["/lab/tilt-3d", "/lab/aurora", "/lab/webgl"].map((route) => (
          <li
            key={route}
            className="rounded-pill border border-line bg-mist px-3 py-1.5 text-body"
          >
            {route}
          </li>
        ))}
      </ul>
    );
  }

  if (kind === "a11y") {
    return (
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {["AA", "teclado", "reduced motion"].map((tag) => (
          <span
            key={tag}
            className="badge border-electric/25 bg-electric/10 text-electric normal-case tracking-normal"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }

  if (kind === "transform") {
    return (
      <div className="mt-6 flex items-center gap-3 font-mono text-[11px]">
        <span className="rounded-lg bg-success/12 px-2.5 py-1.5 text-success">transform ✓</span>
        <span className="rounded-lg bg-success/12 px-2.5 py-1.5 text-success">opacity ✓</span>
        <span className="rounded-lg bg-danger/10 px-2.5 py-1.5 text-danger line-through">height</span>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-2 font-mono text-[11px] text-body">
      {[
        { route: "/", budget: "≤ 220 kB" },
        { route: "/lab", budget: "≤ 200 kB" },
        { route: "/lab/[slug]", budget: "≤ 200 kB" },
      ].map((row) => (
        <p key={row.route} className="flex items-center justify-between gap-3 border-b border-line pb-2">
          <span>{row.route}</span>
          <span className="font-semibold text-ink">{row.budget}</span>
        </p>
      ))}
    </div>
  );
}

export default function Bento() {
  const reduce = useReducedMotion();

  return (
    <section id="beneficios" className="relative bg-white py-20 sm:py-28">
      <div className="wrap">
        <SectionHead
          slug="bento-grid"
          title={
            <>
              Seis motivos para <span className="text-accent">copiar</span> em vez de reinventar.
            </>
          }
          lead="O laboratório não é uma galeria bonita: é uma ferramenta de decisão. Cada bloco abaixo existe para responder uma pergunta que você faz antes de pedir o efeito."
        />

        <div className="mt-12 grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08} className={`${card.span} h-full`}>
              <MotionLink
                href={card.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-card border p-6 shadow-card transition-colors duration-500 sm:p-7 ${
                  card.dark
                    ? "on-dark border-smoke bg-night text-white"
                    : "border-line bg-white hover:border-accent/40"
                }`}
                whileHover={reduce ? undefined : { y: -4 }}
                whileTap={reduce ? undefined : { y: -1 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                data-motion
              >
                {card.dark ? (
                  <span
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-[70px]"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className="pointer-events-none absolute inset-0 rounded-card opacity-0 shadow-lift transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="relative flex h-full flex-col">
                  <h3 className={`h3 ${card.dark ? "text-white" : "text-ink"}`}>{card.title}</h3>
                  <p
                    className={`mt-3 max-w-md text-[14.5px] leading-relaxed ${
                      card.dark ? "text-white/65" : "text-body"
                    }`}
                  >
                    {card.text}
                  </p>
                  <div className="mt-auto">
                    <Visual kind={card.kind} />
                  </div>
                  <span
                    className={`mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${
                      card.dark ? "text-accent-light" : "text-accent-dark"
                    }`}
                  >
                    abrir efeito
                    <span
                      className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                </div>
              </MotionLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
