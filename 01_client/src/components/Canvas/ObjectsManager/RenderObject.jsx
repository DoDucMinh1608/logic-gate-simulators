import { useMemo } from "react";
import { Vector3 } from "three";

import { useObjectsSlice } from "@/store/objectsSlice";
import { convertGatePosToWorldCoor } from "@/utils";

import ConnectWire from "../Gates/ConnectWire";

function renderGate(obj) {
  const position = convertGatePosToWorldCoor(...obj.position);
  const rotation = [0, obj.rotation * Math.PI / 2, 0];
  const StandardGate = obj.model;

  return (
    <StandardGate
      key={obj.id}
      name={obj.name}
      gate_id={obj.id}
      inputs={obj.inputs}
      state={obj.outputs}
      position={position}
      rotation={rotation} />
  );
}

function RenderObject() {
  const gates = useObjectsSlice(state => state.GATES);
  const data = useMemo(() => Object.values(gates), [gates])
  const wires = useMemo(() => data
    .map(i => Object.values(i.inputs))
    .flat()
    .filter(i => i.positions?.length > 1)
    .map(i => {
      if (!(i instanceof Vector3)) i.positions = i.positions.map(({ x, y, z }) => new Vector3(x, y, z))
      return i
    }), [data])

  return (
    <>
      {data.map(renderGate)}
      {wires?.map((wire, j) => (
        <ConnectWire
          key={j}
          obj={wire}
          status={gates[wire.srcGate]?.outputs?.[wire.srcPin].status}
        />
      ))}
    </>
  );
}
export default RenderObject
