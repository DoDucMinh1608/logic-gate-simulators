import { Vector3 } from "three";


import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { convertWorldCoorToGatePos, setSnapGridPosition } from "@/utils";
import { TRANSISTOR_SIZE, WIRE } from "@/utils/constants";

// TODO: update mouse down to place gates on the grid base on mouse key
const position = new Vector3()
function onMouseDown(event) {
  const camera = usePlayerSlice.getState().camera; // Access the camera from the player slice
  const selectBuildGate = usePlayerSlice.getState().selectBuildGate
  const selectedWire = usePlayerSlice.getState().selectedWire
  const setConnectWire = usePlayerSlice.getState().setConnectWire

  const interactPosition = useUtilitySlice.getState().interactPosition; // Access the interact position from the player slice

  const addGate = useObjectsSlice.getState().addGate; // Access the addGate function from the player slice
  const getGateByPosition = useObjectsSlice.getState().getGateByPosition; // Access the getGateByPosition function from the player slice
  const removeGate = useObjectsSlice.getState().removeGate

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
      return
    }

    if (existingGate) {
      console.log("Gate already exists at this position:", existingGate.position)
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

    if (!selectedWire) {
      console.log('test')
      // setConnectWire()
      return
    }

  }
}

export default onMouseDown;