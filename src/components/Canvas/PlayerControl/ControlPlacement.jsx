import { Edges } from "@react-three/drei";
import { useRef } from "react";
import { Plane, Vector3 } from "three";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { usePlayerSlice } from "@/store/playerSlice";
import Transistor from "../ObjectsManager/Transistor";

const activePlane = new Plane(new Vector3(0, 1, 0), 0)
const actualSize = Transistor.size.clone()
const objectSize = Transistor.size.clone().addScalar(-0.01) // Subtract a small value to ensure the placement preview fits within the grid cell
function MeshDisplay() {
  return (
    <mesh >
      <boxGeometry args={[objectSize.x, objectSize.y, objectSize.z]} />
      <meshNormalMaterial transparent opacity={0.2} />
      <Edges threshold={15} color="black" lineWidth={1} />
    </mesh >
  )
}

// TODO: this is pretty much the same as the code in SetInteractPosition, should be refactored to avoid code duplication
function ControlPlacement() {
  const ref = useRef()
  const interactPosition = usePlayerSlice(state => state.interactPosition)

  useThrottledFrame(state => {
    ref.current.position.copy(interactPosition)
  }, 0, 30)

  return (
    <>
      <group
        ref={ref}
        name="placement_reference"
        userData={{
          name: "TESTing",
          compoennt: "TEST"
        }}>
        <MeshDisplay />
      </group>
    </>
  )
}

export default ControlPlacement