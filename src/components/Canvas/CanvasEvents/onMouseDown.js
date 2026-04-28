import { Vector3 } from "three/webgpu";

import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { TRANSISTOR_SIZE, XOR_GATE } from "@/utils/constants";
import { convertWorldCoorToGatePos, setSnapGridPosition } from "@/utils/math-utils";


// TODO: update mouse down to place gates on the grid base on mouse key
const position = new Vector3()
function onMouseDown(event) {
  const camera = usePlayerSlice.getState().camera; // Access the camera from the player slice
  const interactPosition = useUtilitySlice.getState().interactPosition; // Access the interact position from the player slice
  const addGate = useObjectsSlice.getState().addGate; // Access the addGate function from the player slice
  const getGateByPosition = useObjectsSlice.getState().getGateByPosition; // Access the getGateByPosition function from the player slice
  const selectGate = usePlayerSlice.getState().selectGate

  if (!camera) {
    console.warn("Camera not found in player slice.");
    return;
  }

  setSnapGridPosition(interactPosition, TRANSISTOR_SIZE, position)
  const { x, y, z } = convertWorldCoorToGatePos(position.x, position.y, position.z)
  const existingGate = getGateByPosition([x, y, z])

  if (event.button === 2) {
    if (existingGate) {

      console.log("Gate already exists at this position:", existingGate.position)
      return;
    }

    addGate({
      type: selectGate,
      position: [x, 0, z],
      rotation: 0,
      custom: {}
    })
  } else if (event.button === 1) {

  }
}

export default onMouseDown;