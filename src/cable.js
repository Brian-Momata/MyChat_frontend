import ActionCable from "actioncable";

const cableApp = () => {
  const cableObject = {}
  cableObject.cable = ActionCable.createConsumer('ws://127.0.0.1:3001/cable')

  return cableObject.cable
}

export default cableApp