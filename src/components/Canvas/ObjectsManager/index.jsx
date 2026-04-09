import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

import { useObjectsSlice } from "@/store/objectsSlice";
import { calculateGatePosition, calculateWirePosition } from "@/utils/math-utils";
import { AndGate } from "./AND_GATE";
import Clock from "./CLOCK";
import { NotGate } from "./NOT_GATE";
import { OrGate } from "./OR_GATE";
import { NandGate } from "./NAND_GATE";

const position = new Vector3()

function ObjectsManager() {

  const andGate = useObjectsSlice(state => state.AND_GATE)
  const line = useObjectsSlice(state => state.LINES)
  useFrame(() => {
    // ref.current.position.copy(position)
  })

  return (
    <>
      {/* <Connection /> */}
      {andGate.map(obj => (
        obj.type === "AND" ? <AndGate
          key={obj.id}
          position={calculateGatePosition(...obj.position)}
          rotation={[0, obj.rotation * Math.PI / 2, 0]} />
          : obj.type === "OR" ? <OrGate
            key={obj.id}
            position={calculateGatePosition(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]} />
            : obj.type === "NOT" ? <NotGate
              key={obj.id}
              position={calculateGatePosition(...obj.position)}
              rotation={[0, obj.rotation * Math.PI / 2, 0]} />
              : obj.type === "NAND" ? <NandGate
                key={obj.id}
                position={calculateGatePosition(...obj.position)}
                rotation={[0, obj.rotation * Math.PI / 2, 0]}
                tick={obj.tick} />
                : obj.type === "CLOCK" ? <Clock
                  key={obj.id}
                  position={calculateGatePosition(...obj.position)}
                  rotation={[0, obj.rotation * Math.PI / 2, 0]}
                  tick={obj.tick} />
                  : null
      ))}
      {line
        .filter(obj => obj.positions.length > 0)
        .map(obj => {
          const value = obj.positions.map(i => {
            return calculateWirePosition(...i)
          })
          return (
            <>
              <Line
                key={obj.id}
                points={value}
                color={obj.state == 0 ? "red" : "blue"}
                lineWidth={5}
              />
            </>
          )
        })}

      {/* <NotGate position={[0.3, 0, 0.3]} />
      <OrGate position={[0.5, 0, 0.5]} />
      <OrGate position={[0.5, 0, 0.3]} /> */}
    </>
  )
}
export default ObjectsManager