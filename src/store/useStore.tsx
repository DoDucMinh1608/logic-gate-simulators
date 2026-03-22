import type { Vector3 } from "three"
import { create } from "zustand"

import { TRANSISTOR_SIZE } from "../utils/constants"
import type { CameraInfo, Vec3, Vec4 } from "../utils/types"

export interface State {
  plane: Vec4
  objectSize: Vec3,
  camera: CameraInfo,
  setCamera: (position: Vector3, direction: Vector3) => void
  setPlane: () => void
}

export const useStore = create<State>((set) => {
  return {
    plane: [0, 1, 0, 0],
    objectSize: Object.values(TRANSISTOR_SIZE) as Vec3,
    cameraPosition: [],
    setCamera: (position: Vector3, direction: Vector3) => set(({
      camera: { direction, position }
    })),
    setPlane: () => set((state) => ({
      plane: state.plane
    }))
  }
})