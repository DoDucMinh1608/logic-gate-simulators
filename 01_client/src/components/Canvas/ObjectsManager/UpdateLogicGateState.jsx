import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { useObjectsSlice } from "@/store/objectsSlice";

function UpdateLogicGateState() {
  const gates = useObjectsSlice(s => s.GATES)
  const getEvents = useObjectsSlice(s => s.getEvents)
  const getStateByGateId = useObjectsSlice(s => s.getStateByGateId)
  const updateGateOutputs = useObjectsSlice(s => s.updateGateOutputs)
  const addEvent = useObjectsSlice(s => s.addEvent)

  useThrottledFrame(function (state, delta) {
    const elapsedTime = state.clock.elapsedTime
    const events = getEvents(elapsedTime)

    const needUpdates = []
    const dispatchEvents = []
    for (const event of events) {
      const targetGate = gates[event.gateId]
      if (targetGate == null) continue

      const gateState = getStateByGateId(targetGate.id)
      const nextState = targetGate.nextStep(gateState)

      const needUpdate = { gateId: targetGate.id, pins: [], time: elapsedTime }
      for (let pin in nextState) {
        if (!targetGate.outputs[pin]) continue
        if (nextState[pin] === targetGate.outputs[pin]?.status) continue

        needUpdate.pins.push({ pin, status: nextState[pin] })
        for (const gate of targetGate.outputs[pin].destGate) {
          dispatchEvents.push({ gateId: gate.gateId, time: elapsedTime + 0.1 })
        }
      }
      if (targetGate.selfCall) {
        dispatchEvents.push({
          gateId: targetGate.id,
          time: elapsedTime + targetGate.custom.tick
        })
      }
      if (needUpdate.pins.length > 0) needUpdates.push(needUpdate)
    }
    addEvent(dispatchEvents)
    updateGateOutputs(needUpdates)

  }, 0, 500)
}

export default UpdateLogicGateState