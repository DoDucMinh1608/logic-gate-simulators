import { useThrottledFrame } from "@/hooks/useThrottledFrame"
import { useObjectsSlice } from "@/store/objectsSlice"

import Clock from "../Gates/Clock"
import OrGate from "../Gates/OrGate"
import NotGate from "../Gates/NotGate"
import AndGate from "../Gates/AndGate"
import NandGate from "../Gates/NandGate"
import NorGate from "../Gates/NorGate"
import XorGate from "../Gates/XorGate"
import { AND_GATE, CLOCK, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, XOR_GATE } from "@/utils/constants"

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
        .map(i => [i[i.from.gateId === gate.id ? 'from' : 'to'].pin, !!i.status]))
      let nextState
      switch (gate.type) {
        case AND_GATE:
          nextState = AndGate.NextState(wires, gate.state)
          nextStates.push({
            id: gate.id,
            state: nextState,
          })
          break;
        case OR_GATE:
          nextState = OrGate.NextState(wires, gate.state)
          nextStates.push({
            id: gate.id,
            state: nextState,
          })
          break;
        case NOT_GATE:
          nextState = NotGate.NextState(wires, gate.state)
          if (nextState.out_Q !== gate.state.out_Q) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case NAND_GATE:
          nextState = NandGate.NextState(wires, gate.state)
          if (nextState.out_Q !== gate.state.out_Q) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case NOR_GATE:
          nextState = NorGate.NextState(wires, gate.state)
          if (nextState.out_Q !== gate.state.out_Q) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case XOR_GATE:
          nextState = XorGate.NextState(wires, gate.state)
          if (nextState.out_Q !== gate.state.out_Q) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case CLOCK:
          if ((state.clock.elapsedTime - gate.custom.lastUpdate) <= gate.custom.tick) break
          nextState = Clock.NextState(wires, gate.state)
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
  }, -1, 60)
}

export default UpdateGateStatus