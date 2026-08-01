import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'

import onMouseDown from './Canvas/CanvasEvents/onMouseDown'
import AndGate from './Canvas/Gates/AndGate'
// import NandGate from './Canvas/Gates/bk/NandGate'
// import NorGate from './Canvas/Gates/bk/NorGate'
import ClockGate from './Canvas/Gates/ClockGate'
import Display from './Canvas/Gates/Display'
import NotGate from './Canvas/Gates/NotGate'
import OrGate from './Canvas/Gates/OrGate'
import SwitchGate from './Canvas/Gates/SwitchGate'
import XorGate from './Canvas/Gates/XorGate'
import ObjectsManager from "./Canvas/ObjectsManager"
import PlayerControl from "./Canvas/PlayerControl"
import PublicCanvasState from "./Canvas/PublicCanvasState"
import WorldObjects from "./Canvas/WorldObjects"

import { useModelsSlice } from '@/store/modelStore'
import { useObjectsSlice } from '@/store/objectsSlice'
import { keyMap } from '@/utils/keyboardMap'

function Experience() {
  useEffect(() => {
    const addModel = useModelsSlice.getState().addModel
    addModel(AndGate.gate_name, AndGate)
    addModel(OrGate.gate_name, OrGate)
    addModel(NotGate.gate_name, NotGate)
    addModel(Display.gate_name, Display)
    addModel(SwitchGate.gate_name, SwitchGate)
    addModel(ClockGate.gate_name, ClockGate)
    // addModel(NandGate.gate_name, NandGate)
    // addModel(NorGate.gate_name, NorGate)ds
    addModel(XorGate.gate_name, XorGate)
    addModel(SwitchGate.gate_name, SwitchGate)

    const savedGates = localStorage.getItem("gates");
    const parsedGates = savedGates ? JSON.parse(savedGates) : {};
    if (savedGates) {
      useObjectsSlice.setState({ GATES: parsedGates });
    }
    const events = []
    for (const gateId in parsedGates) {
      const gate = parsedGates[gateId]
      if (!gate.selfCall) continue
      events.push({ gateId: gate.id })
    }
    useObjectsSlice.getState().addEvent(events)
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

