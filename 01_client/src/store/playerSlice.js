import { Vector3 } from "three"
import { create } from "zustand"

import { AND_GATE } from "@/utils/constants"

export const usePlayerSlice = create((set, get) => ({
  custom: {},
  camera: { position: new Vector3(), direction: new Vector3() },
  selectBuildGate: AND_GATE,
  isNotGate: false,
  isWireMode: false,
  mouseLock: true,
  selectPort: null,
  selectBuildPort: null,
  executeNextStep: false,
  isDebugMode: false,
  setIsWireMode(value) {
    set(s => ({ isWireMode: value }))
  },
  setIsNotGate(value) {
    set(s => ({ isNotGate: value }))
  },
  getIsNotGate() {
    return get().isNotGate
  },
  setDebugMode(mode) {
    set(s => ({ isDebugMode: mode }))
  },
  setExecuteNextStep(value) {
    set(s => ({ executeNextStep: value }))
  },
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