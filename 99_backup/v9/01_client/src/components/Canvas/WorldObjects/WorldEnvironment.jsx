import { ContactShadows, Environment, Sky } from "@react-three/drei";

function WorldEnvironment() {
  return (
    <>
      <Environment blur={0.5} preset="studio" />
      {/* <color attach="background" args={['#000000']} /> */}
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      {/* <Sky
        sunPosition={[0, -.0001, 0]}
        turbidity={100}
        rayleigh={5}
        mieCoefficient={0.005}
      /> */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4.5}
      /> */}
    </>
  )
}

export default WorldEnvironment