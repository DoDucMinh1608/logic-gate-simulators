import { Edges } from "@react-three/drei"
import { GATE_COLORS, PORT_COLORS } from "@/utils/colors"
import { DISPLAY, IN_A, INPUT_PIN, INVALID_PIN, OUT_Q, OUTPUT_PIN } from "@/utils/constants"
import GateName from "./GateName"

function Display({ id, name, outputs, ...props }) {
  // Kiểm tra trạng thái On/Off của dòng điện
  const isActive = !!outputs[OUT_Q]?.status;

  return (
    <group {...props} dispose={null}>
      <GateName name={name} />

      {/* 1. KHUNG VỎ BÊN NGOÀI (Chất liệu nhựa nhám, cao cấp) */}
      <mesh position={[0, 0.625, 0]}>
        <boxGeometry args={[3.1, 1.25, 3.1]} />
        <meshStandardMaterial
          color={GATE_COLORS}
          roughness={0.7}
          metalness={0.2}
        />
        {/* Đường viền Neon chạy dọc khung */}
        <Edges
          threshold={15}
          color={isActive ? "#00ffcc" : "#3f475c"}
          lineWidth={3}
        />
      </mesh>

      {/* 2. MÀN HÌNH LED HIỂN THỊ (Nằm lọt lòng bên trong khung vỏ) */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.8, 1.22, 2.8]} />
        <meshStandardMaterial
          // Khi tắt: Màn hình đen sâu. Khi bật: Màn hình phát sáng rực rỡ
          color={isActive ? "#00ffcc" : "#05070a"}
          emissive={isActive ? "#00ffcc" : "#000000"}
          emissiveIntensity={isActive ? 2.5 : 0} // Đẩy cường độ phát sáng mạnh hơn trong Night Mode
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* 3. CỔNG VÀO (IN_A) - Nằm bên trái [-1.5] */}
      <mesh position={[-1.5, 0.125, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          // Cổng tự động đổi màu theo trạng thái dòng điện đi vào
          color={outputs[IN_A]?.status ? "#00ffcc" : "#ff3366"}
          emissive={outputs[IN_A]?.status ? "#00ffcc" : "#550011"}
          emissiveIntensity={outputs[IN_A]?.status ? 1.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* 4. CỔNG RA (OUT_Q) - Nằm bên phải [1.5] */}
      <mesh position={[1.5, 0.125, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          // Trạng thái cổng ra đồng bộ với màn hình
          color={isActive ? "#00ffcc" : "#ff3366"}
          emissive={isActive ? "#00ffcc" : "#550011"}
          emissiveIntensity={isActive ? 1.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

// --- Các hàm tính toán logic và tọa độ giữ nguyên cấu trúc cũ của bạn ---
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