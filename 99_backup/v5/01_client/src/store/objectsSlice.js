import { v7 } from 'uuid';
import { create } from "zustand";

import { AND_GATE, CLOCK, DEFAULT_STATE_A, DEFAULT_STATE_B, DEFAULT_STATE_C, DISPLAY, IN_A, IN_B, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUT_Q, SWITCH, XOR_GATE } from "@/utils/constants";
import { Vector3 } from 'three';

// TODO: update GATES
export const useObjectsSlice = create((set, get) => ({
  GATES: {
    clock: {
      id: v7(),
      type: CLOCK,
      position: [-1, 0, 3],
      rotation: 0,
      inputs: {
        [IN_A]: { gateId: "", pin: "", positions: [], self: "", selfPin: "" },
        [IN_B]: {}
      },
      outputs: {
        [OUT_Q]: {
          status: false,
          gates: []
        }
      },
      custom: { tick: 0.5, lastUpdate: 0 },
    }
  },
  EVENTS: [],
  updateGateOutputs(params) {
    // console.log(params)
    const gates = { ...get().GATES }
    for (const val of params) {

      gates[val.gateId].outputs = {
        ...gates[val.gateId].outputs,
        [val.pin]: {
          ...gates[val.gateId].outputs[val.pin],
          status: val.outputs[val.pin]
        }
      }
    }
    set(s => ({ GATES: gates }))
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
    const gates = get().GATES
    const gate = gates[gateId]

    const result = {}
    for (const input in gate.inputs) {
      const input_gate = gate.inputs[input]
      result[input] = gate[input_gate.gateId].outputs[input_gate.pin]
    }
    for (const pin in gate.outputs) {
      result[pin] = gate.outputs[pin].status
    }
    return result
  },
  addGateConnection(from, to) {
    const gates = get().GATES
    const toGate = gates[to.gateId]
    const fromGate = gates[from.gateId]

    const result = { ...get().GATES }
    result[toGate.id] = {
      ...toGate,
      inputs: {
        ...toGate.inputs,
        [to.pin]: {
          gateId: from.gateId,
          pin: from.pin,
          self: to.gateId,
          selfPin: to.pin,
          positions: [
            from.position,
            new Vector3(from.position.x, -1, from.position.z),
            new Vector3(to.position.x, -1, to.position.z),
            to.position
          ]
        }
      }
    }
    result[fromGate.id] = {
      ...fromGate,
      outputs: {
        ...fromGate.outputs,
        [from.pin]: {
          ...fromGate.outputs[from.pin],
          gates: [
            ...fromGate.outputs[from.pin].gates,
            { gateId: to.gateId, pin: to.pin }
          ]
        }
      }
    }
    set(state => ({ GATES: result }))
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
        gate.outputs = { ...DEFAULT_STATE_A }
        break
      case NOT_GATE:
      case DISPLAY:
        gate.outputs = { ...DEFAULT_STATE_B }
        break
      case CLOCK:
      case SWITCH:
        gate.outputs = { ...DEFAULT_STATE_C }
        gate.outputs[OUT_Q] = {
          status: false,
          gates: []
        }
        if (gate.type != CLOCK) break
        gate.custom = { tick: 0.2, lastUpdate: 0 }
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
    const events = [...get().EVENTS, { gateId: gateId, time: time }]
    events.sort((a, b) => a.time - b.time)
    set(s => ({ EVENTS: events }))
  },
  getEvents(now) {
    const events = get().EVENTS
    return events.filter(e => e.time <= now)
  },
  removeOldEvent(now) {
    set(state => ({
      EVENTS: state.EVENTS.filter(e => e.time > now)
    }))
  },
  removeGate(id) {
    const gates = get().GATES
    const result = {}

    for (const gateId in gates) {
      if (gateId === id) continue

      const gate = gates[gateId]
      result[gateId] = gate

      const inputs = []
      for (const wire in gate.inputs) {
        if (gate.inputs[wire].gateId == id) continue
        inputs.push(gate.inputs[wire])
      }
      result[gateId].inputs = inputs
    }
    set(state => ({ GATES: result }))
  },
  removeWire(obj) {
    const gates = get().GATES
    const gate = gates[obj.self]

    const result = { ...get().GATES }

    delete gate.inputs[obj.selfPin]
    result[obj.self] = {
      ...gate,
      inputs: { ...gate.inputs, }
    }

    set(state => ({ GATES: result }))
  },
}))

