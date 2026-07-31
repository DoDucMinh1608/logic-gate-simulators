import { Vector3 } from "three";

import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";
import { useUtilitySlice } from "@/store/utilitiesSlice";
import { convertWorldCoorToGatePos, setSnapGridPosition } from "@/utils";
import { AND_GATE, CLOCK, DISPLAY, INPUT_PIN, LEFT_CLICK, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUTPUT_PIN, REVERSE, RIGHT_CLICK, SWITCH, TRANSISTOR_SIZE, WIRE, XOR_GATE } from "@/utils/constants";

import AndGate from "../Gates/AndGate";
import NandGate from "../Gates/bk/NandGate";
import NorGate from "../Gates/bk/NorGate";
import NotGate from "../Gates/NotGate";
import OrGate from "../Gates/OrGate";

import { useModelsSlice } from "@/store/modelStore";
import { useUIStore } from "@/store/uiStore";
import ClockGate from "../Gates/ClockGate";
import Display from "../Gates/Display";
import SwitchGate from "../Gates/SwitchGate";
import XorGate from "../Gates/XorGate";

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
  const selectBuildGate = useUIStore.getState().selectBuildGate
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
          rotation: 0
        })
      }
      break
  }
  setSelectBuildPort(null)
  setSelectPort(null)
}

function setNotIndicatorVisibility(button) {
  const selectPort = usePlayerSlice.getState().selectPort
  const setPortStatus = useObjectsSlice.getState().setPortStatus
  const setSelectPort = usePlayerSlice.getState().setSelectPort

  if (selectPort == null) {
    setSelectPort(null)
    return
  }

  const gate = useObjectsSlice.getState().GATES[selectPort.gateId]
  if (gate.model_name !== NOT_GATE) {
    switch (button) {
      case LEFT_CLICK:
        setPortStatus(selectPort.gateId, selectPort.pin, false)
        break
      case RIGHT_CLICK:
        setPortStatus(selectPort.gateId, selectPort.pin, true)
        break
    }
  }
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
      // if user hasnt select a pin, do nothing
      if (selectPort == null) {
        return
      }

      // if user have selected a pin, save it as 1st pin
      if (!selectBuildPort) {
        setSelectBuildPort({
          gateId: selectPort?.gateId,
          pin: selectPort?.pin,
          position: selectPort?.position
        })
        return
      }

      // 
      if (selectPort.gateId === selectBuildPort.gateId && selectPort.pin === selectBuildPort.pin) {
        return
      }

      const getModelById = useModelsSlice.getState().getModelById
      let port1Model = getModelById(gates[selectPort.gateId].model_name)
      let port2Model = getModelById(gates[selectBuildPort.gateId].model_name)

      let port1Type = port1Model.CheckPinType(selectPort.pin)
      let port2Type = port2Model.CheckPinType(selectBuildPort.pin)
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
  const selectBuildGate = useUIStore.getState().selectBuildGate
  const interactPosition = useUtilitySlice.getState().interactPosition; // Access the interact position from the player slice
  const gateInteractPosition = useUtilitySlice.getState().gateInteractPosition; // Access the interact position from the player slice

  if (!camera) {
    console.warn("Camera not found in player slice.");
    return;
  }

  let vector
  switch (selectBuildGate) {
    case REVERSE:
      setSnapGridPosition(interactPosition, TRANSISTOR_SIZE, position);
      vector = convertWorldCoorToGatePos(position.x, position.y, position.z)
      setNotIndicatorVisibility(event.button, [vector.x, vector.y, vector.z])
      break;
    case WIRE:
      setSnapGridPosition(interactPosition, TRANSISTOR_SIZE, position);
      vector = convertWorldCoorToGatePos(position.x, position.y, position.z)
      placeWire(event.button, [vector.x, vector.y, vector.z])
      break
    default:
      setSnapGridPosition(gateInteractPosition, TRANSISTOR_SIZE, position)
      vector = convertWorldCoorToGatePos(position.x, position.y, position.z)
      placeGate(event.button, [vector.x, vector.y, vector.z])
      break;
  }
  localStorage.setItem("gates", JSON.stringify(useObjectsSlice.getState().GATES));

}

export default onMouseDown;