import { Vector3 } from "three";
import { create } from "zustand";

export const useUtilitySlice = create(set => ({
  interactPosition: new Vector3(),
  setInteractPosition(position) {
    set({ interactPosition: position.clone() })
  },
}))