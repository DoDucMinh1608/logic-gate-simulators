import { useUIStore } from "@/store/uiSlice";
import { useEffect } from "react";

function DebugMode() {
  const setExecuteNextStep = useUIStore(state => state.setExecuteNextStep);
  const setDebugMode = useUIStore(state => state.setDebugMode);
  const isDebugMode = useUIStore(state => state.isDebugMode);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Digit1") {
        setDebugMode(false);
        setExecuteNextStep(false);
      }
      if (event.code === "Digit2") {
        setDebugMode(true);
        setExecuteNextStep(false);
      }
      // QUAN TRỌNG: Lấy giá trị mới nhất từ Zustand store để tránh lỗi stale closure
      const currentDebugMode = useUIStore.getState().isDebugMode;
      if (event.code === "KeyE" && currentDebugMode) {
        setExecuteNextStep(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setDebugMode, setExecuteNextStep]); // Không cần truyền isDebugMode vào đây nữa nhờ check trực tiếp từ store

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col items-center gap-2 font-sans select-none">
      {/* Khung điều khiển chính */}
      <div className="flex p-1.5 bg-neutral-900/90 border border-neutral-700/60 rounded-xl shadow-2xl backdrop-blur-md">

        {/* Chế độ NORMAL */}
        <button
          onClick={() => { setDebugMode(false); setExecuteNextStep(false); }}
          className={[
            "flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer",
            !isDebugMode
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
          ].join(" ")}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>NORMAL</span>
          <kbd className={`text-[10px] px-1 rounded ${!isDebugMode ? 'bg-emerald-700/50 text-emerald-200' : 'bg-neutral-800 text-neutral-500'}`}>1</kbd>
        </button>

        {/* Chế độ DEBUG */}
        <button
          onClick={() => { setDebugMode(true); setExecuteNextStep(false); }}
          className={[
            "flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer",
            isDebugMode
              ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
          ].join(" ")}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          <span>DEBUG</span>
          <kbd className={`text-[10px] px-1 rounded ${isDebugMode ? 'bg-amber-700/50 text-amber-200' : 'bg-neutral-800 text-neutral-500'}`}>2</kbd>
        </button>
      </div>

      {/* Panel hướng dẫn / Trigger bước tiếp theo khi ở chế độ Debug */}
      {isDebugMode && (
        <div
          className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-800 text-[11px] font-medium animate-pulse cursor-pointer hover:bg-amber-500/20 active:scale-95 transition-all shadow-md pointer-events-auto"
          onClick={() => setExecuteNextStep(true)}>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
          <span>
            Nhấn
            <kbd className="bg-amber-500/20 px-1 border border-amber-500/30 rounded text-amber-950 font-bold mx-0.5">E</kbd>
            hoặc click để nhảy bước (Next State)</span>
        </div >
      )}
    </div >
  );
}

export default DebugMode