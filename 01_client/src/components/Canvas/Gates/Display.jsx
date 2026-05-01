import { useObjectsSlice } from "@/store/objectsSlice"
import { PORT_COLORS } from "@/utils/colors"
import { IN_A, OUT_Q } from "@/utils/constants"
import { Edges } from "@react-three/drei"

function Display({ id, ...props }) {
  const gate = useObjectsSlice(state => state.GATES.find(g => g.id === id))

  return (
    <group {...props} dispose={null} >
      <mesh position={[0, .625, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[3, 1.25, 3]} />
        <meshStandardMaterial
          color={gate?.state[IN_A] ? 0xffffff : 0x000000}
          metalness={1}
          roughness={0.4}
          transparent
          opacity={.5}
          envMapIntensity={1.5}
          flatShading={true} />
        <Edges threshold={5} color={gate?.state[IN_A] ? 0x000000 : 0xffffff} lineWidth={5} />
      </mesh>
      <mesh position={[-1.5, 0.125, 0]}>
        <boxGeometry args={[.4, .3, .3]} />
        <meshStandardMaterial
          color={PORT_COLORS}
          metalness={1}
          roughness={0.4}
          envMapIntensity={1.5}
          flatShading={true}
        />
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

const gateState = { [IN_A]: 0, [OUT_Q]: 0 }
const wireState = { [IN_A]: 0, [OUT_Q]: 0 }
function NextState(wireState, gateState) {
  return {
    [IN_A]: wireState[IN_A],
    [OUT_Q]: wireState[IN_A]
  }
}

Display.inputs = [IN_A]
Display.outputs = [OUT_Q]
Display.defaultState = { [IN_A]: false, [OUT_Q]: false }
Display.NextState = NextState

export default Display