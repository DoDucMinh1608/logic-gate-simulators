import { Plane, Vector3 } from "three";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { convertWorldCoorToGatePos, getLookingPositionOnPlane, setSnapGridPosition } from "@/utils";
import { TRANSISTOR_SIZE, WIRE } from "@/utils/constants";
import { useModelsSlice } from "@/store/modelStore";

const actualSize = TRANSISTOR_SIZE
const activePlane = new Plane(new Vector3(0, 1, 0), 0)
const contactPoint = new Vector3()
const direction = new Vector3()
const gridPosition = new Vector3()
const tempVec = new Vector3()

function SetInteractPosition() {
  const setInteractPosition = useUtilitySlice(state => state.setInteractPosition)
  const setGateInteractPosition = useUtilitySlice(state => state.setGateInteractPosition)
  const selectBuildGate = usePlayerSlice(state => state.selectBuildGate)
  const getGateByPosition = useObjectsSlice(state => state.getGateByPosition)
  const setSelectPort = usePlayerSlice(state => state.setSelectPort)

  useThrottledFrame(state => {
    const raycaster = state.raycaster
    const camera = state.camera

    raycaster.setFromCamera(state.pointer, camera)
    camera.getWorldDirection(direction)

    getLookingPositionOnPlane(state, activePlane, contactPoint)
    contactPoint.setY(0)
    setSnapGridPosition(contactPoint, actualSize, gridPosition)
    setGateInteractPosition(gridPosition)

    convertWorldCoorToGatePos(gridPosition.x, gridPosition.y, gridPosition.z, tempVec)
    let { x, y, z } = tempVec
    const gate = getGateByPosition([x, y, z])

    if (!gate || !gate.display) {
      setInteractPosition(null)
      return
    }

    const model = useModelsSlice.getState().getModelById(gate.model_name)
    if (!model) {
      setInteractPosition(null)
      return
    }
    const portSelect = model.GetSelectPin(contactPoint, gridPosition, tempVec)
    tempVec.set(...portSelect.position)

    setInteractPosition(tempVec)
    setSelectPort({ gateId: gate.id, pin: portSelect.pin, position: tempVec })
  }, -1, 30)

  return null;
}

export default SetInteractPosition;

