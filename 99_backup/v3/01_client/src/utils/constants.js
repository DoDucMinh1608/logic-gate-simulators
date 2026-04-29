import { Vector3 } from "three"

// export const NORMAL_VALUE = 0.0001

export const AND_GATE = 'AND'
export const OR_GATE = 'OR'
export const NOT_GATE = 'NOT'

export const NAND_GATE = 'NAND'
export const NOR_GATE = 'NOR'
export const XOR_GATE = 'XOR'

export const SWITCH = 'SWITCH'
export const CLOCK = 'CLOCK'
export const GATE_TYPES = [
  AND_GATE,
  OR_GATE,
  NOT_GATE,
  NAND_GATE,
  NOR_GATE,
  XOR_GATE,
  CLOCK,
  SWITCH
];


export const TRANSISTOR_SIZE = new Vector3(5, 2.5, 5)