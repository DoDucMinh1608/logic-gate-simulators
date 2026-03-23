import { type ReactNode } from "react";

import CurrentCameraState from "./CurrentCameraState";

function ScreenUI(): ReactNode {
  // const camera = useStore(state => state.camera)

  // const angles = getDegrees(camera?.direction)

  return (
    <>
      <div className="absolute left-1/2 top-1/2 -translate-1/2 size-3 bg-black opacity-50">
      </div>
      <CurrentCameraState />
    </>
  )
}

export default ScreenUI