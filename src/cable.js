import ActionCable from "actioncable";

const cableApp = () => {
  const cableObject = {}
  cableObject.cable = ActionCable.createConsumer('wss://backend-api-dmnv.onrender.com/cable')

  return cableObject.cable
}

export default cableApp