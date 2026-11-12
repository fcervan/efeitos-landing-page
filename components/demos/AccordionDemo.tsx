"use client";

import DemoSoon from "./DemoSoon";

/** E8 · Acordeão de altura — placeholder até a implementação real. */
export default function AccordionDemo() {
  return (
    <DemoSoon
      code="E8"
      name="Acordeão de altura"
      summary="height 0 → auto com AnimatePresence, botão semântico e foco preservado."
      deps={["framer-motion"]}
    />
  );
}
