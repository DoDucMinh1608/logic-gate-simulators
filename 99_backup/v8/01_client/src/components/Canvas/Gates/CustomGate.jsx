import { GATE_COLORS, PORT_COLORS } from "@/utils/colors"

const length = 10

const inputs = 15
const outputs = 7

const outputsPin = []
function CustomGate({ name, state, position = [0, 0, 0], ...props }) {
  const length = Math.ceil(Math.max(inputs, outputs) / 5) * 5
  return (
    <group position={[0 + position[0], 0 + position[1], length / 2 + position[2]]} {...props} dispose={null}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 1.25, length]} />
        <meshStandardMaterial
          color={GATE_COLORS}
          metalness={1}
          roughness={0.4}
          envMapIntensity={1.5}
          flatShading={true} />
      </mesh>
      {new Array(inputs).fill().map((_, i) => (
        <>
          <mesh position={[1.5, 0.125, i * length / inputs + 0.5 - length / 2]}>
            <boxGeometry args={[.4, .3, .3]} />
            <meshStandardMaterial
              color={PORT_COLORS}
              metalness={1}
              roughness={0.4}
              envMapIntensity={1.5}
              flatShading={true} />
          </mesh>
          <mesh position={[.8, 1, i * length / inputs + 0.5 - length / 2]}>
            <boxGeometry args={[.4, .4, .4]} />
            <meshStandardMaterial
              color={state?.[outputsPin[i]]?.status ? 0xff0000 : 0x0000ff}
              metalness={1}
              roughness={0.4}
              envMapIntensity={1.5}
              flatShading={true} />
          </mesh>
        </>
      ))}
      {new Array(outputs).fill().map((_, i) => (
        <mesh position={[-1.5, 0.125, i * length / outputs + 0.5 - length / 2]}>
          <boxGeometry args={[.4, .3, .3]} />
          <meshStandardMaterial
            color={PORT_COLORS}
            metalness={1}
            roughness={0.4}
            envMapIntensity={1.5}
            flatShading={true} />
        </mesh>
      ))}
    </group>
  )
}

export default CustomGate