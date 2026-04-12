
import { convertGatePosToWirePos } from "@/utils/math-utils";
import { generateUUID } from "three/src/math/MathUtils.js";
import { create } from "zustand";


export const useObjectsSlice = create(set => ({
  GATES: [
    {
      id: 'and_1',
      type: "AND",
      position: [0, 0, 1],
      rotation: 0,
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: 'not_1',
      type: "NOT",
      position: [0, 0, 2],
      rotation: 0,
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: 'or_1',
      type: "OR",
      position: [0, 0, 3],
      rotation: 0,
      state: { in_A: 0, in_B: 0, out_Q: 0 },
      custom: {}
    },
    {
      id: 'nand_1',
      type: "NAND",
      position: [0, 0, 4],
      rotation: 0,
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: 'nor_1',
      type: "NOR",
      position: [0, 0, 5],
      rotation: 0,
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: 'xor_1',
      type: "XOR",
      position: [0, 0, 6],
      rotation: 0,
      state: { in_A: 0, in_B: 0, out_Q: 0 },
      custom: {}
    },
    {
      id: "clock",
      type: "CLOCK",
      position: [-1, 0, 3],
      rotation: 0,
      state: { out_Q: 0 },
      custom: { tick: 1, lastUpdate: 0 }
    },
    {
      id: "clock_1",
      type: "CLOCK",
      position: [-1, 0, 4],
      rotation: 0,
      state: { out_Q: 0 },
      custom: { tick: 2, lastUpdate: 0 }
    },
  ],
  LINES: [
    {
      id: generateUUID(),
      status: false,
      from: { gateId: 'clock', pin: 'out_Q' },
      to: { gateId: 'or_1', pin: 'in_A' },
      positions: [
        convertGatePosToWirePos(-1, 0, 3),
        convertGatePosToWirePos(-.5, 0, 3),
        convertGatePosToWirePos(-.5, 0, 2.9),
        convertGatePosToWirePos(0, 0, 2.9),
      ],
    },
    {
      id: generateUUID(),
      status: false,
      from: { gateId: 'clock_1', pin: 'out_Q' },
      to: { gateId: 'or_1', pin: 'in_B' },
      positions: [
        convertGatePosToWirePos(-1, 0, 4),
        convertGatePosToWirePos(-.5, 0, 4),
        convertGatePosToWirePos(-.5, 0, 3.1),
        convertGatePosToWirePos(0, 0, 3.1),
      ],
    },
    {
      id: generateUUID(),
      from: { gateId: 'or_1', pin: 'out_Q' },
      to: { gateId: 'or_2', pin: 'in_B' },
      positions: [
        convertGatePosToWirePos(0, 0, 3),
        convertGatePosToWirePos(0.5, 0, 3),
      ],
    }
  ],
  getInput(gateId) {

  },
  addGate(input) {
    set(state => ({
      // objects: [...state.objects, input]
    }))
    // console.log(useObjectsSlice.getState().objects)
  },
  removeGate(id) {
    set(state => ({
      // objects: state.objects.filter(gate => gate.id !== id)
    }))
  },
  updateGate(id, input) {
    set(state => ({
      GATES: state.GATES.map(i => i.id === id ? { ...i, ...input } : i)
    }))
  },
  updateWire(id, input) {
    set(state => ({
      LINES: state.LINES.map(i => i.id === id ? { ...i, ...input } : i)
    }))

  },
  getGateByPosition(position) {
    // const foundGate = useObjectsSlice
    //   .getState().objects
    //   .find((gate) => gate.position.equals(position))
    // return foundGate ? foundGate : null
  }
}))

