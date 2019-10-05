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

  socketOnUsersCounters ({ commit }, usersCounters) {
    commit('updateUsersCounters', usersCounters)
  },

  join ({ commit }) {
    commit('setJoined', true)
  },

  toggleFeedMuted ({ commit }) {
    commit('toggleFeedMuted')
  },

  socketOnCurrentState ({ commit, state }, { name, duration, timeLeft = duration }) {
    if (name === 'break' && state.joined) {
      commit('setJoined', false)
      router.push('review')
    }
    commit('updateCurrentState', { name, duration, timeLeft, endsAt: Date.now() + timeLeft })
  },

  socketOnCompleted ({ commit, state }, text) {
    if (!state.feedMuted) {
      const id = generateId()
      commit('updateFeed', { id, text })
    }
  }
}
