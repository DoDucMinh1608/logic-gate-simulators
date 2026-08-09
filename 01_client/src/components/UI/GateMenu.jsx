import { Hammer, Pencil, Triangle } from 'lucide-react';
import { useEffect, useState } from "react";

import { usePlayerSlice } from "@/store/playerSlice";
import { useUIStore } from "@/store/uiSlice";
import { AND_GATE, CLOCK, COPY_PASTE, DISPLAY, EXPORT_FILE, IMPORT_FILE, NOT_GATE, OR_GATE, REVERSE, SELECT, SWITCH, VIEW, WIRE } from "@/utils/constants";

// Build mode components list
const buildTools = [
  {
    id: WIRE, label: 'WIRE', icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round">
        <path d="M2 12h6l4-8 4 16 4-8h2" />
      </svg>
    )
  },
  { id: REVERSE, label: 'REVERSE', icon: Triangle, rotate: 90 },
  {
    id: CLOCK, label: "CLOCK", icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),
  },
  {
    id: SWITCH, label: 'SWITCH', icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round">
        <circl e cx="5" cy="12" r="2" className="fill-current" />
        <circle cx="19" cy="12" r="2" className="fill-current" />
        <line x1="6.5" y1="11" x2="16.5" y2="5" />
      </svg>
    )
  },
  {
    id: DISPLAY, label: 'DISPLAY', icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <circle cx="12" cy="10" r="2" className="fill-current" />
      </svg>
    )
  },
  {
    id: NOT_GATE, label: 'NOT', icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinejoin="round">
        <path d="M4 4v16l11-8Z" />
        <circle cx="17" cy="12" r="1.5" />
      </svg>
    ), rotate: 90
  },
  {
    id: AND_GATE, label: 'AND', icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinejoin="round">
        <path d="M4 4h6a8 8 0 0 1 0 16H4Z" />
      </svg>
    ),
  },
  {
    id: OR_GATE, label: 'OR', icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinejoin="round">
        <path d="M4 4c3 4 3 12 0 16 6 0 12-2 16-8C16 6 10 4 4 4Z" />
      </svg>
    ),
  },
];

// Edit mode tools list
const editTools = [
  {
    id: VIEW, label: 'VIEW',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    id: SELECT,
    label: 'SELECT',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeDasharray="3 3">
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    )
  },
  {
    id: COPY_PASTE,
    label: 'COPY/PASTE',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </svg>
    )
  },
  {
    id: IMPORT_FILE,
    label: 'IMPORT',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    )
  },
  {
    id: EXPORT_FILE,
    label: 'EXPORT',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    )
  },
];

function GateMenu() {
  const selectBuildGate = useUIStore((state) => state.selectBuildGate);
  const setSelectBuildPort = usePlayerSlice((state) => state.setSelectBuildPort);
  const setSelectBuildGate = useUIStore((state) => state.setSelectBuildGate);

  const [mode, setMode] = useState('edit'); // 'build' | 'edit'
  const activeTools = mode === 'build' ? buildTools : editTools;

  const [index, setIndex] = useState(activeTools?.findIndex(tool => tool?.id === selectBuildGate) || 0);

  useEffect(() => {
    // Update index when selectBuildGate changes externally
    const newIndex = activeTools?.findIndex(tool => tool?.id === selectBuildGate);
    if (newIndex !== -1 && newIndex !== index) {
      setIndex(newIndex);
    }
  }, [selectBuildGate]);
  // Global hotkey switch listener (Tab key toggles mode)
  useEffect(() => {
    setIndex(0)

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        setIndex(0)
        setMode(prev => prev === 'build' ? 'edit' : 'build');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  useEffect(() => {
    let scrollTimeout = null;

    const handleWheel = e => {
      // Throttling prevents high-precision trackpads/mice from triggering multiple jumps rapidly
      if (scrollTimeout) return;
      setIndex((prevIndex) => {
        let nextIndex;
        if (e.deltaY > 0) {
          nextIndex = (prevIndex + 1) % activeTools.length;
        } else if (e.deltaY < 0) {
          nextIndex = (prevIndex - 1 + activeTools.length) % activeTools.length;
        } else {
          return prevIndex;
        }
        return nextIndex;
      });

      // Lock wheel scrolling for 100ms so 1 scroll tick = 1 item jump
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 100);
    };
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel); // Fixed: was addEventListener
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [activeTools]);

  useEffect(() => {
    setSelectBuildPort(null);
    setSelectBuildGate(activeTools[index]?.id);

  }, [index, mode, activeTools, setSelectBuildGate]);

  return (
    <div className="absolute bottom-0 z-10 left-2">
      <div className="grid grid-cols-[auto_1fr] gap-1 h-18">
        {/* Top Mode Toggle Bar */}
        <div className="grid grid-rows-2 items-center bg-slate-800/90 p-1 gap-2 rounded shadow-lg border border-slate-700">
          <button
            onClick={() => setMode('edit')}
            className={`flex items-center gap-2 px-2 py-1 rounded font-bold text-sm transition-all duration-200 ${mode === 'edit'
              ? 'bg-white text-slate-900 shadow-md scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}>
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode('build')}
            className={`flex items-center gap-2 px-2 py-1 rounded font-bold text-sm transition-all duration-200 ${mode === 'build'
              ? 'bg-white text-slate-900 shadow-md scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}>
            <Hammer className="w-4 h-4" />
          </button>
        </div>

        {/* Main Dock Toolbar */}
        <div className="rounded flex items-center gap-2">
          {activeTools.map((tool) => {
            const activeTool = activeTools[index]
            const Icon = tool.icon;
            const isActive = activeTool?.id === tool.id;
            return (
              <button
                key={tool.id}
                // onClick={() => setSelectedTool(tool.id)}
                className={`relative group flex flex-col items-center justify-center size-18 rounded-lg border-2 transition-all duration-150 ${isActive
                  ? 'bg-blue-50/60 border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600'}`}>
                <Icon className={`mb-1 w-7 h-7 ${isActive ? 'text-blue-600' : 'text-slate-300'} ${tool.rotate ? `rotate-${tool.rotate}` : ''}`} />
                <span className={`text-[10px] font-bold tracking-wider ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                  {tool.label}
                </span>
                {/* Hotkey Tag */}
                {tool.key &&
                  <div className={`text-[12px] font-semibold rounded-md ${isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>
                    {tool.key}
                  </div>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-2 my-1 px-2 py-1 bg-slate-900/70 text-slate-300 rounded text-sm font-medium border border-slate-800 shadow-sm">
        <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
        {mode === 'build' ? (
          <span>
            <strong className="text-white">GUIDE:</strong>  Left-click to place, Right-click to remove. Use mouse scroll wheel over dock to cycle tools.
          </span>
        ) : (
          <span>
            <strong className="text-white">GUIDE:</strong> Use mouse scroll wheel over dock to cycle tools.
          </span>
        )}
      </div>
    </div>
  );
}

export default GateMenu;