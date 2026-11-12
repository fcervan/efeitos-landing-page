"use client";

import DemoSoon from "./DemoSoon";

/** B1 · WebGL / Three / R3F — placeholder até a implementação real. */
export default function WebGLDemo() {
  return (
    <DemoSoon
      code="B1"
      name="WebGL / Three / R3F"
      summary="3D real com luzes coloridas, partículas e órbita — carregado só nesta rota."
      deps={["three","@react-three/fiber","@react-three/drei"]}
    />
  );
}
