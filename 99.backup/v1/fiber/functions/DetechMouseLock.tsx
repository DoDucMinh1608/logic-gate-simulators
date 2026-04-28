import { useEffect, type ReactNode } from "react";

import { useStore } from "../../store/useStore";

function ObjectRender(): ReactNode {
  const setMouseLock = useStore(state => state.setMouseLock)
  useEffect(function () {
    const handleLockChange = () => {
      if (document.pointerLockElement === null) {
        setMouseLock(false)
      } else {
        setMouseLock(true)
      }
    };
    document.addEventListener("pointerlockchange", handleLockChange);
    return () => document.removeEventListener("pointerlockchange", handleLockChange);
  }, [])

  return;
}

export default ObjectRender