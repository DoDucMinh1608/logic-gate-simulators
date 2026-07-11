export default function DynamicGate({ model, ...props }) {
  const Model = model

  return (
    <>
      <Model {...props} />
    </>
  );
}