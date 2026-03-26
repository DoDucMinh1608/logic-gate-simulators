import type { ReactNode } from "react";
import DebugTerminal from "./UI/DebugTerminal";
import CurrentCameraState from "./UI/CurrentCameraState";
import CenterCursor from "./UI/CenterCursor";

function MainUI(): ReactNode {
  return (
    <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10">
      <CenterCursor />
      <DebugTerminal />
      <CurrentCameraState />
    </div>
  )
}

export default MainUI