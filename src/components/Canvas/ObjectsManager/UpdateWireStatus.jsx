import { useThrottledFrame } from "@/hooks/useThrottledFrame"
import { useObjectsSlice } from "@/store/objectsSlice"

function UpdateWireStatus() {
  const gates = useObjectsSlice(state => state.GATES)
  const wires = useObjectsSlice(state => state.LINES)
  const updateWire = useObjectsSlice(state => state.updateWire)

  useThrottledFrame((state, delta) => {
    for (let wire of wires) {
      const fromGate = gates.find(i => i.id === wire.from.gateId)
      if (fromGate == null) continue

      const pin = wire.from.pin
      if (fromGate.state[pin] === wire.status) continue

      updateWire(wire.id, { status: fromGate.state[pin] })
    }
  }, -1, 30)
}

export default UpdateWireStatus