import { PointerLockControls } from '@react-three/drei'
import { useEffect } from 'react'

import { usePlayerSlice } from '@/store/playerSlice'

export default function PointerLockGlobal() {
  const setMouseLock = usePlayerSlice(state => state.setMouseLock)

  useEffect(() => {
    const handleLockChange = () => {
      const isLocked = !!document.pointerLockElement
      setMouseLock(isLocked) // Update the global Zustand store
    }

    document.addEventListener('pointerlockchange', handleLockChange)
    return () => document.removeEventListener('pointerlockchange', handleLockChange)
  }, [setMouseLock])

  return (
    <PointerLockControls />
  )
}