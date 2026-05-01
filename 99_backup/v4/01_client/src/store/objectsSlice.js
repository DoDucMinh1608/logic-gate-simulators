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
import { Vector3 } from "three";


export const useObjectsSlice = create((set, get) => ({
  GATES: [],
  WIRES: [],
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
        gate.custom = { tick: 1, lastUpdate: 0 }
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
  },

  removeGate(id) {
    set(state => ({
      GATES: state.GATES.filter(gate => gate.id !== id),
      WIRES: state.WIRES.filter(line => line.to.gateId != id && line.from.gateId != id),
    }))
  },
  updateGate(id, input) {
    set(state => ({
      GATES: state.GATES.map(i => i.id === id ? { ...i, ...input } : i)
    }))
  },
  updateWire(id, input) {
    set(state => ({
      WIRES: state.WIRES.map(i => i.id === id ? { ...i, ...input } : i)
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
  removeWire(id) {
    set(state => ({
      WIRES: state.WIRES.filter(line => line.id !== id),
    }))
  },
  addGateConnection(from, to) {
    const dup = get().WIRES.filter(wire => {
      return (
        wire.to.gateId === to.gateId
        && wire.to.pin === to.pin
      )
    })

    if (dup.length > 0) return false
    set(state => ({
      WIRES: [
        ...state.WIRES,
        {
          id: generateUUID(),
          status: false,
          from: { gateId: from.gateId, pin: from.pin },
          to: { gateId: to.gateId, pin: to.pin },
          positions: [
            from.position,
            new Vector3(from.position.x, -1, from.position.z),
            new Vector3(to.position.x, -1, to.position.z),
            to.position
          ],
        }
      ]
    }))
    return true
  },
  updateWires(objects) {
    set(state => ({
      WIRES: state.WIRES.map(line => {
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
        return [0, 2].every(i => Math.round(gate.position[i]) == Math.round(position[i]))
      })
    return foundGate
  }
}))

