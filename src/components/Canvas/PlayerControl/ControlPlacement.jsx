import { Edges } from "@react-three/drei";
import { useRef } from "react";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import Transistor from "../ObjectsManager/Transistor";

const objectSize = Transistor.gridSize.clone()
function ControlPlacement() {
  // const ref = useRef()
  // const interactPosition = useUtilitySlice(state => state.interactPosition)

  // useThrottledFrame(state => {
  //   ref.current.position.copy(interactPosition)
  // }, 0, 30)

  return (
    <>
      {/* <mesh ref={ref} name="placement_reference">
        <boxGeometry args={[objectSize.x, objectSize.y, objectSize.z]} />
        <meshNormalMaterial transparent opacity={0.2} />
        <Edges threshold={15} color="black" lineWidth={1} />
      </mesh> */}
    </>
  )
}

export default ControlPlacement