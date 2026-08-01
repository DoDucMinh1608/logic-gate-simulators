import { Edges } from "@react-three/drei";
import { useMemo, useRef } from "react";

import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { AND_GATE, CLOCK, DISPLAY, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, REVERSE, SWITCH, TRANSISTOR_SIZE, WIRE, XOR_GATE } from "@/utils/constants";

import { useFrame } from "@react-three/fiber";
import AndGate from "../Gates/AndGate";
// import NandGate from "../Gates/bk/NandGate";
// import NorGate from "../Gates/bk/NorGate";
import ClockGate from "../Gates/ClockGate";
import Display from "../Gates/Display";
import NotGate from "../Gates/NotGate";
import OrGate from "../Gates/OrGate";
import SwitchGate from "../Gates/SwitchGate";
import XorGate from "../Gates/XorGate";
import { useUIStore } from "@/store/uiSlice";
import { useModelsSlice } from "@/store/modelStore";

const GATE_COMPONENTS = {
  [AND_GATE]: AndGate,
  [OR_GATE]: OrGate,
  [NOT_GATE]: NotGate,
  // [NAND_GATE]: NandGate,
  // [NOR_GATE]: NorGate,
  [XOR_GATE]: XorGate,
  [CLOCK]: ClockGate,
  [SWITCH]: SwitchGate,
  [DISPLAY]: Display
};

const { x, y, z } = TRANSISTOR_SIZE
function ControlGatePlacement() {
  const ref = useRef()

  const getAllModelNames = useModelsSlice(state => state.getAllModelNames)
  // console.log('getAllModelNames()', getAllModelNames())
  const gateInteractPosition = useUtilitySlice(state => state.gateInteractPosition)
  const selectBuildGate = useUIStore(state => state.selectBuildGate)
  const gateModel = useModelsSlice(state => state.getModelById(selectBuildGate))
  const length = gateModel?.size_length ?? 1

  const models = useMemo(() => {
    const models = getAllModelNames()
    return models
  }, [getAllModelNames])

  useFrame(state => {
    if (!ref.current || !gateInteractPosition) return
    ref.current.position?.copy(gateInteractPosition)
  }, -1)

  return (
    <group ref={ref}>
      {selectBuildGate != WIRE &&
        selectBuildGate != REVERSE &&
        models.includes(selectBuildGate) &&
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