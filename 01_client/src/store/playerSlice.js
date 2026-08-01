import { Vector3 } from "three"
import { create } from "zustand"


export const usePlayerSlice = create((set, get) => ({
  custom: {},
  camera: { position: new Vector3(), direction: new Vector3() },
  selectPort: null,
  selectBuildPort: null,
  mouseLock: true,
  setSelectPort(param) {
    if (param == null) {
      return set(state => ({ selectPort: null }))
    }

    const { gateId, pin, position } = param
    set(state => ({ selectPort: { gateId, pin, position: position?.clone() } }))
  },
  setSelectBuildPort(param) {
    if (param == null) {
      return set(state => ({ selectBuildPort: null }))
    }
    const { gateId, pin, position } = param
    set(state => ({ selectBuildPort: { gateId, pin, position: position?.clone() } }))
  },
  setCustom(key, value) {
    set(state => ({
      custom: { ...state.custom, [key]: value }
    }))
  },
  setCameraPosition(position) {
    set(state => ({
      camera: { ...state.camera, position: position.clone() }
    }))
  },
  setCameraDirection(direction) {
    set((state) => ({
      camera: { ...state.camera, direction: direction.clone() }
    }))
  },
  setMouseLock(input) {
    set({ mouseLock: input })
  }
}))