import { useEffect, useRef } from 'react';

import { useObjectsSlice } from "@/store/objectsSlice";
import { usePlayerSlice } from "@/store/playerSlice";

export default function Minimap({ zoomRadius = 25, onPanTo }) {
  const canvasRef = useRef(null);

  // Subscribe to object and player stores
  const objects = useObjectsSlice((state) => state.GATES) || {};
  const camera = usePlayerSlice((state) => state.camera);

  useEffect(() => {
    let animationFrameId;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Current player position (defaults to 0,0,0 if not set)
      const px = camera?.position?.x || 0;
      const pz = camera?.position?.z || 0;
      const pDir = camera?.direction;

      // Clear Background
      ctx.fillStyle = '#0f172a'; // Slate-900
      ctx.fillRect(0, 0, width, height);

      // Map Relative World Coordinates to Canvas Pixels (Player @ Center)
      const worldToCanvas = (wx, wz) => {
        const relX = wx - px;
        const relZ = wz - pz;

        const cx = centerX + (relX / zoomRadius) * centerX;
        const cy = centerY + (relZ / zoomRadius) * centerY;
        return { x: cx, y: cy };
      };

      const objectList = Object.values(objects);

      // 1. Draw Wires (Offset relative to player)
      // ctx.lineWidth = 1.5;
      // objectList.forEach((gate) => {
      //   if (!gate.inputs) return;

      //   Object.values(gate.inputs).forEach((input) => {
      //     if (!input.positions || input.positions.length < 2) return;

      //     const srcGate = objects[input.srcGate];
      //     const isHigh = srcGate?.outputs?.out_Q?.status || false;

      //     ctx.strokeStyle = isHigh ? '#ef4444' : '#3b82f6';
      //     ctx.beginPath();

      //     input.positions.forEach((pos, idx) => {
      //       const { x, y } = worldToCanvas(pos.x, pos.z);
      //       if (idx === 0) ctx.moveTo(x, y);
      //       else ctx.lineTo(x, y);
      //     });

      //     ctx.stroke();
      //   });
      // });

      // 2. Draw Gates / Objects (Offset relative to player)
      objectList.forEach((gate) => {
        if (!gate.position) return;

        const [wx, wy, wz] = gate.position;
        const { x, y } = worldToCanvas(wx, wz);

        // Clip drawing if object is far outside minimap view bounds
        if (x < -10 || x > width + 10 || y < -10 || y > height + 10) return;

        switch (gate.model_name) {
          case 'SWITCH':
          case 'CLOCK':
            ctx.fillStyle = '#38bdf8'; // Sky Blue
            break;
          case 'DISPLAY':
            ctx.fillStyle = '#facc15'; // Yellow
            break;
          case 'NOT':
          case 'AND':
          case 'OR':
            ctx.fillStyle = '#a855f7'; // Purple
            break;
          default:
            ctx.fillStyle = '#94a3b8';
        }

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Fixed Player at Center
      // A. Direction Line / Pointer
      if (pDir) {
        const dirLength = 12;
        const endX = centerX + pDir.x * dirLength;
        const endY = centerY + pDir.z * dirLength;

        ctx.strokeStyle = '#10b981'; // Emerald Green
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // B. Outer Pulsing Glow
      ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
      ctx.fill();

      // C. Center Player Dot
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [objects, camera, zoomRadius]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !onPanTo) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert click offsets from center back into world coordinates
    const px = camera?.position?.x || 0;
    const pz = camera?.position?.z || 0;

    const relX = ((clickX - canvas.width / 2) / (canvas.width / 2)) * zoomRadius;
    const relZ = ((clickY - canvas.height / 2) / (canvas.height / 2)) * zoomRadius;

    onPanTo(px + relX, pz + relZ);
  };

  return (
    <div className="absolute bottom-4 right-4 z-20 bg-slate-900/90 border border-slate-700 p-1.5 rounded-xl shadow-2xl backdrop-blur-md">
      <div className="text-[10px] font-bold text-slate-400 mb-1 px-1 tracking-wider uppercase flex justify-between items-center">
        <span>Minimap</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
      </div>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        onClick={handleCanvasClick}
        className="rounded-lg cursor-pointer bg-slate-950 border border-slate-800 hover:border-slate-600 transition-colors" />
    </div>
  );
}