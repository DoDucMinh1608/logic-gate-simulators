import { Edges } from "@react-three/drei";
import { useRef, type ReactNode } from "react";
import { Mesh, Plane, Vector3 } from "three";

import { useThrottledFrame } from "../../../hooks/useThrottledFrame";
import { getLookingPositionOnPlane, setSnapGridPosition } from "../../../utils/math-utils";
import Transistor from "../ObjectsManager/Transistor";

const activePlane = new Plane(new Vector3(0, 1, 0), 0)
const objectSize = Transistor.size.clone()
function MeshDisplay() {
  return (
    <mesh >
      <boxGeometry args={[objectSize.x, objectSize.y, objectSize.z]} />
      <meshNormalMaterial transparent opacity={0.2} />
      <Edges threshold={15} color="black" lineWidth={1} />
    </mesh >
  )
}

const direction = new Vector3()
const contactPoint = new Vector3()
const gridPosition = new Vector3()

// TODO: this is pretty much the same as the code in SetInteractPosition, should be refactored to avoid code duplication
function ControlPlacement(): ReactNode {
  const ref = useRef<Mesh>(null!)

  useThrottledFrame(state => {
    const camera = state.camera
    camera.getWorldDirection(direction)

    getLookingPositionOnPlane(state, activePlane, contactPoint)
    setSnapGridPosition(contactPoint, objectSize, gridPosition)
    ref.current.position.copy(gridPosition)
  }, 0, 30)
  return (
    <group ref={ref} >
      <MeshDisplay />
    </group>
  )
}

export default ControlPlacement