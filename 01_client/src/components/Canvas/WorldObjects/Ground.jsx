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
        sectionColor={0x505050}
        cellColor={0xA0A0A0}
        fadeStrength={.8}
        side={2}
      />
    </>
  )
}

export default Ground