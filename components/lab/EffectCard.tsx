import Link from "next/link";
import CostBadge from "@/components/lab/CostBadge";
import EffectPoster from "@/components/lab/EffectPoster";
import { CATEGORY_LABEL, type Effect } from "@/lib/effects";
import { effectWeight } from "@/lib/weights";

const SPAN: Record<number, string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};

type Props = { effect: Effect; span?: number };

/**
 * Card do índice. Nenhum demo é montado aqui: o pôster é SVG estático e
 * só efeitos leves ganham micro-movimento em CSS no hover.
 */
export default function EffectCard({ effect, span = 4 }: Props) {
  const weight = effectWeight(effect.slug);
  const wide = span >= 6;

  return (
    <Link
      href={`/lab/${effect.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift focus-visible:-translate-y-1 ${
        SPAN[span] ?? SPAN[4]
      } ${wide ? "sm:col-span-2" : "sm:col-span-1"}`}
      aria-label={`${effect.code} ${effect.name}, custo ${effect.cost}. Abrir demo isolada.`}
    >
      <div className={`relative w-full overflow-hidden border-b border-line ${wide ? "h-32" : "h-28"}`}>
        <EffectPoster code={effect.code} category={effect.category} animated={effect.cost === "leve"} />
        {effect.onHome ? (
          <span className="absolute right-3 top-3 rounded-pill bg-ink/85 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            na home
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-dark">
            {effect.code} · {CATEGORY_LABEL[effect.category]}
          </span>
          <CostBadge cost={effect.cost} />
        </div>

        <h3 className="mt-3 text-[17px] font-bold leading-snug text-ink">{effect.name}</h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-body">{effect.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {(effect.deps.length ? effect.deps : ["sem dependências"]).map((dep) => (
            <li
              key={dep}
              className="rounded-md border border-line bg-mist px-2 py-1 font-mono text-[10.5px] text-body"
            >
              {dep}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink">
            Abrir demo
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </span>
          {weight ? (
            <span className="font-mono text-[11px] text-body" title="First Load JS medido no build">
              {weight.firstLoad}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
