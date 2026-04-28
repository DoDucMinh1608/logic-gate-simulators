import { Line } from "@react-three/drei";

import { useObjectsSlice } from "@/store/objectsSlice";
import { convertGatePosToWorldCoor, convertWirePosToWorldCoor } from "@/utils/math-utils";

import { AND_GATE, CLOCK, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, SWITCH, XOR_GATE } from "@/utils/constants";
import AndGate from "../Gates/AndGate";
import Clock from "../Gates/Clock";
import NandGate from "../Gates/NandGate";
import NorGate from "../Gates/NorGate";
import NotGate from "../Gates/NotGate";
import OrGate from "../Gates/OrGate";
import Switch from "../Gates/Switch";
import XorGate from "../Gates/XorGate";

function RenderObject() {
  const gates = useObjectsSlice(state => state.GATES)
  const line = useObjectsSlice(state => state.LINES)
  // console.log(gates)
  return (
    <>
      {gates.map((obj, j) => (
        <>
          {obj.type === AND_GATE && <AndGate
            key={`${j}_AND`}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.04} />}
          {obj.type === OR_GATE && <OrGate
            key={`${j}_OR`}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.04} />}
          {obj.type === NOT_GATE && <NotGate
            key={`${j}_NOT`}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.04} />}

          {obj.type === NAND_GATE && <NandGate
            key={`${j}_AND`}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.04} />}
          {obj.type === NOR_GATE && <NorGate
            key={`${j}_OR`}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.04} />}
          {obj.type === XOR_GATE && <XorGate
            key={`${j}_XOR`}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            scale={0.04} />}

          {obj.type === CLOCK && <Clock
            id={obj.id}
            key={`${j}_CLOCK`}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            tick={obj.tick} />}
          {obj.type === SWITCH && <Switch
            key={`${j}_CLOCK`}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            tick={obj.custom.tick} />}
        </>
      ))}
      {line
        .filter(obj => obj.positions.length > 0)
        .map(obj => {
          const value = obj.positions.map(i => convertWirePosToWorldCoor(...i))
          return (
            <Line
              key={obj.id}
              points={value}
              lineWidth={2}
              color={obj.status == 0 ? "blue" : "red"} />
          )
        })}
    </>
  )
}
export default RenderObject