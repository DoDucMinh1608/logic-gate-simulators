import CenterCursor from "./UI/CenterCursor"
import DebugMode from "./UI/DebugMode"
import GateMenu from "./UI/GateMenu"

function MainUI() {
  return (
    <>
      <DebugMode />
      {/* <CurrentCameraState /> */}
      <CenterCursor />
      <GateMenu />
    </>
  )
}

export default MainUI