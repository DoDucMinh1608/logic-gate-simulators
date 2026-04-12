
import { convertGatePosToWirePos } from "@/utils/math-utils";
import { generateUUID } from "three/src/math/MathUtils.js";
import { create } from "zustand";


export const useObjectsSlice = create(set => ({
  GATES: [
    {
      id: generateUUID(), position: [0, 0, 1], rotation: 0, type: "AND",
      inputs: ['in_A', 'in_B'],
      outputs: ['out_Q'],
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: generateUUID(), position: [0, 0, 2], rotation: 0, type: "NOT",
      inputs: ['in_A', 'in_B'],
      outputs: ['out_Q'],
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: generateUUID(), position: [0, 0, 3], rotation: 0, type: "OR",
      inputs: ['in_A', 'in_B'],
      outputs: ['out_Q'],
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: generateUUID(), position: [0, 0, 4], rotation: 0, type: "NAND",
      inputs: ['in_A', 'in_B'],
      outputs: ['out_Q'],
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: generateUUID(), position: [0, 0, 5], rotation: 0, type: "NOR",
      inputs: ['in_A', 'in_B'],
      outputs: ['out_Q'],
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: generateUUID(), position: [0, 0, 6], rotation: 0, type: "XOR",
      inputs: ['in_A', 'in_B'],
      outputs: ['out_Q'],
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: "clock", position: [0, 0, 7], rotation: 0, type: "CLOCK",
      inputs: [],
      outputs: ['out_Q'],
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
  ],
  LINES: [
    {
      id: generateUUID(),
      from: { gateId: 'clock', outputPin: 'out_Q', status: 0 },
      to: { gateId: 'gate_2', inputPin: 'in_A' },
      positions: [
        convertGatePosToWirePos(1, 0, 7),
        convertGatePosToWirePos(0, 0, 7),
        // [2, 0, 2.80],
        // [3, 0, 2.80],
      ],
    },
    {
      id: generateUUID(),
      from: { gateId: 'clock_1', outputPin: 'out_Q', status: 0 },
      to: { gateId: 'gate_2', inputPin: 'in_A', status: 0 },
      positions: [
        // [1, 0, 1],
        // [9.6, 0, 5],
        // [10, 0, 5],
        // getOutputPos(...[4, 0, 2]),
        // getOutputPos(...[4 + 0.1, 0, 2]),
        // getOutputPos(...[5, 0, 2]),
        // [2, 0, 1],
        // [2, 0, 2.80],
        // [3, 0, 2.80],
      ],
    }
  ],
  getInput(gateId) {

  },
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
    // const foundGate = useObjectsSlice
    //   .getState().objects
    //   .find((gate) => gate.position.equals(position))
    // return foundGate ? foundGate : null
  }
}))

