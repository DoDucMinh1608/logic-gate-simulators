import { useThrottledFrame } from "@/hooks/useThrottledFrame"
import { useObjectsSlice } from "@/store/objectsSlice"

import Clock from "../Gates/Clock"
import OrGate from "../Gates/OrGate"
[].includes
function UpdateGateStatus() {
  const gates = useObjectsSlice(state => state.GATES)
  const line = useObjectsSlice(state => state.LINES)

  const updateGate = useObjectsSlice(state => state.updateGate)

  useThrottledFrame((state, delta) => {
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
          if (!nextState.needUpdate) break

          updateGate(gate.id, { state: nextState.state })
          break;
        case 'NOT':
          break;
        case 'NAND':
          break;
        case 'NOR':
          break;
        case 'XOR':
          break;
        case 'CLOCK':
          if ((state.clock.elapsedTime - gate.custom.lastUpdate) <= (1 / gate.custom.tick)) break
          nextState = Clock.NextState(wires, gate.state)
          updateGate(gate.id, {
            custom: { ...gate.custom, lastUpdate: state.clock.elapsedTime },
            state: nextState.needUpdate ? nextState.state : gate.state
          })
          break
      }
    }
  }, -1, 10)
}

export default UpdateGateStatus