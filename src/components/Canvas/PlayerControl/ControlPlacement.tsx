import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import { Mesh, Plane, Vector3 } from "three";

import { getLookingPositionOnPlane, setSnapGridPosition } from "../../../utils/math-utils";

const activePlane = new Plane(new Vector3(0, 1, 0), 0)
const objectSize = new Vector3(0.1, 0.1, 0.1)
function MeshDisplay() {
  return (
    <mesh>
      <boxGeometry args={[objectSize.x, objectSize.y, objectSize.z]} />
      <meshNormalMaterial transparent opacity={0.2} />
      <Edges threshold={15} color="black" lineWidth={1} />
    </mesh>
  )
}
function ControlPlacement(): ReactNode {
  const ref = useRef<Mesh>(null!)

  const direction = new Vector3()
  const contactPoint = new Vector3()
  const gridPosition = new Vector3()

  useFrame(state => {
    const camera = state.camera
    camera.getWorldDirection(direction)

    getLookingPositionOnPlane(state, activePlane, contactPoint)
    setSnapGridPosition(contactPoint, objectSize, gridPosition)
    ref.current.position.copy(gridPosition)
  })
  return (
    <group ref={ref}>
      <MeshDisplay />
    </group>
  )
}

export default ControlPlacement