import type { ReactNode } from "react";

import Ground from "./Ground";
import LightSource from "./LightSource";

function WorldObjects(): ReactNode {
  return (
    <>
      <Ground />
      <LightSource />
    </>
  )
}

export default WorldObjects