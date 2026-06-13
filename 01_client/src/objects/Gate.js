export default class Gate {
  constructor(id, name, display, model, position, nextStep, delay, selfCall, inputs = {}, outputs = {}) {
    this.id = id
    this.name = name
    this.display = display
    this.model = model
    this.position = position
    this.nextStep = nextStep
    this.delay = delay
    this.selfCall = !!selfCall
    this.inputs = inputs
    this.outputs = outputs
  }
}