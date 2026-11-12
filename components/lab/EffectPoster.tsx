import type { EffectCategory } from "@/lib/effects";

type Props = {
  code: string;
  category: EffectCategory;
  animated: boolean;
};

const PALETTE: Record<EffectCategory, [string, string, string]> = {
  scroll: ["#2B4EFF", "#F59E0B", "#E11D74"],
  "3d": ["#2563EB", "#7C3AED", "#E11D74"],
  estetica: ["#E11D74", "#2B4EFF", "#F59E0B"],
  interacao: ["#0F9D6E", "#B9E824", "#2563EB"],
};

/**
 * Pôster estático do índice — SVG inline, sem rede e sem canvas.
 * Só efeitos leves ganham micro-movimento em CSS no hover do card.
 */
export default function EffectPoster({ code, category, animated }: Props) {
  const [a, b, c] = PALETTE[category];
  const seed = code.charCodeAt(1) % 4;
  const id = `poster-${code}`;

  return (
    <svg
      viewBox="0 0 320 120"
      className="h-full w-full"
      role="img"
      aria-label={`Pôster do efeito ${code}, categoria ${category}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="320" y2="120">
          <stop stopColor={a} stopOpacity="0.18" />
          <stop offset="0.6" stopColor={b} stopOpacity="0.12" />
          <stop offset="1" stopColor={c} stopOpacity="0.16" />
        </linearGradient>
        <pattern id={`${id}-d`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="#0E1116" fillOpacity="0.09" />
        </pattern>
      </defs>

      <rect width="320" height="120" fill={`url(#${id}-g)`} />
      <rect width="320" height="120" fill={`url(#${id}-d)`} />

      {category === "scroll" ? (
        <g>
          {[0, 1, 2].map((row) => (
            <rect
              key={row}
              x={24 + row * 12}
              y={30 + row * 24}
              width={190 - row * 44}
              height="10"
              rx="5"
              fill={row === 0 ? a : row === 1 ? b : c}
              opacity={0.85 - row * 0.18}
              className={animated ? "transition-transform duration-700 ease-out group-hover:translate-x-3" : ""}
              style={{ transitionDelay: `${row * 70}ms` }}
            />
          ))}
          <circle
            cx="272"
            cy="60"
            r="16"
            fill="none"
            stroke={a}
            strokeWidth="3"
            strokeDasharray="70 30"
            className={animated ? "transition-transform duration-700 ease-out group-hover:rotate-90" : ""}
            style={{ transformOrigin: "272px 60px" }}
          />
        </g>
      ) : null}

      {category === "3d" ? (
        <g className={animated ? "transition-transform duration-700 ease-out group-hover:-translate-y-1" : ""}>
          <path d="M160 22 208 48 208 92 160 118 112 92 112 48Z" fill={a} fillOpacity="0.16" />
          <path d="M160 22 208 48 160 74 112 48Z" fill={b} fillOpacity="0.5" />
          <path d="M112 48 160 74 160 118 112 92Z" fill={a} fillOpacity="0.38" />
          <path d="M208 48 208 92 160 118 160 74Z" fill={c} fillOpacity="0.3" />
          <path
            d="M160 22 208 48 208 92 160 118 112 92 112 48Z M112 48 160 74 208 48 M160 74 160 118"
            fill="none"
            stroke="#0E1116"
            strokeOpacity="0.35"
            strokeWidth="1.4"
          />
        </g>
      ) : null}

      {category === "estetica" ? (
        <g>
          {[
            { cx: 120, cy: 60, r: 38, fill: a },
            { cx: 168, cy: 52, r: 32, fill: b },
            { cx: 206, cy: 70, r: 26, fill: c },
          ].map((circle, index) => (
            <circle
              key={circle.cx}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill={circle.fill}
              fillOpacity="0.42"
              className={animated ? "transition-transform duration-700 ease-out group-hover:scale-110" : ""}
              style={{ transformOrigin: `${circle.cx}px ${circle.cy}px`, transitionDelay: `${index * 80}ms` }}
            />
          ))}
          <rect x="24" y="86" width="72" height="8" rx="4" fill="#0E1116" fillOpacity="0.14" />
        </g>
      ) : null}

      {category === "interacao" ? (
        <g>
          {[34, 24, 14].map((r, index) => (
            <circle
              key={r}
              cx={168 + seed * 6}
              cy="60"
              r={r}
              fill="none"
              stroke={index === 0 ? c : index === 1 ? b : a}
              strokeWidth="2.4"
              strokeOpacity={0.35 + index * 0.22}
              className={animated ? "transition-transform duration-700 ease-out group-hover:scale-110" : ""}
              style={{ transformOrigin: `${168 + seed * 6}px 60px`, transitionDelay: `${index * 70}ms` }}
            />
          ))}
          <path
            d={`M${168 + seed * 6} 60 l14 34 6-13 13-6z`}
            fill="#0E1116"
            fillOpacity="0.75"
            className={animated ? "transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:translate-y-1" : ""}
          />
        </g>
      ) : null}

      <text
        x="24"
        y="30"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        fontWeight="700"
        fill="#0E1116"
        fillOpacity="0.5"
      >
        {code}
      </text>
    </svg>
  );
}
