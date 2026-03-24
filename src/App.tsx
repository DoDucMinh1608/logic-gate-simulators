import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Experience from './components/Experience'
import MainUI from './components/MainUI'
import { keyMap } from './utils/keyboardMap'


function App() {
  return (
    <>
      <MainUI />
      <KeyboardControls map={keyMap}>
        <Canvas camera={{ fov: 75 }}>
          <Experience />
        </Canvas>
      </KeyboardControls>
    </>
  )
}

export default App
