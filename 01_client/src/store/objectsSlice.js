import { create } from "zustand";

export const useObjectsSlice = create((set, get) => ({
  GATES: {},
  COUNT: 0,
  STATES: {},
  EVENTS: [],
  TIME: 0,
  updateTime() {
    set(state => ({ TIME: state.TIME + 1 }))
  },
  updateGateOutputs(params) {
    const { GATES } = get();
    // Deep clone/rebuild only target gates to avoid React reference drops
    const nextGates = { ...GATES };

    for (let i = 0; i < params.length; i++) {
      const { gateId, pins } = params[i];
      if (!nextGates[gateId]) continue;

      const gate = { ...nextGates[gateId], outputs: { ...nextGates[gateId].outputs } };

      for (let j = 0; j < pins.length; j++) {
        const updatePin = pins[j];
        if (gate.outputs[updatePin.pin]) {
          gate.outputs[updatePin.pin] = {
            ...gate.outputs[updatePin.pin],
            status: updatePin.status
          };
        }
      }
      nextGates[gateId] = gate;
    }

    set({ GATES: nextGates });
  },
  getGateByPosition(position) {
    const gates = useObjectsSlice.getState().GATES
    for (const gateId in gates) {
      const gate = gates[gateId]
      if (!(gate.position[0] == position[0] && gate.position[2] == position[2])) {
        continue
      }

      if (gate.display) return gates[gate.id]
      return gates[gate.name]
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
    let { GATES: gates, COUNT: count } = get()

    if (isNaN(count)) count = 0
    console.log(input)

    const newGate = {
      id: `${input.model.gate_name}_${count + 1}`,
      name: `${input.model.gate_name}_${count + 1}`,
      display: true,
      // model: input.model,
      model_name: input.model.gate_name,
      position: input.position,
      rotation: input.rotation,
      nextStep: input.model.NextStep,
      delay: input.model.delay,
      selfCall: !!input.model.selfCall,
      inputs: new Array(input.model.defaultInputs.length).fill().reduce((acc, _, index) => {
        const pinName = input.model.defaultInputs[index];
        acc[pinName] = {
          srcGate: "",
          srcPin: "",
          selfGate: "",
          selfPin: "",
          isNeg: false
        };
        return acc;
      }, {}),
      outputs: new Array(input.model.defaultOutputs.length).fill().reduce((acc, _, index) => {
        const pinName = input.model.defaultOutputs[index];
        acc[pinName] = {
          status: false,
          destGate: [],
          isNeg: false
        };
        return acc;
      }, {})
    }

    let event
    if (input.model.selfCall) event = {
      gateId: newGate.id,
      time: get().TIME, gateState: input.model.NextStep({})
    }

    gates[newGate.id] = newGate

    const length = input.model.size_length
    for (let i = 1; i < length; ++i) {
      let id = `${newGate.id}_${i}`
      const [x, y, z] = input.position
      gates[id] = {
        id,
        name: newGate.id,
        display: false,
        position: [x, y, z + i]
      }
    }

    set(s => ({
      COUNT: count + 1,
      GATES: { ...gates },
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
      oldConnectGate.outputs[curConnect.srcPin].destGate =
        oldConnectGate.outputs[curConnect.srcPin].destGate
          .filter(i => !(
            i.gateId == curConnect.selfGate &&
            i.pin == curConnect.selfPin
          ))
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
        {
          gateId: dstGate.gateId,
          time,
          gateState: get().getStateByGateId(dstGate.gateId)
        },
        ...s.EVENTS
      ]
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

    let _id = id
    let gate = gates[_id]
    if (gate.display == false) {
      _id = gate.name
      gate = gates[_id]
    }

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

    for (let i = 1; gates[`${_id}_${i}`] != null; ++i) {
      delete gates[`${_id}_${i}`]
    }
    delete gates[_id]

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


