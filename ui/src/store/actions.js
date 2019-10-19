import router from '../router'

const generateId = () => Math.random().toString(36).substr(2, 9)

export default {
  addTodo ({ commit }, { text }) {
    const id = generateId()
    commit('addTodo', { id, text, isCompleted: false })
  },

  deleteTodo ({ commit }, { id }) {
    commit('deleteTodo', id)
  },

  setCompleted ({ commit }, { id }) {
    commit('setCompleted', id)
  },

  socketOnConnectedUsers ({ commit }, connectedUsers) {
    commit('updateConnectedUsers', connectedUsers)
  },

  join ({ commit }) {
    commit('setJoinedSprintId')
  },

  toggleFeedMuted ({ commit }) {
    commit('toggleFeedMuted')
  },

  submitReport ({ dispatch, state }, productivity) {
    const { todos } = state
    const completed = todos.filter(({ isCompleted }) => isCompleted).length
    const left = todos.length - completed
    dispatch('socketEmitSubmitReport', {
      productivity,
      completed,
      left
    })
  },

  socketOnCurrentState ({ commit, state, getters }, { sprintId, name, duration, timeLeft = duration }) {
    if (name === 'break' && state.joinedSprintId === sprintId) {
      router.push('review')
    } else if (name === 'sprint') {
      if (!getters.isSprint) {
        commit('removeCompletedTodos')
      }
      commit('clearStats')
    }
    commit('updateCurrentState', { sprintId, name, duration, timeLeft, endsAt: Date.now() + timeLeft })
  },

  socketOnFeedUpdated ({ commit, state }, text) {
    if (!state.feedMuted) {
      const id = generateId()
      commit('updateFeed', { id, text })
    }
  },

  socketOnStats ({ commit }, reports) {
    commit('updateStats', reports)
  }
}
