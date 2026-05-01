import { Vector3 } from "three";
import { AND_GATE, CLOCK, DISPLAY, IN_A, IN_B, INPUT_PIN, INVALID_PIN, NAND_GATE, NOR_GATE, NOT_GATE, OR_GATE, OUT_Q, OUTPUT_PIN, SWITCH, TRANSISTOR_SIZE, XOR_GATE } from "./constants";
import { useObjectsSlice } from "@/store/objectsSlice";

export function getDegrees(direction) {
  if (!direction) return { yaw: 0, pitch: 0 };

  let yaw = Math.atan2(direction.x, direction.z) * (180 / Math.PI);

  const horizontalDist = Math.sqrt(direction.x ** 2 + direction.z ** 2);
  let pitch = Math.atan2(direction.y, horizontalDist) * (180 / Math.PI);

  yaw = (yaw + 360) % 360;

  return { yaw, pitch };
};

export function getLookingPositionOnPlane(state, plane, result) {
  state.raycaster.setFromCamera(state.pointer, state.camera)
  state.raycaster.ray.intersectPlane(plane, result)
  return result
}

export function setSnapGridPosition(position, size, result) {
  if (position == null) return
  try {
    result.set(
      Math.floor(position.x / size.x) * size.x + size.x / 2,
      Math.floor(position.y / size.y) * size.y + size.y / 2,
      Math.floor(position.z / size.z) * size.z + size.z / 2,
    )
  } catch (error) {
    console.log(position, size, result)
    console.log(error)
  }
  return result
}

export function calculateIntPosition(position, scale, result) {
  result.set(
    Math.floor(position.x / scale.x),
    Math.floor(position.y / scale.y),
    Math.floor(position.z / scale.z)
  )
  return result
}

const prefixVec = new Vector3(0.5, 0.0001, 0.5)
export function convertGatePosToWorldCoor(x, y = 0, z, result = new Vector3()) {
  return result.set(x, y, z)
    .add(prefixVec)
    .multiply(TRANSISTOR_SIZE)
}

const prefixVec5 = prefixVec.clone().multiplyScalar(-1)
export function convertWorldCoorToGatePos(x, y, z, result = new Vector3()) {
  result.set(x, y, z)
    .divide(TRANSISTOR_SIZE)
    .add(prefixVec5)
  result.set(Math.round(result.x), Math.round(result.y), Math.round(result.z))
  return result
}

export function GetWirePosFromGatePos1(x, y, z) {
  return {
    in_A: [
      [x * 5 + 0.5, 0, z * 5 + 2],
      [x * 5 + 1, 0, z * 5 + 2],
    ],
    in_B: [
      [x * 5 + 0.5, y, z * 5 + 3],
      [x * 5 + 1, y, z * 5 + 3],
    ],
    out_Q: [
      [x * 5 + 4, y, z * 5 + 2.5],
      [x * 5 + 4.75, y, z * 5 + 2.5],
    ]
  }
}

export function GetWirePosFromGatePos2(x, y, z) {
  return {
    in_A: [
      [x * 5 + 0.5, y, z * 5 + 2.5],
      [x * 5 + 1, y, z * 5 + 2.5],
    ],
    out_Q: [
      [x * 5 + 4, y, z * 5 + 2.5],
      [x * 5 + 4.75, y, z * 5 + 2.5],
    ]
  }
}

export function ConnectToPosition(startWire, endWire) {
  const [ss, se] = startWire
  const [es, ee] = endWire

  return [
    ...startWire,
    [se[0], se[1], es[2]],
    ...endWire
  ]
}

export function CheckPinType(gateId, pin) {
  const gate = useObjectsSlice.getState().GATES[gateId]

  switch (gate.type) {
    case AND_GATE:
    case OR_GATE:
    case NAND_GATE:
    case NOR_GATE:
    case XOR_GATE:
      if (pin === IN_A || pin === IN_B) return INPUT_PIN
      if (pin === OUT_Q) return OUTPUT_PIN
      return INVALID_PIN
    case NOT_GATE:
    case DISPLAY:
      if (pin === IN_A) return INPUT_PIN
      if (pin === OUT_Q) return OUTPUT_PIN
      return INVALID_PIN
    case SWITCH:
    case CLOCK:
      if (pin === OUT_Q) return OUTPUT_PIN
      return INVALID_PIN
    default:
      return INVALID_PIN
  }
}