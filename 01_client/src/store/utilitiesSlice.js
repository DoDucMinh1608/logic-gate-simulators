import { Vector3 } from "three";
import { create } from "zustand";

export const useUtilitySlice = create(set => ({
  interactPosition: new Vector3(),
  gateInteractPosition: new Vector3(),
  wirePosition: new Vector3(),
  setGateInteractPosition(position) {
    set({ gateInteractPosition: position?.clone() })
  },
  setInteractPosition(position) {
    set({ interactPosition: position?.clone() })
  },
  setWirePosition(position) {
    set({ wirePosition: position?.clone() })
  }
}))