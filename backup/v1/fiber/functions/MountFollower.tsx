import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Plane, Vector3 } from "three";

import { useStore } from "../../store/useStore";
import { TRANSISTOR_REAL_SIZE, TRANSISTOR_SIZE, UP } from "../../utils/constants";
import type { Vec3Arr } from "../../utils/types";

function MountFollower() {
  const meshRef = useRef<Mesh>(null!)

  const curPlane = useStore((state) => state.plane) as [number, number, number, number]
  const plane = new Plane(UP, curPlane[3])
  const contact = new Vector3()

  useFrame(({ gl, ...state }) => {
    state.raycaster.setFromCamera(state.pointer, state.camera)
    state.raycaster.ray.intersectPlane(plane, contact)

    if (contact) {
      const [, height,] = TRANSISTOR_REAL_SIZE
      const [width, , depth] = TRANSISTOR_SIZE

      contact.x = (Math.floor(contact.x / width) * width) + width / 2
      contact.y = (Math.floor(contact.y / height) * height) + height / 2
      contact.z = (Math.floor(contact.z / depth) * depth) + depth / 2
      meshRef.current.position.copy(contact)
    }
    gl.render(state.scene, state.camera)
  }, 1)
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={TRANSISTOR_REAL_SIZE as Vec3Arr} />
      <meshNormalMaterial transparent opacity={0.2} />
      <Edges threshold={15} color="black" lineWidth={1} />
    </mesh>
  )
}

export default MountFollower