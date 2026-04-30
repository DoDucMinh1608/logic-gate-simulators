import { useThrottledFrame } from "@/hooks/useThrottledFrame"
import { useObjectsSlice } from "@/store/objectsSlice"

import { AND_GATE, CLOCK, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUT_Q, XOR_GATE } from "@/utils/constants"
import AndGate from "../Gates/AndGate"
import Clock from "../Gates/Clock"
import NandGate from "../Gates/NandGate"
import NorGate from "../Gates/NorGate"
import NotGate from "../Gates/NotGate"
import OrGate from "../Gates/OrGate"
import XorGate from "../Gates/XorGate"

function UpdateGateStatus() {
  const gates = useObjectsSlice(state => state.GATES)
  const wires = useObjectsSlice(state => state.WIRES)

  const updateGate = useObjectsSlice(state => state.updateGate)
  const updateGates = useObjectsSlice(state => state.updateGates)

  useThrottledFrame((state, delta) => {
    const nextStates = []
    for (let gate of gates) {
      const gate_wires = Object.fromEntries(
        wires
          .filter(wire => wire.from.gateId === gate.id || wire.to.gateId === gate.id)
          .map(i => [
            i[i.from.gateId === gate.id ? 'from' : 'to'].pin,
            !!i.status
          ]))

      let nextState
      switch (gate.type) {
        case AND_GATE:
          nextState = AndGate.NextState({ ...AndGate.defaultState, ...gate_wires }, gate.state)
          nextStates.push({
            id: gate.id,
            state: nextState,
          })
          break;
        case OR_GATE:
          nextState = OrGate.NextState({ ...OrGate.defaultState, ...gate_wires }, gate.state)
          if (nextState[OUT_Q] !== gate.state[OUT_Q]) {
            nextStates.push({
              id: gate.id,
              state: nextState,
            })
          }
          break;
        case NOT_GATE:
          nextState = NotGate.NextState({ ...NotGate.defaultState, ...gate_wires }, gate.state)
          if (nextState[OUT_Q] !== gate.state[OUT_Q]) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case NAND_GATE:
          nextState = NandGate.NextState({ ...NandGate.defaultState, ...gate_wires }, gate.state)
          if (nextState[OUT_Q] !== gate.state[OUT_Q]) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case NOR_GATE:
          nextState = NorGate.NextState({ ...NorGate.defaultState, ...gate_wires }, gate.state)
          if (nextState[OUT_Q] !== gate.state[OUT_Q]) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case XOR_GATE:
          nextState = XorGate.NextState({ ...XorGate.defaultState, ...gate_wires }, gate.state)
          if (nextState[OUT_Q] !== gate.state[OUT_Q]) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case CLOCK:
          if ((state.clock.elapsedTime - gate.custom.lastUpdate) <= 1) break
          // if ((state.clock.elapsedTime - gate.custom.lastUpdate) <= gate.custom.tick) break
          nextState = Clock.NextState({ ...Clock.defaultState, ...gate_wires }, gate.state)
          if (gate.state[OUT_Q] !== nextState[OUT_Q]) {
            nextStates.push({
              id: gate.id,
              state: nextState,
              custom: {
                ...gate.custom,
                lastUpdate: state.clock.elapsedTime
              }
            })
          }
          break
      }
    }
    updateGates(nextStates)
  }, 0, 120)
}

export default UpdateGateStatus