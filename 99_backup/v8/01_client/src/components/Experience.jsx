import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import onMouseDown from './Canvas/CanvasEvents/onMouseDown'
import ObjectsManager from "./Canvas/ObjectsManager"
import PlayerControl from "./Canvas/PlayerControl"
import PublicCanvasState from "./Canvas/PublicCanvasState"
import WorldObjects from "./Canvas/WorldObjects"

import { keyMap } from '@/utils/keyboardMap'

function Experience() {
  return (
    <>
      <KeyboardControls map={keyMap}>
        <Canvas
          camera={{ fov: 90, position: [0, 1.5, 0] }}
          onMouseDown={e => onMouseDown(e)}>
          <PublicCanvasState />
          <PlayerControl />
          <ObjectsManager />
          <WorldObjects />
        </Canvas >
      </KeyboardControls >
    </>
  )
}

export default Experience

