import { COST_LABEL, type EffectCost } from "@/lib/effects";

const STYLES: Record<EffectCost, string> = {
  leve: "border-success/30 bg-success/10 text-[#0B7A3B]",
  medio: "border-amber/45 bg-amber/15 text-[#8A5200]",
  pesado: "border-magenta/30 bg-magenta/10 text-[#B01160]",
};

const BARS: Record<EffectCost, number> = { leve: 1, medio: 2, pesado: 3 };

/** Selo de custo: cor + número de barras + texto. Nunca só cor. */
export default function CostBadge({ cost, className = "" }: { cost: EffectCost; className?: string }) {
  return (
    <span className={`badge ${STYLES[cost]} ${className}`}>
      <span className="flex items-end gap-[2px]" aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="w-[3px] rounded-sm bg-current"
            style={{ height: 4 + index * 3, opacity: index < BARS[cost] ? 1 : 0.25 }}
          />
        ))}
      </span>
      {COST_LABEL[cost]}
    </span>
  );
}
