import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import { Mesh, Vector3 } from "three";

function DistanceCuller({ distance, children }: { distance: number, children: ReactNode }): ReactNode {
  const ref = useRef<Mesh>(null!)
  const position = new Vector3()
  useFrame((state) => {
    const dis = state.camera.position.distanceTo(ref.current.getWorldPosition(position))
    ref.current.visible = dis < distance
  })
  return (
    <group ref={ref}>
      {children}
    </group>
  )
}

export default DistanceCuller

