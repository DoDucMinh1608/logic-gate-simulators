import { Grid } from "@react-three/drei";
import { useRef, type ReactNode } from "react";
import { Mesh } from "three";

const sectionSize = 0.1

function Ground(): ReactNode {
  const ref = useRef<Mesh>(null!)
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

export default Ground