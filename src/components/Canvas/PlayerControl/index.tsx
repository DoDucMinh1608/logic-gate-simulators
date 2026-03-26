import type { ReactNode } from "react";

import ControlPlacement from "./ControlPlacement";
import UserMovements from "./UserMovements";

function PlayerControl(): ReactNode {
  return (
    <>
      <ControlPlacement />
      <UserMovements />
    </>
  )
}

export default PlayerControl