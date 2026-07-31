import { Line } from "@react-three/drei"
import { useState } from "react"

import { useObjectsSlice } from "@/store/objectsSlice"
import { usePlayerSlice } from "@/store/playerSlice"
import { LEFT_CLICK, WIRE } from "@/utils/constants"
import { useUIStore } from "@/store/uiStore"

function onConnectWireClick(id) {
  const selectBuildGate = useUIStore.getState().selectBuildGate
  const removeWire = useObjectsSlice.getState().removeWire

  if (selectBuildGate == WIRE) {
    removeWire(id)
  }
}

function ConnectWire({ obj, status, ...props }) {
  const [hover, setHover] = useState(false)
  return (
    <>
      <Line
        {...props}
        points={obj.positions}
        lineWidth={10}
        onPointerEnter={e => { setHover(true) }}
        onPointerLeave={e => { setHover(false) }}
        onClick={e => {
          e.stopPropagation()
          if (e.button == LEFT_CLICK) {
            onConnectWireClick(obj)
          }
        }}
        color={status ? "red" : "blue"}
      />
      {hover && <Line
        {...props}
        points={obj.positions}
        lineWidth={5}
        color={0xffffff}
      />}
    </>
  )
}

export default ConnectWire