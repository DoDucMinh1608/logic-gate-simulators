import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

import Experience from "../fiber/Experience";
import { keyMap } from "../utils/constants";

function ScreenRenderer(): ReactNode {
  return (
    <KeyboardControls map={keyMap}>
      <Canvas camera={{ fov: 75, position: [1, 1, 1] }} >
        <Experience />
      </Canvas>
    </KeyboardControls>
  )
}

export default ScreenRenderer