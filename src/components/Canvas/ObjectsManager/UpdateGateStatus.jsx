import { useThrottledFrame } from "@/hooks/useThrottledFrame"



function UpdateGateStatus() {

  useThrottledFrame((state, delta) => {

  }, -1, 10)
}

export default UpdateGateStatus