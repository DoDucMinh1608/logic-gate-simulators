import { Plane, Vector3 } from "three";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { convertWorldCoorToGatePos, getLookingPositionOnPlane, GetWirePosFromGatePos1, GetWirePosFromGatePos2, setSnapGridPosition } from "@/utils";
import { AND_GATE, CLOCK, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, SWITCH, TRANSISTOR_SIZE, WIRE, XOR_GATE } from "@/utils/constants";
import { usePlayerSlice } from "@/store/playerSlice";
import { useObjectsSlice } from "@/store/objectsSlice";

const actualSize = TRANSISTOR_SIZE
const activePlane = new Plane(new Vector3(0, 1, 0), 0)
const contactPoint = new Vector3()
const direction = new Vector3()
const gridPosition = new Vector3()
const tempVec = new Vector3()

function SetInteractPosition() {
  const setInteractPosition = useUtilitySlice(state => state.setInteractPosition)
  const selectBuildGate = usePlayerSlice(state => state.selectBuildGate)
  const getGateByPosition = useObjectsSlice(state => state.getGateByPosition)

  useThrottledFrame(state => {
    const raycaster = state.raycaster
    const camera = state.camera

    raycaster.setFromCamera(state.pointer, camera)
    camera.getWorldDirection(direction)

    getLookingPositionOnPlane(state, activePlane, contactPoint)
    contactPoint.setY(0)
    setSnapGridPosition(contactPoint, actualSize, gridPosition)

    if (selectBuildGate !== WIRE) {
      setInteractPosition(gridPosition)
      return
    }

    convertWorldCoorToGatePos(gridPosition.x, gridPosition.y, gridPosition.z, tempVec)
    let { x, y, z } = tempVec
    const gate = getGateByPosition([x, y, z])

    if (!gate) {
      setInteractPosition(null)
      return
    }

    let ports
    switch (gate.type) {
      case AND_GATE:
      case OR_GATE:
      case NAND_GATE:
      case NOR_GATE:
      case XOR_GATE:
        ports = GetWirePosFromGatePos1(x, y, z)
        break
      case SWITCH:
      case CLOCK:
      case NOT_GATE:
        ports = GetWirePosFromGatePos2(x, y, z)
        break
    }
    if (contactPoint.x > gridPosition.x) {
      tempVec.set(...ports.out_Q[1])
    } else {
      if (contactPoint.z < gridPosition.z) {
        tempVec.set(...ports.in_A[0])
      } else {
        tempVec.set(...(ports.in_B || ports.in_A)[0])
      }
    }
    setInteractPosition(tempVec)

  }, -1, 60)

  return null;
}

export default SetInteractPosition;

