function onLeaveTransistor(event) {
  event.stopPropagation()
  console.log("Left transistor at position:", event)
}

export default onLeaveTransistor;