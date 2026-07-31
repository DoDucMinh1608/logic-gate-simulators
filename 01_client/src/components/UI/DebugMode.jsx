import { Bug, Pause, Play, SkipForward } from 'lucide-react';
import { useEffect, useState } from 'react';

function DebugMode() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [stepCount, setStepCount] = useState(0);

  // Toggle Play / Pause (Pause = Debug Mode)
  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Step Forward (Only works when Paused)
  const handleStepForward = () => {
    if (isPlaying) return;
    setStepCount((prev) => prev + 1);
  };

  // Keybindings: 'k' or 'Space' for Play/Pause, 'l' or 'RightArrow' for Step Forward (YouTube defaults)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.code === 'Space' || e.key === 'k') {
        e.preventDefault();
        handleTogglePlay();
      } else if ((e.key === 'l' || e.key === 'ArrowRight') && !isPlaying) {
        e.preventDefault();
        handleStepForward();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  return (
    <div className=" absolute z-10 font-sans select-none left-1/2 -translate-x-1/2 top-1">

      {/* YouTube-style Control Bar */}
      <div className="inline-flex items-center gap-1 bg-[#212121] rounded shadow-2xl border-neutral-800">

        {/* Play / Pause Button */}
        <button
          onClick={handleTogglePlay}
          className="relative group p-2.5 rounded-lg text-white hover:bg-white/10 transition-colors duration-150 active:scale-95"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current" />
          )}

          {/* YouTube Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1.5 px-2.5 py-1 bg-black/90 text-white text-[11px] font-medium rounded-md whitespace-nowrap shadow-md pointer-events-none border border-neutral-700">
            <span>{isPlaying ? 'Pause' : 'Play (Debug)'}</span>
            <span className="text-neutral-400 font-mono text-[10px]">(k)</span>
          </div>
        </button>

        {/* Next Step / Forward Button */}
        <button
          onClick={handleStepForward}
          disabled={isPlaying}
          className={`relative group p-2.5 rounded-lg transition-all duration-150 ${!isPlaying
            ? 'text-white hover:bg-white/10 active:scale-95 cursor-pointer'
            : 'text-neutral-600 cursor-not-allowed opacity-40'
            }`}
          aria-label="Next Step"
        >
          <SkipForward className="w-5 h-5 fill-current" />

          {/* YouTube Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1.5 px-2.5 py-1 bg-black/90 text-white text-[11px] font-medium rounded-md whitespace-nowrap shadow-md pointer-events-none border border-neutral-700">
            <span>{!isPlaying ? 'Next Step' : 'Pause to step forward'}</span>
            {!isPlaying && <span className="text-neutral-400 font-mono text-[10px]">(l)</span>}
          </div>
        </button>


        {/* Mode Label */}
        <div className="px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-md flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className={isPlaying ? 'text-neutral-300' : 'text-amber-400'}>
            {isPlaying ? 'RUNNING' : 'DEBUG'}
          </span>
        </div>

      </div>

      {/* Debug Info */}
      {!isPlaying && (
        <div className="flex items-center gap-2 text-xs font-mono text-amber-600 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-lg">
          <Bug className="w-3.5 h-3.5" />
          <span>Paused at Step: <strong>{stepCount}</strong></span>
        </div>
      )}

    </div>
  );
}

export default DebugMode