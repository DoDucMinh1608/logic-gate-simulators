import { Grid, Plane } from "@react-three/drei";
import { useRef, type ReactNode } from "react";
import { Mesh } from "three";

const sectionSize = 0.2

function Ground(): ReactNode {
  const ref = useRef<Mesh>(null!)
  return (
    <>
      {/* <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <meshStandardMaterial color="#555555" />
      </Plane> */}
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