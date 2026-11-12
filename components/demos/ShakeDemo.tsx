"use client";

import DemoSoon from "./DemoSoon";

/** E10 · Shake de erro — placeholder até a implementação real. */
export default function ShakeDemo() {
  return (
    <DemoSoon
      code="E10"
      name="Shake de erro"
      summary="Tremor curto em x para erro de formulário, com mensagem acessível."
      deps={["framer-motion"]}
    />
  );
}
