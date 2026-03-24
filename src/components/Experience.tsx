import type { ReactNode } from "react";

import Objects from "./Objects";
import Player from "./Player";
import World from "./World";

function Experience(): ReactNode {
  return (
    <>
      <Player />
      <Objects />
      <World />
    </>
  )
}

export default Experience

