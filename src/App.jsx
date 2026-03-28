import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import onMouseDown from './components/Canvas/CanvasEvents/onMouseDown'
import Experience from './components/Experience'
import MainUI from './components/MainUI'
import { keyMap } from './utils/keyboardMap'

function App() {
  return (
    <>
      <MainUI />
      <KeyboardControls map={keyMap}>
        <Canvas
          camera={{ fov: 75, position: [2, 2, 2], far: 1000 }}
          onMouseDown={e => onMouseDown(e)}>
          <Experience />
        </Canvas>
      </KeyboardControls>
    </>
  )
}

export default App
