import { getRootState, useFrame } from "@react-three/fiber"
import { useRef } from "react"


export function useThrottledFrame(callback = (state, delta) => { }, priority = 0, fps = 30) {
  const delay = 1 / fps
  const accumulator = useRef(0)

  useFrame((state, delta) => {
    accumulator.current += delta

    if (accumulator.current >= delay) {
      accumulator.current %= delay
      callback(state, accumulator.current)
    }
  }, priority)
}