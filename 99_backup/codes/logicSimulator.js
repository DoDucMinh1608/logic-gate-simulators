class EventQueue {
  constructor() {
    this.heap = []; // min-heap on event.time
  }

  push(event) {
    this.heap.push(event);
    this._bubbleUp(this.heap.length - 1);
  }

  drainUpTo(now) {
    const ready = [];
    while (this.heap.length && this.heap[0].time <= now) {
      ready.push(this._pop());
    }
    return ready;
  }
  // standard min-heap _bubbleUp / _sinkDown omitted for brevity
}

function tick(now) {
  const events = queue.drainUpTo(now);
  for (const ev of events) {
    applyEvent(ev); // updates gate state, schedules downstream events
  }
  requestAnimationFrame(tick);
}
// Input change
//     │
//     ▼
// scheduleDownstream()  ──── deduplication check ──── skip if redundant
//     │
//     ▼
// EventQueue.push({ time: now + delay, gateId, epoch })
//     │
//     ▼
// RAF tick: drainUpTo(now)
//     │
//     ├─ stale epoch ? → discard
//     │
//     ├─ apply output change to gate
//     │
//     ├─ accumulate diff{ }
//     │
//     └─ scheduleDownstream() for each neighbor
//          │
//          ▼
//     single Zustand setState(diff)
//          │
//          ▼
//     R3F components re - render only changed gates
// Three.js uniforms updated directly in useFrame

// User click ──→ onSwitchToggled() ──→ epoch++ ──→ scheduleDownstream()
//                                                          │
// Clock.start() ──→ queue.push(selfFired) ─────────────────┤
//                        ↑ reschedules itself              │
//                                                          ▼
//                                                     EventQueue (min-heap)
//                                                          │
//                                               RAF tick: drainUpTo(now)
//                                                          │
//                                           ┌──────────────┴──────────────┐
//                                      isSelfFiring?                  epoch stale?
//                                           │                              │
//                                      gate.fire()                     discard
//                                           │
//                                   scheduleDownstream()
//                                   (downstream neighbors)