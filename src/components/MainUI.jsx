import CenterCursor from "./UI/CenterCursor"
import CurrentCameraState from "./UI/CurrentCameraState"

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