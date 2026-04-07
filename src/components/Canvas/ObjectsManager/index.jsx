import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";

import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";
import Transistor from "./Transistor";
import { Model } from "./AND";

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
      <Model />
      <Instances range={objects.length} frustumCulled={false}>
        <Transistor.Mesh />
        {objects.map(d => (
          <Instance
            key={d.id}
            name={`transistor_${d.id}`}
            position={d.position}
            rotation={[0, d.rotation ?? 0, 0]}
            onPointerDown={e => {
              // e.stopPropagation()
              // if (e.button === 0) {
              //   removeGate(d.id)
              // }
            }}
          />
        ))}
      </Instances>
    </>
  )
}
export default ObjectsManager