import type { Vector3 } from "three"
import { create } from "zustand"

import { TRANSISTOR_SIZE } from "../utils/constants"
import type { CameraInfo, Vec3, Vec3Arr, Vec4Arr } from "../utils/types"

export interface State {
  plane: Vec4Arr
  objectSize: Vec3Arr,
  camera: CameraInfo | null,
  setCamera: (position: Vec3, direction: Vec3) => void
  setPlane: () => void
}

export const useStore = create<State>(set => ({
  plane: [0, 1, 0, 0],
  objectSize: Object.values(TRANSISTOR_SIZE) as Vec3Arr,
  camera: null,
  setCamera: (position: Vec3, direction: Vec3) => set(({
    camera: { direction, position }
  })),
  setPlane: () => set((state) => ({
    plane: state.plane
  }))
})
)