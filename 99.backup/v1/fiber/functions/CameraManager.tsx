import { useFrame } from "@react-three/fiber";
import { type ReactNode } from "react";
import { Vector3 } from "three";

import { useStore } from "../../store/useStore";


function CameraManager(): ReactNode {
  // Grab the internal R3F camera

  const setCamera = useStore((state) => state.setCamera)

  const direction = new Vector3()
  const position = new Vector3()

  useFrame(({ gl, ...state }) => {
    state.camera.getWorldDirection(direction)
    state.camera.getWorldPosition(position)

    setCamera({ ...position }, { ...direction })
    gl.render(state.scene, state.camera)
  }, -2)
  return
}

export default CameraManager