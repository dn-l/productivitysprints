export default {
  isBreak ({ currentState }) {
    if (currentState && currentState.name === 'break') {
      return true
    }
    return false
  },

  isSprint ({ currentState }) {
    if (currentState && currentState.name === 'sprint') {
      return true
    }
    return false
  },

  isJoined ({ joinedSprintId, currentState }) {
    if (!currentState || !joinedSprintId) {
      return false
    }
    if (currentState.sprintId === joinedSprintId) {
      return true
    }
  }
}
