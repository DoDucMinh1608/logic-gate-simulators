import { Grid } from "@react-three/drei";
import { useRef } from "react";

function Ground() {
  const ref = useRef()
  return (
    <>
      <Grid
        name="world_ground"
        args={[500, 500]}
        ref={ref}
        cellSize={1}
        sectionSize={5}
        sectionColor={0x000000}
        cellColor={0x101010}
        fadeStrength={1}
      />
    </>
  )
}

export default Ground