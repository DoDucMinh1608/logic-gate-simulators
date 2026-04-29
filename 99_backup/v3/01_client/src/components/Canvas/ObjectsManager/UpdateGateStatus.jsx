import { useThrottledFrame } from "@/hooks/useThrottledFrame"
import { useObjectsSlice } from "@/store/objectsSlice"

import { AND_GATE, CLOCK, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, XOR_GATE } from "@/utils/constants"
import AndGate from "../Gates/AndGate"
import Clock from "../Gates/Clock"
import NandGate from "../Gates/NandGate"
import NorGate from "../Gates/NorGate"
import NotGate from "../Gates/NotGate"
import OrGate from "../Gates/OrGate"
import XorGate from "../Gates/XorGate"

function UpdateGateStatus() {
  const gates = useObjectsSlice(state => state.GATES)
  const line = useObjectsSlice(state => state.LINES)

  const updateGate = useObjectsSlice(state => state.updateGate)
  const updateGates = useObjectsSlice(state => state.updateGates)

  useThrottledFrame((state, delta) => {
    const nextStates = []
    for (let gate of gates) {
      const wires = Object.fromEntries(line
        .filter(wire => wire.from.gateId === gate.id || wire.to.gateId === gate.id)
        .map(i => [
          i[i.from.gateId === gate.id ? 'from' : 'to'].pin,
          !!i.status
        ]))

      let nextState
      switch (gate.type) {
        case AND_GATE:
          nextState = AndGate.NextState({ ...AndGate.defaultState, ...wires }, gate.state)
          nextStates.push({
            id: gate.id,
            state: nextState,
          })
          break;
        case OR_GATE:
          nextState = OrGate.NextState({ ...OrGate.defaultState, ...wires }, gate.state)
          if (nextState.out_Q !== gate.state.out_Q) {
            nextStates.push({
              id: gate.id,
              state: nextState,
            })
          }
          break;
        case NOT_GATE:
          nextState = NotGate.NextState({ ...NotGate.defaultState, ...wires }, gate.state)
          if (nextState.out_Q !== gate.state.out_Q) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case NAND_GATE:
          nextState = NandGate.NextState({ ...NandGate.defaultState, ...wires }, gate.state)
          if (nextState.out_Q !== gate.state.out_Q) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case NOR_GATE:
          nextState = NorGate.NextState({ ...NorGate.defaultState, ...wires }, gate.state)
          if (nextState.out_Q !== gate.state.out_Q) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case XOR_GATE:
          nextState = XorGate.NextState({ ...XorGate.defaultState, ...wires }, gate.state)
          if (nextState.out_Q !== gate.state.out_Q) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case CLOCK:
          if ((state.clock.elapsedTime - gate.custom.lastUpdate) <= gate.custom.tick) break
          nextState = Clock.NextState({ ...Clock.defaultState, ...wires }, gate.state)
          if (gate.state.out_Q !== nextState.out_Q) {
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
  }, 0, 60)
}

export default UpdateGateStatus