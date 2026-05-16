import { useEffect, useState } from "react";

import { usePlayerSlice } from "@/store/playerSlice";
import { AND_GATE, CLOCK, DISPLAY, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, SWITCH, WIRE } from "@/utils/constants";

const NORMAL_GATE_TYPES = [
  WIRE,
  CLOCK,
  SWITCH,
  DISPLAY,
  NOT_GATE,
  AND_GATE,
  OR_GATE,
];
const NOT_GATE_TYPES = [
  WIRE,
  CLOCK,
  SWITCH,
  DISPLAY,
  NOT_GATE,
  NAND_GATE,
  NOR_GATE,
];

function GateMenu(props) {
  const [notSelect, setNotSelect] = useState(false)
  const [index, setIndex] = useState(0)
  const GATE_TYPES = notSelect ? NOT_GATE_TYPES : NORMAL_GATE_TYPES

  const setSelectBuildPort = usePlayerSlice(state => state.setSelectBuildPort)

  useEffect(function () {
    usePlayerSlice.getState().setSelectBuildGate(GATE_TYPES[index])
  }, [index, GATE_TYPES])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'q') {
        setNotSelect(s => !s)
      }
    };


    const handleWheel = (e) => {
      // Use functional state updates to prevent stale index closures
      setIndex((prevIndex) => {
        let nextIndex;
        if (e.deltaY > 0) {
          nextIndex = (prevIndex + 1) % GATE_TYPES.length;
        } else {
          nextIndex = (prevIndex - 1 + GATE_TYPES.length) % GATE_TYPES.length;
        }
        return nextIndex;
      });

      setSelectBuildPort(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setSelectBuildPort, index, GATE_TYPES]);

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 gap-2 pointer-events-none z-10 flex">
      <div className={[
        "p-2 text-center border rounded-lg w-20",
        notSelect ? "bg-[#0e0]/50 border-2" : "bg-[#e00]/50 "
      ].join(' ')} >NOT (Q)</div>
      {GATE_TYPES.map((type, i) => (
        <div key={type} className={[
          "p-2 bg-white/80 text-center border rounded-lg w-20",
          // type === selectBuildGate ? "font-bold bg-[#eee] border-2" : ""
          index === i ? "font-bold bg-[#eee] border-2" : ""
        ].join(' ')}>{type}</div>
      ))}
    </div>
  );
}

export default GateMenu