function onEnterTransistor(event, gate) {
  event.stopPropagation()
  console.log("Entered transistor at position:", event)

}

export default onEnterTransistor;