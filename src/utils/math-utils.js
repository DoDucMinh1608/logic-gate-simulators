import { NORMAL_VALUE } from "./constants";

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