function Clock({ id, tick, custom, ...props }) {
  return (
    <group {...props} dispose={null} >
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[0.12, 0.05, 0.1]} />
        <meshStandardMaterial
          color="#f0f0f0"
          metalness={1}
          roughness={0.4}
          envMapIntensity={1.5}
          flatShading={true}
        />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.03, .04, 0.05, 3]} />
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