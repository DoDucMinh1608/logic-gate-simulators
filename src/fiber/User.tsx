import { PointerLockControls, useKeyboardControls } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import type { ReactNode } from "react"
import { Vector3 } from 'three'

import { SPEED_MOVEMENT } from "../utils/constants"

function User(): ReactNode {
  const { camera } = useThree()
  const [, getKeys] = useKeyboardControls()

  const direction = new Vector3()
  const frontVector = new Vector3()
  const sideVector = new Vector3()
  useFrame(({ gl, ...state }) => {
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
      .multiplyScalar(SPEED_MOVEMENT)

    camera.position.x += direction.x
    camera.position.y += (+up - +down) * SPEED_MOVEMENT
    camera.position.z += direction.z

    if (camera.position.y < 1 && down) camera.position.y = 1
    gl.render(state.scene, state.camera)
  }, -1)
  return (
    <PointerLockControls />
  )
}

export default User