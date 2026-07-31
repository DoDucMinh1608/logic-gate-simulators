import { AND_GATE } from "@/utils/constants";
import { create } from "zustand";

export const useUIStore = create((set, get) => ({
    executeNextStep: false,
    isDebugMode: false,
    selectBuildGate: AND_GATE,
    setIsWireMode(value) {
        set(s => ({ isWireMode: value }))
    },
    setIsNotGate(value) {
        set(s => ({ isNotGate: value }))
    },
    setDebugMode(mode) {
        set(s => ({ isDebugMode: mode }))
    },
    setExecuteNextStep(value) {
        set(s => ({ executeNextStep: value }))
    },
    setSelectBuildGate(gate) {
        set(state => ({ selectBuildGate: gate }))
    },
}))