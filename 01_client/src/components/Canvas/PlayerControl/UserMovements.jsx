import { Vector3 } from "three"
import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

import { KEY_EVENTS } from "@/utils/keyboardMap"

const movementKeys = {
  forward: KEY_EVENTS.KeyW,
  backward: KEY_EVENTS.KeyS,
  left: KEY_EVENTS.KeyA,
  right: KEY_EVENTS.KeyD,
  up: KEY_EVENTS.Space,
  down: KEY_EVENTS.ShiftLeft
}

const up = new Vector3(0, 1, 0)
const cameraDirection = new Vector3()
const sideVector = new Vector3()
const direction = new Vector3()
function UserMovements() {
  const [, getKeys] = useKeyboardControls()

  useFrame(state => {
    const keys = getKeys()

    state.camera.getWorldDirection(cameraDirection)
    cameraDirection.y = 0
    cameraDirection.normalize()

    sideVector.crossVectors(up, cameraDirection)

    direction.set(0, 0, 0)
      .addScaledVector(sideVector, +keys[movementKeys.left] - +keys[movementKeys.right])
      .addScaledVector(cameraDirection, +keys[movementKeys.forward] - +keys[movementKeys.backward])
      .normalize()
      .addScaledVector(up, +keys[movementKeys.up] - +keys[movementKeys.down])
    state.camera.position.addScaledVector(direction, 0.025)

    // if (state.camera.position.y < 0.5) state.camera.position.y = 0.5
  })
  return
}

export default UserMovements