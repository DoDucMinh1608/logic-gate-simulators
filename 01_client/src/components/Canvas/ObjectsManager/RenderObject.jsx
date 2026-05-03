import { useMemo } from "react";
import { Vector3 } from "three";

import { useObjectsSlice } from "@/store/objectsSlice";
import { convertGatePosToWorldCoor } from "@/utils";
import { AND_GATE, CLOCK, DISPLAY, IN_A, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUT_Q, SWITCH, XOR_GATE } from "@/utils/constants";

import AndGate from "../Gates/AndGate";
import ClockGate from "../Gates/ClockGate";
import ConnectWire from "../Gates/ConnectWire";
import Display from "../Gates/Display";
import NandGate from "../Gates/NandGate";
import NorGate from "../Gates/NorGate";
import NotGate from "../Gates/NotGate";
import OrGate from "../Gates/OrGate";
import SwitchGate from "../Gates/SwitchGate";
import XorGate from "../Gates/XorGate";

const GATE_COMPONENTS = {
  [AND_GATE]: AndGate,
  [OR_GATE]: OrGate,
  [NOT_GATE]: NotGate,
  [NAND_GATE]: NandGate,
  [NOR_GATE]: NorGate,
  [XOR_GATE]: XorGate,
};

function renderGate(obj) {
  const position = convertGatePosToWorldCoor(...obj.position);
  const rotation = [0, obj.rotation * Math.PI / 2, 0];
  const StandardGate = GATE_COMPONENTS[obj.type];

  if (StandardGate) {
    return <StandardGate key={obj.id} position={position} rotation={rotation} />;
  }

  if (obj.type === CLOCK) {
    return (
      <ClockGate
        key={obj.id}
        position={position}
        rotation={rotation}
      />
    );
  }

  if (obj.type === SWITCH) {
    return (
      <SwitchGate
        key={obj.id}
        id={obj.id}
        position={position}
        rotation={rotation}
        state={obj.outputs[OUT_Q].status}
      />
    );
  }

  if (obj.type === DISPLAY) {
    const gates = useObjectsSlice.getState().GATES
    const input = obj.inputs[IN_A]
    return (
      <Display
        key={obj.id}
        position={position}
        rotation={rotation}
        state={gates[input.srcGate]?.outputs[input.srcPin].status} />
    );
  }

  // Unknown gate type — fail visibly in dev, silently in prod
  if (process.env.NODE_ENV === "development") {
    console.warn(`RenderObject: unknown gate type "${obj.type}" (id: ${obj.id})`);
  }
  return null;
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
        />)
      )}
    </>
  );
}
export default RenderObject
