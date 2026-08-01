import { Pause, Play, SkipForward } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useUIStore } from '@/store/uiStore';

function DebugMode() {
  const setExecuteNextStep = useUIStore(state => state.setExecuteNextStep);
  const setDebugMode = useUIStore(state => state.setDebugMode);
  const isDebugMode = useUIStore(state => state.isDebugMode);

  const [isNextStep, setIsNextStep] = useState(false);

  // Keybindings: 'k' or 'Space' for Play/Pause, 'l' or 'RightArrow' for Step Forward (YouTube defaults)
  useEffect(() => {
    let timeOut
    const handleKeyDown = (event) => {
      if (event.code == "KeyQ") {
        setDebugMode(!useUIStore.getState().isDebugMode);
        setExecuteNextStep(false);
      } else if (event.code == "KeyE") {
        if (isNextStep) clearTimeout(timeOut);
        setIsNextStep(true);
        setExecuteNextStep(true);

        timeOut = setTimeout(() => {
          setIsNextStep(false);
        }, 100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setExecuteNextStep, setDebugMode]);

  return (
    <div className=" absolute z-10 grid gap-1 font-sans select-none left-1/2 -translate-x-1/2 top-1">

      {/* YouTube-style Control Bar */}
      <div className="inline-flex items-center justify-around gap-1 bg-[#212121] rounded shadow-2xl border-neutral-800">

        {/* Play / Pause Button */}
        <button className="relative group p-2.5 rounded-lg text-white hover:bg-white/10 transition-colors duration-150 active:scale-95">
          {!isDebugMode ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current" />
          )}

          {/* YouTube Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1.5 px-2.5 py-1 bg-black/90 text-white text-[11px] font-medium rounded-md whitespace-nowrap shadow-md pointer-events-none border border-neutral-700">
            <span>{!isDebugMode ? 'Pause' : 'Play (Debug)'}</span>
            <span className="text-neutral-400 font-mono text-[10px]">(k)</span>
          </div>
        </button>

        {/* Next Step / Forward Button */}
        <button disabled={isDebugMode}
          className={`relative group p-2.5 rounded-lg transition-all duration-150 ${isNextStep
            ? 'text-white hover:bg-white/10 active:scale-95 cursor-pointer'
            : 'text-neutral-600 cursor-not-allowed opacity-40'
            }`}
          aria-label="Next Step">
          <SkipForward className="w-5 h-5 fill-current" />

          {/* YouTube Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1.5 px-2.5 py-1 bg-black/90 text-white text-[11px] font-medium rounded-md whitespace-nowrap shadow-md pointer-events-none border border-neutral-700">
            <span>{!isDebugMode ? 'Next Step' : 'Pause to step forward'}</span>
            {!isDebugMode && <span className="text-neutral-400 font-mono text-[10px]">(l)</span>}
          </div>
        </button>

        {/* Mode Label */}
        <div className="px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-md flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${!isDebugMode ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className={!isDebugMode ? 'text-neutral-300' : 'text-amber-400'}>
            {!isDebugMode ? 'RUNNING' : 'DEBUG'}
          </span>
        </div>

      </div>
      {isDebugMode && (
        <div
          className="flex items-center gap-2 px-2 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-800 text-[11px] font-medium animate-pulse cursor-pointer hover:bg-amber-500/20 active:scale-95 transition-all shadow-md pointer-events-auto"
          onClick={() => setExecuteNextStep(true)}>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
          <span>
            Press
            <kbd className="bg-amber-500/20 px-1 border border-amber-500/30 rounded text-amber-950 font-bold">E</kbd>
            to advance to next state</span>
        </div >
      )}
    </div >
  );
}

export default DebugMode