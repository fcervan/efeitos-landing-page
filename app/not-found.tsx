import Link from "next/link";
import { EFFECTS } from "@/lib/effects";

export default function NotFound() {
  return (
    <main className="pt-[72px]">
      <div className="wrap flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">
          <span aria-hidden="true">◍</span> erro 404
        </p>
        <h1 className="h1 mt-5 max-w-[16ch]">
          Esse efeito não está no <span className="text-tangerine">catálogo</span>.
        </h1>
        <p className="lead mt-5 max-w-xl">
          O laboratório tem {EFFECTS.length} efeitos e cada um tem endereço próprio. Volte ao índice
          para escolher pelo nome, pela categoria ou pelo custo.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/lab"
            className="rounded-pill bg-tangerine px-6 py-3 text-[15px] font-bold text-white shadow-cta transition-colors duration-300 hover:bg-tangerine-dark"
          >
            Ver o índice de efeitos
          </Link>
          <Link
            href="/"
            className="rounded-pill border border-ink/15 bg-white px-6 py-3 text-[15px] font-bold text-ink transition-colors duration-300 hover:border-tangerine/60"
          >
            Voltar para a home
          </Link>
        </div>
      </div>
    </main>
  );
}
