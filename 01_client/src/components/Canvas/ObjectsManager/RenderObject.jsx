import { useMemo } from "react";
import { Vector3 } from "three";

import { useModelsSlice } from "@/store/modelStore";
import { useObjectsSlice } from "@/store/objectsSlice";
import { convertGatePosToWorldCoor } from "@/utils";

import ConnectWire from "../Gates/ConnectWire";

function renderGate(obj) {
  if (!obj.display) return

  const position = convertGatePosToWorldCoor(...obj.position);
  const rotation = [0, obj.rotation * Math.PI / 2, 0];
  const Model = useModelsSlice.getState().getModelById(obj.model_name)

  if (Model == null) return
  return (
    <Model
      key={obj.id}
      name={obj.name}
      gate_id={obj.id}
      model={Model}
      inputs={obj.inputs}
      outputs={obj.outputs}
      position={position}
      rotation={rotation}
    />
  );
}

function RenderObject() {
  const gates = useObjectsSlice(state => state.GATES);
  const data = useMemo(() => Object.values(gates), [gates])
  const wires = useMemo(() => data
    .filter(i => i.display)
    .map(i => Object.values(i.inputs))
    .flat()
    .filter(i => i.positions?.length > 1)
    .map(i => {
      if (i instanceof Vector3) return i
      i.positions = i.positions.map(({ x, y, z }) => new Vector3(x, y, z))
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
