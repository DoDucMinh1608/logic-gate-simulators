import { Vector3 } from "three/webgpu";

import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";
import { setSnapGridPosition } from "@/utils/math-utils";
import Transistor from "../ObjectsManager/Transistor";


// TODO: update mouse down to place gates on the grid base on mouse key
const position = new Vector3()
function onMouseDown(event) {
  const camera = usePlayerSlice.getState().camera; // Access the camera from the player slice
  const interactPosition = usePlayerSlice.getState().interactPosition; // Access the interact position from the player slice
  const addGate = useObjectsSlice.getState().addGate; // Access the addGate function from the player slice
  const getGateByPosition = useObjectsSlice.getState().getGateByPosition; // Access the getGateByPosition function from the player slice

  if (!camera) {
    console.warn("Camera not found in player slice.");
    return;
  }

  setSnapGridPosition(interactPosition, Transistor.size, position)
  const existingGate = getGateByPosition(position)
  if (event.button === 2) {
    if (existingGate) {
      console.log("Gate already exists at this position:", existingGate.position)
      return;
    }

    addGate({
      id: crypto.randomUUID(),
      position: position.clone(),
    })
  }
}

export default onMouseDown;