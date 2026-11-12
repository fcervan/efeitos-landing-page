"use client";

import DemoSoon from "./DemoSoon";

/** D2 · Bouncy / Spring Physics — placeholder até a implementação real. */
export default function SpringDemo() {
  return (
    <DemoSoon
      code="D2"
      name="Bouncy / Spring Physics"
      summary="Molas em vez de easing: pílula que desliza entre abas com layoutId."
      deps={["framer-motion"]}
    />
  );
}
