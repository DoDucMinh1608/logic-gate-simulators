import { GATE_COLORS, PORT_COLORS } from "@/utils/colors"
import { CLOCK, INVALID_PIN, OUT_Q, OUTPUT_PIN } from "@/utils/constants"
import { Edges } from "@react-three/drei"
import GateName from "./GateName"

function ClockGate({ name, state, ...props }) {
  // Lấy trạng thái On/Off hiện tại của xung nhịp từ state hệ thống
  const isActive = !!state?.[OUT_Q]?.status

  return (
    <group {...props} dispose={null}>
      <GateName name={name} />

      {/* 1. THÂN MÁY PHÁT DAO ĐỘNG (Khối cơ sở cơ khí tối màu) */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[3, 0.8, 3]} />
        <meshStandardMaterial
          color={GATE_COLORS}
          metalness={0.8}
          roughness={0.3}
          envMapIntensity={1.5}
        />
        <Edges threshold={15} color="#2e3440" lineWidth={2} />
      </mesh>

      {/* 2. VÒNG CHẮN BẢO VỆ LÕI (Socket cơ khí) */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 0.1, 4]} /> {/* Khối tháp vuông vát góc */}
        <meshStandardMaterial
          color="#111318"
          metalness={0.6}
          roughness={0.5}
          flatShading={true}
        />
      </mesh>

      {/* 3. LÕI THẠCH ANH PHÁT XUNG (Oscillator Core - Nhấp nháy theo tần số) */}
      {/* Giữ nguyên geometry dạng khối 3 cạnh (args: [rTop, rBottom, height, segments]) độc đáo của bạn */}
      <mesh position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 3]} />
        <meshStandardMaterial
          // Màu sắc nền lấy từ custom hoặc dùng màu vàng Neon công nghệ mặc định
          color={isActive ? "#ffaa00" : "#3b4252"}
          // Hiệu ứng phát sáng nhấp nháy theo nhịp tick của mạch
          emissive={isActive ? "#ffaa00" : "#110500"}
          emissiveIntensity={isActive ? 3.5 : 0.1}
          metalness={0.2}
          roughness={0.1}
          flatShading={true}
        />
        <Edges
          threshold={15}
          color={isActive ? "#ffe0a3" : "#4c566a"}
          lineWidth={3}
        />
      </mesh>

      {/* 4. CHÂN PIN ĐẦU RA (OUT_Q) - Tự động đổi màu đồng bộ với lõi xung */}
      <mesh position={[1.5, 0.125, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color={isActive ? "#ffaa00" : "#ff3366"}
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

// --- Phần Logic định nghĩa giữ nguyên cấu trúc core của bạn để không lỗi mạch ---
ClockGate.gate_name = CLOCK
ClockGate.delay = 5
ClockGate.size_length = 1
ClockGate.selfCall = true
ClockGate.defaultInputs = []
ClockGate.defaultOutputs = [OUT_Q]
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