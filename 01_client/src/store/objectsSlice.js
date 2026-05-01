import { v7 } from 'uuid';
import { create } from "zustand";

import { AND_GATE, CLOCK, DEFAULT_STATE_A, DEFAULT_STATE_B, DEFAULT_STATE_C, DISPLAY, IN_A, IN_B, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUT_Q, SWITCH, XOR_GATE } from "@/utils/constants";

// TODO: update GATES
export const useObjectsSlice = create((set, get) => ({
  GATES: {
    clock: {
      id: v7(),
      type: CLOCK,
      position: [-1, 0, 3],
      rotation: 0,
      inputs: {
        [IN_A]: { gateId: "", pin: "" },
        [IN_B]: {}
      },
      outputs: {
        [OUT_Q]: false
      },
      custom: { tick: 0.5, lastUpdate: 0 },
    }
  },
  EVENTS: [],
  getGateById(gateId) {
    return get().GATES[gateId]
  },
  getGateByPosition(position) {
    const gates = useObjectsSlice.getState().GATES
    for (const gateId in gates) {
      const gate = gates[gateId]
      if (!(gate.position[0] == position[0] && gate.position[2] == position[2])) {
        continue
      }
      return gate
    }
  },
  getStateByGateId(gateId) {
    const gate = get().GATES[gateId]
    const result = {}

    for (let output of gate.state) {
      result.output
    }

  },
  addGate(input) {
    const gate = { id: v7(), inputs: {}, outputs: {}, ...input }
    let event
    switch (input.type) {
      case AND_GATE:
      case OR_GATE:
      case NAND_GATE:
      case NOR_GATE:
      case XOR_GATE:
        gate.state = { ...DEFAULT_STATE_A }
        break
      case NOT_GATE:
      case DISPLAY:
        gate.state = { ...DEFAULT_STATE_B }
        break
      case CLOCK:
      case SWITCH:
        gate.state = { ...DEFAULT_STATE_C }

        if (gate.type != CLOCK) break
        gate.custom = { tick: 1, lastUpdate: 0 }
        event = { gateId: gate.id, time: 0 }
        break
      default:
        break
    }
    set(state => ({
      EVENTS: event ? [event, ...state.EVENTS] : state.EVENTS,
      GATES: { ...state.GATES, [gate.id]: gate }
    }))
  },
  addEvent(gateId, time) {
    set(state => ({
      EVENTS: [...state.EVENTS, { gateId: gateId, time: time }]
        .sort((a, b) => a.time - b.time)
    }))
  },
  dispatchEvent(now) {
    return get().EVENTS.filter(e => e.time <= now)
  },
  removeOldEvent(now) {
    set(state => ({
      EVENTS: state.EVENTS.filter(e => e.time > now)
    }))
  },
  addGateConnection(from, to) {
  },
  updateGates(objects) {
  },
  updateNextState(objects) {
  },
  removeGate(id) {
  },
  removeWire(id) {
  },
}))

