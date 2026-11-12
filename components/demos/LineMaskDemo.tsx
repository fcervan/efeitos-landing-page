"use client";

import DemoSoon from "./DemoSoon";

/** E12 · Texto com máscara por linha — placeholder até a implementação real. */
export default function LineMaskDemo() {
  return (
    <DemoSoon
      code="E12"
      name="Texto com máscara por linha"
      summary="Cada linha sobe por trás de um recorte, como texto revelado à mão."
      deps={["framer-motion"]}
    />
  );
}
