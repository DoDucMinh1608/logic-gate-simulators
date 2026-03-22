import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Plane, Vector3 } from "three";

import { useStore } from "../store/useStore";
import { TRANSISTOR_SIZE } from "../utils/constants";
import type { Vec3 } from "../utils/types";
import DistanceCuller from "./utils/DistanceCuller";
import { Edges } from "@react-three/drei";

function MountFollower() {
  const meshRef = useRef<Mesh>(null!)

  const curPlane = useStore((state) => state.plane) as [number, number, number, number]
  const plane = new Plane(new Vector3(...curPlane.slice(0, 3)), curPlane[3])
  const contact = new Vector3()

  useFrame(({ gl, ...state }) => {
    state.raycaster.setFromCamera(state.pointer, state.camera)
    state.raycaster.ray.intersectPlane(plane, contact)

    if (contact) {
      const [width, height, depth] = TRANSISTOR_SIZE
      contact.x = (Math.floor(contact.x / width) * width) + width / 2
      contact.y = (Math.floor(contact.y / height) * height) + height / 2
      contact.z = (Math.floor(contact.z / depth) * depth) + depth / 2
      meshRef.current.position.copy(contact)
    }
    gl.render(state.scene, state.camera)
  }, 1)
  return (
    <DistanceCuller distance={10}>
      <mesh ref={meshRef}>
        <boxGeometry args={TRANSISTOR_SIZE as Vec3} />
        <meshNormalMaterial transparent opacity={0.2} />
        <Edges threshold={15} color="black" lineWidth={1} />
      </mesh>
    </DistanceCuller>
  )
}

export default MountFollower