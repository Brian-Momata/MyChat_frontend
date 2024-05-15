import ActionCable from "actioncable";

const cableApp = () => {
  const cableObject = {}
  cableObject.cable = ActionCable.createConsumer('ws://backend-api-dmnv.onrender.com/cable')

  return cableObject.cable
}

export default cableApp