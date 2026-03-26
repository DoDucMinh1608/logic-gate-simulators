import { type ReactNode } from "react";

import CenterCursor from "./UI/CenterCursor";
import CurrentCameraState from "./UI/CurrentCameraState";
import DebugTerminal from "./UI/DebugTerminal";

function MainUI(): ReactNode {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 w-full h-full z-10"
      onContextMenu={e => e.preventDefault()}>
      <CenterCursor />
      <DebugTerminal />
      <CurrentCameraState />
    </div>
  )
}

export default MainUI