import { useRef } from "react"

import { useThrottledFrame } from "@/hooks/useThrottledFrame"

function Clock({ id, tick, custom, ...props }) {
  // const ref = useRef()
  // const _state = useRef(true)
  // useThrottledFrame((state, delta) => {

  //   _state.current = !_state.current

  //   // --- CHANGE COLOR MANUALLY ---
  //   ref.current.material.color.set(_state.current ? 'black' : 'white')

  // }, 0, props?.tick ?? 10)

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


export default Clock