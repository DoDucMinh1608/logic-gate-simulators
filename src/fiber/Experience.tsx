import { Grid, Sky } from "@react-three/drei";
import type { ReactNode } from "react";

import CameraManager from "./functions/CameraManager";
import MountFollower from "./functions/MountFollower";
import UserMovements from "./functions/UserMovements";

function Experience(): ReactNode {
  return (
    <>
      <Sky />
      {/* FUNCTIONS */}
      <UserMovements />
      <MountFollower />
      <CameraManager />

      {/* OBJECTS */}
      {/* <Transistor /> */}
      <Grid position={[0, -0.001, 0]} infiniteGrid cellSize={0.05} sectionSize={2} sectionColor={0x000000} cellColor={0x101010} fadeStrength={10} />
    </>
  )
}

export default Experience