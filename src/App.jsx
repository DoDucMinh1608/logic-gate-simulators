import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import onMouseDown from './components/Canvas/CanvasEvents/onMouseDown'
import Experience from './components/Experience'
import MainUI from './components/MainUI'
import { keyMap } from './utils/keyboardMap'
import { Suspense } from 'react'

function App() {
  return (
    <>
      <MainUI />
      <KeyboardControls map={keyMap}>
        <Canvas
          camera={{ fov: 90, position: [0, 1.5, 0] }}
          onMouseDown={e => onMouseDown(e)}>
          <Suspense fallback={<mesh><boxGeometry /><meshBasicMaterial color="orange" /></mesh>}>
            <Experience />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  )
}

export default App
