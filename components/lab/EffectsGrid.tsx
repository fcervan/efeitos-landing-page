"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import EffectCard from "@/components/lab/EffectCard";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  COSTS,
  COST_LABEL,
  type Effect,
  type EffectCategory,
  type EffectCost,
} from "@/lib/effects";
import { SPRING_PILL } from "@/lib/ease";
import { effectWeight } from "@/lib/weights";
import { buildSpans } from "@/lib/bento";

type Order = "catalogo" | "custo" | "peso" | "nome";

const ORDERS: Array<{ id: Order; label: string }> = [
  { id: "catalogo", label: "Ordem do catálogo" },
  { id: "custo", label: "Custo: leve → pesado" },
  { id: "peso", label: "Peso medido: menor → maior" },
  { id: "nome", label: "Nome (A–Z)" },
];

const COST_RANK: Record<EffectCost, number> = { leve: 0, medio: 1, pesado: 2 };

type ChipProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  layoutId: string;
  count?: number;
};

function Chip({ active, onClick, children, layoutId, count }: ChipProps) {
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative rounded-pill px-3.5 py-2 text-[13px] font-semibold transition-colors duration-300 ${
        active ? "text-white" : "text-body hover:text-ink"
      }`}
    >
      {active ? (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 -z-10 rounded-pill bg-ink"
          transition={reduce ? { duration: 0 } : SPRING_PILL}
        />
      ) : null}
      {children}
      {typeof count === "number" ? (
        <span className={`ml-1.5 font-mono text-[11px] ${active ? "text-white/60" : "text-body/70"}`}>
          {count}
        </span>
      ) : null}
    </button>
  );
}

export default function EffectsGrid({ effects }: { effects: Effect[] }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [category, setCategory] = useState<EffectCategory | "todos">(
    (params.get("categoria") as EffectCategory | null) ?? "todos",
  );
  const [cost, setCost] = useState<EffectCost | "todos">(
    (params.get("custo") as EffectCost | null) ?? "todos",
  );
  const [onlyHome, setOnlyHome] = useState(params.get("home") === "1");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [order, setOrder] = useState<Order>((params.get("ordem") as Order | null) ?? "catalogo");

  const syncUrl = useCallback(
    (next: {
      category?: EffectCategory | "todos";
      cost?: EffectCost | "todos";
      onlyHome?: boolean;
      query?: string;
      order?: Order;
    }) => {
      const search = new URLSearchParams();
      const c = next.category ?? category;
      const k = next.cost ?? cost;
      const h = next.onlyHome ?? onlyHome;
      const q = next.query ?? query;
      const o = next.order ?? order;
      if (c !== "todos") search.set("categoria", c);
      if (k !== "todos") search.set("custo", k);
      if (h) search.set("home", "1");
      if (q.trim()) search.set("q", q.trim());
      if (o !== "catalogo") search.set("ordem", o);
      const qs = search.toString();
      window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
    },
    [category, cost, onlyHome, query, order, pathname],
  );

  // Botão voltar/avançar do navegador volta a valer.
  useEffect(() => {
    const onPop = () => {
      const search = new URLSearchParams(window.location.search);
      setCategory((search.get("categoria") as EffectCategory | null) ?? "todos");
      setCost((search.get("custo") as EffectCost | null) ?? "todos");
      setOnlyHome(search.get("home") === "1");
      setQuery(search.get("q") ?? "");
      setOrder((search.get("ordem") as Order | null) ?? "catalogo");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = effects.filter((effect) => {
      if (category !== "todos" && effect.category !== category) return false;
      if (cost !== "todos" && effect.cost !== cost) return false;
      if (onlyHome && !effect.onHome) return false;
      if (!term) return true;
      return (
        effect.name.toLowerCase().includes(term) ||
        effect.code.toLowerCase().includes(term) ||
        effect.summary.toLowerCase().includes(term) ||
        effect.deps.join(" ").toLowerCase().includes(term)
      );
    });

    const sorted = [...list];
    if (order === "custo") {
      sorted.sort((a, b) => COST_RANK[a.cost] - COST_RANK[b.cost]);
    } else if (order === "nome") {
      sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    } else if (order === "peso") {
      sorted.sort((a, b) => (effectWeight(a.slug)?.kb ?? 0) - (effectWeight(b.slug)?.kb ?? 0));
    }
    return sorted;
  }, [effects, category, cost, onlyHome, query, order]);

  const spans = useMemo(() => buildSpans(filtered.length), [filtered.length]);
  const active = category !== "todos" || cost !== "todos" || onlyHome || query.trim() !== "" || order !== "catalogo";

  const reset = () => {
    setCategory("todos");
    setCost("todos");
    setOnlyHome(false);
    setQuery("");
    setOrder("catalogo");
    window.history.replaceState(null, "", pathname);
  };

  return (
    <div className="mt-12">
      <div className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-5">
          <LayoutGroup id="filtro-categoria">
            <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Filtrar por categoria">
              <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.16em] text-body">
                categoria
              </span>
              <Chip
                layoutId="chip-categoria"
                active={category === "todos"}
                onClick={() => {
                  setCategory("todos");
                  syncUrl({ category: "todos" });
                }}
                count={effects.length}
              >
                Todas
              </Chip>
              {CATEGORIES.map((item) => (
                <Chip
                  key={item}
                  layoutId="chip-categoria"
                  active={category === item}
                  onClick={() => {
                    setCategory(item);
                    syncUrl({ category: item });
                  }}
                  count={effects.filter((effect) => effect.category === item).length}
                >
                  {CATEGORY_LABEL[item]}
                </Chip>
              ))}
            </div>
          </LayoutGroup>

          <LayoutGroup id="filtro-custo">
            <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Filtrar por custo">
              <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.16em] text-body">
                custo
              </span>
              <Chip
                layoutId="chip-custo"
                active={cost === "todos"}
                onClick={() => {
                  setCost("todos");
                  syncUrl({ cost: "todos" });
                }}
              >
                Todos
              </Chip>
              {COSTS.map((item) => (
                <Chip
                  key={item}
                  layoutId="chip-custo"
                  active={cost === item}
                  onClick={() => {
                    setCost(item);
                    syncUrl({ cost: item });
                  }}
                  count={effects.filter((effect) => effect.cost === item).length}
                >
                  {COST_LABEL[item]}
                </Chip>
              ))}
              <span className="mx-2 hidden h-5 w-px bg-line sm:block" aria-hidden="true" />
              <Chip
                layoutId="chip-home"
                active={onlyHome}
                onClick={() => {
                  setOnlyHome(!onlyHome);
                  syncUrl({ onlyHome: !onlyHome });
                }}
                count={effects.filter((effect) => effect.onHome).length}
              >
                Usados na home
              </Chip>
            </div>
          </LayoutGroup>

          <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <label htmlFor="busca-efeitos" className="sr-only">
                Buscar efeito por nome, código ou dependência
              </label>
              <span
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-body"
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m10.6 10.6 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="busca-efeitos"
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  syncUrl({ query: event.target.value });
                }}
                placeholder="Buscar: tilt, gsap, A5…"
                className="w-full rounded-pill border border-line bg-mist py-2.5 pl-11 pr-4 text-[14px] text-ink placeholder:text-body/70 focus:border-tangerine/50 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="ordem-efeitos" className="font-mono text-[11px] uppercase tracking-[0.16em] text-body">
                ordem
              </label>
              <select
                id="ordem-efeitos"
                value={order}
                onChange={(event) => {
                  const next = event.target.value as Order;
                  setOrder(next);
                  syncUrl({ order: next });
                }}
                className="rounded-pill border border-line bg-mist px-4 py-2.5 text-[13px] font-semibold text-ink focus:border-tangerine/50 focus:bg-white"
              >
                {ORDERS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] font-semibold text-ink" role="status" aria-live="polite">
          {filtered.length === effects.length
            ? `${effects.length} efeitos`
            : `${filtered.length} de ${effects.length} efeitos`}
          <span className="ml-2 font-normal text-body">
            {reduce ? "· movimento reduzido ativo" : "· nenhum demo montado aqui"}
          </span>
        </p>
        {active ? (
          <button
            type="button"
            onClick={reset}
            className="rounded-pill border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors duration-300 hover:border-tangerine/50 hover:text-tangerine-dark"
          >
            Limpar filtros
          </button>
        ) : null}
      </div>

      {filtered.length ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(230px,auto)] lg:grid-cols-12">
          {filtered.map((effect, index) => (
            <EffectCard key={effect.slug} effect={effect} span={spans[index] ?? 4} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-card border border-dashed border-line bg-mist p-10 text-center">
          <p className="h3 text-ink">Nenhum efeito com esse recorte.</p>
          <p className="lead mx-auto mt-3 max-w-md">
            Tente outra combinação — por exemplo, categoria 3D com custo pesado, ou busque pelo nome
            da dependência.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-pill bg-tangerine px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-colors duration-300 hover:bg-tangerine-dark"
          >
            Mostrar todos os {effects.length}
          </button>
        </div>
      )}
    </div>
  );
}
