import { MIN_HEIGHT, TRANSISTOR_SIZE } from "../utils/constants"


const { WIDTH, HEIGHT, DEPTH } = TRANSISTOR_SIZE

function Transistor() {
  return (
    <mesh position={[WIDTH / 2, MIN_HEIGHT + TRANSISTOR_SIZE.HEIGHT / 2, DEPTH / 2]}>
      <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default Transistor