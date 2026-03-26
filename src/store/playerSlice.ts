import { Vector3 } from "three"
import { create } from "zustand"

export interface PlayerState {
  camera: { position: Vector3, direction: Vector3 } | null,
  mouseLock: boolean,
  custom: Record<string, any>,
  setCustom: (key: string, value: any) => void,
  setCameraPosition: (position: Vector3) => void,
  setCameraDirection: (direction: Vector3) => void,
  setMouseLock: (input: boolean) => void
}

export const usePlayerSlice = create<PlayerState>(set => ({
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
  setCameraPosition(position: Vector3) {
    set(state => ({
      camera: {
        ...state.camera,
        position: position.clone()
      } as PlayerState["camera"]
    })
    )
  },
  setCameraDirection(direction: Vector3) {
    set((state) => ({
      camera: {
        ...state.camera,
        direction: direction.clone()
      } as PlayerState["camera"]
    }))
  },
  setMouseLock(input: boolean) {
    set({ mouseLock: input })
  }
}))