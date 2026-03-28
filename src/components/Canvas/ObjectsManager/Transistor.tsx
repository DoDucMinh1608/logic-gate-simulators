import { Vector3 } from "three"

const size = new Vector3(0.2, 0.2, 0.2)
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
Transistor.size = size

export default Transistor