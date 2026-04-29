import type { ReactNode } from 'react'
import type { Vector3 } from 'three'
import { create } from 'zustand'

export interface LogicGate {
  id: string,
  name: string,
  position: Vector3,
  rotation: Vector3,
  type: ReactNode
  ticksCalculate: number,
  next: LogicGate[],
  previous: LogicGate[] | null,
}

export interface ObjectState {
  paths: LogicGate[],
  add: (input: LogicGate) => void

}

export const useObjectStore = create<ObjectState>(set => ({
  paths: [],
  add: (input: LogicGate) => set(state => ({
    paths: [...state.paths, input]
  }))
}))