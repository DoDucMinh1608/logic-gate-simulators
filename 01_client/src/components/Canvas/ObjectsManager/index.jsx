import { Environment } from "@react-three/drei";
import RenderObject from "./RenderObject";
import UpdateGateStatus from "./UpdateGateStatus";
import UpdateWireStatus from "./UpdateWireStatus";

function ObjectsManager() {


  return (
    <>
      <RenderObject />
      <UpdateGateStatus />
      <UpdateWireStatus />
    </>

  )
}
export default ObjectsManager