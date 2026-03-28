import { Edges } from "@react-three/drei"
import { Vector3 } from "three"

const size = new Vector3(0.2, 0.2, 0.2)
function Mesh() {
  return (
    <>
      <boxGeometry args={size.toArray()} />
      <meshNormalMaterial transparent opacity={0.2} />
      {/* <Edges threshold={15} color="black" lineWidth={1} /> */}
    </>
  )
}

function Transistor() {
  return (
    <mesh>
      <Mesh />
    </mesh>
  )
}

Transistor.Mesh = Mesh
Transistor.size = size

export default Transistor