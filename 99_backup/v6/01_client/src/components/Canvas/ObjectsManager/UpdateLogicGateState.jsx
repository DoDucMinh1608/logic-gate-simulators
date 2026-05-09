import { GATE_FUNCTIONS, useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";
import { useFrame } from "@react-three/fiber";

function UpdateLogicGateState() {
  // const gates = useObjectsSlice(s => s.GATES)
  const getEvents = useObjectsSlice(s => s.getEvents)
  const getStateByGateId = useObjectsSlice(s => s.getStateByGateId)
  const updateGateOutputs = useObjectsSlice(s => s.updateGateOutputs)
  const addEvent = useObjectsSlice(s => s.addEvent)
  const executeNextStep = usePlayerSlice(s => s.executeNextStep)
  const setExecuteNextStep = usePlayerSlice(s => s.setExecuteNextStep)

  useFrame(function (state, delta) {
    // if (!executeNextStep) return
    // setExecuteNextStep(false)
    const gates = { ...useObjectsSlice.getState().GATES }
    const elapsedTime = state.clock.elapsedTime
    const events = getEvents(elapsedTime)

    if (events.length > 0) console.log('______________________________________________')

    const needUpdates = []
    const dispatchEvents = []
    for (const event of events) {
      const targetGate = gates[event.gateId]
      if (targetGate == null) continue

      const gateState = getStateByGateId(targetGate.id)
      const nextState = GATE_FUNCTIONS[targetGate.type](gateState)
      const needUpdate = { gateId: targetGate.id, pins: [], time: elapsedTime }

      for (let pin in nextState) {
        if (!targetGate.outputs[pin]) continue
        if (nextState[pin] === targetGate.outputs[pin]?.status) continue

        needUpdate.pins.push({ pin, status: nextState[pin] })
        for (const gate of targetGate.outputs[pin].destGate) {
          const nextGate = gates[gate.gateId]
          console.log(targetGate.delay)
          dispatchEvents.push({
            gateId: nextGate.id,
            time: event.time + (targetGate.delay ?? 0.1),
            gate: gates[nextGate.id]
          })
        }
      }
      if (targetGate.selfCall) {
        dispatchEvents.push({
          gateId: targetGate.id,
          time: elapsedTime + targetGate.delay,
          gate: gates[targetGate.id]
        })
      }
      if (needUpdate.pins.length > 0) needUpdates.push(needUpdate)

      console.log({ gateState, nextState, needUpdate })
    }
    if (dispatchEvents.length > 0) console.log('dispatchEvents: ', dispatchEvents)
    addEvent(dispatchEvents)
    updateGateOutputs(needUpdates)

  }, 0)
}

export default UpdateLogicGateState