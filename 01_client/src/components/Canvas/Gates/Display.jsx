import { Edges } from "@react-three/drei"

import { PORT_COLORS } from "@/utils/colors"
import { DISPLAY, IN_A, INPUT_PIN, INVALID_PIN, OUT_Q, OUTPUT_PIN } from "@/utils/constants"
import GateName from "./GateName"

function Display({ id, name, state, ...props }) {
  return (
    <group {...props} dispose={null} >
      <GateName name={name} />
      <mesh position={[0, .625, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[3, 1.25, 3]} />
        <meshStandardMaterial
          color={state[OUT_Q]?.status ? 0xffffff : 0x000000}
          metalness={1}
          roughness={0.4}
          transparent
          opacity={.5}
          envMapIntensity={1.5}
          flatShading={true} />
        <Edges threshold={5} color={state[OUT_Q]?.status ? 0xff0000 : 0x0000ff} lineWidth={5} />
      </mesh>
      <mesh position={[-1.5, 0.125, 0]}>
        <boxGeometry args={[.4, .3, .3]} />
        <meshStandardMaterial
          color={PORT_COLORS}
          metalness={1}
          roughness={0.4}
          envMapIntensity={1.5}
          flatShading={true}
        />
      </mesh>
      <mesh position={[1.5, 0.125, 0]}>
        <boxGeometry args={[.4, .3, .3]} />
        <meshStandardMaterial
          color={PORT_COLORS}
          metalness={1}
          roughness={0.4}
          envMapIntensity={1.5}
          flatShading={true} />
      </mesh>
    </group>
  )
}
Display.gate_name = DISPLAY
Display.delay = 1
Display.size_length = 1
Display.defaultInputs = [IN_A]
Display.defaultOutputs = [OUT_Q]
Display.CheckPinType = (pin) => {
  if (pin === IN_A) return INPUT_PIN
  if (pin === OUT_Q) return OUTPUT_PIN
  return INVALID_PIN
}
Display.NextStep = (wireState = {}) => {
  return { [OUT_Q]: wireState[IN_A] ?? false }
}
Display.GetPinPositions = function (x, y, z) {
  return {
    in_A: [
      [x * 5 + 0.5, y, z * 5 + 2.5],
      [x * 5 + 1, y, z * 5 + 2.5],
    ],
    out_Q: [
      [x * 5 + 4, y, z * 5 + 2.5],
      [x * 5 + 4.75, y, z * 5 + 2.5],
    ]
  }
}
Display.GetSelectPin = function (contactPoint, gateWorldPos, gatePos) {
  const pinPos = Display.GetPinPositions(gatePos.x, gatePos.y, gatePos.z)
  if (contactPoint.x > gateWorldPos.x) {
    return {
      pin: OUT_Q,
      position: pinPos[OUT_Q][1]
    }
  } else {
    return {
      pin: IN_A,
      position: pinPos[IN_A][0]
    }
  }
}
export default Display