import type { ReactNode } from "react";

import ObjectsManager from "./Canvas/ObjectsManager";
import PlayerControl from "./Canvas/PlayerControl";
import PublicCanvasState from "./Canvas/PublicCanvasState";
import WorldObjects from "./Canvas/WorldObjects";

function Experience(): ReactNode {
  return (
    <>
      <PublicCanvasState />
      <PlayerControl />
      <ObjectsManager />
      <WorldObjects />
    </>
  )
}

export default Experience

