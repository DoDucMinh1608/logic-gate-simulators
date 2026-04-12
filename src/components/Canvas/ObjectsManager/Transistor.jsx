import { Vector3 } from "three"

export const gridSize = new Vector3(0.2, 0.04, 0.2)
// const displaySize = new Vector3(0.12, 0.04, 0.10)

// function Mesh() {
//   return (
//     <>
//       <boxGeometry args={displaySize.toArray()} />
//       <meshStandardMaterial color="black" />
//       {/* <Edges threshold={15} color="black" lineWidth={1} /> */}
//     </>
//   )
// }

function Transistor() {
  return (
    <mesh>
      {/* <Mesh /> */}
      <mesh position={[1, 1, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </mesh>
  )
}

// Transistor.Mesh = Mesh
Transistor.gridSize = gridSize

export default Transistor