import { PointerLockControls, useKeyboardControls } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import type { ReactNode } from "react"
import { Vector3 } from 'three'

import { KEY_EVENTS, OY, SPEED_MOVEMENT } from "../../utils/constants"
import { useStore } from "../../store/useStore"

export const KEYBOARD_MAPPING = [
  { name: 'forward', keys: ['KeyW'] },
  { name: 'backward', keys: ['KeyS'] },
  { name: 'left', keys: ['KeyA'] },
  { name: 'right', keys: ['KeyD'] },
  { name: "up", keys: ['Space'] },
  { name: "down", keys: ['ShiftLeft'] },
]


function UserMovements(): ReactNode {
  const [, getKeys] = useKeyboardControls()

  const camera = useStore(state => state.camera)
  const frontVector = new Vector3(...Object.values(camera?.direction ?? {}))
  frontVector.y = 0
  frontVector.normalize()
  const sideVector = new Vector3()
  sideVector.crossVectors(OY, frontVector)

  const direction = new Vector3()

  useFrame(({ gl, ...state }) => {
    const keys = getKeys()

    direction.set(0, 0, 0)
      .addScaledVector(sideVector, +keys[KEY_EVENTS.KeyA] - +keys[KEY_EVENTS.KeyD])
      .addScaledVector(frontVector, +keys[KEY_EVENTS.KeyW] - +keys[KEY_EVENTS.KeyS])
      .normalize()
      .addScaledVector(OY, +keys[KEY_EVENTS.Space] - +keys[KEY_EVENTS.ShiftLeft])

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