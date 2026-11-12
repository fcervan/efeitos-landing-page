import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

const STEPS = [
  {
    n: "01",
    title: "Filtre pelo que o projeto aguenta",
    text: "No índice você cruza categoria e custo. Se o alvo é celular mediano, comece pelos leves e deixe o 3D para uma rota dedicada.",
    href: "/lab?custo=leve",
    cta: "Ver só os leves",
    accent: "text-accent",
  },
  {
    n: "02",
    title: "Abra a demo isolada",
    text: "Uma página, um efeito, um loop. Dá para sentir o movimento real e ver o que ele custa sem o resto do site competindo por GPU.",
    href: "/lab/tilt-3d",
    cta: "Exemplo: tilt 3D",
    accent: "text-magenta",
  },
  {
    n: "03",
    title: "Leia a ficha antes de pedir",
    text: "O que é, quando usar, como implementar e os cuidados que normalmente só aparecem depois que o efeito já está em produção.",
    href: "/lab/scrollytelling",
    cta: "Exemplo: scrollytelling",
    accent: "text-electric",
  },
  {
    n: "04",
    title: "Copie o prompt e cole na sua LLM",
    text: "O texto já vai com as restrições: transform e opacity, reduced motion, cleanup e fallback. É o pedido que gera código que passa em revisão.",
    href: "/lab/magnetic-buttons",
    cta: "Exemplo: botões magnéticos",
    accent: "text-violet",
  },
];

export default function Steps() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-mist py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 dotgrid opacity-40" aria-hidden="true" />
      <div className="wrap relative">
        <SectionHead
          slug="reveal-cascata"
          title="Quatro passos entre a referência e o seu projeto."
          lead="Sem cadastro, sem instalação: o laboratório é lido, testado e copiado. A ordem abaixo é a que evita retrabalho."
        />

        <ol className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.n} delay={index * 0.08} className="h-full">
              <div className="relative flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card">
                <span
                  className="absolute inset-x-6 top-0 h-[3px] rounded-b bg-gradient-to-r from-accent via-magenta to-electric"
                  aria-hidden="true"
                />
                <span className={`font-mono text-[42px] font-extrabold leading-none ${step.accent}`}>
                  {step.n}
                </span>
                <h3 className="mt-5 text-[17px] font-bold leading-snug text-ink">{step.title}</h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-body">{step.text}</p>
                <Link
                  href={step.href}
                  className="group mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink"
                >
                  <span className="link-underline">{step.cta}</span>
                  <span
                    className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
