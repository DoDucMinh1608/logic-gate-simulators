import { Edges } from "@react-three/drei";
import { useRef } from "react";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { TRANSISTOR_SIZE, WIRE } from "@/utils/constants";

const { x, y, z } = TRANSISTOR_SIZE
function ControlGatePlacement() {
  const ref = useRef()
  const interactPosition = useUtilitySlice(state => state.interactPosition)
  const selectBuildGate = usePlayerSlice(state => state.selectBuildGate)

  useThrottledFrame(state => {
    if (!ref.current) return
    ref.current.position?.copy(interactPosition)
  }, 0, 30)

  return (
    <>
      {selectBuildGate !== WIRE && <mesh ref={ref} name="placement_reference">
        <boxGeometry args={[x - 1, y, z - 1]} />
        <meshNormalMaterial transparent opacity={0.2} />
        <Edges threshold={5} color="black" lineWidth={1} />
      </mesh>}
    </>
  )
}
ControlGatePlacement.size = TRANSISTOR_SIZE

export default ControlGatePlacement