import { Vector3 } from "three"

const size = new Vector3(0.1, 0.1, 0.1)
function Mesh() {
  return (
    <>
      <boxGeometry args={size.toArray()} />
      <meshStandardMaterial />
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

export default Transistor