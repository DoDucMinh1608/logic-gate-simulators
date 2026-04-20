import { useThrottledFrame } from "@/hooks/useThrottledFrame"
import { useObjectsSlice } from "@/store/objectsSlice"

import Clock from "../Gates/Clock"
import OrGate from "../Gates/OrGate"
import NotGate from "../Gates/NotGate"

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
        case 'AND':
          break;
        case 'OR':
          nextState = OrGate.NextState(wires, gate.state)
          nextStates.push({
            id: gate.id,
            state: nextState,
          })
          break;
        case 'NOT':
          nextState = NotGate.NextState(wires, gate.state)
          if (nextState.out_Q !== gate.state.out_Q) {
            nextStates.push({
              id: gate.id,
              state: nextState
            })
          }
          break;
        case 'NAND':
          break;
        case 'NOR':
          break;
        case 'XOR':
          break;
        case 'CLOCK':
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
  }, -1, 10)
}

export default UpdateGateStatus