import { useObjectsSlice } from '@/store/objectsSlice'
import { GATE_COLORS, PORT_COLORS } from '@/utils/colors'
import { OUT_Q } from '@/utils/constants'

function Switch({ id, custom, ...props }) {
  const gate = useObjectsSlice(state => state.GATES.find(g => g.id === id))
  const updateGates = useObjectsSlice(state => state.updateGates)

  return (
    <group {...props} dispose={null}
      onClick={e => {
        e.stopPropagation()
        if (e.button == 2) {
          return updateGates([{
            id,
            state: { [OUT_Q]: !gate.state[OUT_Q] }
          }])
        }
      }}>
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
          color={gate.state[OUT_Q] ? 0xff0000 : 0x0000ff}
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

Switch.inputs = []
Switch.outputs = [OUT_Q]
Switch.defaultState = { [OUT_Q]: false }
export default Switch