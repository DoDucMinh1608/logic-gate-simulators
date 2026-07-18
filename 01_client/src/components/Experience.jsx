import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import onMouseDown from './Canvas/CanvasEvents/onMouseDown'
import ObjectsManager from "./Canvas/ObjectsManager"
import PlayerControl from "./Canvas/PlayerControl"
import PublicCanvasState from "./Canvas/PublicCanvasState"
import WorldObjects from "./Canvas/WorldObjects"

import { keyMap } from '@/utils/keyboardMap'
import { useEffect } from 'react'
import { useObjectsSlice } from '@/store/objectsSlice'
import { useModelsSlice } from '@/store/modelStore'

import OrGate from './Canvas/Gates/OrGate'
import AndGate from './Canvas/Gates/AndGate'
import NotGate from './Canvas/Gates/NotGate'
import Display from './Canvas/Gates/Display'
import SwitchGate from './Canvas/Gates/SwitchGate'
import ClockGate from './Canvas/Gates/ClockGate'
import NandGate from './Canvas/Gates/bk/NandGate'
import NorGate from './Canvas/Gates/bk/NorGate'
import XorGate from './Canvas/Gates/XorGate'



function Experience() {
  useEffect(() => {
    const addModel = useModelsSlice.getState().addModel
    addModel(AndGate.gate_name, AndGate)
    addModel(OrGate.gate_name, OrGate)
    addModel(NotGate.gate_name, NotGate)
    addModel(Display.gate_name, Display)
    addModel(SwitchGate.gate_name, SwitchGate)
    addModel(ClockGate.gate_name, ClockGate)
    addModel(NandGate.gate_name, NandGate)
    addModel(NorGate.gate_name, NorGate)
    addModel(XorGate.gate_name, XorGate)
    addModel(SwitchGate.gate_name, SwitchGate)
    // console.log('Models loaded:', useModelsSlice.getState().MODELS)

    const savedGates = localStorage.getItem("gates");
    const result = {}
    if (savedGates) {
      const parsedGates = JSON.parse(savedGates);
      useObjectsSlice.setState({ GATES: parsedGates });
    }
  }, [])
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

