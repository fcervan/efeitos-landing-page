"use client";

import DemoSoon from "./DemoSoon";

/** D3 · GSAP + ScrollTrigger — placeholder até a implementação real. */
export default function GsapDemo() {
  return (
    <DemoSoon
      code="D3"
      name="GSAP + ScrollTrigger"
      summary="Timeline orquestrada com scrub, dentro de gsap.context e matchMedia."
      deps={["gsap","ScrollTrigger"]}
    />
  );
}
