
import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { useObjectsSlice } from "@/store/objectsSlice";
import { AND_GATE, CLOCK, OUT_Q } from "@/utils/constants";
import ClockGate from "../Gates/ClockGate";
import { useFrame } from "@react-three/fiber";


function UpdateLogicGateState() {
  const gates = useObjectsSlice(s => s.GATES)
  const getEvents = useObjectsSlice(s => s.getEvents)
  const getStateByGateId = useObjectsSlice(s => s.getStateByGateId)
  const updateGateOutputs = useObjectsSlice(s => s.updateGateOutputs)
  const addEvent = useObjectsSlice(s => s.addEvent)
  const removeOldEvent = useObjectsSlice(s => s.removeOldEvent)


  useThrottledFrame(function (state, delta) {
    const elapsedTime = state.clock.elapsedTime
    const events = getEvents(elapsedTime)
    removeOldEvent(elapsedTime)
    // console.log(events, elapsedTime)
    const needUpdate = []
    // console.log(events)

    for (const event of events) {
      const targetGate = gates[event.gateId]
      if (targetGate == null) continue

      const gateState = getStateByGateId(targetGate.id)
      // console.log(gateState)
      switch (targetGate.type) {
        case CLOCK:
          // const nextState = ClockGate.NextState(gateState)

          // if (nextState[OUT_Q] == gateState[OUT_Q]) break

          // needUpdate.push({ gateId: targetGate.id, pin: OUT_Q, outputs: nextState })
          // addEvent(targetGate.id, elapsedTime + targetGate.custom.tick)
          break;
      }
    }
    updateGateOutputs(needUpdate)

  }, 0, 10)
}

export default UpdateLogicGateState