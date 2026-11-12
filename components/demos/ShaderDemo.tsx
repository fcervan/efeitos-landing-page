"use client";

import DemoSoon from "./DemoSoon";

/** B3 · Custom Shaders / GLSL — placeholder até a implementação real. */
export default function ShaderDemo() {
  return (
    <DemoSoon
      code="B3"
      name="Custom Shaders / GLSL"
      summary="Distorção líquida em GLSL com ruído simplex reagindo ao cursor."
      deps={["three","@react-three/fiber"]}
    />
  );
}
