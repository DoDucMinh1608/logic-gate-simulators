import { GATE_COLORS } from "@/utils/colors"

const height = .5
const radius = .25

function NotIndicator({ position, ...props }) {
  return (
    <mesh {...props} position={position} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[radius, radius, height, 64]} />
      <meshStandardMaterial
        color={GATE_COLORS}
        metalness={1}
        roughness={0.4}
        envMapIntensity={1.5}
        flatShading={true}
      />
    </mesh>
  )
}

export default NotIndicator