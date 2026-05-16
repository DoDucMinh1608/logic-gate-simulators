import { useEffect } from "react"

import { useObjectsSlice } from "@/store/objectsSlice"
import { usePlayerSlice } from "@/store/playerSlice"
import { getDegrees } from "@/utils"

function CurrentCameraState() {
  const camera = usePlayerSlice(state => state.camera)
  const angles = getDegrees(camera?.direction)

  useEffect(function () {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        // Prevent the browser's default "Save Page As..." dialog
        event.preventDefault();
        console.log(JSON.stringify(useObjectsSlice.getState().GATES))
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])
  return (
    <div className="font-mono absolute  right-0 top-0 translate-x-2 flex bg-[rgba(255,255,255,0.5)] p-3 gap-5 z-10">
      <div>
        Position:<br />
        <p className="pl-5 grid grid-cols-2 gapx-5">
          <span>x: </span><span>{camera?.position.x.toFixed(2).padStart(5, '\u00A0')}</span>
          <span>y: </span><span>{camera?.position.y.toFixed(2).padStart(5, '\u00A0')}</span>
          <span>z: </span><span>{camera?.position.z.toFixed(2).padStart(5, '\u00A0')}</span>
        </p>
      </div>
      <div>
        Direction <br />
        <div className="pl-5 grid grid-cols-2 gapx-5">
          <span>yaw:</span><span>{angles.yaw.toFixed(2).padStart(5, '\u00A0')}°</span>
          <span>pitch:</span><span>{angles.pitch.toFixed(2).padStart(5, '\u00A0')}°</span>
        </div>
      </div>
    </div >
  )
}

export default CurrentCameraState