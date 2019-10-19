export default {
  toggleTheme (state) {
    state.darkTheme = !state.darkTheme
  },

  setJoinedSprintId (state) {
    state.joinedSprintId = state.currentState.sprintId
  },

  addTodo (state, todo) {
    state.todos.unshift(todo)
  },

  removeCompletedTodos (state) {
    state.todos = state.todos.filter(({ isCompleted }) => !isCompleted)
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

  updateConnectedUsers (state, connectedUsers) {
    state.connectedUsers = connectedUsers
  },

  updateCurrentState (state, newState) {
    state.currentState = newState
  },

  clearFeed (state) {
    state.feed = []
  },

  updateStats (state, stats) {
    const sum = (arr, key) => arr
      .map(val => val[key])
      .reduce((acc, val) => acc + val, 0)
    const calcAvg = (val, count) => Math.round(val / count)
    Object.values(stats)
      .forEach(country => {
        const { reports } = country
        const [completed, left, productivity] = ['completed', 'left', 'productivity']
          .map(key => sum(reports, key))
        country.stats = {
          completed: calcAvg(completed, reports.length),
          left: calcAvg(left, reports.length),
          productivity: calcAvg(productivity, reports.length)
        }
      })
    state.stats = stats
  },

  clearStats (state) {
    state.stats = undefined
  },

  updateFeed (state, todo) {
    state.feed.unshift(todo)
  },

  toggleFeedMuted (state) {
    state.feedMuted = !state.feedMuted
  }
}
