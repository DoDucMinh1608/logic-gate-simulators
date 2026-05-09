import { useEffect } from "react";

import { usePlayerSlice } from "@/store/playerSlice";

function DebugMode() {
  const setExecuteNextStep = usePlayerSlice(state => state.setExecuteNextStep)

  useEffect(function () {

    const handleKeyDown = (event) => {
      // Check for a specific key (e.g., "Enter" or "KeyS")
      if (event.code === "KeyE") {
        setExecuteNextStep(true)
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [])
}

export default DebugMode