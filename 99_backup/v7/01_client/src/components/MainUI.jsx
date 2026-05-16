import CenterCursor from "./UI/CenterCursor"
import CurrentCameraState from "./UI/CurrentCameraState"
import DebugMode from "./UI/DebugMode"
import GateMenu from "./UI/GateMenu"

function MainUI() {
  return (
    <>
      <DebugMode />
      <CurrentCameraState />
      <CenterCursor />
      <GateMenu />
    </>
  )
}

export default MainUI