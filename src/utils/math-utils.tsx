import type { Vec3 } from "./types";

export function getDegrees(direction: Vec3) {
  if (!direction) return { yaw: 0, pitch: 0 };

  // 1. Calculate Yaw (Horizontal)
  // atan2(x, z) gives the angle in the XZ plane
  let yaw = Math.atan2(direction.x, direction.z) * (180 / Math.PI);

  // 2. Calculate Pitch (Vertical)
  // We calculate the angle between the vector and the XZ plane
  const horizontalDist = Math.sqrt(direction.x ** 2 + direction.z ** 2);
  let pitch = Math.atan2(direction.y, horizontalDist) * (180 / Math.PI);

  // Optional: Normalize yaw to 0-360 range
  yaw = (yaw + 360) % 360;

  return {
    yaw: yaw.toFixed(2),
    pitch: pitch.toFixed(2)
  };
};