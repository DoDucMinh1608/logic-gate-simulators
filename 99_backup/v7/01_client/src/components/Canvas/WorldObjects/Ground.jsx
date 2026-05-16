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
        sectionColor={0x080808}
        cellColor={0x101010}
        fadeStrength={.8}
        side={2}
      />
    </>
  )
}

export default Ground