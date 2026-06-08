import ControlGatePlacement from "./ControlGatePlacement";
import ControlWirePlacement from "./ControlWirePlacement";
import PointerLockGlobal from "./PointerLockGlobal";
import UserMovements from "./UserMovements";

function PlayerControl() {
  return (
    <>
      <UserMovements />
      <PointerLockGlobal />
      <ControlGatePlacement />
      <ControlWirePlacement />
    </>
  )
}

export default PlayerControl