
import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { useObjectsSlice } from "@/store/objectsSlice";
import { AND_GATE, CLOCK, DELAY_TIME, DISPLAY, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUT_Q, XOR_GATE } from "@/utils/constants";

import ClockGate from "../Gates/ClockGate";

function UpdateLogicGateState() {
  const dispatchEvent = useObjectsSlice(state => state.dispatchEvent)
  const getGateById = useObjectsSlice(state => state.getGateById)
  const getStateByGateId = useObjectsSlice(state => state.getStateByGateId)
  const addEvent = useObjectsSlice(state => state.addEvent)
  const updateGates = useObjectsSlice(state => state.updateGates)

  const wires = useObjectsSlice(state => state.WIRES)

  useThrottledFrame(function (state, delta) {

  }, 0, 2)
}

export default UpdateLogicGateState