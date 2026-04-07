
import { Vector3 } from "three";
import { generateUUID } from "three/src/math/MathUtils.js";
import { create } from "zustand";

import { AND_GATE } from "@/utils/constants";
import Transistor from "@/components/Canvas/ObjectsManager/Transistor";

const x = Transistor.gridSize.x
const y = Transistor.gridSize.y
const z = Transistor.gridSize.z
function calculatePosition(x, z) {
  return new Vector3(x, 1, z)
    .add(new Vector3(0.5, 0, 0.5))
    .multiply(Transistor.gridSize)

}
export const useObjectsSlice = create(set => ({
  objects: [
    {
      id: generateUUID(),
      type: AND_GATE,
      position: calculatePosition(0, 0),
      rotation: 0
    },
    // {
    //   id: generateUUID(),
    //   type: AND_GATE,
    //   position: calculatePosition(0, 1),
    //   rotation: 0
    // },
    // {
    //   id: generateUUID(),
    //   type: AND_GATE,
    //   position: new Vector3(1, 0, 0)
    // },
  ],
  addGate(input) {
    set(state => ({
      objects: [...state.objects, input]
    }))
    console.log(useObjectsSlice.getState().objects)
  },
  removeGate(id) {
    set(state => ({
      objects: state.objects.filter(gate => gate.id !== id)
    }))
  },
  udpateGate(id, input) {
    set(state => ({
      objects: state.objects.map(gate => gate.id === id ? { ...gate, ...input } : gate)
    }))
  },
  getGateByPosition(position) {
    const foundGate = useObjectsSlice
      .getState().objects
      .find((gate) => gate.position.equals(position))
    return foundGate ? foundGate : null
  }
}))

