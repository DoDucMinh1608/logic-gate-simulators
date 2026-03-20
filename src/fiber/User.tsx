import type { ReactNode } from "react"

import { PointerLockControls, useKeyboardControls } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'

const speed = 0.05
function User(): ReactNode {
  const { camera } = useThree()
  const [, getKeys] = useKeyboardControls()

  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()
  useFrame((state, delta) => {
    const { forward, backward, left, right, up, down } = getKeys()

    camera.getWorldDirection(frontVector)
    frontVector.y = 0
    frontVector.normalize()

    sideVector.crossVectors(camera.up, frontVector)

    direction
      .set(0, 0, 0)
      .addScaledVector(sideVector, +left - +right)
      .addScaledVector(frontVector, +forward - +backward)
      .normalize()
      .multiplyScalar(speed)

    camera.position.x += direction.x
    camera.position.y += (+up - +down) * speed
    camera.position.z += direction.z

    if (camera.position.y < 1 && down) camera.position.y = 1
  })
  return (
    <PointerLockControls />
  )
}

export default User