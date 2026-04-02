import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";

import { useObjectsSlice } from "@/store/objectsSlice";
import Transistor from "./Transistor";
import { setSnapGridPosition } from "@/utils/math-utils";
import { usePlayerSlice } from "@/store/playerSlice";

const position = new Vector3()
position
function ObjectsManager() {
  const objects = useObjectsSlice(state => state.objects)
  const removeGate = useObjectsSlice(state => state.removeGate)
  const setInteractPosition = usePlayerSlice(state => state.setInteractPosition)

  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    // ref.current.position.copy(position)
  })

  return (
    <>
      <Instances range={objects.length} frustumCulled={false}>
        <Transistor.Mesh />
        {objects.map(d => (
          <Instance
            key={d.id}
            name={`transistor_${d.id}`}
            position={d.position}
            onPointerDown={e => {
              e.stopPropagation()
              if (e.button === 0) {
                removeGate(d.id)
              }
            }}
          />
        ))}
      </Instances>
      <mesh ref={ref}>
        <boxGeometry args={[0.02, 0.02, 0.02]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  )
}
// {
//   objects.map(d => (
//     <mesh key={d.id} position={d.position} onClick={() => removeGate(d.id)}>
//       <Transistor.Mesh />
//     </mesh>
//   ))
// }
export default ObjectsManager