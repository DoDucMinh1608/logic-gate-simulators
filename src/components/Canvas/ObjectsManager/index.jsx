import { Instance, Instances } from "@react-three/drei";

import { useObjectsSlice } from "@/store/objectsSlice";
import Transistor from "./Transistor";


function ObjectsManager() {
  const objects = useObjectsSlice(state => state.objects)
  const removeGate = useObjectsSlice(state => state.removeGate)

  return (
    <Instances range={objects.length} frustumCulled={false}>
      <Transistor.Mesh />
      {objects.map(d => (
        <Instance
          key={d.id}
          position={d.position}
          onPointerDown={e => {
            if (e.button === 0) {
              removeGate(d.id)
            }
          }}
        />
      ))}
    </Instances>
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