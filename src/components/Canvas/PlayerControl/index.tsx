import type { ReactNode } from "react";

import ControlPlacement from "./ControlPlacement";
import PointerLockGlobal from "./PointerLockGlobal";
import UserMovements from "./UserMovements";

function PlayerControl(): ReactNode {
  return (
    <>
      <ControlPlacement />
      <UserMovements />
      <PointerLockGlobal />
    </>
  )
}

export default PlayerControl