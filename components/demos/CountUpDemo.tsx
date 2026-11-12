"use client";

import DemoSoon from "./DemoSoon";

/** E5 · Count-up — placeholder até a implementação real. */
export default function CountUpDemo() {
  return (
    <DemoSoon
      code="E5"
      name="Count-up"
      summary="Números que sobem do zero ao valor final uma vez, formatados em pt-BR."
      deps={["gsap","ScrollTrigger"]}
    />
  );
}
