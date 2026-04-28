import { useThrottledFrame } from "@/hooks/useThrottledFrame"
import { useObjectsSlice } from "@/store/objectsSlice"

function UpdateWireStatus() {
  const gates = useObjectsSlice(state => state.GATES)
  const wires = useObjectsSlice(state => state.LINES)
  const updateWires = useObjectsSlice(state => state.updateWires)

  useThrottledFrame((state, delta) => {
    const needUpdates = []
    for (let wire of wires) {
      const fromGate = gates.find(i => i.id === wire.from.gateId)
      if (fromGate == null) continue

      const pin = wire.from.pin
      if (fromGate.state[pin] === wire.status) continue

      needUpdates.push({
        id: wire.id,
        status: fromGate.state[pin]
      })
    }
    updateWires(needUpdates)
  }, -1, 60)
}

export default UpdateWireStatus