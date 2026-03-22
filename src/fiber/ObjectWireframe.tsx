import { useFrame } from "@react-three/fiber"
import { MIN_HEIGHT, TRANSISTOR_SIZE } from "../utils/constants"


const [WIDTH, HEIGHT, DEPTH] = TRANSISTOR_SIZE

function ObjectWireframe() {
  useFrame(({ gl, ...state }) => {

    gl.render(state.scene, state.camera)
  }, 2)

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[WIDTH / 2, MIN_HEIGHT + HEIGHT / 2, DEPTH / 2]}>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  )
}

export default ObjectWireframe