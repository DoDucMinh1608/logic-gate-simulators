import { Edges } from "@react-three/drei"

import { PORT_COLORS } from "@/utils/colors"
import { IN_A, OUT_Q } from "@/utils/constants"
import GateName from "./GateName"

function Display({ id, name, state, ...props }) {
  return (
    <group {...props} dispose={null} >
      <GateName name={name} />
      <mesh position={[0, .625, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[3, 1.25, 3]} />
        <meshStandardMaterial
          color={state ? 0xffffff : 0x000000}
          metalness={1}
          roughness={0.4}
          transparent
          opacity={.5}
          envMapIntensity={1.5}
          flatShading={true} />
        <Edges threshold={5} color={state ? 0xff0000 : 0x0000ff} lineWidth={5} />
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

function NextState(wireState) {
  return {
    [IN_A]: wireState[IN_A],
    [OUT_Q]: wireState[IN_A]
  }
}

Display.NextState = NextState
Display.Init = function () { }

export default Display