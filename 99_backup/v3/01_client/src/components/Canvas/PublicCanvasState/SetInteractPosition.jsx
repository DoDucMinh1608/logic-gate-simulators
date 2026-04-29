import { Plane, Vector3 } from "three";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { getLookingPositionOnPlane, setSnapGridPosition } from "@/utils";
import { TRANSISTOR_SIZE } from "@/utils/constants";

// TODO: update placing position when looking at an object, not just the ground plane, should be refactored to avoid code duplication with ControlPlacement
const activePlane = new Plane(new Vector3(0, 1, 0), 0)
const contactPoint = new Vector3()
const direction = new Vector3()
const gridPosition = new Vector3()
const actualSize = TRANSISTOR_SIZE

function SetInteractPosition() {
  const setInteractPosition = useUtilitySlice(state => state.setInteractPosition)


  useThrottledFrame(state => {
    const raycaster = state.raycaster
    const camera = state.camera
    const scene = state.scene

    raycaster.setFromCamera(state.pointer, camera)
    camera.getWorldDirection(direction)

    // const intersects = [...raycaster.intersectObjects(scene.children, true)]
    // .map(i => {
    //   return i
    // })
    // .filter(i => i?.object.name != "placement_reference")
    //scene.children.includes(c => c.uuid == i.object.parent.uuid) &&
    // console.log(intersects[0].object.position)
    // if (intersects.length > 0) {
    //   testSnapPos(intersects[0].object.position, intersects[0].point, actualSize, gridPosition)

    // console.log(
    //   Object.values(intersects[0].point),
    //   Object.values(gridPosition),
    //   Object.values(intersects[0].object.position)
    // )
    // } else {
    getLookingPositionOnPlane(state, activePlane, contactPoint)
    contactPoint.setY(0)
    setSnapGridPosition(contactPoint, actualSize, gridPosition)
    // }

    setInteractPosition(gridPosition)
  }, -1, 60)

  return null;
}

export default SetInteractPosition;

