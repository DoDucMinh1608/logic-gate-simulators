import { v7 } from 'uuid';
import { create } from "zustand";

import { AND_GATE, CLOCK, DEFAULT_STATE_A, DEFAULT_STATE_B, DEFAULT_STATE_C, DISPLAY, IN_A, IN_B, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUT_Q, SWITCH, XOR_GATE } from "@/utils/constants";
import { Vector3 } from 'three';

export const useObjectsSlice = create((set, get) => ({
  GATES: {},
  EVENTS: [],
  updateGateOutputs(params) { },
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
  getStateByGateId(gateId) { },
  addGate(input) {
    const gates = { ...get().GATES }
    const newGate = {
      id: v7(),
      type: input.type,
      position: input.position,
      rotation: input.rotation,
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
        srcGate.position,
        new Vector3(srcGate.position.x, -1, srcGate.position.z),
        new Vector3(dstGate.position.x, -1, dstGate.position.z),
        dstGate.position
      ]
    }

    set(s => ({ GATES: gates }))
  },
  addEvent(srcGate, time) {
    const events = [...get().EVENTS, new EventDispatch(srcGate, time)]
      .sort((a, b) => a.time - b.time)
    set(state => ({ EVENTS: events }))
  },
  getEvents(now) {
    return get().EVENTS.filter(a => a.time <= now)
  },
  removeOldEvent(now) {
    const events = [...get().EVENTS].filter(a => a.time > now)
    set(state => ({ EVENTS: events }))
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

    for (const pin in outputs) {
      const outPin = outputs[pin]
      for (const destGate of outPin.destGate) {
        const gate = gates[destGate.gateId]
        gate.inputs[destGate.pin] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }
      }
    }

    delete gates[id]

    set(s => ({ GATES: gates }))
  },
  removeWire(obj) {
    const gates = { ...get().GATES }
    const fromGate = gates[obj.srcGate]
    const toGate = gates[obj.selfGate]

    fromGate.outputs[obj.srcPin].destGate = fromGate.outputs[obj.srcPin].destGate
      .filter(i => !(i.gateId === obj.selfGate && i.pin === obj.selfPin))
    toGate.inputs[obj.selfPin] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }

    set(s => ({ GATES: gates }))
  },
}))


