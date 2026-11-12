"use client";

import DemoSoon from "./DemoSoon";

/** E2 · Parallax de camadas — placeholder até a implementação real. */
export default function ParallaxDemo() {
  return (
    <DemoSoon
      code="E2"
      name="Parallax de camadas"
      summary="Grid, blob e mockup seguem o mouse com molas de fatores diferentes."
      deps={["framer-motion"]}
    />
  );
}
