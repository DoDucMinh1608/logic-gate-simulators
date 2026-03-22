import type { Vector3 } from "three"

export type Vec3 = [number, number, number]
export type Vec4 = [number, number, number, number]

export type CameraInfo = {
  position: Vector3,
  direction: Vector3
}