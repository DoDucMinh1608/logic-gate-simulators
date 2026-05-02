import { Vector3 } from "three"

export const LEFT_CLICK = 0
export const RIGHT_CLICK = 2

// export const NORMAL_VALUE = 0.0001
export const OUT_Q = 'out_Q'
export const IN_A = 'in_A'
export const IN_B = 'in_B'

export const INPUT_PIN = 'input_pin'
export const OUTPUT_PIN = 'output_pin'
export const INVALID_PIN = 'invalid_pin'

export const WIRE = 'WIRE'
export const AND_GATE = 'AND'
export const OR_GATE = 'OR'
export const NOT_GATE = 'NOT'

export const NAND_GATE = 'NAND'
export const NOR_GATE = 'NOR'
export const XOR_GATE = 'XOR'

export const DISPLAY = "DISPLAY"
export const SWITCH = 'SWITCH'
export const CLOCK = 'CLOCK'

export const GATE_TYPES = [
  WIRE,
  CLOCK,
  SWITCH,
  DISPLAY,
  AND_GATE,
  OR_GATE,
  XOR_GATE,
  NOT_GATE,
  NAND_GATE,
  NOR_GATE,
];

export const DELAY_TIME = 50 // ms

export const TRANSISTOR_SIZE = new Vector3(5, 2.5, 5)

export const DEFAULT_STATE_A = { [IN_A]: false, [IN_B]: false, [OUT_Q]: false }
export const DEFAULT_STATE_B = { [IN_A]: false, [OUT_Q]: false }
export const DEFAULT_STATE_C = { [OUT_Q]: false }
