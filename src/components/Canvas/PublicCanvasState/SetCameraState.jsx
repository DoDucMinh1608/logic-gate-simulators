import { Vector3 } from "three";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { usePlayerSlice } from "@/store/playerSlice";

const updateTick = 15
const inputVector = new Vector3()
function SetCameraState() {
  const setCameraPosition = usePlayerSlice(state => state.setCameraPosition)
  const setCameraDirection = usePlayerSlice(state => state.setCameraDirection)

  useThrottledFrame(state => {
    const camera = state.camera

    camera.getWorldPosition(inputVector)
    setCameraPosition(inputVector)

    camera.getWorldDirection(inputVector)
    setCameraDirection(inputVector)
    // state.gl.render(state.scene, state.camera)
  }, -1, updateTick)

  return null;
}

export default SetCameraState