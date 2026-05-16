import { create } from "zustand";

import { AND_GATE, CLOCK, DISPLAY, IN_A, IN_B, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUT_Q, SWITCH, XOR_GATE } from "@/utils/constants";

// export const GATE_FUNCTIONS = {
//   [AND_GATE]: (wireState = {}) => {
//     return { [OUT_Q]: wireState[IN_A] && wireState[IN_B] }
//   },
//   [OR_GATE]: (wireState = {}) => {
//     return { [OUT_Q]: wireState[IN_A] || wireState[IN_B] }
//   },
//   [NOT_GATE]: (wireState = {}) => {
//     return { [OUT_Q]: !wireState[IN_A] }
//   },
//   [NAND_GATE]: (wireState = {}) => {
//     return { [OUT_Q]: !(wireState[IN_A] && wireState[IN_B]) }
//   },
//   [NOR_GATE]: (wireState = {}) => {
//     return { [OUT_Q]: !(wireState[IN_A] || wireState[IN_B]) }
//   },
//   [XOR_GATE]: (wireState = {}) => {
//     return { [OUT_Q]: wireState[IN_A] != wireState[IN_B] }
//   },
//   [CLOCK]: (wireState = {}) => {
//     return { [OUT_Q]: !wireState[OUT_Q] }
//   },
//   [SWITCH]: (wireState = {}) => {
//     return { [OUT_Q]: !wireState[OUT_Q] }
//   },
//   [DISPLAY]: (wireState = {}) => {
//     return {
//       [OUT_Q]: wireState[IN_A] ?? false
//     }
//   }
// }

const testGATES = {
  // "SWITCH_4": { "id": "SWITCH_4", "name": "SWITCH_4", "type": "SWITCH", "position": [-2, 0, 0], "rotation": 0, "selfCall": false, "inputs": {}, "outputs": { "out_Q": { "status": false, "destGate": [{ "gateId": "AND_10", "pin": "in_B" }] } }, "delay": 0 }, "SWITCH_5": { "id": "SWITCH_5", "name": "SWITCH_5", "type": "SWITCH", "position": [-2, 0, 1], "rotation": 0, "selfCall": false, "inputs": {}, "outputs": { "out_Q": { "status": false, "destGate": [{ "gateId": "NOT_7", "pin": "in_A" }, { "gateId": "AND_8", "pin": "in_A" }] } }, "delay": 0 }, "SWITCH_6": { "id": "SWITCH_6", "name": "SWITCH_6", "type": "SWITCH", "position": [-2, 0, 2], "rotation": 0, "selfCall": false, "inputs": {}, "outputs": { "out_Q": { "status": false, "destGate": [{ "gateId": "AND_9", "pin": "in_A" }] } }, "delay": 0 }, "NOT_7": { "id": "NOT_7", "name": "NOT_7", "type": "NOT", "position": [-1, 0, 1], "rotation": 0, "selfCall": false, "inputs": { "in_A": { "srcGate": "SWITCH_5", "srcPin": "out_Q", "selfGate": "NOT_7", "selfPin": "in_A", "positions": [{ "x": -5.25, "y": 0, "z": 7.5 }, { "x": -5.25, "y": -0.075, "z": 7.5 }, { "x": -4.5, "y": -0.075, "z": 7.5 }, { "x": -4.5, "y": 0, "z": 7.5 }] } }, "outputs": { "out_Q": { "status": true, "destGate": [{ "gateId": "AND_8", "pin": "in_B" }] } }, "delay": 1 }, "AND_8": { "id": "AND_8", "name": "AND_8", "type": "AND", "position": [0, 0, 1], "rotation": 0, "selfCall": false, "inputs": { "in_A": { "srcGate": "SWITCH_5", "srcPin": "out_Q", "selfGate": "AND_8", "selfPin": "in_A", "positions": [{ "x": -5.25, "y": 0, "z": 7.5 }, { "x": -5.25, "y": -0.5771698190307598, "z": 7.5 }, { "x": 0.5, "y": -0.5771698190307598, "z": 7 }, { "x": 0.5, "y": 0, "z": 7 }] }, "in_B": { "srcGate": "NOT_7", "srcPin": "out_Q", "selfGate": "AND_8", "selfPin": "in_B", "positions": [{ "x": -0.25, "y": 0, "z": 7.5 }, { "x": -0.25, "y": -0.09013878188659973, "z": 7.5 }, { "x": 0.5, "y": -0.09013878188659973, "z": 8 }, { "x": 0.5, "y": 0, "z": 8 }] } }, "outputs": { "out_Q": { "status": false, "destGate": [{ "gateId": "AND_9", "pin": "in_B" }, { "gateId": "AND_10", "pin": "in_A" }] } }, "delay": 3 }, "AND_9": { "id": "AND_9", "name": "AND_9", "type": "AND", "position": [1, 0, 0], "rotation": 0, "selfCall": false, "inputs": { "in_A": { "srcGate": "SWITCH_6", "srcPin": "out_Q", "selfGate": "AND_9", "selfPin": "in_A", "positions": [{ "x": -5.25, "y": 0, "z": 12.5 }, { "x": -5.25, "y": -1.502705892714872, "z": 12.5 }, { "x": 5.5, "y": -1.502705892714872, "z": 2 }, { "x": 5.5, "y": 0, "z": 2 }] }, "in_B": { "srcGate": "AND_8", "srcPin": "out_Q", "selfGate": "AND_9", "selfPin": "in_B", "positions": [{ "x": 4.75, "y": 0, "z": 7.5 }, { "x": 4.75, "y": -0.45620718977236646, "z": 7.5 }, { "x": 5.5, "y": -0.45620718977236646, "z": 3 }, { "x": 5.5, "y": 0, "z": 3 }] } }, "outputs": { "out_Q": { "status": false, "destGate": [{ "gateId": "NOR_11", "pin": "in_A" }] } }, "delay": 3 }, "AND_10": { "id": "AND_10", "name": "AND_10", "type": "AND", "position": [1, 0, 1], "rotation": 0, "selfCall": false, "inputs": { "in_A": { "srcGate": "AND_8", "srcPin": "out_Q", "selfGate": "AND_10", "selfPin": "in_A", "positions": [{ "x": 4.75, "y": 0, "z": 7.5 }, { "x": 4.75, "y": -0.09013878188659973, "z": 7.5 }, { "x": 5.5, "y": -0.09013878188659973, "z": 7 }, { "x": 5.5, "y": 0, "z": 7 }] }, "in_B": { "srcGate": "SWITCH_4", "srcPin": "out_Q", "selfGate": "AND_10", "selfPin": "in_B", "positions": [{ "x": -5.25, "y": 0, "z": 2.5 }, { "x": -5.25, "y": -1.2075284675733322, "z": 2.5 }, { "x": 5.5, "y": -1.2075284675733322, "z": 8 }, { "x": 5.5, "y": 0, "z": 8 }] } }, "outputs": { "out_Q": { "status": false, "destGate": [{ "gateId": "NOR_12", "pin": "in_B" }] } }, "delay": 3 }, "NOR_11": { "id": "NOR_11", "name": "NOR_11", "type": "NOR", "position": [2, 0, 0], "rotation": 0, "selfCall": false, "inputs": { "in_A": { "srcGate": "AND_9", "srcPin": "out_Q", "selfGate": "NOR_11", "selfPin": "in_A", "positions": [{ "x": 9.75, "y": 0, "z": 2.5 }, { "x": 9.75, "y": -0.09013878188659973, "z": 2.5 }, { "x": 10.5, "y": -0.09013878188659973, "z": 2 }, { "x": 10.5, "y": 0, "z": 2 }] }, "in_B": { "srcGate": "NOR_12", "srcPin": "out_Q", "selfGate": "NOR_11", "selfPin": "in_B", "positions": [{ "x": 14.75, "y": 0, "z": 7.5 }, { "x": 14.75, "y": -0.6189709201569974, "z": 7.5 }, { "x": 10.5, "y": -0.6189709201569974, "z": 3 }, { "x": 10.5, "y": 0, "z": 3 }] } }, "outputs": { "out_Q": { "status": false, "destGate": [{ "gateId": "DISPLAY_13", "pin": "in_A" }, { "gateId": "NOR_12", "pin": "in_A" }] } }, "delay": 2 }, "NOR_12": { "id": "NOR_12", "name": "NOR_12", "type": "NOR", "position": [2, 0, 1], "rotation": 0, "selfCall": false, "inputs": { "in_A": { "srcGate": "NOR_11", "srcPin": "out_Q", "selfGate": "NOR_12", "selfPin": "in_A", "positions": [{ "x": 14.75, "y": 0, "z": 2.5 }, { "x": 14.75, "y": -0.6189709201569974, "z": 2.5 }, { "x": 10.5, "y": -0.6189709201569974, "z": 7 }, { "x": 10.5, "y": 0, "z": 7 }] }, "in_B": { "srcGate": "AND_10", "srcPin": "out_Q", "selfGate": "NOR_12", "selfPin": "in_B", "positions": [{ "x": 9.75, "y": 0, "z": 7.5 }, { "x": 9.75, "y": -0.09013878188659973, "z": 7.5 }, { "x": 10.5, "y": -0.09013878188659973, "z": 8 }, { "x": 10.5, "y": 0, "z": 8 }] } }, "outputs": { "out_Q": { "status": true, "destGate": [{ "gateId": "DISPLAY_14", "pin": "in_A" }, { "gateId": "NOR_11", "pin": "in_B" }] } }, "delay": 2 }, "DISPLAY_13": { "id": "DISPLAY_13", "name": "DISPLAY_13", "type": "DISPLAY", "position": [3, 0, 0], "rotation": 0, "selfCall": false, "inputs": { "in_A": { "srcGate": "NOR_11", "srcPin": "out_Q", "selfGate": "DISPLAY_13", "selfPin": "in_A", "positions": [{ "x": 14.75, "y": 0, "z": 2.5 }, { "x": 14.75, "y": -0.075, "z": 2.5 }, { "x": 15.5, "y": -0.075, "z": 2.5 }, { "x": 15.5, "y": 0, "z": 2.5 }] } }, "outputs": { "out_Q": { "status": false, "destGate": [] } }, "delay": 1 }, "DISPLAY_14": { "id": "DISPLAY_14", "name": "DISPLAY_14", "type": "DISPLAY", "position": [3, 0, 1], "rotation": 0, "selfCall": false, "inputs": { "in_A": { "srcGate": "NOR_12", "srcPin": "out_Q", "selfGate": "DISPLAY_14", "selfPin": "in_A", "positions": [{ "x": 14.75, "y": 0, "z": 7.5 }, { "x": 14.75, "y": -0.075, "z": 7.5 }, { "x": 15.5, "y": -0.075, "z": 7.5 }, { "x": 15.5, "y": 0, "z": 7.5 }] } }, "outputs": { "out_Q": { "status": true, "destGate": [] } }, "delay": 1 }
}

export const useObjectsSlice = create((set, get) => ({
  GATES: testGATES,
  COUNT: -1,
  STATES: {},
  EVENTS: [],
  TIME: 0,
  updateTime() {
    set(state => ({ TIME: state.TIME + 1 }))
  },
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

      if (srcGate == null) {
        result[pin] = false
        continue
      }
      result[pin] = srcGate.outputs[inPin.srcPin].status
    }

    for (const pin in outputs) {
      result[pin] = outputs[pin].status
    }
    return result
  },
  addGate(input) {
    const gates = { ...get().GATES }
    let count = get().COUNT

    if (count === -1) {
      for (const gateId in gates) {
        const gate = gates[gateId]
        const index = +gate.name.split('_')[1]
        if (count < index) count = index
      }
      if (count === -1) count = 0
    }

    const newGate = {
      id: `${input.model.gate_name}_${count + 1}`,
      name: `${input.model.gate_name}_${count + 1}`,
      type: `${input.model.gate_name}`,
      model: input.model,
      position: input.position,
      rotation: input.rotation,
      nextStep: input.model.NextStep,
      delay: input.model.delay,
      selfCall: !!input.model.selfCall,
      inputs: JSON.parse(input.model.defaultInputs),
      outputs: JSON.parse(input.model.defaultOutputs)
    }
    let event

    if (input.model.selfCall) event = {
      gateId: newGate.id,
      time: get().TIME, gateState: input.model.NextStep({})
    }

    gates[newGate.id] = newGate
    set(s => ({
      COUNT: count + 1,
      GATES: gates,
      EVENTS: event != null ? [event, ...s.EVENTS] : s.EVENTS,
    }))
  },
  addGateConnection(srcGate, dstGate) {
    const time = get().TIME
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
    const distance = srcGate.position.distanceTo(dstGate.position) / 10
    // setup outputGate
    dstGateI.inputs[dstGate.pin] = {
      srcGate: srcGate.gateId,
      srcPin: srcGate.pin,
      selfGate: dstGate.gateId,
      selfPin: dstGate.pin,
      positions: [
        { ...srcGate.position },
        { x: srcGate.position.x, y: -distance, z: srcGate.position.z },
        { x: dstGate.position.x, y: -distance, z: dstGate.position.z },
        { ...dstGate.position }
      ]
    }

    set(s => ({
      GATES: gates,
      EVENTS: [
        { gateId: dstGate.gateId, time, gateState: get().getStateByGateId(dstGate.gateId) },
        ...s.EVENTS]
    }))
  },
  addEvent(event_list = []) {
    const time = get().TIME
    const getStateByGateId = get().getStateByGateId
    const events = [...get().EVENTS, ...event_list.map(i => ({
      ...i,
      time: i.time ?? time,
      gateState: getStateByGateId(i.gateId)
    }))]
    set(s => ({ EVENTS: events }))
  },
  getEvents(remove = true) {
    const gates = get().GATES
    const time = get().TIME
    const events = []
    const result = Object.values([...get().EVENTS].reduce((acc, i) => {
      if (i.time > time) {
        events.push(i)
        return acc
      }
      if (!acc[i.gateId]) acc[i.gateId] = i
      if (gates[i.gateId] == null) delete acc[i.gateId]
      if (!remove) events.push(i)
      return acc
    }, {}))

    set(s => ({ EVENTS: events }))
    return result
  },
  removeGate(id = "") {
    const time = get().TIME
    const gates = { ...get().GATES }
    const getStateByGateId = get().getStateByGateId

    const gate = gates[id]
    const { inputs, outputs } = gate

    for (const pin in inputs) {
      const inputPin = inputs[pin]
      const src = gates[inputPin.srcGate]
      if (!src) continue

      src.outputs[inputPin.srcPin].destGate = src.outputs[inputPin.srcPin].destGate
        .filter(i => i.gateId != inputPin.selfGate)
    }

    const events = []
    for (const pin in outputs) {
      const outPin = outputs[pin]

      for (const destGate of outPin.destGate) {
        const gate = gates[destGate.gateId]
        gate.inputs[destGate.pin] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }


        const state = getStateByGateId(gate.id)
        state[destGate.pin] = false
        events.push({ gateId: destGate.gateId, time, gateState: state })
      }
    }

    delete gates[id]
    set(s => ({
      GATES: gates,
      EVENTS: [...events, ...s.EVENTS]
    }))
  },
  removeWire(obj) {
    const gates = { ...get().GATES }
    const fromGate = gates[obj.srcGate]
    const toGate = gates[obj.selfGate]

    const event = { gateId: toGate.id, time: get().TIME, gateState: get().getStateByGateId(toGate.id) }

    fromGate.outputs[obj.srcPin].destGate = fromGate.outputs[obj.srcPin].destGate
      .filter(i => !(i.gateId === obj.selfGate && i.pin === obj.selfPin))
    toGate.inputs[obj.selfPin] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }
    event.gateState[obj.selfPin] = false

    set(s => ({
      GATES: gates,
      EVENTS: [event, ...s.EVENTS]
    }))
  },
}))


