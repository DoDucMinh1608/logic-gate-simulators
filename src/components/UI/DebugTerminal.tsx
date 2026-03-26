import { usePlayerSlice } from "../../store/playerSlice";

function DebugTerminal() {
  const customs = usePlayerSlice(state => state.custom)

  return (
    <div className="pointer-events-auto absolute bottom-0 left-0 w-1/3 h-1/3 bg-[rgba(0,0,0,0.5)] bg-opacity-50 text-white p-2 overflow-y-scroll">
      {JSON.stringify(customs, null, 2)
        .split('\n')
        .map((line, index) => (
          <tr key={index} className="hover:bg-white/10 group">
            <td className="w-10 pr-3 text-right text-white/30 select-none border-r border-white/10 group-hover:text-white/60">
              {index + 1}
            </td>
            <td className="pl-2 whitespace-pre">
              {line}
            </td>
          </tr>
        ))}
    </div>
  );
}

export default DebugTerminal;