import { useEffect } from "react";

import { usePlayerSlice } from "@/store/playerSlice";

function DebugMode() {
  const setExecuteNextStep = usePlayerSlice(state => state.setExecuteNextStep)
  const setDebugMode = usePlayerSlice(state => state.setDebugMode)
  const isDebugMode = usePlayerSlice(state => state.isDebugMode)

  useEffect(function () {
    const handleKeyDown = (event) => {
      // console.log(event.code)
      if (event.code === "Digit1") {
        setDebugMode(false)
        setExecuteNextStep(false)
      }
      if (event.code === "Digit2") {
        setDebugMode(true)
        setExecuteNextStep(false)
      }
      if (event.code === "KeyE" && isDebugMode) {
        setExecuteNextStep(true)
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])
  return (
    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-10 grid gap-x-5 grid-cols-2 p-2 text-center mt-2 rounded-2xl">
      <div className={["p-2 border font-bold rounded-lg", !isDebugMode ? "bg-black text-white" : "bg-gray-50 text-black"].join(" ")}>
        NORMAL (1)
      </div>
      <div className={["p-2 border font-bold rounded-lg", isDebugMode ? "bg-black text-white" : "bg-gray-50 text-black"].join(" ")}>
        DEBUG (2)
      </div>
      {isDebugMode && (
        <div className="col-span-2 my-1">
          Press E to go to the next state
        </div>
      )}
    </div>
  )
}

export default DebugMode