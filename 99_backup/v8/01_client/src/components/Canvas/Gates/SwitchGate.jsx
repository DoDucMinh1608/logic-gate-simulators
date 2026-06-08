import { useObjectsSlice } from '@/store/objectsSlice'
import { GATE_COLORS, PORT_COLORS } from '@/utils/colors'

import GateName from './GateName'
import { INVALID_PIN, OUT_Q, OUTPUT_PIN, SWITCH } from '@/utils/constants'

function onClick(id) {
  const addEvent = useObjectsSlice.getState().addEvent
  const time = useObjectsSlice.getState().TIME
  addEvent([{ gateId: id, time: time }])
}

function SwitchGate({ gate_id, name, state, ...props }) {
  console.log(state)
  return (
    <group {...props} dispose={null}
      onClick={e => {
        e.stopPropagation()
        if (e.button == 2) {
          onClick(gate_id)
        }
      }}>
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
      <mesh position={[0, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[1, 1, 1.2, 10]} />
        <meshStandardMaterial
          color={state?.[OUT_Q].status ? 0xff0000 : 0x0000ff}
          metalness={1}
          roughness={0.4}
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
SwitchGate.gate_name = SWITCH
SwitchGate.delay = 1
SwitchGate.size_length = 1
SwitchGate.defaultInputs = JSON.stringify({})
SwitchGate.defaultOutputs = JSON.stringify({
  [OUT_Q]: { status: false, destGate: [] }
})
SwitchGate.CheckPinType = (pin) => {
  if (pin === OUT_Q) return OUTPUT_PIN
  return INVALID_PIN
}
SwitchGate.NextStep = (wireState = {}) => {
  return { [OUT_Q]: !wireState[OUT_Q] }
}
SwitchGate.GetPinPositions = function (x, y, z) {
  return {
    out_Q: [
      [x * 5 + 4, y, z * 5 + 2.5],
      [x * 5 + 4.75, y, z * 5 + 2.5],
    ]
  }
}
SwitchGate.GetSelectPin = function (contactPoint, gateWorldPos, gatePos) {
  const pinPos = SwitchGate.GetPinPositions(gatePos.x, gatePos.y, gatePos.z)
  return {
    pin: OUT_Q,
    position: pinPos[OUT_Q][1]
  }
}
export default SwitchGate