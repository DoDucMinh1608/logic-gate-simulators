// import { Line } from "@react-three/drei"
// import { useState } from "react"

// import { useObjectsSlice } from "@/store/objectsSlice"
// import { usePlayerSlice } from "@/store/playerSlice"
// import { LEFT_CLICK, WIRE } from "@/utils/constants"
// import { useUIStore } from "@/store/uiStore"

// function onConnectWireClick(id) {
//   const selectBuildGate = useUIStore.getState().selectBuildGate
//   const removeWire = useObjectsSlice.getState().removeWire

//   if (selectBuildGate == WIRE) {
//     removeWire(id)
//   }
// }

// function ConnectWire({ obj, status, ...props }) {
//   const [hover, setHover] = useState(false)
//   return (
//     <>
//       <Line
//         {...props}
//         points={obj.positions}
//         lineWidth={10}
//         onPointerEnter={e => { setHover(true) }}
//         onPointerLeave={e => { setHover(false) }}
//         onClick={e => {
//           e.stopPropagation()
//           if (e.button == LEFT_CLICK) {
//             onConnectWireClick(obj)
//           }
//         }}
//         color={status ? "red" : "blue"}
//       />
//       {hover && <Line
//         {...props}
//         points={obj.positions}
//         lineWidth={5}
//         color={0xffffff}
//       />}
//     </>
//   )
// }

// export default ConnectWire
import { Line } from "@react-three/drei"
import { useMemo, useState } from "react"
import * as THREE from "three"

import { useObjectsSlice } from "@/store/objectsSlice"
import { useUIStore } from "@/store/uiStore"
import { LEFT_CLICK, WIRE } from "@/utils/constants"

function onConnectWireClick(obj) {
  const selectBuildGate = useUIStore.getState().selectBuildGate
  const removeWire = useObjectsSlice.getState().removeWire

  if (selectBuildGate === WIRE) {
    removeWire(obj.id || obj)
  }
}

/**
 * Utility: Merges segmented points [[p1, p2], [p2, p3]] 
 * into one continuous array [p1, p2, p3] without duplicate joint points.
 */
function mergeSegmentsToPath(positions) {
  if (!positions || positions.length === 0) return []

  // If positions is already a 1D list of points, return it directly
  if (!Array.isArray(positions[0][0])) {
    return positions.map((p) => (Array.isArray(p) ? new THREE.Vector3(...p) : p))
  }

  const path = []

  positions.forEach((segment, index) => {
    const start = Array.isArray(segment[0]) ? new THREE.Vector3(...segment[0]) : segment[0]
    const end = Array.isArray(segment[1]) ? new THREE.Vector3(...segment[1]) : segment[1]

    if (index === 0) {
      path.push(start)
    }
    path.push(end)
  })

  return path
}

function ConnectWire({ obj, status, smooth = true, ...props }) {
  const [hovered, setHovered] = useState(false)

  // Generate 1 single continuous path array for the entire wire
  const unifiedPoints = useMemo(() => {
    const mergedPath = mergeSegmentsToPath(obj.positions)

    if (mergedPath.length < 2) return []

    // Return linear points or convert to a single CatmullRom curve
    if (!smooth) return mergedPath

    const curve = new THREE.CatmullRomCurve3(mergedPath)
    return curve.getPoints(32) // Rendered as 1 seamless line mesh
  }, [obj.positions, smooth])

  const wireColor = useMemo(() => {
    if (hovered) return "#facc15" // Highlight
    if (status) return "#ef4444"  // Powered High
    return "#3b82f6"             // Default Low
  }, [hovered, status])

  return (
    <group>
      {/* Invisible thick raycast area for easy clicking */}
      <Line
        {...props}
        points={unifiedPoints}
        lineWidth={24}
        transparent
        opacity={0}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (e.button === LEFT_CLICK) {
            onConnectWireClick(obj)
          }
        }}
      />

      {/* ONE continuous wire mesh */}
      <Line
        {...props}
        points={unifiedPoints}
        lineWidth={hovered ? 10 : 5}
        color={wireColor} />
    </group>
  )
}

export default ConnectWire