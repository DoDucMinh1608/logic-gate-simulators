import { Grid, KeyboardControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

import SelectedPosition from "../fiber/SelectedPosition";
import Transistor from "../fiber/Transistor";
import User from "../fiber/User";

import { KEYBOARD_MAPPING } from "../utils/constants";

function ScreenRenderer(): ReactNode {
  // console.log(KEYBOARD_MAPPING)
  return (
    <KeyboardControls map={KEYBOARD_MAPPING}>
      <Canvas camera={{ fov: 75, position: [1, 1, 1] }} >
        <Sky />
        <User />
        <Grid infiniteGrid cellSize={0.25} sectionSize={2.5} sectionColor={0x000000} cellColor={0x101010} fadeStrength={10} />
        <Transistor />
        <SelectedPosition />
      </Canvas>
    </KeyboardControls>
  )
}

export default ScreenRenderer