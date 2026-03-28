
import { Plane, Vector3 } from "three";

import { useThrottledFrame } from "../../../hooks/useThrottledFrame";
import { usePlayerSlice } from "../../../store/playerSlice";
import { getLookingPositionOnPlane } from "../../../utils/math-utils";

const contactPoint = new Vector3()
const activePlane = new Plane(new Vector3(0, 1, 0), 0)
// TODO: update placing position when looking at an object, not just the ground plane, should be refactored to avoid code duplication with ControlPlacement
function SetInteractPosition() {
  const setInteractPosition = usePlayerSlice(state => state.setInteractPosition)

  useThrottledFrame(state => {
    const raycaster = state.raycaster
    const camera = state.camera
    raycaster.setFromCamera(state.pointer, camera)

    const intersects = raycaster.intersectObjects(state.scene.children, true)

    if (intersects.length == 1) {
      getLookingPositionOnPlane(state, activePlane, contactPoint)
      setInteractPosition(contactPoint)
    } else {

    }
    state.gl.render(state.scene, state.camera)
  }, -1, 30)

  return null;
}

export default SetInteractPosition;

