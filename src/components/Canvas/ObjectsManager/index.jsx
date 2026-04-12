import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

import { useObjectsSlice } from "@/store/objectsSlice";
import { calculateGatePosition, calculateWirePosition } from "@/utils/math-utils";

import AndGate from "../Gates/AndGate";
import Clock from "../Gates/Clock";
import NandGate from "../Gates/NandGate";
import NorGate from "../Gates/NorGate";
import NotGate from "../Gates/NotGate";
import OrGate from "../Gates/OrGate";
import XorGate from "../Gates/XorGate";

function ObjectsManager() {
  const gates = useObjectsSlice(state => state.GATES)
  const line = useObjectsSlice(state => state.LINES)

  return (
    <>
      {/* <Connection /> */}
      {gates.map((obj, j) => (
        <>
          {obj.type === "AND" && <AndGate
            key={`${j}_AND`}
            position={calculateGatePosition(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.2} />}
          {obj.type === "OR" && <OrGate
            key={`${j}_OR`}
            position={calculateGatePosition(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.2} />}
          {obj.type === "NOT" && <NotGate
            key={`${j}_NOT`}
            position={calculateGatePosition(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.2} />}

          {obj.type === "NAND" && <NandGate
            key={`${j}_AND`}
            position={calculateGatePosition(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.2} />}
          {obj.type === "NOR" && <NorGate
            key={`${j}_OR`}
            position={calculateGatePosition(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.2} />}
          {obj.type === "XOR" && <XorGate
            key={`${j}_XOR`}
            position={calculateGatePosition(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.2} />}

          {obj.type === "CLOCK" && <Clock
            id={obj.id}
            key={`${j}_CLOCK`}
            position={calculateGatePosition(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            tick={obj.tick} />}
          {obj.type === "Switch" && <Switch
            key={`${j}_CLOCK`}
            position={calculateGatePosition(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            tick={obj.tick} />}
        </>
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