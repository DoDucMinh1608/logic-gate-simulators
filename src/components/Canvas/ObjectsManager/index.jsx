import { Instance, Instances } from "@react-three/drei";

import { useObjectsSlice } from "@/store/objectsSlice";
import onEnterTransistor from "../CanvasEvents/TransistorEvents/onEnterTransistor";
import onLeaveTransistor from "../CanvasEvents/TransistorEvents/onLeaveTransistor";
import onMouseDownTransistor from "../CanvasEvents/TransistorEvents/onMouseDownTransistor";
import Transistor from "./Transistor";


function ObjectsManager() {
  const objects = useObjectsSlice(state => state.objects)
  const removeGate = useObjectsSlice(state => state.removeGate)

  return (
    <>
      <Instances range={objects.length} frustumCulled={false}>
        <Transistor.Mesh />
        {objects.map(d => (
          <Instance
            key={d.id}
            name={`key_${d.id}`}
            position={d.position}
            onPointerEnter={e => onEnterTransistor(e, d)}
            onPointerLeave={e => onLeaveTransistor(e)}
            onPointerDown={e => onMouseDownTransistor(e, d, removeGate)}
          />
        ))}
      </Instances>
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