import { useFrame } from "@react-three/fiber";

import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";

function UpdateLogicGateState() {
  const getEvents = useObjectsSlice(s => s.getEvents)
  const updateGateOutputs = useObjectsSlice(s => s.updateGateOutputs)
  const addEvent = useObjectsSlice(s => s.addEvent)
  const updateTime = useObjectsSlice(s => s.updateTime)

  const executeNextStep = usePlayerSlice(s => s.executeNextStep)
  const setExecuteNextStep = usePlayerSlice(s => s.setExecuteNextStep)
  const isDebugMode = usePlayerSlice(state => state.isDebugMode)

  useFrame(function (state, delta) {
    // useThrottledFrame(function (state, delta) {
    if (isDebugMode) {
      if (!executeNextStep) return
      setExecuteNextStep(false)
    }

    updateTime()
    const time = useObjectsSlice.getState().TIME
    const gates = { ...useObjectsSlice.getState().GATES }
    const events = getEvents()

    if (events.length === 0) return

    console.log('______________________________________________')
    // console.log(events)
    const needUpdates = []
    const dispatchEvents = []
    for (const event of events) {
      const targetGate = gates[event.gateId]
      if (targetGate == null) continue

      const gateState = event.gateState
      const nextState = targetGate.nextStep(gateState)
      const needUpdate = { gateId: targetGate.id, pins: [] }

      for (let pin in nextState) {
        if (!targetGate.outputs[pin]) continue
        if (nextState[pin] == gateState?.[pin]) continue

        needUpdate.pins.push({ pin, status: nextState[pin] })
        for (const gate of targetGate.outputs[pin].destGate) {
          const nextGate = gates[gate.gateId]
          dispatchEvents.push({
            gateId: nextGate.id,
            time: time + targetGate.delay,
            gate: `${targetGate.name}-${nextGate.name}`
          })
        }
      }
      if (targetGate.selfCall) {
        dispatchEvents.push({
          gateId: targetGate.id,
          time: time + targetGate.delay,
          gate: gates[targetGate.id].name
        })
      }
      if (needUpdate.pins.length > 0) needUpdates.push(needUpdate)
      // console.log({ event, gateState, nextState })
    }

    if (needUpdates.length > 0) {
      // console.log('needUpdates: ', needUpdates)
      updateGateOutputs(needUpdates)
    }
    if (dispatchEvents.length > 0) {
      addEvent(dispatchEvents)
      console.log('dispatchEvents: ', dispatchEvents)
    }
  }, 0)
}

export default UpdateLogicGateState