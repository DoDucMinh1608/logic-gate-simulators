import { Grid } from "@react-three/drei";
import { useRef } from "react";

const sectionSize = 0.2
function Ground() {
  const ref = useRef()
  return (
    <>
      <Grid
        name="world_ground"
        args={[50, 50]}
        ref={ref}
        cellSize={0.10}
        sectionSize={sectionSize}
        sectionColor={0x000000}
        cellColor={0x101010}
        fadeStrength={15}
      />
    </>
  )
}

export default Ground