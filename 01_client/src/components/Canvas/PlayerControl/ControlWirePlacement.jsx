import { Edges } from "@react-three/drei";
import { useRef } from "react";
import { Vector3 } from "three";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { WIRE } from "@/utils/constants";

const { x, y, z } = new Vector3(.5, .5, .5)
function ControlWirePlacement() {
  const ref = useRef()
  const selectPin = useRef()

  const interactPosition = useUtilitySlice(state => state.interactPosition)
  const selectBuildGate = usePlayerSlice(state => state.selectBuildGate)
  const selectBuildPort = usePlayerSlice(state => state.selectBuildPort)

  useThrottledFrame(state => {
    if (ref.current && interactPosition) {
      ref.current.position.copy(interactPosition)
      ref.current.position.setY(y / 2)
    }

    if (selectPin.current && selectBuildPort) {
      selectPin.current.position.copy(selectBuildPort.position)
      selectPin.current.position.setY(y / 2)
    }
  }, 0, 30)

  return selectBuildGate === WIRE && (
    <>
      {interactPosition &&
        <mesh ref={ref}>
          <boxGeometry args={[x, y, z]} />
          <meshNormalMaterial transparent opacity={0.2} />
          <Edges threshold={5} color="black" lineWidth={1} />
        </mesh>}

      {selectBuildPort &&
        <mesh ref={selectPin}>
          <boxGeometry args={[x + .05, y + .05, z + .05]} />
          <meshNormalMaterial transparent opacity={1} />
          <Edges threshold={5} color="black" lineWidth={1} />
        </mesh>}
    </>
  )
}

export default ControlWirePlacement