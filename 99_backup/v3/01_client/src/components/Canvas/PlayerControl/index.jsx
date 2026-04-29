
import ControlPlacement from "./ControlPlacement";
import PointerLockGlobal from "./PointerLockGlobal";
import UserMovements from "./UserMovements";

function PlayerControl() {
  return (
    <>
      <ControlPlacement />
      <UserMovements />
      <PointerLockGlobal />
    </>
  )
}

export default PlayerControl