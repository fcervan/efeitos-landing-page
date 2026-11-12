import Link from "next/link";
import { CATEGORIES, CATEGORY_LABEL, EFFECTS } from "@/lib/effects";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/lab", label: "Todos os efeitos" },
  { href: "/lab/kinetic-typography", label: "A5 · Kinetic Typography" },
  { href: "/lab/tilt-3d", label: "B4 · Tilt 3D" },
  { href: "/lab/webgl", label: "B1 · WebGL" },
];

const STACK = [
  "Next.js 14.2.15 (App Router)",
  "React 18.3.1 · TypeScript strict",
  "Tailwind 3.4 · Framer Motion 11.18",
  "GSAP 3.15 + ScrollTrigger · Lenis 1.3",
];

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-night text-white">
      <div
        className="pointer-events-none absolute -left-24 -top-32 h-[320px] w-[320px] rounded-full bg-accent/25 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-[340px] w-[340px] rounded-full bg-electric/20 blur-[100px]"
        aria-hidden="true"
      />
      <div className="wrap relative py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow eyebrow-dark">Efeitos Landing Page · laboratório de movimento</p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">
              Um menu de referência: você vê o efeito funcionando, entende o custo e leva o prompt
              para o seu projeto. Cada demo vive em uma rota isolada — o que é pesado nunca pesa na
              home.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
              {EFFECTS.length} efeitos · 4 categorias · 3 níveis de custo
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Rodapé, navegação">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white/50">Navegar</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-white/80 transition-colors duration-300 hover:text-accent-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Rodapé, categorias">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white/50">Categorias</h2>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={`/lab?categoria=${category}`}
                    className="text-[15px] text-white/80 transition-colors duration-300 hover:text-accent-light"
                  >
                    {CATEGORY_LABEL[category]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white/50">Stack</h2>
            <ul className="mt-4 space-y-2.5">
              {STACK.map((item) => (
                <li key={item} className="text-[13px] leading-snug text-white/60">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Conteúdo e demos em pt-BR. Sem bibliotecas de componentes prontas.</p>
          <p className="font-mono">
            prefers-reduced-motion respeitado · AA · 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
