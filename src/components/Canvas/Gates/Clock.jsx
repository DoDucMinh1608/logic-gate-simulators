function Clock({ id, tick, custom, ...props }) {
  return (
    <group {...props} dispose={null} >
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[0.12, 0.05, 0.1]} />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.04]} />
        <meshStandardMaterial color={custom?.color} />
      </mesh>
    </group>
  )
}

const gateState = { out_Q: 0 }
function NextState(wireState, gateState) {
  return { state: { out_Q: !gateState.out_Q }, needUpdate: true }
}
Clock.inputs = []
Clock.outputs = ['out_Q']
Clock.NextState = NextState

export default Clock