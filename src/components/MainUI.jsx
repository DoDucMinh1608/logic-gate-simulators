import CenterCursor from "./UI/CenterCursor"
import CurrentCameraState from "./UI/CurrentCameraState"
import GateMenu from "./UI/GateMenu"

function MainUI() {
  return (
    <>
      <CenterCursor />
      {/* <DebugTerminal /> */}
      <CurrentCameraState />
      <GateMenu />
    </>
  )
}

export default MainUI