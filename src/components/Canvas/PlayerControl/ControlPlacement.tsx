import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import { Mesh, Plane, Vector3 } from "three";

import { usePlayerSlice } from "../../../store/playerSlice";
import { getLookingPositionOnPlane } from "../../../utils/math-utils";

const activePlane = new Plane(new Vector3(0, 1, 0), 0)

function ControlPlacement(): ReactNode {
  const ref = useRef<Mesh>(null!)

  const setCustom = usePlayerSlice(state => state.setCustom)

  const direction = new Vector3()
  const contactPoint = new Vector3()

  useFrame(state => {
    const camera = state.camera
    camera.getWorldDirection(direction)

    getLookingPositionOnPlane(state, activePlane, contactPoint)
    setCustom('contactPoint', contactPoint)
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default ControlPlacement