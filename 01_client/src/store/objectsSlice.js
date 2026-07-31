import { create } from "zustand";

export const useObjectsSlice = create((set, get) => ({
  GATES: {
    "AND_1": {
      "id": "AND_1",
      "name": "AND_1",
      "display": true,
      "model_name": "AND",
      "position": [
        -4,
        0,
        -1
      ],
      "rotation": 0,
      "delay": 3,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "SWITCH_3",
          "srcPin": "out_Q",
          "selfGate": "AND_1",
          "selfPin": "in_A",
          "positions": [
            {
              "x": -25.75,
              "y": 0,
              "z": -2.5
            },
            {
              "x": -25.75,
              "y": -0.5771698190307598,
              "z": -2.5
            },
            {
              "x": -19,
              "y": -0.5771698190307598,
              "z": -3
            },
            {
              "x": -19,
              "y": 0,
              "z": -3
            }
          ]
        },
        "in_B": {
          "srcGate": "SWITCH_4",
          "srcPin": "out_Q",
          "selfGate": "AND_1",
          "selfPin": "in_B",
          "positions": [
            {
              "x": -25.75,
              "y": 0,
              "z": 2.5
            },
            {
              "x": -25.75,
              "y": -0.7301540933255117,
              "z": 2.5
            },
            {
              "x": -19,
              "y": -0.7301540933255117,
              "z": -2
            },
            {
              "x": -19,
              "y": 0,
              "z": -2
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "DISPLAY_2",
              "pin": "in_A"
            }
          ],
          "isNeg": false
        }
      }
    },
    "DISPLAY_2": {
      "id": "DISPLAY_2",
      "name": "DISPLAY_2",
      "display": true,
      "model_name": "DISPLAY",
      "position": [
        -2,
        0,
        -1
      ],
      "rotation": 0,
      "delay": 1,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "AND_1",
          "srcPin": "out_Q",
          "selfGate": "DISPLAY_2",
          "selfPin": "in_A",
          "positions": [
            {
              "x": -15.75,
              "y": 0,
              "z": -2.5
            },
            {
              "x": -15.75,
              "y": -0.575,
              "z": -2.5
            },
            {
              "x": -9,
              "y": -0.575,
              "z": -2.5
            },
            {
              "x": -9,
              "y": 0,
              "z": -2.5
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [],
          "isNeg": false
        }
      }
    },
    "SWITCH_3": {
      "id": "SWITCH_3",
      "name": "SWITCH_3",
      "display": true,
      "model_name": "SWITCH",
      "position": [
        -6,
        0,
        -1
      ],
      "rotation": 0,
      "delay": 1,
      "selfCall": false,
      "inputs": {},
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "AND_1",
              "pin": "in_A"
            }
          ],
          "isNeg": false
        }
      }
    },
    "SWITCH_4": {
      "id": "SWITCH_4",
      "name": "SWITCH_4",
      "display": true,
      "model_name": "SWITCH",
      "position": [
        -6,
        0,
        0
      ],
      "rotation": 0,
      "delay": 1,
      "selfCall": false,
      "inputs": {},
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "AND_1",
              "pin": "in_B"
            }
          ],
          "isNeg": false
        }
      }
    }
  },
  EVENTS: [],
  COUNT: 0,
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

      const gate = {
        ...nextGates[gateId],
        outputs: { ...nextGates[gateId].outputs }
      };

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
    // get gate from gate's id
    const gate = gates[gateId]
    if (!gate) return

    const result = {}

    // get input, output from gate
    const { inputs, outputs } = gate
    for (const pin in inputs) {
      // get input pin object
      const inPin = inputs[pin]
      /* 
        EXPLANATION: `inPin.srcGate` holds the ID string of the upstream gate feeding this input pin.
        We grab the entire source gate object from our state map to inspect its real-time outputs.
      */
      const selfGate = gates[inPin.selfGate]
      const srcGate = gates[inPin.srcGate]
      // console.log(selfGate)
      // if the pin isnt setted, set falst as default
      if (srcGate == null) {
        result[pin] = !!inPin.isNeg
        continue
      }

      /* 
        EXPLANATION: `inPin.srcPin` is the specific string identifier of the output port on the upstream gate.
        We read `srcGate.outputs[inPin.srcPin].status` to trace the boolean signal traveling through the wire,
        then factor in potential bubbles/inversions (`isNeg`) on both ends.
      */
      result[pin] = (srcGate.outputs[inPin.srcPin].isNeg && !inPin.isNeg)
        || (!srcGate.outputs[inPin.srcPin].isNeg && inPin.isNeg)
        ? !srcGate.outputs[inPin.srcPin].status
        : srcGate.outputs[inPin.srcPin].status
    }

    for (const pin in outputs) {
      result[pin] = outputs[pin].status
    }
    return result
  },
  setPortStatus(gateId, pin, value) {
    if (gateId == null || pin == null) return

    const getStateByGateId = get().getStateByGateId
    const time = get().TIME
    const gates = { ...get().GATES }
    if (!gates?.[gateId]) return

    const gate = { ...gates[gateId] }

    const events = []
    if (gate.outputs[pin]) {
      gate.outputs[pin] = { ...gate.outputs[pin], isNeg: value }
      for (const destGate of gate.outputs[pin].destGate) {
        events.push({
          gateId: destGate.gateId,
          gateState: getStateByGateId(destGate.gateId),
          time
        })
      }
    } else if (gate.inputs[pin]) {
      gate.inputs[pin] = { ...gate.inputs[pin], isNeg: value }
      events.push({
        gateId,
        gateState: getStateByGateId(gateId),
        time
      })
    }
    set(s => ({ GATES: gates }))
    // set(s => ({ EVENTS: [...events, ...s.EVENTS] }))

    // update state
    if (gate.outputs[pin]) {
      for (const destGate of gate.outputs[pin].destGate) {
        events.push({
          gateId: destGate.gateId,
          gateState: getStateByGateId(destGate.gateId),
          time
        })
      }
    } else if (gate.inputs[pin]) {
      events.push({
        gateId,
        gateState: getStateByGateId(gateId),
        time
      })
    }
    set(s => ({ EVENTS: [...events, ...s.EVENTS] }))
  },
  addGate(input) {
    let { GATES: gates, COUNT: count } = get()
    if (isNaN(count)) count = 0

    const newGate = {
      id: `${input.model.gate_name}_${count + 1}`,
      name: `${input.model.gate_name}_${count + 1}`,
      display: true,
      model_name: input.model.gate_name,
      position: input.position,
      rotation: input.rotation,
      delay: input.model.delay,
      selfCall: !!input.model.selfCall,
      /* 
        EXPLANATION: Initialize input fields. `srcGate` and `srcPin` start as empty strings 
        until a user bridges a connection from an output port.
      */
      inputs: new Array(input.model.defaultInputs.length).fill().reduce((acc, _, index) => {
        const pinName = input.model.defaultInputs[index];
        acc[pinName] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "", isNeg: false };
        return acc;
      }, {}),
      outputs: new Array(input.model.defaultOutputs.length).fill().reduce((acc, _, index) => {
        const pinName = input.model.defaultOutputs[index];
        acc[pinName] = { status: false, destGate: [], isNeg: false };
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
    /* 
      EXPLANATION: Before setting up the new wire, check if the downstream pin already has an existing connection. 
      `curConnect.srcGate` points us to the old parent gate so we can scrub the downstream reference from its outputs.
    */
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
    /* 
      EXPLANATION: This acts as the wire registration layout. 
      We assign `srcGate` and `srcPin` on the destination gate's input configuration, creating the directional link.
    */
    const srcPos = { ...srcGate.position }
    srcPos.x -= 0.5
    const desPos = { ...dstGate.position }
    desPos.x += 0.5
    dstGateI.inputs[dstGate.pin] = {
      srcGate: srcGate.gateId,
      srcPin: srcGate.pin,
      selfGate: dstGate.gateId,
      selfPin: dstGate.pin,
      positions: [
        srcPos,
        { x: srcPos.x, y: -distance, z: srcPos.z },
        { x: desPos.x, y: -distance, z: desPos.z },
        desPos
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
      // Get event need to execute
      if (i.time > time) {
        events.push(i)
        return acc
      }

      // remove duplicate event
      if (!acc[i.gateId]) acc[i.gateId] = i

      // Remove deleted gate event
      if (gates[i.gateId] == null) delete acc[i.gateId]

      // for debug only
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
      /* 
        EXPLANATION: When deleting this gate, we find any component feeding this gate's inputs 
        using `inputPin.srcGate`. We then clean out this gate from the source's target list.
      */
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
        /* 
          EXPLANATION: Because this gate is going away, its outputs drop. 
          Any downstream pins that were listening to it have their `srcGate` and `srcPin` links severed and reset.
        */
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
    /* 
      EXPLANATION: `obj.srcGate` gives us the origin node of the specific line being severed, 
      while `obj.srcPin` tells us exactly which output node it was hooked up to.
    */
    const fromGate = gates[obj.srcGate]
    const toGate = gates[obj.selfGate]

    const event = { gateId: toGate.id, time: get().TIME, gateState: get().getStateByGateId(toGate.id) }

    fromGate.outputs[obj.srcPin].destGate = fromGate.outputs[obj.srcPin].destGate
      .filter(i => !(i.gateId === obj.selfGate && i.pin === obj.selfPin))

    /* 
      EXPLANATION: Completely disconnect the downstream target. 
      `srcGate` and `srcPin` are set back to blank strings since no electricity source feeds this pin now.
    */
    toGate.inputs[obj.selfPin] = {
      srcGate: "", srcPin: "", selfGate: "", selfPin: "", isNeg: toGate.inputs[obj.selfPin].isNeg
    }
    event.gateState[obj.selfPin] = false

    // gates[obj.srcGate]
    set(s => ({
      GATES: gates,
      EVENTS: [event, ...s.EVENTS]
    }))
  },
}))