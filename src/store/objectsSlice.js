
import { create } from "zustand";

export const useObjectsSlice = create(set => ({
  objects: [],
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

