import { Vector3 } from "three";

import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { CheckPinType, convertWorldCoorToGatePos, setSnapGridPosition } from "@/utils";
import { INPUT_PIN, OUTPUT_PIN, TRANSISTOR_SIZE, WIRE } from "@/utils/constants";

// TODO: update mouse down to place gates on the grid base on mouse key
const position = new Vector3()
function onMouseDown(event) {
  const camera = usePlayerSlice.getState().camera; // Access the camera from the player slice
  const selectBuildGate = usePlayerSlice.getState().selectBuildGate
  const selectPort = usePlayerSlice.getState().selectPort
  const selectBuildPort = usePlayerSlice.getState().selectBuildPort
  const setSelectPort = usePlayerSlice.getState().setSelectPort
  const setSelectBuildPort = usePlayerSlice.getState().setSelectBuildPort

  const interactPosition = useUtilitySlice.getState().interactPosition; // Access the interact position from the player slice

  const addGate = useObjectsSlice.getState().addGate; // Access the addGate function from the player slice
  const getGateByPosition = useObjectsSlice.getState().getGateByPosition; // Access the getGateByPosition function from the player slice
  const removeGate = useObjectsSlice.getState().removeGate
  const addGateConnection = useObjectsSlice.getState().addGateConnection

  if (!camera) {
    console.warn("Camera not found in player slice.");
    return;
  }

  setSnapGridPosition(interactPosition, TRANSISTOR_SIZE, position)
  const { x, y, z } = convertWorldCoorToGatePos(position.x, position.y, position.z)

  const existingGate = getGateByPosition([x, y, z])
  if (selectBuildGate != WIRE) {
    if (event.button === 0 && existingGate) {
      removeGate(existingGate?.id)
      setSelectBuildPort(null)
      setSelectPort(null)
      return
    }

    if (existingGate) {
      // console.log("Gate already exists at this position:", existingGate.position)
      return;
    }

    if (event.button === 2) {
      addGate({
        type: selectBuildGate,
        position: [x, 0, z],
        rotation: 0,
        custom: {}
      })
    }
    return
  }

  if (selectBuildGate == WIRE) {
    if (event.button === 0 && existingGate) {
      setSelectBuildPort(null)

      return
    }

    if (event.button === 2) {
      if (!selectBuildPort) {
        setSelectBuildPort({
          gateId: selectPort.gateId,
          pin: selectPort.pin,
          position: selectPort.position
        })
        return
      }

      if (selectPort.gateId === selectBuildPort.gateId
        && selectPort.pin === selectBuildPort.pin) {
        return
      }

      let port1Type = CheckPinType(selectPort.gateId, selectPort.pin)
      let port2Type = CheckPinType(selectBuildPort.gateId, selectBuildPort.pin)
      if (port1Type == port2Type) {
        return
      }
      if (addGateConnection(
        port1Type === OUTPUT_PIN ? selectPort : selectBuildPort,
        port2Type === INPUT_PIN ? selectBuildPort : selectPort)
      ) {
        setSelectPort(null)
        setSelectBuildPort(null)
      }
    }
  }
}

export default onMouseDown;