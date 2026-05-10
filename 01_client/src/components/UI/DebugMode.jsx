import { useEffect } from "react";

import { usePlayerSlice } from "@/store/playerSlice";

function DebugMode() {
  const setExecuteNextStep = usePlayerSlice(state => state.setExecuteNextStep)
  useEffect(function () {
    const handleKeyDown = (event) => {
      if (event.code === "KeyE") {
        setExecuteNextStep(true)
      }
      if (event.code === "KeyC") {
        console.log('test')
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])
  return (
    <>
    </>
  )
}

export default DebugMode