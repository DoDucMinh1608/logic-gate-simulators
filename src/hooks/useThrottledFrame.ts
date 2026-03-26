import { useFrame, type RootState } from '@react-three/fiber'
import { useRef } from 'react'

export function useThrottledFrame(callback: (state: RootState, delta: number) => void, priority = 0, fps = 30) {
  const delay = 1 / fps
  const accumulator = useRef(0)

  useFrame((state, delta) => {
    accumulator.current += delta

    if (accumulator.current >= delay) {
      callback(state, accumulator.current)
      accumulator.current %= delay
    }
  })
}