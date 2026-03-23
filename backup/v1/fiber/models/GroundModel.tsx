import { Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import { Mesh } from "three";

import { useStore } from "../../store/useStore";

const sectionSize = 2
const updateSize = sectionSize * 5
function GroundModel(): ReactNode {
  const ref = useRef<Mesh>(null!)

  const cameraPos = useStore(state => state.camera?.position)
  useFrame(() => {
    ref.current.position.set(
      Math.floor((cameraPos?.x || 0) / updateSize) * updateSize,
      -0.000001,
      Math.floor((cameraPos?.z || 0) / updateSize) * updateSize)
  })
  return (
    <Grid
      args={[50, 50]}
      ref={ref}
      cellSize={0.05}
      sectionSize={sectionSize}
      sectionColor={0x000000}
      cellColor={0x101010}
      fadeStrength={15}
    />
  )
}

export default GroundModel