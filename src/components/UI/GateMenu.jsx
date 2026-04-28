const GATE_TYPES = [
  'AND',
  'OR',
  'NOR',
  'NOT',
  'NAND',
  'NOR',
  'XOR'
]

function GateMenu({ activeIndex = 1 }) {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 grid grid-cols-10 gap-2 rounded-[8px] pointer-events-none z-10">
      {GATE_TYPES.map((type, i) => (
        <div key={type} className={[
          "p-2 bg-white/80 text-center border rounded-lg",
          activeIndex === i ? "font-bold bg-[#eee] border-2" : ""
        ].join(' ')} style={{
          // border: i === activeIndex ? '2px solid #333' : '1px solid #ccc',
          // background: i === activeIndex ? '#eee' : 'white',
          // fontWeight: i === activeIndex ? 'bold' : 'normal',
          // borderRadius: '4px'
        }}>{type}</div>
      ))}
    </div>
  );
}

export default GateMenu