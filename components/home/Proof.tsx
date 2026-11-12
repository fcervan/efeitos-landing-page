import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

const PROOF = [
  {
    tag: "build",
    title: "Compila limpo, rota por rota",
    text: "next build sem erro, tsc --noEmit sem apontamento e todas as páginas geradas estaticamente a partir do registro de efeitos.",
    metric: "TypeScript strict",
    color: "text-success",
    dot: "bg-success",
  },
  {
    tag: "layout",
    title: "Sem overflow em quatro larguras",
    text: "390, 768, 1024 e 1440 pixels conferidos página por página: a largura do conteúdo é igual à largura do viewport.",
    metric: "scrollWidth === clientWidth",
    color: "text-electric",
    dot: "bg-electric",
  },
  {
    tag: "movimento",
    title: "Quem pede menos movimento, recebe menos",
    text: "Com prefers-reduced-motion ativo, as demos entregam o estado final: nada de marquee, aurora, mola ou loop rodando escondido.",
    metric: "prefers-reduced-motion",
    color: "text-magenta",
    dot: "bg-magenta",
  },
];

export default function Proof() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="wrap">
        <SectionHead
          slug="hover-lift"
          title="A prova aqui é técnica, não depoimento."
          lead="Em vez de citação de cliente satisfeito, três checagens que você mesmo pode repetir no projeto depois de clonar."
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {PROOF.map((item, index) => (
            <Reveal as="li" key={item.tag} delay={index * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-card border border-line bg-mist p-6">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-body">
                  <span className={`h-2 w-2 rounded-full ${item.dot}`} aria-hidden="true" />
                  {item.tag}
                </span>
                <h3 className="mt-5 text-[17px] font-bold leading-snug text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-body">{item.text}</p>
                <p className={`mt-6 font-mono text-[12px] font-semibold ${item.color}`}>{item.metric}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
