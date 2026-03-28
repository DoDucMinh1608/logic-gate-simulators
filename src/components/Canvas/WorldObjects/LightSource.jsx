function LightSource() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 10, 0]} />
    </>
  );
}

export default LightSource;