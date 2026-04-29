import { Line } from "@react-three/drei";

import { useObjectsSlice } from "@/store/objectsSlice";
import { convertGatePosToWorldCoor, convertWirePosToWorldCoor } from "@/utils";

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
  // console.log(JSON.stringify({ gates, line }))
  return (
    <>
      {gates.map((obj, j) => (
        <>
          {obj.type === AND_GATE && <AndGate
            key={obj.id}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
          />}
          {obj.type === OR_GATE && <OrGate
            key={obj.id}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
          />}
          {obj.type === NOT_GATE && <NotGate
            key={obj.id}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
          />}

          {obj.type === NAND_GATE && <NandGate
            key={obj.id}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
          />}
          {obj.type === NOR_GATE && <NorGate
            key={obj.id}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
          />}
          {obj.type === XOR_GATE && <XorGate
            key={obj.id}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
          />}

          {obj.type === CLOCK && <Clock
            id={obj.id}
            key={obj.id}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            tick={obj.tick} />}
          {obj.type === SWITCH && <Switch
            key={obj.id}
            position={convertGatePosToWorldCoor(...obj.position)}
            rotation={[0, obj.rotation * Math.PI / 2, 0]}
            tick={obj.custom.tick} />}
        </>
      ))}
      {line
        .filter(obj => obj.positions.length > 1)
        .map(obj => {
          return (
            <Line
              key={obj.id}
              points={obj.positions}
              lineWidth={4}
              color={obj.status == 0 ? "blue" : "red"} />
          )
        })}
    </>
  )
}
export default RenderObject