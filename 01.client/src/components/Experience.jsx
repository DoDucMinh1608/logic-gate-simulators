import ObjectsManager from "./Canvas/ObjectsManager"
import PlayerControl from "./Canvas/PlayerControl"
import PublicCanvasState from "./Canvas/PublicCanvasState"
import WorldObjects from "./Canvas/WorldObjects"

function Experience() {
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

