Great question — self-firing gates are a special class that don't fit the "downstream neighbor" model. They are **event sources**, not event sinks. Here's how to integrate them cleanly.

---

## The Core Distinction

Regular gates: *react* to upstream input changes.
Self-firing gates (Clock, Switch, Pulse, etc.): *originate* events on their own schedule, independent of any input.

They need their own scheduling path, but should still **feed into the same EventQueue** so causal ordering is preserved across the whole simulation.

---

## 1. Clock Gates

A clock is just a gate that reschedules itself every time it fires.

```js
class ClockGate {
  constructor(id, frequencyHz) {
    this.id = id;
    this.period = 1000 / frequencyHz; // ms
    this.output = 0;
  }

  // Called once to start the clock
  start(queue, now) {
    this._schedule(queue, now);
  }

  fire(queue, now, epoch) {
    this.output ^= 1; // toggle
    // Notify downstream neighbors exactly like any other gate
    scheduleDownstream(this.id, this.output, now, epoch);
    // Reschedule itself — this is the key difference
    this._schedule(queue, now);
  }

  _schedule(queue, now) {
    queue.push({
      time: now + this.period,
      gateId: this.id,
      isSelfFired: true,   // flag so the tick loop knows to call .fire()
      newOutput: null,     // determined at fire time, not schedule time
    });
  }
}
```

The `isSelfFired` flag tells your tick loop to route the event differently:

```js
function applyEvent(ev, now, epoch) {
  const gate = gates[ev.gateId];

  if (ev.isSelfFired) {
    gate.fire(queue, now, epoch); // gate decides its own next output
  } else {
    gate.receiveInput(ev.newOutput);
    const newOut = gate.evaluate();
    if (newOut !== gate.output) {
      gate.output = newOut;
       (ev.gateId, newOut, now, epoch);
    }
  }
}
```

---

## 2. Switch Gates (User-Driven)

A switch fires when the **user interacts**, not on a timer. It bypasses the queue entirely and injects directly — but it must still increment the epoch to invalidate any stale in-flight events.

```js
function onSwitchToggled(switchId) {
  const gate = gates[switchId];
  gate.output ^= 1;

  // New epoch — kills all stale events from previous state
  currentEpoch++;

  const now = performance.now();
  // Inject into queue with zero delay (or small debounce delay)
  scheduleDownstream(switchId, gate.output, now, currentEpoch);
}
```

Wire this to your R3F click handler:

```jsx
<SwitchMesh onClick={() => onSwitchToggled(gate.id)} />
```

The switch itself never goes through `applyEvent` — it's the origin point. It just produces a downstream event and bumps the epoch.

---

## 3. One-Shot Pulse Gates

A pulse fires HIGH for one period then returns LOW automatically — a single self-reschedule with a fixed output sequence.

```js
class PulseGate {
  trigger(queue, now, epoch) {
    this.output = 1;
    scheduleDownstream(this.id, 1, now, epoch);

    // Schedule the automatic fall after pulseWidth ms
    queue.push({
      time: now + this.pulseWidth,
      gateId: this.id,
      isSelfFired: true,
      selfFiredOutput: 0, // explicitly carry the next output
    });
  }

  fire(ev, queue, now, epoch) {
    // For pulse, output is predetermined — no toggle logic
    this.output = ev.selfFiredOutput;
    scheduleDownstream(this.id, this.output, now, epoch);
    // Does NOT reschedule — one-shot
  }
}
```

---

## 4. Unified Gate Interface

To keep `applyEvent` clean, give every gate type a common interface:

```js
// Every gate implements this shape
class BaseGate {
  evaluate() {}           // pure: inputs → output (regular gates)
  fire(ev, queue, now, epoch) {}  // self-fired gates override this
  isSelfFiring = false;   // clocks/pulses set this to true
}
```

Then your tick loop stays simple and doesn't need to know gate types:

```js
function applyEvent(ev, now, epoch) {
  if (ev.epoch !== currentEpoch) return; // stale, discard

  const gate = gates[ev.gateId];

  if (gate.isSelfFiring) {
    gate.fire(ev, queue, now, epoch);
  } else {
    // standard input-driven evaluation
    const newOut = gate.evaluate();
    if (newOut !== gate.output) {
      gate.output = newOut;
      scheduleDownstream(ev.gateId, newOut, now, epoch);
    }
  }
}
```

---

## 5. Epoch Handling for Clocks

Clocks present a subtle problem: they need to survive epoch changes (since they are always "current"), but their *downstream effects* must respect epochs.

The fix is that a clock's self-reschedule always uses the **latest epoch at fire time**, not the epoch it was scheduled with:

```js
fire(ev, queue, now, epoch) {
  // Ignore ev.epoch check for self — clock is always valid
  this.output ^= 1;
  scheduleDownstream(this.id, this.output, now, currentEpoch); // use live epoch
  this._schedule(queue, now); // reschedule self
}
```

And in `applyEvent`, skip the epoch check for self-firing events:

```js
if (!gate.isSelfFiring && ev.epoch !== currentEpoch) return;
```

---

## Full Picture

```
User click ──→ onSwitchToggled() ──→ epoch++ ──→ scheduleDownstream()
                                                        │
Clock.start() ──→ queue.push(selfFired) ────────────────┤
                       ↑ reschedules itself             │
                                                        ▼
                                                    EventQueue (min-heap)
                                                        │
                                              RAF tick: drainUpTo(now)
                                                        │
                                          ┌─────────────┴────────────────┐
                                     isSelfFiring?                  epoch stale?
                                          │                              │
                                     gate.fire()                     discard
                                          │
                                  scheduleDownstream()
                                  (downstream neighbors)
```

The key insight is: **self-firing gates own their schedule but rent the queue**. They inject into the same pipeline as everything else, so timing relationships between a clock edge and a user switch press are automatically correct.