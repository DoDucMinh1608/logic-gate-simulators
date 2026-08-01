import { useFrame } from "@react-three/fiber";

import { useModelsSlice } from "@/store/modelStore";
import { useObjectsSlice } from "@/store/objectsSlice";
import { useUIStore } from "@/store/uiStore";

function UpdateLogicGateState() {
  const getEvents = useObjectsSlice(s => s.getEvents)
  const updateGateOutputs = useObjectsSlice(s => s.updateGateOutputs)
  const addEvent = useObjectsSlice(s => s.addEvent)
  const updateTime = useObjectsSlice(s => s.updateTime)

  const executeNextStep = useUIStore(s => s.executeNextStep)
  const setExecuteNextStep = useUIStore(s => s.setExecuteNextStep)
  const isDebugMode = useUIStore(state => state.isDebugMode)

  const getModelById = useModelsSlice(s => s.getModelById)

  useFrame(function (state, delta) {
    if (isDebugMode) {
      if (!executeNextStep) return
      setExecuteNextStep(false)
    }

    updateTime()
    const time = useObjectsSlice.getState().TIME
    const gates = { ...useObjectsSlice.getState().GATES }
    const events = getEvents()

    if (events.length === 0) return

    const needUpdates = []
    const dispatchEvents = []
    for (const event of events) {
      const targetGate = gates[event.gateId]
      const model = getModelById(targetGate.model_name)

      if (targetGate == null) continue
      const gateState = event.gateState

      const nextState = model.NextStep(gateState)
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
      // console.log('dispatchEvents: ', dispatchEvents)
    }
  }, 0)
}

export default UpdateLogicGateState