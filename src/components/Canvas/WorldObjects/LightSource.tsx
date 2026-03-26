import type { ReactNode } from "react";

function LightSource(): ReactNode {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  );
}

export default LightSource;