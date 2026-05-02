import { useMemo } from "react";

import { useObjectsSlice } from "@/store/objectsSlice";
import { convertGatePosToWorldCoor } from "@/utils";
import { AND_GATE, CLOCK, DISPLAY, IN_A, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, SWITCH, XOR_GATE } from "@/utils/constants";

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

  // Standard logic gates — all share the same props shape
  const StandardGate = GATE_COMPONENTS[obj.type];
  if (StandardGate) {
    return <StandardGate key={obj.id} position={position} rotation={rotation} />;
  }

  // Self-firing / stateful gates need extra props
  if (obj.type === CLOCK) {
    return (
      <ClockGate
        key={obj.id}
        id={obj.id}
        position={position}
        rotation={rotation}
        tick={obj.tick}
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
        state={obj.outputs[IN_A]}
        tick={obj.custom.tick}
      />
    );
  }

  if (obj.type === DISPLAY) {
    return (
      <Display
        key={obj.id}
        id={obj.id}
        position={position}
        rotation={rotation}
        state={obj.outputs[IN_A]}
      />
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
  const wires = useMemo(() => Object.values(gates)
    .map(i => Object.values(i.inputs))
    .flat()
    .filter(i => i.positions?.length > 1), [gates])

  return (
    <>
      {data.map(renderGate)}
      {wires?.map(wire => <ConnectWire key={wire.id} status={gates[wire.gateId]?.outputs?.[wire.pin].status} obj={wire} />)}
    </>
  );
}
export default RenderObject