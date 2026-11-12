"use client";

import DemoSoon from "./DemoSoon";

/** E6 · Anel de progresso — placeholder até a implementação real. */
export default function ProgressRingDemo() {
  return (
    <DemoSoon
      code="E6"
      name="Anel de progresso"
      summary="SVG com pathLength animado, rótulo no centro e estado acessível."
      deps={["framer-motion"]}
    />
  );
}
