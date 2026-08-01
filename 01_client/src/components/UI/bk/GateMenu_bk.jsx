import { usePlayerSlice } from "@/store/playerSlice";
import { useUIStore } from "@/store/uiSlice";
import { AND_GATE, CLOCK, DISPLAY, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, SWITCH, WIRE, XOR_GATE } from "@/utils/constants";
import { useEffect, useState } from "react";

// 1. Định nghĩa bộ Icon SVG chuẩn cho các linh kiện và cổng logic (Stroke-width và kích thước đồng bộ)
const GATE_ICONS = {
  [WIRE]: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round">
      <path d="M2 12h6l4-8 4 16 4-8h2" />
    </svg>
  ),
  [SWITCH]: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round">
      <circle cx="5" cy="12" r="2" className="fill-current" />
      <circle cx="19" cy="12" r="2" className="fill-current" />
      <line x1="6.5" y1="11" x2="16.5" y2="5" />
    </svg>
  ),
  [CLOCK]: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  ),
  [DISPLAY]: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <circle cx="12" cy="10" r="2" className="fill-current" />
    </svg>
  ),
  [NOT_GATE]: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinejoin="round">
      <path d="M4 4v16l11-8Z" />
      <circle cx="17" cy="12" r="1.5" />
    </svg>
  ),
  [AND_GATE]: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinejoin="round">
      <path d="M4 4h6a8 8 0 0 1 0 16H4Z" />
    </svg>
  ),
  [OR_GATE]: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinejoin="round">
      <path d="M4 4c3 4 3 12 0 16 6 0 12-2 16-8C16 6 10 4 4 4Z" />
    </svg>
  ),
  [NAND_GATE]: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinejoin="round">
      <path d="M3 4h6a7.5 7.5 0 0 1 0 15H3Z" />
      <circle cx="18" cy="11.5" r="1.5" />
    </svg>
  ),
  [NOR_GATE]: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinejoin="round">
      <path d="M3 4c2.5 4 2.5 12 0 16 5.5 0 11-2 14.5-8C14 6 8.5 4 3 4Z" />
      <circle cx="19.5" cy="12" r="1.5" />
    </svg>
  ),
  [XOR_GATE]: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinejoin="round">
      <path d="M2 4c2.5 4 2.5 12 0 16" />
      <path d="M5 4c3 4 3 12 0 16 5.5 0 11-2 15-8C16 6 10.5 4 5 4Z" />
    </svg>
  ),
};

const NORMAL_GATE_TYPES = [CLOCK, SWITCH, DISPLAY, NOT_GATE, AND_GATE, OR_GATE];

function GateMenu(props) {
  // const [notSelect, setNotSelect] = useState(false);
  const [index, setIndex] = useState(0);
  const GATE_TYPES = NORMAL_GATE_TYPES;

  const setSelectBuildPort = usePlayerSlice((state) => state.setSelectBuildPort);
  const isNotGate = useUIStore((state) => state.getIsNotGate());
  const isWireMode = useUIStore((state) => state.isWireMode);

  useEffect(function () {
    useUIStore.getState().setSelectBuildGate(GATE_TYPES[index]);
  }, [index, GATE_TYPES]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const state = useUIStore.getState()

      // Invert input
      if (event.key.toLowerCase() === "q") {
        state.setIsNotGate(!state.isNotGate);
        state.setIsWireMode(false);
        setSelectBuildPort(null);
      }

      // Wire mode
      if (event.key.toLowerCase() === "z") {
        state.setIsNotGate(false);
        state.setIsWireMode(!state.isWireMode);
        setSelectBuildPort(null);
      }
    };

    const handleWheel = (e) => {
      setIndex((prevIndex) => {
        if (isNotGate) return prevIndex;
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

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSelectBuildPort, isNotGate]); // Đã loại bỏ `index` khỏi dependency để tránh re-bind event listener liên tục khi cuộn chuột

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 gap-3 pointer-events-none z-10 flex items-end font-sans">
      {/* Nút chỉ báo trạng thái chế độ NOT (Q) */}
      <div
        className={[
          "px-3 py-2 text-center border rounded-xl text-xs font-bold transition-all duration-200 flex flex-col items-center justify-center h-16 w-16 shadow-lg",
          isNotGate
            ? "bg-emerald-500/90 text-white border-emerald-400 scale-105"
            : "bg-neutral-800/80 text-neutral-400 border-neutral-700",
        ].join(" ")}
      >
        <span className="text-[10px] opacity-70">MODE</span>
        <span className="text-sm">NOT</span>
        <span className="text-[9px] bg-black/30 px-1 rounded mt-0.5">Key Q</span>
      </div>
      <div
        className={[
          "px-3 py-2 text-center border rounded-xl text-xs font-bold transition-all duration-200 flex flex-col items-center justify-center h-16 w-16 shadow-lg",
          isWireMode
            ? "bg-emerald-500/90 text-white border-emerald-400 scale-105"
            : "bg-neutral-800/80 text-neutral-400 border-neutral-700",
        ].join(" ")}>
        <span className="text-[10px] opacity-70">MODE</span>
        <span className="text-sm">WIRE</span>
        <span className="text-[9px] bg-black/30 px-1 rounded mt-0.5">Key Z</span>
      </div>

      {/* Danh sách các Icon linh kiện */}
      {GATE_TYPES.map((type, i) => {
        const isSelected = index === i;
        return (
          <div
            key={type}
            className={[
              "p-2 rounded-xl border flex flex-col items-center justify-center h-16 w-16 transition-all duration-150 shadow-md backdrop-blur-sm",
              isNotGate || isWireMode
                ? "bg-neutral-900/80 text-neutral-300 border-neutral-700"
                : isSelected
                  ? "bg-white text-blue-600 border-blue-500 font-bold scale-110 -translate-y-1 shadow-blue-500/20 shadow-xl"
                  : "bg-neutral-900/80 text-neutral-300 border-neutral-700",
            ].join(" ")} title={type}>
            {/* Render SVG tương ứng từ object tra cứu */}
            {GATE_ICONS[type] || (
              <span className="text-[10px] break-all text-center">{type}</span>
            )}

            {/* Tên viết tắt nhỏ ở dưới icon để người dùng không bị nhầm lẫn */}
            <span className={`text-[9px] mt-1 uppercase tracking-tight ${isSelected ? "text-blue-600 font-semibold" : "text-neutral-500"}`}>
              {type.replace("_GATE", "")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default GateMenu;