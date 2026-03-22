import { MIN_Y_POSITION, TRANSISTOR_SIZE } from "../../utils/constants"


const [WIDTH, HEIGHT, DEPTH] = TRANSISTOR_SIZE

function Transistor() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[WIDTH / 2, MIN_Y_POSITION + HEIGHT / 2, DEPTH / 2]}>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        <meshNormalMaterial />
      </mesh>
      {/* <mesh
        position={[WIDTH / 2, MIN_HEIGHT + HEIGHT * 1.3 + HEIGHT * 1.2, DEPTH / 2]}
        rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        <meshNormalMaterial />
      </mesh> */}
    </group>
  )
}

export default Transistor