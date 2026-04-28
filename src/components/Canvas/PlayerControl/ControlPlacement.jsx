import { Edges } from "@react-three/drei";
import { useRef } from "react";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { Vector3 } from "three";

function ControlPlacement() {
  const ref = useRef()
  const interactPosition = useUtilitySlice(state => state.interactPosition)

  useThrottledFrame(state => {
    ref.current.position.copy(interactPosition)
  }, 0, 30)

  return (
    <>
      <mesh ref={ref} name="placement_reference">
        <boxGeometry args={[0.16, 0.1, 0.16]} />
        <meshNormalMaterial transparent opacity={0.2} />
        <Edges threshold={15} color="black" lineWidth={1} />
      </mesh>
    </>
  )
}
ControlPlacement.size = new Vector3(0.2, 0.1, 0.2)

export default ControlPlacement