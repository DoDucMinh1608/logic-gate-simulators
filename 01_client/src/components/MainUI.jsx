import CenterCursor from "./UI/CenterCursor";
import DebugMode from "./UI/DebugMode";
import GateMenu from "./UI/GateMenu";

function MainUI() {
  const handlePanTo = (worldX, worldZ) => {
    // Implement camera pan / controls teleport here if needed
    console.log(`Pan camera to: X=${worldX}, Z=${worldZ}`);
  };
  return (
    <>
      <DebugMode />
      {/* <CurrentCameraState /> */}
      <CenterCursor />
      <GateMenu />
      {/* <Minimap zoomRadius={100} onPanTo={handlePanTo} /> */}
    </>
  )
}

export default MainUI