/**
 * C4 — Grain global, estático e fora do fluxo de cliques.
 * É decoração: aria-hidden e pointer-events: none no CSS.
 */
export default function Grain() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
