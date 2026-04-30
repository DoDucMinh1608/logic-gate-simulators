import { useRef } from "react";
import { Vector3 } from "three";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { WIRE } from "@/utils/constants";
import { Edges } from "@react-three/drei";

const { x, y, z } = new Vector3(.5, .5, .5)
function ControlWirePlacement() {
  const ref = useRef()
  const interactPosition = useUtilitySlice(state => state.interactPosition)
  const selectBuildGate = usePlayerSlice(state => state.selectBuildGate)

  useThrottledFrame(state => {
    if (!ref.current || !interactPosition) return
    ref.current.position.copy(interactPosition)
    ref.current.position.setY(y / 2)
  }, 0, 30)

  return (
    <>
      {selectBuildGate === WIRE && interactPosition &&
        <mesh ref={ref} name="wire_placement_reference" >
          <boxGeometry args={[x, y, z]} />
          <meshNormalMaterial transparent opacity={0.2} />
          <Edges threshold={5} color="black" lineWidth={1} />
        </mesh>}
    </>
  )
}

export default ControlWirePlacement