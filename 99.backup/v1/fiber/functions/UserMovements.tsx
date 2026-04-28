import { PointerLockControls, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import type { ReactNode } from "react"
import { Vector3 } from 'three'

import { useStore } from "../../store/useStore"
import { KEY_EVENTS, SPEED_MOVEMENT, UP } from "../../utils/constants"

function UserMovements(): ReactNode {
  const [, getKeys] = useKeyboardControls()

  const camera = useStore(state => state.camera)
  const frontVector = new Vector3(...Object.values(camera?.direction ?? {}))
  frontVector.y = 0
  frontVector.normalize()
  const sideVector = new Vector3()
  sideVector.crossVectors(UP, frontVector)

  const direction = new Vector3()

  useFrame(({ gl, ...state }) => {
    const keys = getKeys()

    direction.set(0, 0, 0)
      .addScaledVector(sideVector, +keys[KEY_EVENTS.KeyA] - +keys[KEY_EVENTS.KeyD])
      .addScaledVector(frontVector, +keys[KEY_EVENTS.KeyW] - +keys[KEY_EVENTS.KeyS])
      .normalize()
      .addScaledVector(UP, +keys[KEY_EVENTS.Space] - +keys[KEY_EVENTS.ShiftLeft])

    const camera = state.camera
    camera.position.addScaledVector(direction, SPEED_MOVEMENT)

    if (camera.position.y < 1) camera.position.y = 1
    gl.render(state.scene, state.camera)
  }, 2)
  return (
    <PointerLockControls />
  )
}

export default UserMovements