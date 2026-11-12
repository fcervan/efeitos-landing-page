type Tone = "warm" | "night" | "cool";

const TONES: Record<Tone, string[]> = {
  warm: [
    "radial-gradient(circle at 30% 30%, rgba(43,78,255,0.55), transparent 68%)",
    "radial-gradient(circle at 60% 40%, rgba(225,29,116,0.34), transparent 66%)",
    "radial-gradient(circle at 40% 60%, rgba(245,158,11,0.34), transparent 70%)",
    "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.28), transparent 68%)",
  ],
  night: [
    "radial-gradient(circle at 30% 30%, rgba(43,78,255,0.55), transparent 66%)",
    "radial-gradient(circle at 60% 40%, rgba(124,58,237,0.5), transparent 66%)",
    "radial-gradient(circle at 40% 60%, rgba(37,99,235,0.40), transparent 70%)",
    "radial-gradient(circle at 50% 50%, rgba(225,29,116,0.30), transparent 68%)",
  ],
  cool: [
    "radial-gradient(circle at 30% 30%, rgba(37,99,235,0.40), transparent 68%)",
    "radial-gradient(circle at 60% 40%, rgba(185,232,36,0.26), transparent 66%)",
    "radial-gradient(circle at 40% 60%, rgba(43,78,255,0.34), transparent 70%)",
    "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.3), transparent 68%)",
  ],
};

const POSITIONS = [
  "left-[-8%] top-[-18%] h-[46vw] max-h-[520px] w-[46vw] max-w-[520px] animate-driftA",
  "right-[-6%] top-[6%] h-[38vw] max-h-[420px] w-[38vw] max-w-[420px] animate-driftB",
  "left-[22%] bottom-[-24%] h-[40vw] max-h-[460px] w-[40vw] max-w-[460px] animate-driftC",
  "right-[18%] bottom-[-14%] h-[30vw] max-h-[340px] w-[30vw] max-w-[340px] animate-driftA",
];

/**
 * C3 — Aurora: blobs de radial-gradient com blur fixo.
 * O movimento é só transform (translate/scale) — o blur nunca é animado.
 */
export default function Aurora({
  tone = "warm",
  className = "",
  blur = 80,
}: {
  tone?: Tone;
  className?: string;
  blur?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden contain-paint ${className}`}
      aria-hidden="true"
    >
      {TONES[tone].map((background, index) => (
        <span
          key={background}
          className={`absolute rounded-full ${POSITIONS[index] ?? POSITIONS[0]}`}
          style={{ background, filter: `blur(${blur}px)` }}
        />
      ))}
    </div>
  );
}
