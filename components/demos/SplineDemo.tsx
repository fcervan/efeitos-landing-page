"use client";

import DemoSoon from "./DemoSoon";

/** B2 · Spline 3D — placeholder até a implementação real. */
export default function SplineDemo() {
  return (
    <DemoSoon
      code="B2"
      name="Spline 3D"
      summary="Cena montada em editor visual, embutida com runtime lazy e pôster estático."
      deps={["@splinetool/react-spline","@splinetool/runtime"]}
    />
  );
}
