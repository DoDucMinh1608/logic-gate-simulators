import { Edges } from "@react-three/drei";
import { useRef } from "react";

import { useThrottledFrame } from "@/hooks/useThrottledFrame";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { AND_GATE, CLOCK, DISPLAY, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, SWITCH, TRANSISTOR_SIZE, WIRE, XOR_GATE } from "@/utils/constants";

import AndGate from "../Gates/AndGate";
import ClockGate from "../Gates/ClockGate";
import Display from "../Gates/Display";
import NandGate from "../Gates/bk/NandGate";
import NorGate from "../Gates/bk/NorGate";
import NotGate from "../Gates/NotGate";
import OrGate from "../Gates/OrGate";
import SwitchGate from "../Gates/SwitchGate";
import XorGate from "../Gates/XorGate";

const GATE_COMPONENTS = {
  [AND_GATE]: AndGate,
  [OR_GATE]: OrGate,
  [NOT_GATE]: NotGate,
  [NAND_GATE]: NandGate,
  [NOR_GATE]: NorGate,
  [XOR_GATE]: XorGate,
  [CLOCK]: ClockGate,
  [SWITCH]: SwitchGate,
  [DISPLAY]: Display
};

const { x, y, z } = TRANSISTOR_SIZE
function ControlGatePlacement() {
  const ref = useRef()

  const gateInteractPosition = useUtilitySlice(state => state.gateInteractPosition)
  const selectBuildGate = usePlayerSlice(state => state.selectBuildGate)
  const length = GATE_COMPONENTS[selectBuildGate]?.size_length ?? 1

  useThrottledFrame(state => {
    if (!ref.current || !gateInteractPosition) return
    ref.current.position?.copy(gateInteractPosition)
  }, 0, 30)

  return (
    <group ref={ref}>
      {selectBuildGate !== WIRE &&
        <mesh position={[0, 0, z * (length - 1) / 2]} name="placement_reference">
          <boxGeometry args={[x - 1, y, z * length - 1]} />
          <meshNormalMaterial transparent opacity={0.2} depthWrite={false} />
          <Edges threshold={5} color="black" lineWidth={1} />
        </mesh>
      }
    </group>
  )
}
ControlGatePlacement.size = TRANSISTOR_SIZE

export default ControlGatePlacement