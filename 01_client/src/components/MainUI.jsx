import { useEffect } from "react"
import CenterCursor from "./UI/CenterCursor"
import CurrentCameraState from "./UI/CurrentCameraState"
import GateMenu from "./UI/GateMenu"

function MainUI() {
  useEffect(function () {

  }, [])
  return (
    <>
      <CurrentCameraState />
      <CenterCursor />
      <GateMenu />
    </>
  )
}

export default MainUI