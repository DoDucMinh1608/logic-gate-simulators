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
  result.set(
    Math.floor(position.x / size.x) * size.x + size.x / 2,
    Math.floor(position.y / size.y) * size.y + size.y / 2,
    Math.floor(position.z / size.z) * size.z + size.z / 2,
  )
  return result
}