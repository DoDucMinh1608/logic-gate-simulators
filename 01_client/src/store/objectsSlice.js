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
  STATES: {},
  GATES: {
    "019e0be3-7e13-76ab-9925-148469cec45f": {
      "id": "019e0be3-7e13-76ab-9925-148469cec45f",
      "type": "SWITCH",
      "position": [
        0,
        0,
        -2
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {},
      "outputs": {
        "out_Q": {
          "status": true,
          "destGate": [
            {
              "gateId": "019e0be3-b801-77f9-8701-53b0919b2b22",
              "pin": "in_A"
            },
            {
              "gateId": "019e0be3-bd7c-754c-9960-03a2b945a0d4",
              "pin": "in_A"
            }
          ]
        }
      }
    },
    "019e0be3-b801-77f9-8701-53b0919b2b22": {
      "id": "019e0be3-b801-77f9-8701-53b0919b2b22",
      "type": "NOT",
      "position": [
        1,
        0,
        -2
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "019e0be3-7e13-76ab-9925-148469cec45f",
          "srcPin": "out_Q",
          "selfGate": "019e0be3-b801-77f9-8701-53b0919b2b22",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 4.75,
              "y": 0,
              "z": -7.5
            },
            {
              "x": 4.75,
              "y": -0.075,
              "z": -7.5
            },
            {
              "x": 5.5,
              "y": -0.075,
              "z": -7.5
            },
            {
              "x": 5.5,
              "y": 0,
              "z": -7.5
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "019e0be3-bd7c-754c-9960-03a2b945a0d4",
              "pin": "in_B"
            }
          ]
        }
      },
      "delay": 1
    },
    "019e0be3-bd7c-754c-9960-03a2b945a0d4": {
      "id": "019e0be3-bd7c-754c-9960-03a2b945a0d4",
      "type": "AND",
      "position": [
        2,
        0,
        -2
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "019e0be3-7e13-76ab-9925-148469cec45f",
          "srcPin": "out_Q",
          "selfGate": "019e0be3-bd7c-754c-9960-03a2b945a0d4",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 4.75,
              "y": 0,
              "z": -7.5
            },
            {
              "x": 4.75,
              "y": -0.5771698190307598,
              "z": -7.5
            },
            {
              "x": 10.5,
              "y": -0.5771698190307598,
              "z": -8
            },
            {
              "x": 10.5,
              "y": 0,
              "z": -8
            }
          ]
        },
        "in_B": {
          "srcGate": "019e0be3-b801-77f9-8701-53b0919b2b22",
          "srcPin": "out_Q",
          "selfGate": "019e0be3-bd7c-754c-9960-03a2b945a0d4",
          "selfPin": "in_B",
          "positions": [
            {
              "x": 9.75,
              "y": 0,
              "z": -7.5
            },
            {
              "x": 9.75,
              "y": -0.09013878188659973,
              "z": -7.5
            },
            {
              "x": 10.5,
              "y": -0.09013878188659973,
              "z": -7
            },
            {
              "x": 10.5,
              "y": 0,
              "z": -7
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "019e0be4-64f5-7713-95d9-2649fdb9a06f",
              "pin": "in_B"
            },
            {
              "gateId": "019e0be4-6648-747e-af76-29b1188e3997",
              "pin": "in_A"
            }
          ]
        }
      },
      "delay": 2
    },
    "019e0be4-64f5-7713-95d9-2649fdb9a06f": {
      "id": "019e0be4-64f5-7713-95d9-2649fdb9a06f",
      "type": "AND",
      "position": [
        3,
        0,
        -3
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "019e0be4-7d60-76fe-92dd-04264fd3aec3",
          "srcPin": "out_Q",
          "selfGate": "019e0be4-64f5-7713-95d9-2649fdb9a06f",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 14.75,
              "y": 0,
              "z": -12.5
            },
            {
              "x": 14.75,
              "y": -0.09013878188659973,
              "z": -12.5
            },
            {
              "x": 15.5,
              "y": -0.09013878188659973,
              "z": -13
            },
            {
              "x": 15.5,
              "y": 0,
              "z": -13
            }
          ]
        },
        "in_B": {
          "srcGate": "019e0be3-bd7c-754c-9960-03a2b945a0d4",
          "srcPin": "out_Q",
          "selfGate": "019e0be4-64f5-7713-95d9-2649fdb9a06f",
          "selfPin": "in_B",
          "positions": [
            {
              "x": 14.75,
              "y": 0,
              "z": -7.5
            },
            {
              "x": 14.75,
              "y": -0.45620718977236646,
              "z": -7.5
            },
            {
              "x": 15.5,
              "y": -0.45620718977236646,
              "z": -12
            },
            {
              "x": 15.5,
              "y": 0,
              "z": -12
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "019e0be4-a14f-75ad-8216-313d036c3ff1",
              "pin": "in_A"
            }
          ]
        }
      },
      "delay": 2
    },
    "019e0be4-6648-747e-af76-29b1188e3997": {
      "id": "019e0be4-6648-747e-af76-29b1188e3997",
      "type": "AND",
      "position": [
        3,
        0,
        -2
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "019e0be3-bd7c-754c-9960-03a2b945a0d4",
          "srcPin": "out_Q",
          "selfGate": "019e0be4-6648-747e-af76-29b1188e3997",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 14.75,
              "y": 0,
              "z": -7.5
            },
            {
              "x": 14.75,
              "y": -0.09013878188659973,
              "z": -7.5
            },
            {
              "x": 15.5,
              "y": -0.09013878188659973,
              "z": -8
            },
            {
              "x": 15.5,
              "y": 0,
              "z": -8
            }
          ]
        },
        "in_B": {
          "srcGate": "019e0be4-882f-701d-bdc0-63d3aff23077",
          "srcPin": "out_Q",
          "selfGate": "019e0be4-6648-747e-af76-29b1188e3997",
          "selfPin": "in_B",
          "positions": [
            {
              "x": 14.75,
              "y": 0,
              "z": -2.5
            },
            {
              "x": 14.75,
              "y": -0.45620718977236646,
              "z": -2.5
            },
            {
              "x": 15.5,
              "y": -0.45620718977236646,
              "z": -7
            },
            {
              "x": 15.5,
              "y": 0,
              "z": -7
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "019e0be4-a304-7623-acfa-748f3628bd68",
              "pin": "in_B"
            }
          ]
        }
      },
      "delay": 2
    },
    "019e0be4-7d60-76fe-92dd-04264fd3aec3": {
      "id": "019e0be4-7d60-76fe-92dd-04264fd3aec3",
      "type": "SWITCH",
      "position": [
        2,
        0,
        -3
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {},
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "019e0be4-64f5-7713-95d9-2649fdb9a06f",
              "pin": "in_A"
            }
          ]
        }
      }
    },
    "019e0be4-882f-701d-bdc0-63d3aff23077": {
      "id": "019e0be4-882f-701d-bdc0-63d3aff23077",
      "type": "SWITCH",
      "position": [
        2,
        0,
        -1
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {},
      "outputs": {
        "out_Q": {
          "status": true,
          "destGate": [
            {
              "gateId": "019e0be4-6648-747e-af76-29b1188e3997",
              "pin": "in_B"
            }
          ]
        }
      }
    },
    "019e0be4-a14f-75ad-8216-313d036c3ff1": {
      "id": "019e0be4-a14f-75ad-8216-313d036c3ff1",
      "type": "NOR",
      "position": [
        4,
        0,
        -3
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "019e0be4-64f5-7713-95d9-2649fdb9a06f",
          "srcPin": "out_Q",
          "selfGate": "019e0be4-a14f-75ad-8216-313d036c3ff1",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 19.75,
              "y": 0,
              "z": -12.5
            },
            {
              "x": 19.75,
              "y": -0.09013878188659973,
              "z": -12.5
            },
            {
              "x": 20.5,
              "y": -0.09013878188659973,
              "z": -13
            },
            {
              "x": 20.5,
              "y": 0,
              "z": -13
            }
          ]
        },
        "in_B": {
          "srcGate": "019e0be4-a304-7623-acfa-748f3628bd68",
          "srcPin": "out_Q",
          "selfGate": "019e0be4-a14f-75ad-8216-313d036c3ff1",
          "selfPin": "in_B",
          "positions": [
            {
              "x": 24.75,
              "y": 0,
              "z": -7.5
            },
            {
              "x": 24.75,
              "y": -0.6189709201569974,
              "z": -7.5
            },
            {
              "x": 20.5,
              "y": -0.6189709201569974,
              "z": -12
            },
            {
              "x": 20.5,
              "y": 0,
              "z": -12
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": true,
          "destGate": [
            {
              "gateId": "019e0be4-a886-73f8-8515-51ca6876094e",
              "pin": "in_A"
            },
            {
              "gateId": "019e0be4-a304-7623-acfa-748f3628bd68",
              "pin": "in_A"
            }
          ]
        }
      },
      "delay": 3
    },
    "019e0be4-a304-7623-acfa-748f3628bd68": {
      "id": "019e0be4-a304-7623-acfa-748f3628bd68",
      "type": "NOR",
      "position": [
        4,
        0,
        -2
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "019e0be4-a14f-75ad-8216-313d036c3ff1",
          "srcPin": "out_Q",
          "selfGate": "019e0be4-a304-7623-acfa-748f3628bd68",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 24.75,
              "y": 0,
              "z": -12.5
            },
            {
              "x": 24.75,
              "y": -0.6189709201569974,
              "z": -12.5
            },
            {
              "x": 20.5,
              "y": -0.6189709201569974,
              "z": -8
            },
            {
              "x": 20.5,
              "y": 0,
              "z": -8
            }
          ]
        },
        "in_B": {
          "srcGate": "019e0be4-6648-747e-af76-29b1188e3997",
          "srcPin": "out_Q",
          "selfGate": "019e0be4-a304-7623-acfa-748f3628bd68",
          "selfPin": "in_B",
          "positions": [
            {
              "x": 19.75,
              "y": 0,
              "z": -7.5
            },
            {
              "x": 19.75,
              "y": -0.09013878188659973,
              "z": -7.5
            },
            {
              "x": 20.5,
              "y": -0.09013878188659973,
              "z": -7
            },
            {
              "x": 20.5,
              "y": 0,
              "z": -7
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": false,
          "destGate": [
            {
              "gateId": "019e0be4-a9d8-7255-8c36-52703010d581",
              "pin": "in_A"
            },
            {
              "gateId": "019e0be4-a14f-75ad-8216-313d036c3ff1",
              "pin": "in_B"
            }
          ]
        }
      },
      "delay": 3
    },
    "019e0be4-a886-73f8-8515-51ca6876094e": {
      "id": "019e0be4-a886-73f8-8515-51ca6876094e",
      "type": "DISPLAY",
      "position": [
        5,
        0,
        -3
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "019e0be4-a14f-75ad-8216-313d036c3ff1",
          "srcPin": "out_Q",
          "selfGate": "019e0be4-a886-73f8-8515-51ca6876094e",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 24.75,
              "y": 0,
              "z": -12.5
            },
            {
              "x": 24.75,
              "y": -0.075,
              "z": -12.5
            },
            {
              "x": 25.5,
              "y": -0.075,
              "z": -12.5
            },
            {
              "x": 25.5,
              "y": 0,
              "z": -12.5
            }
          ]
        }
      },
      "outputs": {
        "out_Q": {
          "status": true,
          "destGate": []
        }
      },
      "delay": 1
    },
    "019e0be4-a9d8-7255-8c36-52703010d581": {
      "id": "019e0be4-a9d8-7255-8c36-52703010d581",
      "type": "DISPLAY",
      "position": [
        5,
        0,
        -2
      ],
      "rotation": 0,
      "selfCall": false,
      "inputs": {
        "in_A": {
          "srcGate": "019e0be4-a304-7623-acfa-748f3628bd68",
          "srcPin": "out_Q",
          "selfGate": "019e0be4-a9d8-7255-8c36-52703010d581",
          "selfPin": "in_A",
          "positions": [
            {
              "x": 24.75,
              "y": 0,
              "z": -7.5
            },
            {
              "x": 24.75,
              "y": -0.075,
              "z": -7.5
            },
            {
              "x": 25.5,
              "y": -0.075,
              "z": -7.5
            },
            {
              "x": 25.5,
              "y": 0,
              "z": -7.5
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
      "delay": 1
    }
  },
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
        newGate.outputs[OUT_Q] = { status: GATE_FUNCTIONS[input.type]({}), destGate: [] }
        newGate.delay = 2

        if (input.type == NAND_GATE || input.type == NOR_GATE)
          newGate.delay = 3
        if (input.type == XOR_GATE)
          newGate.delay = 4
        break
      case NOT_GATE:
      case DISPLAY:
        newGate.inputs[IN_A] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }
        newGate.outputs[OUT_Q] = { status: GATE_FUNCTIONS[input.type]({}), destGate: [] }
        newGate.delay = 1
        break
      case CLOCK:
      case SWITCH:
        newGate.outputs[OUT_Q] = { status: false, destGate: [] }
        if (newGate.type != CLOCK) break
        newGate.selfCall = true
        newGate.delay = 50
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
      EVENTS: [{ gateId: dstGate.gateId, time }, ...s.EVENTS]
    }))
  },
  addEvent(event_list = []) {
    const getStateByGateId = get().getStateByGateId
    const events = [...get().EVENTS, ...event_list.map(i => ({
      ...i,
      gateState: getStateByGateId(i.gateId)
    }))]
    set(state => ({ EVENTS: events }))
  },
  getEvents(remove = true) {
    const time = get().TIME
    const events = []
    const result = Object.values([...get().EVENTS].reduce((acc, i) => {
      if (i.time > time) {
        events.push(i)
        return acc
      }
      if (!acc[i.gateId]) acc[i.gateId] = i
      if (!remove) events.push(i)
      return acc
    }, {}))

    set(s => ({ EVENTS: events }))
    return result
  },
  removeGate(id = "") {
    const time = get().TIME
    const gates = { ...get().GATES }
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
        events.push({ gateId: destGate.gateId, time })
        gate.inputs[destGate.pin] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }
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
    const time = get().TIME
    const fromGate = gates[obj.srcGate]
    const toGate = gates[obj.selfGate]

    fromGate.outputs[obj.srcPin].destGate = fromGate.outputs[obj.srcPin].destGate
      .filter(i => !(i.gateId === obj.selfGate && i.pin === obj.selfPin))
    toGate.inputs[obj.selfPin] = { srcGate: "", srcPin: "", selfGate: "", selfPin: "" }

    set(s => ({
      GATES: gates,
      EVENTS: [{ gateId: toGate.gateId, time }, ...s.EVENTS]
    }))
  },
}))


