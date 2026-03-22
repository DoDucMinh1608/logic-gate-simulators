import { Grid, Sky } from "@react-three/drei";
import type { ReactNode } from "react";

import MountFollower from "./MountFollower";
import Transistor from "./Transistor";
import User from "./User";
import CameraManager from "./utils/CameraManager";

function Experience(): ReactNode {
  return (
    <>
      <Sky />
      <User />
      <Transistor />
      <MountFollower />
      <Grid position={[0, -0.001, 0]} infiniteGrid cellSize={0.05} sectionSize={2} sectionColor={0x000000} cellColor={0x101010} fadeStrength={10} />
      <CameraManager />
    </>
  )
}

export default Experience