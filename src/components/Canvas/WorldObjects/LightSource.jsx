import { ContactShadows, Sky } from "@react-three/drei";

function LightSource() {
  return (
    <>
      <ambientLight intensity={0.2} />
      {/* <pointLight position={[0, 10, 10]} /> */}
    </>
  );
}

export default LightSource;