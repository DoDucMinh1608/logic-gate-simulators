import { Plane, Vector3 } from "three";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { usePlayerSlice } from "@/store/playerSlice";
import { getLookingPositionOnPlane, setSnapGridPosition } from "@/utils/math-utils";
import Transistor from "../ObjectsManager/Transistor";

const contactPoint = new Vector3()
const activePlane = new Plane(new Vector3(0, 1, 0), 0)
const direction = new Vector3()
const gridPosition = new Vector3()
const actualSize = Transistor.size.clone()

// TODO: update placing position when looking at an object, not just the ground plane, should be refactored to avoid code duplication with ControlPlacement
function SetInteractPosition() {
  const setInteractPosition = usePlayerSlice(state => state.setInteractPosition)


  useThrottledFrame(state => {
    const raycaster = state.raycaster
    const camera = state.camera
    const scene = state.scene

    raycaster.setFromCamera(state.pointer, camera)
    camera.getWorldDirection(direction)

    const intersects = [...raycaster.intersectObjects(scene.children, true)]
      .map(i => {

        return i
      })
      .filter(i => scene.children.includes(c => c.uuid == i.object.parent.uuid) && i?.name !== "placement_reference")
    if (intersects.length > 0) {
      return
    }

    getLookingPositionOnPlane(state, activePlane, contactPoint)
    setSnapGridPosition(contactPoint, actualSize, gridPosition)
    setInteractPosition(gridPosition)
  }, -1, 60)

  return null;
}

export default SetInteractPosition;

