import { ContactShadows, Sky } from "@react-three/drei";

function LightSource() {
  return (
    <>
      <ambientLight intensity={1} />
      {/* <pointLight position={[0, 10, 10]} /> */}
    </>
  );
}

export default LightSource;