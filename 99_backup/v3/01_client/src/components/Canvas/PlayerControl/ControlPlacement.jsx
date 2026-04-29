import { Edges } from "@react-three/drei";
import { useRef } from "react";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { Vector3 } from "three";
import { TRANSISTOR_SIZE } from "@/utils/constants";

const { x, y, z } = TRANSISTOR_SIZE
function ControlPlacement() {
  const ref = useRef()
  const interactPosition = useUtilitySlice(state => state.interactPosition)


  useThrottledFrame(state => {
    ref.current.position.copy(interactPosition)
  }, 0, 30)

  return (
    <>
      <mesh ref={ref} name="placement_reference">
        <boxGeometry args={[x - 1, y, z - 1]} />
        <meshNormalMaterial transparent opacity={0.2} />
        <Edges threshold={5} color="black" lineWidth={1} />
      </mesh>
    </>
  )
}
ControlPlacement.size = TRANSISTOR_SIZE

export default ControlPlacement