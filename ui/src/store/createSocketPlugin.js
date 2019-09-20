import io from 'socket.io-client'

export default (
  uri,
  { eventActions, emitMutations }
) => store => {
  const socket = io()
  Object.keys(eventActions).forEach(eventName => {
    const actionName = eventActions[eventName]
    socket.on(eventName, data => store.dispatch(actionName, data))
  })
  store.subscribe(mutation => {
    const emitName = emitMutations[mutation.type]
    if (emitName) {
      socket.emit(emitName, mutation.payload)
    }
  })
}
