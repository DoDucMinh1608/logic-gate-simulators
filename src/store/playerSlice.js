import { Vector3 } from "three"
import { create } from "zustand"

export const usePlayerSlice = create(set => ({
  custom: {},
  camera: { position: new Vector3(), direction: new Vector3() },
  mouseLock: true,
  setCustom(key, value) {
    set(state => ({
      custom: {
        ...state.custom,
        [key]: value
      }
    }))
  },
  setCameraPosition(position) {
    set(state => ({
      camera: {
        ...state.camera,
        position: position.clone()
      }
    })
    )
  },
  setCameraDirection(direction) {
    set((state) => ({
      camera: {
        ...state.camera,
        direction: direction.clone()
      }
    }))
  },
  setMouseLock(input) {
    set({ mouseLock: input })
  }
}))