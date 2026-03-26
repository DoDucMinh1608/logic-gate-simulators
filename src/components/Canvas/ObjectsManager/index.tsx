import { Instance, Instances } from "@react-three/drei";
import { type ReactNode } from "react";

import { useObjectsSlice } from "../../../store/objectsSlice";
import Transistor from "./Transistor";
import { Vector3 } from "three";


function ObjectsManager(): ReactNode {
  const objects = useObjectsSlice(state => state.objects)

  const removeGate = useObjectsSlice(state => state.removeGate)
  return (
    <Instances range={objects.length}>
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

export default ObjectsManager