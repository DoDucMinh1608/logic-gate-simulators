import type { ReactNode } from "react";

import { useStore } from "../store/useStore";

function ScreenUI(): ReactNode {
  const camera = useStore(state => state.camera)
  return (
    <>
      <div className="absolute left-1/2 top-1/2 -translate-1/2 size-3 bg-black opacity-50">
      </div>
      <div className="absolute left-0 top-0 translate-x-2 grid grid-cols-2 bg-white p-2">
        <div>
          Position:<br />
          <p className="pl-5">
            x: {camera?.position.x.toFixed(2).padEnd(5, ' ')}
            <br />
            y: {camera?.position.y.toFixed(2).padEnd(5, ' ')}
            <br />
            z: {camera?.position.z.toFixed(2).padEnd(5, ' ')}
          </p>
        </div>
        <div>
          Direction <br />
          <div className="pl-5">
            x: {camera?.direction.x.toFixed(2).padEnd(5, ' ')}
            <br />
            y: {camera?.direction.y.toFixed(2).padEnd(5, ' ')}
            <br />
            z: {camera?.direction.z.toFixed(2).padEnd(5, ' ')}
          </div>
        </div>
      </div>
    </>

  )
}

export default ScreenUI