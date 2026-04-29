import { Sky } from "@react-three/drei";
import type { ReactNode } from "react";

import CameraManager from "./functions/CameraManager";
import ObjectRender from "./functions/DetechMouseLock";
import MountFollower from "./functions/MountFollower";
import UserMovements from "./functions/UserMovements";
import GroundModel from "./models/GroundModel";

function Experience(): ReactNode {
  return (
    <>
      <Sky />
      {/* FUNCTIONS */}
      <UserMovements />
      <MountFollower />
      <CameraManager />
      <ObjectRender />

      {/* OBJECTS */}
      {/* <Transistor /> */}
      <GroundModel />

    </>
  )
}

export default Experience