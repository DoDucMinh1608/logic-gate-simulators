import { generateUUID } from "three/src/math/MathUtils.js";
import { create } from "zustand";

import AndGate from "@/components/Canvas/Gates/AndGate";
import Clock from "@/components/Canvas/Gates/Clock";
import NandGate from "@/components/Canvas/Gates/NandGate";
import NorGate from "@/components/Canvas/Gates/NorGate";
import NotGate from "@/components/Canvas/Gates/NotGate";
import OrGate from "@/components/Canvas/Gates/OrGate";
import Switch from "@/components/Canvas/Gates/Switch";
import XorGate from "@/components/Canvas/Gates/XorGate";
import { AND_GATE, CLOCK, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, SWITCH, XOR_GATE } from "@/utils/constants";
import { convertGatePosToWirePos } from "@/utils/math-utils";

export const useObjectsSlice = create(set => ({
  GATES: [
    {
      id: 'and_1',
      type: AND_GATE,
      position: [0, 0, 1],
      rotation: 0,
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: 'not_1',
      type: NOT_GATE,
      position: [0, 0, 2],
      rotation: 0,
      state: { in_A: 0, out_Q: 0 },
    },
    {
      id: 'or_1',
      type: OR_GATE,
      position: [0, 0, 3],
      rotation: 0,
      state: { in_A: 0, in_B: 0, out_Q: 0 },
      custom: {}
    },
    {
      id: 'nand_1',
      type: NAND_GATE,
      position: [0, 0, 4],
      rotation: 0,
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: 'nor_1',
      type: NOR_GATE,
      position: [0, 0, 5],
      rotation: 0,
      state: { in_A: 0, in_B: 0, out_Q: 0 },
    },
    {
      id: 'xor_1',
      type: XOR_GATE,
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
      custom: { tick: 0.5, lastUpdate: 0 }
    },
    {
      id: "clock_1",
      type: "CLOCK",
      position: [-1, 0, 4],
      rotation: 0,
      state: { out_Q: 0 },
      custom: { tick: 1, lastUpdate: 0 }
    },
    {
      id: "clock_2",
      type: "CLOCK",
      position: [-1, 0, 2],
      rotation: 0,
      state: { out_Q: 0 },
      custom: { tick: 1, lastUpdate: 0 }
    },
    {
      id: "aaa",
      "type": "XOR",
      "position": [-4, 0, 10],
      "rotation": 0,
      state: {},
      "custom": {}
    }
  ],
  LINES: [
    {
      id: generateUUID(),
      status: false,
      from: { gateId: 'xor_1', pin: 'out_Q' },
      to: { gateId: '', pin: 'in_A' },
      positions: [
        convertGatePosToWirePos(0, 0, 6),
        convertGatePosToWirePos(.5, 0, 6),
      ],
    },
    {
      id: generateUUID(),
      status: false,
      from: { gateId: '', pin: 'out_Q' },
      to: { gateId: 'xor_1', pin: 'in_B' },
      positions: [],
    },
    {
      id: generateUUID(),
      status: false,
      from: { gateId: '', pin: 'out_Q' },
      to: { gateId: 'xor_1', pin: 'in_A' },
      positions: [],
    },
    {
      id: generateUUID(),
      status: false,
      from: { gateId: 'nor_1', pin: 'out_Q' },
      to: { gateId: '', pin: 'in_A' },
      positions: [
        convertGatePosToWirePos(0, 0, 5),
        convertGatePosToWirePos(.5, 0, 5),
      ],
    },
    {
      id: generateUUID(),
      status: true,
      from: { gateId: '', pin: 'out_Q' },
      to: { gateId: 'nor_1', pin: 'in_B' },
      positions: [],
    },
    {
      id: generateUUID(),
      status: false,
      from: { gateId: '', pin: 'out_Q' },
      to: { gateId: 'nor_1', pin: 'in_A' },
      positions: [],
    },
    {
      id: generateUUID(),
      status: false,
      from: { gateId: 'nand_1', pin: 'out_Q' },
      to: { gateId: '', pin: 'in_A' },
      positions: [
        convertGatePosToWirePos(0, 0, 4),
        convertGatePosToWirePos(.5, 0, 4),
      ],
    },
    {
      id: generateUUID(),
      status: true,
      from: { gateId: 'clock_1', pin: 'out_Q' },
      to: { gateId: 'nand_1', pin: 'in_B' },
      positions: [],
    },
    {
      id: generateUUID(),
      status: true,
      from: { gateId: 'clock_2', pin: 'out_Q' },
      to: { gateId: 'nand_1', pin: 'in_A' },
      positions: [],
    },
    {
      id: generateUUID(),
      status: false,
      from: { gateId: 'and_1', pin: 'out_Q' },
      to: { gateId: '', pin: 'in_A' },
      positions: [
        convertGatePosToWirePos(0, 0, 1),
        convertGatePosToWirePos(.5, 0, 1),
      ],
    },
    {
      id: generateUUID(),
      status: true,
      from: { gateId: 'clock_1', pin: 'out_Q' },
      to: { gateId: 'and_1', pin: 'in_B' },
      positions: [],
    },
    {
      id: generateUUID(),
      status: true,
      from: { gateId: 'clock_2', pin: 'out_Q' },
      to: { gateId: 'and_1', pin: 'in_A' },
      positions: [],
    },
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
      status: false,
      from: { gateId: 'clock_2', pin: 'out_Q' },
      to: { gateId: 'not_1', pin: 'in_A' },
      positions: [
        convertGatePosToWirePos(-1, 0, 2),
        convertGatePosToWirePos(0, 0, 2),
      ],
    },
    {
      id: generateUUID(),
      status: false,
      from: { gateId: 'not_1', pin: 'out_Q' },
      to: { gateId: '', pin: 'in_A' },
      positions: [
        convertGatePosToWirePos(0, 0, 2),
        convertGatePosToWirePos(.5, 0, 2),
      ],
    },
    {
      id: generateUUID(),
      status: false,
      from: { gateId: 'or_1', pin: 'out_Q' },
      to: { gateId: 'or_2', pin: 'in_B' },
      positions: [
        convertGatePosToWirePos(0, 0, 3),
        convertGatePosToWirePos(0.5, 0, 3),
      ],
    }
  ],
  getInput(gateId) { },
  addGate(input) {
    const gate = {
      id: generateUUID(),
      state: {},
      ...input
    }
    switch (input.type) {
      case AND_GATE:
        gate.state = { ...AndGate.defaultState }
        break
      case OR_GATE:
        gate.state = { ...OrGate.defaultState }
        break
      case NOT_GATE:
        gate.state = { ...NotGate.defaultState }
        break
      case NAND_GATE:
        gate.state = { ...NandGate.defaultState }
        break
      case NOR_GATE:
        gate.state = { ...NorGate.defaultState }
        break
      case XOR_GATE:
        gate.state = { ...XorGate.defaultState }
        break
      case CLOCK:
        gate.state = { ...Clock.defaultState }
        break
      case SWITCH:
        gate.state = { ...Switch.defaultState }
        break
    }
    set(state => ({
      GATES: [
        ...state.GATES,
        { ...gate }
      ]
    }))
    console.log(input)
  },
  removeGate(id) {
    set(state => ({
      GATES: state.GATES.filter(gate => gate.id !== id),
      LINES: state.LINES.filter(line => line.to.gateId != id && line.from.gateId != id),
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
  updateGates(objects) {
    set(state => ({
      GATES: state.GATES.map(gate => {
        let nextState = objects.find(j => j.id === gate.id)
        if (nextState == null) return gate
        return { ...gate, ...nextState }
      })
    }))
  },
  updateWires(objects) {
    set(state => ({
      LINES: state.LINES.map(line => {
        let nextState = objects.find(j => j.id === line.id)
        if (nextState == null) return line
        return {
          ...line,
          ...nextState
        }
      })
    }))
  },
  getGateByPosition(position) {
    const foundGate = useObjectsSlice
      .getState()
      .GATES
      .find((gate) => {
        return [0, 2]
          .every(i => Math.round(gate.position[i]) == Math.round(position[i]))
      })
    return foundGate
  }
}))

