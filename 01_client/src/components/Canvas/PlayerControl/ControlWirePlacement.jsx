import { Edges } from "@react-three/drei";
import { useRef } from "react";

import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useUIStore } from "@/store/uiSlice";
import { WIRE } from "@/utils/constants";

const [x, y, z] = [.5, .5, .5]
function ControlWirePlacement() {
  const ref = useRef()
  const selectPin = useRef()

  const interactPosition = useUtilitySlice(state => state.interactPosition)
  const selectBuildGate = useUIStore(state => state.selectBuildGate)
  const selectBuildPort = usePlayerSlice(state => state.selectBuildPort)

  useFrame(state => {
    if (ref.current && interactPosition) {
      ref.current.position.copy(interactPosition)
      ref.current.position.setY(y / 2)
    }

    if (selectPin.current && selectBuildPort) {
      selectPin.current.position.copy?.(selectBuildPort.position)
      selectPin.current.position.setY(y / 2)
    }
  }, 0)

  return (
    <>
      {/* {interactPosition &&
        <mesh ref={ref}>
          <boxGeometry args={[x, y, z]} />
          <meshNormalMaterial transparent opacity={0.2} />
          <Edges threshold={5} color="black" lineWidth={1} />
        </mesh>} */}

      {selectBuildGate == WIRE && selectBuildPort &&
        <mesh ref={selectPin}>
          <boxGeometry args={[x + .05, y + .05, z + .05]} />
          <meshNormalMaterial transparent opacity={1} />
          <Edges threshold={5} color="black" lineWidth={1} />
        </mesh>}
    </>
  )
}

export default ControlWirePlacement