function onMouseDownTransistor(event, transistor, removeGate) {
  event.stopPropagation()
  if (event.button === 0) {
    removeGate(transistor.id)
  }
}

export default onMouseDownTransistor;


