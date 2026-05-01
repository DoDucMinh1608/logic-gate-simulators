import { Vector3 } from "three";

import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { CheckPinType, convertWorldCoorToGatePos, setSnapGridPosition } from "@/utils";
import { INPUT_PIN, LEFT_CLICK, OUTPUT_PIN, RIGHT_CLICK, TRANSISTOR_SIZE, WIRE } from "@/utils/constants";

function placeGate(button, gatePosition) {
  const addGate = useObjectsSlice.getState().addGate; // Access the addGate function from the player slice
  const getGateByPosition = useObjectsSlice.getState().getGateByPosition; // Access the getGateByPosition function from the player slice
  const removeGate = useObjectsSlice.getState().removeGate
  const selectBuildGate = usePlayerSlice.getState().selectBuildGate
  const setSelectPort = usePlayerSlice.getState().setSelectPort
  const setSelectBuildPort = usePlayerSlice.getState().setSelectBuildPort

  const existingGate = getGateByPosition(gatePosition)

  switch (button) {
    case LEFT_CLICK:
      if (!!existingGate) {
        removeGate(existingGate.id)
      }
      break;
    case RIGHT_CLICK:
      if (!existingGate) {
        addGate({
          type: selectBuildGate,
          position: [gatePosition[0], 0, gatePosition[2]],
          rotation: 0,
          custom: {}
        })
      }
      break
  }
  setSelectBuildPort(null)
  setSelectPort(null)
}

function placeWire(button, gatePosition) {
  const selectPort = usePlayerSlice.getState().selectPort
  const selectBuildPort = usePlayerSlice.getState().selectBuildPort
  const setSelectPort = usePlayerSlice.getState().setSelectPort
  const setSelectBuildPort = usePlayerSlice.getState().setSelectBuildPort

  const getGateByPosition = useObjectsSlice.getState().getGateByPosition
  const addGateConnection = useObjectsSlice.getState().addGateConnection

  const existingGate = getGateByPosition(gatePosition)
  switch (button) {
    case LEFT_CLICK:
      if (existingGate) {
        setSelectBuildPort(null)
      }
      break;
    case RIGHT_CLICK:
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
        port2Type === INPUT_PIN ? selectBuildPort : selectPort
      )) {
        setSelectPort(null)
        setSelectBuildPort(null)
      }
      break
  }
}

const position = new Vector3()
function onMouseDown(event) {
  const camera = usePlayerSlice.getState().camera; // Access the camera from the player slice
  const selectBuildGate = usePlayerSlice.getState().selectBuildGate
  const interactPosition = useUtilitySlice.getState().interactPosition; // Access the interact position from the player slice

  if (!camera) {
    console.warn("Camera not found in player slice.");
    return;
  }

  setSnapGridPosition(interactPosition, TRANSISTOR_SIZE, position)
  const { x, y, z } = convertWorldCoorToGatePos(position.x, position.y, position.z)

  if (selectBuildGate != WIRE) {
    placeGate(event.button, [x, y, z])
    return
  }

  if (selectBuildGate == WIRE) {
    placeWire(event.button, [x, y, z])
  }
}

export default onMouseDown;