import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoFrame from "@/components/lab/DemoFrame";
import CopyPrompt from "@/components/lab/CopyPrompt";
import CostBadge from "@/components/lab/CostBadge";
import { CATEGORY_LABEL, EFFECTS, bySlug, neighbours } from "@/lib/effects";
import { effectWeight } from "@/lib/weights";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return EFFECTS.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const effect = bySlug(params.slug);
  if (!effect) return { title: "Efeito não encontrado" };
  return {
    title: `${effect.code} · ${effect.name}`,
    description: effect.summary,
    openGraph: {
      title: `${effect.code} · ${effect.name} — Efeitos Landing Page`,
      description: effect.summary,
      locale: "pt_BR",
      type: "article",
    },
  };
}

const BLOCK_ICONS = ["◍", "◎", "▤", "△"];

export default function EffectPage({ params }: Params) {
  const effect = bySlug(params.slug);
  if (!effect) notFound();

  const { prev, next } = neighbours(effect.slug);
  const weight = effectWeight(effect.slug);

  const blocks = [
    { title: "O que é", body: effect.what, list: [] as string[] },
    { title: "Quando usar", body: effect.when, list: [] as string[] },
    { title: "Como implementar", body: "", list: effect.how },
    { title: "Cuidados", body: "", list: effect.care },
  ];

  return (
    <main className="pt-[72px]">
      <div className="wrap py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Trilha">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-body">
              <li>
                <Link href="/lab" className="transition-colors hover:text-tangerine-dark">
                  Laboratório
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink" aria-current="page">
                {effect.name}
              </li>
            </ol>
          </nav>
          <Link
            href="/lab"
            className="group inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors duration-300 hover:border-tangerine/50 hover:text-tangerine-dark"
          >
            <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1" aria-hidden="true">
              ←
            </span>
            Voltar ao índice
          </Link>
        </div>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge border-tangerine/30 bg-tangerine-tint text-tangerine-dark">
              {effect.code}
            </span>
            <span className="badge border-electric/25 bg-electric/10 text-electric">
              {CATEGORY_LABEL[effect.category]}
            </span>
            <CostBadge cost={effect.cost} />
            {effect.onHome ? (
              <span className="badge border-ink/15 bg-ink text-white">usado na home</span>
            ) : null}
          </div>
          <h1 className="h1 mt-5">{effect.name}</h1>
          <p className="lead mt-4">{effect.summary}</p>
        </header>

        <DemoFrame slug={effect.slug} code={effect.code} name={effect.name} cost={effect.cost} />

        <section aria-label="Ficha técnica" className="mt-14 grid gap-4 md:grid-cols-2">
          {blocks.map((block, index) => (
            <article key={block.title} className="rounded-card border border-line bg-white p-6 shadow-card">
              <h2 className="flex items-center gap-2 text-[17px] font-bold text-ink">
                <span className="text-tangerine" aria-hidden="true">
                  {BLOCK_ICONS[index]}
                </span>
                {block.title}
              </h2>
              {block.body ? (
                <p className="mt-3 text-[14.5px] leading-relaxed text-body">{block.body}</p>
              ) : null}
              {block.list.length ? (
                <ul className="mt-4 space-y-2.5">
                  {block.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-body">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-tangerine" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </section>

        <section aria-label="Dependências e performance" className="mt-4 grid gap-4 md:grid-cols-12">
          <div className="rounded-card border border-line bg-white p-6 shadow-card md:col-span-5">
            <h2 className="text-[17px] font-bold text-ink">Dependências</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {(effect.deps.length ? effect.deps : ["nenhuma — CSS e React"]).map((dep) => (
                <li
                  key={dep}
                  className="rounded-lg border border-line bg-mist px-2.5 py-1.5 font-mono text-[12px] text-ink"
                >
                  {dep}
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3 border-t border-line pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[13px] text-body">First Load JS desta rota</dt>
                <dd className="font-mono text-[15px] font-bold text-ink">
                  {weight ? weight.firstLoad : "medir no build"}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[13px] text-body">Orçamento</dt>
                <dd className="font-mono text-[13px] font-semibold text-ink">
                  {effect.cost === "pesado" ? "livre, com lazy + fallback" : "≤ 200 kB"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-card border border-smoke bg-night p-6 text-white md:col-span-7">
            <h2 className="text-[17px] font-bold">Nota de performance</h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">{effect.perf}</p>
            <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[11.5px] leading-relaxed text-white/45">
              Esta página monta apenas o componente desta demo. Ao sair da rota, o React desmonta o
              componente e o cleanup encerra listeners, RAF, ScrollTrigger e contextos de GPU.
            </p>
          </div>
        </section>

        <section aria-label="Prompt copiável" className="mt-10">
          <h2 className="h3 mb-4 text-ink">Peça este efeito a qualquer LLM</h2>
          <CopyPrompt text={effect.prompt} />
        </section>

        <nav aria-label="Outros efeitos" className="mt-12 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/lab/${prev.slug}`}
            className="group rounded-card border border-line bg-white p-5 transition-colors duration-300 hover:border-tangerine/40"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-body">
              ← anterior · {prev.code}
            </span>
            <span className="mt-2 block text-[16px] font-bold text-ink">{prev.name}</span>
          </Link>
          <Link
            href={`/lab/${next.slug}`}
            className="group rounded-card border border-line bg-white p-5 text-right transition-colors duration-300 hover:border-tangerine/40"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-body">
              próximo · {next.code} →
            </span>
            <span className="mt-2 block text-[16px] font-bold text-ink">{next.name}</span>
          </Link>
        </nav>

        <div className="mt-6 text-center">
          <Link href="/lab" className="link-underline text-[14px]">
            Ver todos os {EFFECTS.length} efeitos
          </Link>
        </div>
      </div>
    </main>
  );
}
