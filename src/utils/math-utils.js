import { Vector3 } from "three";
import { NORMAL_VALUE } from "./constants";
import Transistor from "@/components/Canvas/ObjectsManager/Transistor";

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

export function testSnapPos(objectPosition, lookingPos, size, result) {
  try {
    const
      x0 = lookingPos.x > objectPosition.x ? 1 : -1,
      y0 = lookingPos.y > objectPosition.y ? 1 : -1,
      z0 = lookingPos.z > objectPosition.z ? 1 : -1
    result.set(
      Math.floor(lookingPos.x / size.x) * size.x + size.x / 2 * x0,
      Math.floor(lookingPos.y / size.y) * size.y + size.y / 2 * y0,
      Math.floor(lookingPos.z / size.z) * size.z + size.z / 2 * z0,
    )
    // if (lookingPos.z > objectPosition.z) {
    // } else {
    //   result.set(
    //     Math.floor(lookingPos.x / size.x) * size.x + size.x / 2,
    //     Math.floor(lookingPos.y / size.y) * size.y + size.y / 2,
    //     Math.floor(lookingPos.z / size.z) * size.z - size.z / 2,
    //   )
    // }
    // result.addScalar(NORMAL_VALUE)
  } catch (error) {

  }
}
export function setSnapGridPosition(position, display_size, result) {
  try {

    result.set(
      Math.floor(position.x / display_size.x) * display_size.x + display_size.x / 2,
      Math.floor(position.y / display_size.y) * display_size.y + display_size.y / 2,
      Math.floor(position.z / display_size.z) * display_size.z + display_size.z / 2,
    ).addScalar(NORMAL_VALUE)
  } catch (error) {
    console.log(position, display_size, result)
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

const prefixVec = new Vector3(0.5, 0, 0.5)
const prefixVec2 = new Vector3(0.1, 0.01, 0.1)
const prefixVec3 = new Vector3(2, 0, 2)
const prefixVec4 = new Vector3(0, 0.005, 0)
export function calculateGatePosition(x, y = 0, z) {
  return new Vector3(x, y, z)
    .add(prefixVec)
    .multiply(Transistor.gridSize)
}
export function calculateWirePosition(x, y = 0, z) {
  return new Vector3(x, y, z)
    .multiply(prefixVec2)
    .add(prefixVec4)
}

export function convertGatePosToWirePos(x, y, z) {
  return new Vector3(x, y, z)
    .addScalar(0.5)
    .multiply(prefixVec3)
}