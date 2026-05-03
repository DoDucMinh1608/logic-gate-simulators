import { v7 } from 'uuid';
import { create } from "zustand";

import { AND_GATE, CLOCK, DISPLAY, IN_A, IN_B, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUT_Q, SWITCH, XOR_GATE } from "@/utils/constants";

const GATE_FUNCTIONS = {
  [AND_GATE]: (wireState) => {
    return { [OUT_Q]: wireState[IN_A] && wireState[IN_B] }
  },
  [OR_GATE]: (wireState) => {
    return { [OUT_Q]: wireState[IN_A] || wireState[IN_B] }
  },
  [NOT_GATE]: (wireState) => {
    return { [OUT_Q]: !wireState[IN_A] }
  },
  [NAND_GATE]: (wireState) => {
    return { [OUT_Q]: !(wireState[IN_A] && wireState[IN_B]) }
  },
  [NOR_GATE]: (wireState) => {
    return { [OUT_Q]: !(wireState[IN_A] || wireState[IN_B]) }
  },
  [XOR_GATE]: (wireState) => {
    return { [OUT_Q]: wireState[IN_A] != wireState[IN_B] }
  },
  [CLOCK]: (wireState) => {
    return { [OUT_Q]: !wireState[OUT_Q] }
  },
  [SWITCH]: (wireState) => {
    return { [OUT_Q]: !wireState[OUT_Q] }
  },
  [DISPLAY]: (wireState) => {
    return {
      [IN_A]: wireState[IN_A],
      [OUT_Q]: wireState[IN_A]
    }
  }
}

export const useObjectsSlice = create((set, get) => ({
  GATES: {},
  EVENTS: [],
  updateGateOutputs(params) {
    const gates = { ...get().GATES }

    for (const needUpdate of params) {
      const gate = { ...gates[needUpdate.gateId] }
      for (const updatePin of needUpdate.pins) {
        gate.outputs[updatePin.pin].status = updatePin.status
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

    const { inputs, outputs } = gate
    for (const pin in inputs) {
      const inPin = inputs[pin]
      const srcGate = gates[inPin.srcGate]

      if (srcGate == null) continue
      result[pin] = srcGate.outputs[inPin.srcPin].status
    }

    for (const pin in outputs) {
      result[pin] = outputs[pin].status
    }

    return result
  },
  addGate(input) {
    const gates = { ...get().GATES }
    const newGate = {
      id: v7(),
      type: input.type,
      position: input.position,
      rotation: input.rotation,
      nextStep: GATE_FUNCTIONS[input.type],
      selfCall: false,
      inputs: {},
      outputs: {}
    }

    let event
    switch (input.type) {
      case AND_GATE:
      case OR_GATE:
      case NAND_GATE:
      case NOR_GATE:
      case XOR_GATE:
        newGate.inputs[IN_A] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }
        newGate.inputs[IN_B] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }
        newGate.outputs[OUT_Q] = { status: true, destGate: [] }
        break
      case NOT_GATE:
      case DISPLAY:
        newGate.inputs[IN_A] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }
        newGate.outputs[OUT_Q] = { status: true, destGate: [] }
        break
      case CLOCK:
      case SWITCH:
        newGate.outputs[OUT_Q] = { status: true, destGate: [] }
        if (newGate.type != CLOCK) break
        newGate.selfCall = true
        newGate.custom = { tick: 0.2, lastUpdate: 0 }
        event = { gateId: newGate.id, time: 0 }
        break
    }
    gates[newGate.id] = newGate
    set(s => ({
      GATES: gates,
      EVENTS: event != null ? [event, ...s.EVENTS] : s.EVENTS
    }))
  },
  addGateConnection(srcGate, dstGate) {
    const gates = { ...get().GATES }
    const srcGateI = gates[srcGate.gateId]
    const dstGateI = gates[dstGate.gateId]

    // remove old gate
    const curConnect = dstGateI.inputs[dstGate.pin]
    const oldConnectGate = gates[curConnect.srcGate]
    if (oldConnectGate != null) {
      oldConnectGate.outputs[curConnect.srcPin].destGate = oldConnectGate.outputs[curConnect.srcPin].destGate
        .filter(i => !(i.gateId == curConnect.selfGate && i.pin == curConnect.selfPin))
    }

    // setup inputGate
    srcGateI.outputs[srcGate.pin] = {
      ...srcGateI.outputs[srcGate.pin],
      destGate: [
        ...srcGateI.outputs[srcGate.pin].destGate,
        { gateId: dstGate.gateId, pin: dstGate.pin }
      ]
    }

    // setup outputGate
    dstGateI.inputs[dstGate.pin] = {
      srcGate: srcGate.gateId,
      srcPin: srcGate.pin,
      selfGate: dstGate.gateId,
      selfPin: dstGate.pin,
      positions: [
        { ...srcGate.position },
        { x: srcGate.position.x, y: -1, z: srcGate.position.z },
        { x: dstGate.position.x, y: -1, z: dstGate.position.z },
        { ...dstGate.position }
      ]
    }

    set(s => ({
      GATES: gates,
      EVENTS: [{ gateId: dstGate.gateId, time: 0 }, ...s.EVENTS]
    }))
  },
  addEvent(event_list = []) {
    const events = [...get().EVENTS, ...event_list]
      .sort((a, b) => a.time - b.time)
    set(state => ({ EVENTS: events }))
  },
  getEvents(now) {
    const result = get().EVENTS.filter(a => a.time <= now)
    const newEvents = get().EVENTS.filter(i => i.time > now)

    set(s => ({ EVENTS: newEvents }))
    return result
  },
  removeGate(id = "") {
    const gates = { ...get().GATES }
    const gate = gates[id]
    const { inputs, outputs } = gate

    for (const pin in inputs) {
      const inputPin = inputs[pin]
      const src = gates[inputPin.srcGate]
      if (!src) continue

      src.outputs[inputPin.srcPin].destGate = src.outputs[inputPin.srcPin].destGate
        .filter(i => !(i.gateId == inputPin.selfGate && i.pin == inputPin.selfPin))
    }

    const events = []
    for (const pin in outputs) {
      const outPin = outputs[pin]
      for (const destGate of outPin.destGate) {
        const gate = gates[destGate.gateId]
        events.push({ gateId: destGate.gateId, time: 0 })
        gate.inputs[destGate.pin] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }
      }
    }

    delete gates[id]

    set(s => ({
      GATES: gates,
      EVENTS: [...events, s.EVENTS]
    }))
  },
  removeWire(obj) {
    const gates = { ...get().GATES }
    const fromGate = gates[obj.srcGate]
    const toGate = gates[obj.selfGate]

    fromGate.outputs[obj.srcPin].destGate = fromGate.outputs[obj.srcPin].destGate
      .filter(i => !(i.gateId === obj.selfGate && i.pin === obj.selfPin))
    toGate.inputs[obj.selfPin] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }

    set(s => ({
      GATES: gates,
      EVENTS: [{ gateId: toGate.gateId, time: 0 }, ...s.EVENTS]
    }))
  },
}))


