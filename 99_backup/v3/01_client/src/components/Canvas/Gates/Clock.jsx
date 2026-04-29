import { GATE_COLORS } from "@/utils/colors"

function Clock({ id, tick, custom, ...props }) {
  return (
    <group {...props} dispose={null} >
      <mesh position={[0, 0.625, 0]}>
        <boxGeometry args={[3, 1.25, 3]} />
        <meshStandardMaterial
          color={GATE_COLORS}
          metalness={1}
          roughness={0.4}
          envMapIntensity={1.5}
          flatShading={true}
        />
      </mesh>
      <mesh position={[-.25, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[1, 1, 1, 3]} />
        <meshStandardMaterial
          color={custom?.color}
          metalness={1}
          roughness={0.2}
          envMapIntensity={1.5}
          flatShading={true}
        />
      </mesh>
    </group>
  )
}

const gateState = { out_Q: 0 }
function NextState(wireState, gateState) {
  return { out_Q: !gateState.out_Q }
}

Clock.inputs = []
Clock.outputs = ['out_Q']
Clock.defaultState = { out_Q: 0 }
Clock.NextState = NextState

export default Clock