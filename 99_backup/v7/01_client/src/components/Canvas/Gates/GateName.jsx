import { Billboard, Float, Text } from "@react-three/drei"

function GateName({ name }) {
  return (
    <Billboard position={[0, 2, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          fontSize={0.5}
          color="white"
          outlineWidth={0.05}
          outlineColor="#000000"
          depthWrite={false}>
          {name}
        </Text>
      </Float>
    </Billboard>
  )
}

export default GateName