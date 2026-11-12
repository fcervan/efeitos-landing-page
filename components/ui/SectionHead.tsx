import Link from "next/link";
import type { ReactNode } from "react";
import { bySlug } from "@/lib/effects";

type Props = {
  slug: string;
  title: ReactNode;
  lead?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
};

/** Cabeçalho de seção da home: eyebrow TÉCNICA · NOME + link discreto para a demo. */
export default function SectionHead({ slug, title, lead, tone = "light", align = "left" }: Props) {
  const effect = bySlug(slug);
  if (!effect) return null;
  const dark = tone === "dark";

  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div
        className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <p className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>
          <span aria-hidden="true">◍</span>
          TÉCNICA · {effect.name}
        </p>
        <Link
          href={`/lab/${effect.slug}`}
          className={`group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ${
            dark ? "text-white/50 hover:text-white" : "text-body hover:text-accent-dark"
          }`}
        >
          ver demo
          <span className="transition-transform duration-500 ease-out group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
          <span className="sr-only"> de {effect.name}</span>
        </Link>
      </div>
      <h2 className={`h2 mt-4 ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead ? (
        <p className={`lead mt-4 ${dark ? "text-white/70" : "text-body"}`}>{lead}</p>
      ) : null}
    </div>
  );
}
