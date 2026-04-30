import { AND_GATE } from "@/utils/constants"
import { Vector3 } from "three"
import { create } from "zustand"

export const usePlayerSlice = create((set, get) => ({
  custom: {},
  camera: { position: new Vector3(), direction: new Vector3() },
  selectBuildGate: AND_GATE,

  mouseLock: true,
  // { gateId: null, pin: null }

  selectedWire: null,
  setConnectWire(gateId, pin) {
    set(state => ({ selectedWire: { gateId, pin } }))
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
    })
    )
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