"use client";

import DemoSoon from "./DemoSoon";

/** E11 · Hover lift — placeholder até a implementação real. */
export default function HoverLiftDemo() {
  return (
    <DemoSoon
      code="E11"
      name="Hover lift"
      summary="Card sobe 4px e ganha sombra — o feedback de clicável mais barato."
      deps={["framer-motion"]}
    />
  );
}
