export default {
  toggleTheme (state) {
    state.darkTheme = !state.darkTheme
  },

  setJoined (state, joined) {
    state.joined = joined
  },

  addTodo (state, todo) {
    state.todos.unshift(todo)
  },

  deleteTodo (state, id) {
    state.todos = state.todos.filter(todo => todo.id !== id)
  },

  setCompleted (state, id) {
    const todo = state.todos.find(todo => todo.id === id)
    if (todo) {
      todo.isCompleted = true
    }
  },

  updateUsersCounters (state, usersCounters) {
    state.usersCounters = usersCounters
  },

  updateCurrentState (state, newState) {
    state.currentState = newState
  },

  clearFeed (state) {
    state.feed = []
  },

  updateFeed (state, todo) {
    state.feed.unshift(todo)
  },

  toggleFeedMuted (state) {
    state.feedMuted = !state.feedMuted
  }
}
