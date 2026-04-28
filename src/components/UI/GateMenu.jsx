import { useEffect } from "react";

import { usePlayerSlice } from "@/store/playerSlice";
import { GATE_TYPES } from "@/utils/constants";

function GateMenu(props) {
  const selectGate = usePlayerSlice(state => state.selectGate);
  const setSelectGate = usePlayerSlice(state => state.setSelectGate);
  // const [gate, setGate] = useState(selectGate)
  // console.log(gate)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const num = parseInt(e.key);
      if (GATE_TYPES[num - 1]) {
        setSelectGate(GATE_TYPES[num - 1]);
        // setGate(GATE_TYPES[num - 1])
      }
    };

    const handleWheel = (e) => {
      let index = GATE_TYPES.indexOf(selectGate)

      if (e.deltaY > 0) index = (index + 1) % GATE_TYPES.length;
      else index = (index - 1 + GATE_TYPES.length) % GATE_TYPES.length;
      setSelectGate(GATE_TYPES[index])
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [selectGate, setSelectGate]);

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 gap-2 pointer-events-none z-10 flex">
      {GATE_TYPES.map((type, i) => (
        <div key={type} className={[
          "p-2 bg-white/80 text-center border rounded-lg w-20",
          type === selectGate ? "font-bold bg-[#eee] border-2" : ""
        ].join(' ')} style={{
          // border: i === activeIndex ? '2px solid #333' : '1px solid #ccc',
          // background: i === activeIndex ? '#eee' : 'white',
          // fontWeight: i === activeIndex ? 'bold' : 'normal',
          // borderRadius: '4px'
        }}>{type}</div>
      ))}
    </div>
  );
}

export default GateMenu