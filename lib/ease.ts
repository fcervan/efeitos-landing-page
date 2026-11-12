/** Curvas compartilhadas — uma linguagem de movimento para o site inteiro. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const SPRING_SOFT = { type: "spring", stiffness: 150, damping: 18, mass: 0.7 } as const;
export const SPRING_MAGNET = { type: "spring", stiffness: 220, damping: 14, mass: 0.5 } as const;
export const SPRING_PILL = { type: "spring", stiffness: 300, damping: 24, mass: 0.6 } as const;

export const DURATION = { fast: 0.25, base: 0.45, slow: 0.8 } as const;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
