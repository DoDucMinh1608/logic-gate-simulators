import { create } from "zustand"

import { TRANSISTOR_SIZE } from "../utils/constants"
import type { CameraInfo, Vec3, Vec3Arr, Vec4Arr } from "../utils/types"

export interface WorldState {
  plane: Vec4Arr
  objectSize: Vec3Arr,
  camera: CameraInfo | null,
  mouseLock: boolean,

  setMouseLock: (input: boolean) => void
  setCamera: (position: Vec3, direction: Vec3) => void
  setPlane: () => void
}

export const useStore = create<WorldState>(set => ({
  plane: [0, 1, 0, 0],
  objectSize: Object.values(TRANSISTOR_SIZE) as Vec3Arr,
  camera: null,
  mouseLock: true,
  setMouseLock(input) {
    set({ mouseLock: input })
  },
  setCamera: (position: Vec3, direction: Vec3) => set(({
    camera: { direction, position }
  })),
  setPlane: () => set((state) => ({
    plane: state.plane
  }))
}))