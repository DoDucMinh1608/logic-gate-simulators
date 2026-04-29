import type { Vector3 } from "three";
import { create } from "zustand";

export interface LogicGate {
  id: string,
  type: string,
  position: Vector3,
  color: string,
  active: boolean
}

export interface ObjectsState {
  objects: LogicGate[],
  addGate: (input: LogicGate) => void,
  udpateGate: (id: string, input: any) => void,
  removeGate: (id: string) => void,
  getGateByPosition: (position: Vector3) => LogicGate | null
}

export const useObjectsSlice = create<ObjectsState>(set => ({
  objects: [
    // { id: '1', type: 'AND', position: [1, 5, 0.5, 1.5], color: 'red', active: true },
    // { id: '2', type: 'AND', position: [1.5, 0.5, 1.5], color: 'blue', active: false },
  ],
  addGate(input: LogicGate) {
    set(state => ({
      objects: [...state.objects, input]
    }))
    console.log(useObjectsSlice.getState().objects)
  },
  removeGate(id: string) {
    set(state => ({
      objects: state.objects.filter(gate => gate.id !== id)
    }))
  },
  udpateGate(id: string, input: Partial<LogicGate>) {
    set(state => ({
      objects: state.objects.map(gate => gate.id === id ? { ...gate, ...input } : gate)
    }))
  },
  getGateByPosition(position): LogicGate | null {
    const foundGate = useObjectsSlice
      .getState().objects
      .find((gate: LogicGate) => gate.position.equals(position))
    return foundGate ? foundGate : null
  }
}))

