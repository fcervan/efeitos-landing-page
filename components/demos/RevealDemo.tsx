"use client";

import DemoSoon from "./DemoSoon";

/** E1 · Reveal em cascata — placeholder até a implementação real. */
export default function RevealDemo() {
  return (
    <DemoSoon
      code="E1"
      name="Reveal em cascata"
      summary="Itens entram em sequência quando o bloco aparece, uma única vez."
      deps={["framer-motion"]}
    />
  );
}
