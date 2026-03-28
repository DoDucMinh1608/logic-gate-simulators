import CenterCursor from "./UI/CenterCursor"
import CurrentCameraState from "./UI/CurrentCameraState"
import DebugTerminal from "./UI/DebugTerminal"

function MainUI() {
  return (
    <>
      <CenterCursor />
      {/* <DebugTerminal /> */}
      <CurrentCameraState />
    </>
  )
}

export default MainUI