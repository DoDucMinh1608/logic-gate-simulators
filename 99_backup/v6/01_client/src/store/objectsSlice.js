import { v7 } from 'uuid';
import { create } from "zustand";

import { AND_GATE, CLOCK, DISPLAY, IN_A, IN_B, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUT_Q, SWITCH, XOR_GATE } from "@/utils/constants";

export const GATE_FUNCTIONS = {
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
  // GATES: {},
  GATES: {
    "Switch-1": {
      "id": "Switch-1",
      "type": "SWITCH",
      "position": [
        9,
        0,
        -6
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {},
      "outputs": {
        "out_Q": {
          "status": true,
          "destGate": [
            {
              "gateId": "Not-1",
              "pin": "in_A"
            },
            {
              "gateId": "And-1",
              "pin": "in_B"
            }
          ]
        }
      }
    },
    "Not-1": {
      "id": "Not-1",
      "type": "NOT",
      "position": [
        10,
        0,
        -6
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "Switch-1",
          "srcPin": "out_Q",
          "selfGate": "Not-1",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 49.75,
              "y": 0,
              "z": -27.5
            },
            {
              "x": 49.75,
              "y": -0.0375,
              "z": -27.5
            },
            {
              "x": 50.5,
              "y": -0.0375,
              "z": -27.5
            },
            {
              "x": 50.5,
              "y": 0,
              "z": -27.5
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "And-1",
              "pin": "in_A"
            }
          ]
        }
      },
      "delay": 0.05
    },
    "And-1": {
      "id": "And-1",
      "type": "AND",
      "position": [
        11,
        0,
        -6
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "Not-1",
          "srcPin": "out_Q",
          "selfGate": "And-1",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 54.75,
              "y": 0,
              "z": -27.5
            },
            {
              "x": 54.75,
              "y": -0.04506939094329986,
              "z": -27.5
            },
            {
              "x": 55.5,
              "y": -0.04506939094329986,
              "z": -28
            },
            {
              "x": 55.5,
              "y": 0,
              "z": -28
            }
          ]
        },
        "in_B": {
          "srcGate": "Switch-1",
          "srcPin": "out_Q",
          "selfGate": "And-1",
          "selfPin": "in_B",
          "positions": [
            {
              "x": 49.75,
              "y": 0,
              "z": -27.5
            },
            {
              "x": 49.75,
              "y": -0.2885849095153799,
              "z": -27.5
            },
            {
              "x": 55.5,
              "y": -0.2885849095153799,
              "z": -27
            },
            {
              "x": 55.5,
              "y": 0,
              "z": -27
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "And-2",
              "pin": "in_A"
            },
            {
              "gateId": "And-3",
              "pin": "in_B"
            }
          ]
        }
      },
      "delay": 0.1
    },
    "And-3": {
      "id": "And-3",
      "type": "AND",
      "position": [
        12,
        0,
        -7
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "Switch-3",
          "srcPin": "out_Q",
          "selfGate": "And-3",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 59.75,
              "y": 0,
              "z": -32.5
            },
            {
              "x": 59.75,
              "y": -0.04506939094329986,
              "z": -32.5
            },
            {
              "x": 60.5,
              "y": -0.04506939094329986,
              "z": -33
            },
            {
              "x": 60.5,
              "y": 0,
              "z": -33
            }
          ]
        },
        "in_B": {
          "srcGate": "And-1",
          "srcPin": "out_Q",
          "selfGate": "And-3",
          "selfPin": "in_B",
          "positions": [
            {
              "x": 59.75,
              "y": 0,
              "z": -27.5
            },
            {
              "x": 59.75,
              "y": -0.22810359488618323,
              "z": -27.5
            },
            {
              "x": 60.5,
              "y": -0.22810359488618323,
              "z": -32
            },
            {
              "x": 60.5,
              "y": 0,
              "z": -32
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "Display-1",
              "pin": "in_A"
            }
          ]
        }
      },
      "delay": 0.1
    },
    "And-2": {
      "id": "And-2",
      "type": "AND",
      "position": [
        12,
        0,
        -6
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "And-1",
          "srcPin": "out_Q",
          "selfGate": "And-2",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 59.75,
              "y": 0,
              "z": -27.5
            },
            {
              "x": 59.75,
              "y": -0.04506939094329986,
              "z": -27.5
            },
            {
              "x": 60.5,
              "y": -0.04506939094329986,
              "z": -28
            },
            {
              "x": 60.5,
              "y": 0,
              "z": -28
            }
          ]
        },
        "in_B": {
          "srcGate": "Switch-2",
          "srcPin": "out_Q",
          "selfGate": "And-2",
          "selfPin": "in_B",
          "positions": [
            {
              "x": 59.75,
              "y": 0,
              "z": -22.5
            },
            {
              "x": 59.75,
              "y": -0.22810359488618323,
              "z": -22.5
            },
            {
              "x": 60.5,
              "y": -0.22810359488618323,
              "z": -27
            },
            {
              "x": 60.5,
              "y": 0,
              "z": -27
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "Display-2",
              "pin": "in_A"
            }
          ]
        }
      },
      "delay": 0.1
    },
    "Display-1": {
      "id": "Display-1",
      "type": "DISPLAY",
      "position": [
        13,
        0,
        -7
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "And-3",
          "srcPin": "out_Q",
          "selfGate": "Display-1",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 64.75,
              "y": 0,
              "z": -32.5
            },
            {
              "x": 64.75,
              "y": -0.0375,
              "z": -32.5
            },
            {
              "x": 65.5,
              "y": -0.0375,
              "z": -32.5
            },
            {
              "x": 65.5,
              "y": 0,
              "z": -32.5
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": []
        }
      },
      "delay": 0.05
    },
    "Display-2": {
      "id": "Display-2",
      "type": "DISPLAY",
      "position": [
        13,
        0,
        -6
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "And-2",
          "srcPin": "out_Q",
          "selfGate": "Display-2",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 64.75,
              "y": 0,
              "z": -27.5
            },
            {
              "x": 64.75,
              "y": -0.0375,
              "z": -27.5
            },
            {
              "x": 65.5,
              "y": -0.0375,
              "z": -27.5
            },
            {
              "x": 65.5,
              "y": 0,
              "z": -27.5
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": []
        }
      },
      "delay": 0.05
    },
    "Switch-3": {
      "id": "Switch-3",
      "type": "SWITCH",
      "position": [
        11,
        0,
        -7
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {},
      "outputs": {
        "out_Q": {
          "status": true,
          "destGate": [
            {
              "gateId": "And-3",
              "pin": "in_A"
            }
          ]
        }
      }
    },
    "Switch-2": {
      "id": "Switch-2",
      "type": "SWITCH",
      "position": [
        11,
        0,
        -5
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {},
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "And-2",
              "pin": "in_B"
            }
          ]
        }
      }
    }
  },
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
        newGate.outputs[OUT_Q] = { status: false, destGate: [] }
        newGate.delay = 0.1

        if (input.type == NAND_GATE || input.type == NOR_GATE)
          newGate.delay = 0.5
        if (input.type == XOR_GATE)
          newGate.delay = 0.3
        break
      case NOT_GATE:
      case DISPLAY:
        newGate.inputs[IN_A] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }
        newGate.outputs[OUT_Q] = { status: false, destGate: [] }
        newGate.delay = 0.05
        break
      case CLOCK:
      case SWITCH:
        newGate.outputs[OUT_Q] = { status: false, destGate: [] }
        if (newGate.type != CLOCK) break
        newGate.selfCall = true
        newGate.delay = 0.2
        event = { gateId: newGate.id, time: 0 }
        break
    }
    gates[newGate.id] = newGate
    console.log(newGate)
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
      EVENTS: [{ gateId: dstGate.gateId, time: 0 }, ...s.EVENTS]
    }))
  },
  addEvent(event_list = []) {
    const events = [...get().EVENTS, ...event_list].sort((a, b) => a.time - b.time)
    set(state => ({ EVENTS: events }))
  },
  getEvents(now) {
    const events = []
    const result = Object.values([...get().EVENTS].reduce((acc, i) => {
      if (i.time > now) {
        events.push(i)
        return acc
      }
      if (!acc[i.gateId]) acc[i.gateId] = i

      return acc
    }, {}))

    set(s => ({ EVENTS: events }))
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


