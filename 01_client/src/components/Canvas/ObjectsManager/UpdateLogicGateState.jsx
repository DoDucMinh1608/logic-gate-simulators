
import { useThrottledFrame } from "@/hooks/useThrottledFrame";


function UpdateLogicGateState() {

  useThrottledFrame(function (state, delta) {

  }, 0, 2)
}

export default UpdateLogicGateState