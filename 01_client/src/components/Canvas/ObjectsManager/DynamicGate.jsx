export default function DynamicGate({ model, ...props }) {
  // 1. Parse dimensions or fallback to defaults if they aren't specified in your custom imports
  const length = model.size_length || 1;
  const width = model.size_width || 1;
  const height = model.size_height || 0.5;
  const baseColor = model.color || "#222222"; // ICs are usually dark grey/black

  // 2. Compute dynamic pin layouts based on inputs/outputs schema
  const inputPins = useMemo(() => Object.keys(inputs), [inputs]);
  const outputPins = useMemo(() => Object.keys(outputs), [outputs]);

  const Model = model
  console.log(model

  )
  return (
    <>
      <Model {...props} />
      {/* Main IC Chip Body */}
      {/* <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, length]} />
        <meshStandardMaterial color={baseColor} roughness={0.4} />
      </mesh> */}

      {/* Render Text Label */}
      {/* You can use <Text> from @react-three/drei here to display model.gate_name */}

      {/* Dynamically Render Input Pins (Cylinders/Boxes along the left edge) */}
      {/* {inputPins.map((pinName, index) => {
        // Calculate pin spacing layout automatically based on number of pins
        const zOffset = inputPins.length > 1
          ? (index / (inputPins.length - 1) - 0.5) * (length * 0.8)
          : 0;

        return (
          <mesh key={`in-${pinName}`} position={[-width / 2 - 0.1, 0, zOffset]}>
            <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
            <meshStandardMaterial color="#888888" metalness={0.8} />
          </mesh>
        );
      })} */}

      {/* Dynamically Render Output Pins (Cylinders/Boxes along the right edge) */}
      {/* {outputPins.map((pinName, index) => {
        const zOffset = outputPins.length > 1
          ? (index / (outputPins.length - 1) - 0.5) * (length * 0.8)
          : 0;

        return (
          <mesh key={`out-${pinName}`} position={[width / 2 + 0.1, 0, zOffset]}>
            <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
            <meshStandardMaterial color="#888888" metalness={0.8} />
          </mesh>
        );
      })} */}
    </>
  );
}