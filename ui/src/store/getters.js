export default {
  isSprint ({ currentState }) {
    if (currentState && currentState.name === 'sprint') {
      return true
    }
    return false
  }
}
