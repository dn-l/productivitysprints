import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createSocketPlugin from './createSocketPlugin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    connectedUsersCount: 1,
    currentState: undefined
  },

  mutations: {
    addTodo (state, todo) {
      state.todos.unshift(todo)
    },
    deleteTodo (state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id)
    },
    toggleComplete (state, id) {
      const todo = state.todos.find(todo => todo.id === id)
      console.log(todo)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
    },
    updateConnectedUsersCount (state, connectedUsersCount) {
      state.connectedUsersCount = connectedUsersCount
    },
    updateCurrentState (state, newState) {
      state.currentState = newState
    }
  },

  actions: {
    addTodo ({ commit }, { text }) {
      const id = Math.random().toString(36).substr(2, 9)
      commit('addTodo', { id, text, isCompleted: false })
    },
    deleteTodo ({ commit }, { id }) {
      commit('deleteTodo', id)
    },
    toggleComplete ({ commit }, { id }) {
      commit('toggleComplete', id)
    },
    socketOnConnectedUsersCount ({ commit }, connectedUsersCount) {
      commit('updateConnectedUsersCount', connectedUsersCount)
    },
    socketOnCurrentState ({ commit }, { name, duration, timeLeft = duration }) {
      commit('updateCurrentState', { name, duration, timeLeft, endsAt: Date.now() + timeLeft })
    }
  },

  plugins: [
    createPersistedState({ paths: ['todos'] }),
    createSocketPlugin('/', {
      eventActions: {
        connectedUsersCount: 'socketOnConnectedUsersCount',
        currentState: 'socketOnCurrentState'
      },
      emitMutations: {

      }
    })
  ]
})
