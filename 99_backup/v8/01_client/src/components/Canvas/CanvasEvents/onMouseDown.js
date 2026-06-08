import { Vector3 } from "three";

import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { convertWorldCoorToGatePos, setSnapGridPosition } from "@/utils";
import { AND_GATE, CLOCK, DISPLAY, INPUT_PIN, LEFT_CLICK, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUTPUT_PIN, RIGHT_CLICK, SWITCH, TRANSISTOR_SIZE, WIRE, XOR_GATE } from "@/utils/constants";

import AndGate from "../Gates/AndGate";
import NandGate from "../Gates/NandGate";
import NorGate from "../Gates/NorGate";
import NotGate from "../Gates/NotGate";
import OrGate from "../Gates/OrGate";

import ClockGate from "../Gates/ClockGate";
import Display from "../Gates/Display";
import SwitchGate from "../Gates/SwitchGate";
import XorGate from "../Gates/XorGate";
import { mod } from "three/tsl";

const GATE_COMPONENTS = {
  [AND_GATE]: AndGate,
  [OR_GATE]: OrGate,
  [NOT_GATE]: NotGate,
  [NAND_GATE]: NandGate,
  [NOR_GATE]: NorGate,
  [XOR_GATE]: XorGate,
  [CLOCK]: ClockGate,
  [SWITCH]: SwitchGate,
  [DISPLAY]: Display
};

function placeGate(button, gatePos) {
  const addGate = useObjectsSlice.getState().addGate;
  const getGateByPosition = useObjectsSlice.getState().getGateByPosition;
  const removeGate = useObjectsSlice.getState().removeGate
  const selectBuildGate = usePlayerSlice.getState().selectBuildGate
  const setSelectPort = usePlayerSlice.getState().setSelectPort
  const setSelectBuildPort = usePlayerSlice.getState().setSelectBuildPort

  const model = GATE_COMPONENTS[selectBuildGate]
  const [x, y, z] = gatePos

  let existingGate
  for (let i = 0; i < model.size_length; i++) {
    existingGate = getGateByPosition([x, y, z + i])
    if (existingGate) break
  }
  switch (button) {
    case LEFT_CLICK:
      if (!!existingGate) {
        removeGate(existingGate.id)
      }
      break;
    case RIGHT_CLICK:
      if (!existingGate) {
        addGate({
          model,
          position: [gatePos[0], 0, gatePos[2]],
          rotation: 0,
          custom: {}
        })
      }
      break
  }
  setSelectBuildPort(null)
  setSelectPort(null)
}

function placeWire(button, gatePosition) {
  const gates = useObjectsSlice.getState().GATES
  const selectPort = usePlayerSlice.getState().selectPort
  const selectBuildPort = usePlayerSlice.getState().selectBuildPort
  const setSelectPort = usePlayerSlice.getState().setSelectPort
  const setSelectBuildPort = usePlayerSlice.getState().setSelectBuildPort

  const getGateByPosition = useObjectsSlice.getState().getGateByPosition
  const addGateConnection = useObjectsSlice.getState().addGateConnection



  const existingGate = getGateByPosition(gatePosition)
  switch (button) {
    case LEFT_CLICK:
      if (existingGate) {
        setSelectBuildPort(null)
      }
      break;
    case RIGHT_CLICK:
      if (selectPort == null) {
        return
      }

      if (!selectBuildPort) {
        setSelectBuildPort({
          gateId: selectPort?.gateId,
          pin: selectPort?.pin,
          position: selectPort?.position
        })
        return
      }

      if (selectPort.gateId === selectBuildPort.gateId && selectPort.pin === selectBuildPort.pin) {
        return
      }

      let port1Type = gates[selectPort.gateId].model.CheckPinType(selectPort.pin)
      let port2Type = gates[selectBuildPort.gateId].model.CheckPinType(selectBuildPort.pin)
      if (port1Type == port2Type) {
        return
      }

      addGateConnection(
        port1Type === OUTPUT_PIN ? selectPort : selectBuildPort,
        port2Type === INPUT_PIN ? selectBuildPort : selectPort
      )
      setSelectPort(null)
      setSelectBuildPort(null)
      break
  }
}

const position = new Vector3()
function onMouseDown(event) {
  const camera = usePlayerSlice.getState().camera; // Access the camera from the player slice
  const selectBuildGate = usePlayerSlice.getState().selectBuildGate
  const interactPosition = useUtilitySlice.getState().interactPosition; // Access the interact position from the player slice
  console.log(useUtilitySlice.getState())
  if (!camera) {
    console.warn("Camera not found in player slice.");
    return;
  }

  setSnapGridPosition(interactPosition, TRANSISTOR_SIZE, position)
  const { x, y, z } = convertWorldCoorToGatePos(position.x, position.y, position.z)

  if (selectBuildGate != WIRE) {
    placeGate(event.button, [x, y, z])
    return
  }

  if (selectBuildGate == WIRE) {
    placeWire(event.button, [x, y, z])
  }
}

export default onMouseDown;