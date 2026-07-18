import { useObjectsSlice } from '@/store/objectsSlice'
import { GATE_COLORS, PORT_COLORS } from '@/utils/colors'
import { Edges } from "@react-three/drei"
import GateName from './GateName'
import { INVALID_PIN, OUT_Q, OUTPUT_PIN, SWITCH } from '@/utils/constants'

function onClick(id) {
  const addEvent = useObjectsSlice.getState().addEvent
  const time = useObjectsSlice.getState().TIME
  addEvent([{ gateId: id, time: time }])
}

function SwitchGate({ gate_id, name, outputs, ...props }) {
  const isActive = !!outputs?.[OUT_Q]?.status;

  return (
    <group
      {...props}
      dispose={null}
      onClick={e => {
        e.stopPropagation()
        // Chuột phải (button == 2) để tương tác gạt công tắc
        if (e.button === 2) {
          onClick(gate_id)
        }
      }}
    >
      <GateName name={name} />

      {/* 1. ĐẾ CÔNG TẮC (Khối hộp kim loại công nghệ cao) */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[3, 0.8, 3]} />
        <meshStandardMaterial
          color={GATE_COLORS}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.5}
        />
        <Edges threshold={15} color="#343a4a" lineWidth={2} />
      </mesh>

      {/* 2. KHUNG BẢO VỆ CẦN GẠT (Voxel Socket) */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[1.4, 0.2, 2.1]} />
        <meshStandardMaterial
          color="#111318"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      <group position={[0, 0.9, 0]} rotation={[0, 0, isActive ? -1 : 1]}>
        {/* Thân cần gạt kim loại */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.3, 1.2, 1]} />
          <meshStandardMaterial
            color={0x3b4252}
            // emissive={isActive ? "#00ff66" : "#000000"}
            // emissiveIntensity={isActive ? 1.0 : 0}
            roughness={isActive ? 0.1 : 0.5}
          />
        </mesh>

        {/* Núm bọc đầu công tắc - Phát sáng Neon cực đẹp trong Night Mode */}
        {/* <mesh position={[0, 1.05, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.5]} />
          <meshStandardMaterial
            color={isActive ? "#00ff66" : "#3b4252"}
            emissive={isActive ? "#00ff66" : "#000000"}
            emissiveIntensity={isActive ? 3.0 : 0}
            roughness={isActive ? 0.1 : 0.5}
          />
          <Edges threshold={15} color={isActive ? "#a3ffc2" : "#4c566a"} lineWidth={3} />
        </mesh> */}
      </group>

      {/* 4. CHÂN PIN ĐẦU RA (OUT_Q) */}
      <mesh position={[1.5, 0.125, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color={isActive ? "#00ff66" : "#003366"}
          emissive={isActive ? "#00ff66" : "#000011"}
          emissiveIntensity={isActive ? 1.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  )
}

// --- Phần Logic giữ nguyên hoàn toàn theo cấu trúc core cũ của bạn ---
SwitchGate.gate_name = SWITCH
SwitchGate.delay = 1
SwitchGate.size_length = 1
SwitchGate.defaultInputs = []
SwitchGate.defaultOutputs = [OUT_Q]
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