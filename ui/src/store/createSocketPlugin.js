import io from 'socket.io-client'

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default (
  uri,
  { events = [], emits = [] }
) => store => {
  const socket = io()
  events.forEach(eventName => {
    const actionName = `socketOn${capitalize(eventName)}`
    socket.on(eventName, data => store.dispatch(actionName, data))
  })
  const eventActions = { }
  emits.forEach(emitName => {
    const actionName = `socketEmit${capitalize(emitName)}`
    eventActions[actionName] = () => { }
  })
  store.registerModule('socket', { actions: eventActions })
  store.subscribeAction(action => {
    const emitName = action.type
      .replace(/^socketEmit(\w+)$/, (_, str) => str.charAt(0).toLowerCase() + str.slice(1))
    if (emits.includes(emitName)) {
      socket.emit(emitName, action.payload)
    }
  })
}
