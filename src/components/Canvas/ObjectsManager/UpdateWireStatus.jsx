import { useThrottledFrame } from "@/hooks/useThrottledFrame"



function UpdateWireStatus() {

  useThrottledFrame((state, delta) => {

  }, -1, 60)
}

export default UpdateWireStatus