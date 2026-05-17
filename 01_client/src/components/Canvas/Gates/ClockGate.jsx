import { GATE_COLORS, PORT_COLORS } from "@/utils/colors"
import { CLOCK, INVALID_PIN, OUT_Q, OUTPUT_PIN } from "@/utils/constants"
import GateName from "./GateName"

function ClockGate({ name, ...props }) {
  return (
    <group {...props} dispose={null} >
      <GateName name={name} />
      <mesh position={[0, 0.625, 0]}>
        <boxGeometry args={[3, 1.25, 3]} />
        <meshStandardMaterial
          color={GATE_COLORS}
          metalness={1}
          roughness={0.4}
          envMapIntensity={1.5}
          flatShading={true} />
      </mesh>
      <mesh position={[-.25, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[1, 1, 1, 3]} />
        <meshStandardMaterial
          color={props?.custom?.color}
          metalness={1}
          roughness={0.2}
          envMapIntensity={1.5}
          flatShading={true} />
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
ClockGate.gate_name = CLOCK
ClockGate.delay = 5
ClockGate.size_length = 1
ClockGate.selfCall = true
ClockGate.defaultInputs = JSON.stringify({})
ClockGate.defaultOutputs = JSON.stringify({
  [OUT_Q]: { status: false, destGate: [] }
})
ClockGate.CheckPinType = (pin) => {
  if (pin === OUT_Q) return OUTPUT_PIN
  return INVALID_PIN
}
ClockGate.NextStep = (wireState = {}) => {
  return { [OUT_Q]: !wireState[OUT_Q] }
}
ClockGate.GetPinPositions = function (x, y, z) {
  return {
    [OUT_Q]: [
      [x * 5 + 4, y, z * 5 + 2.5],
      [x * 5 + 4.75, y, z * 5 + 2.5],
    ]
  }
}
ClockGate.GetSelectPin = function (contactPoint, gateWorldPos, gatePos) {
  const pinPos = ClockGate.GetPinPositions(gatePos.x, gatePos.y, gatePos.z)
  return {
    pin: OUT_Q,
    position: pinPos[OUT_Q][1]
  }
}
export default ClockGate