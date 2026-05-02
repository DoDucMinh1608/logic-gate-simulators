import { Vector3 } from "three"
import { create } from "zustand"

import { AND_GATE } from "@/utils/constants"

export const usePlayerSlice = create((set, get) => ({
  custom: {},
  camera: { position: new Vector3(), direction: new Vector3() },
  selectBuildGate: AND_GATE,
  mouseLock: true,
  selectPort: null,
  selectBuildPort: null,
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
  setSelectBuildGate(gate) {
    set(state => ({ selectBuildGate: gate }))
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