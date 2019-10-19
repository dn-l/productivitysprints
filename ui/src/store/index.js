import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import createSocketPlugin from './createSocketPlugin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkTheme: undefined,
    joinedSprintId: undefined,
    todos: [ ],
    connectedUsers: {
      joined: undefined,
      idle: undefined
    },
    currentState: undefined,
    feedMuted: false,
    feed: [ ],
    stats: undefined
  },

  getters,

  mutations,

  actions,

  plugins: [
    createPersistedState({ paths: [
      'darkTheme', 'todos', 'joinedSprintId'
    ] }),
    createSocketPlugin('/', {
      events: [
        'connectedUsers', 'currentState', 'feedUpdated', 'stats'
      ],
      emits: [
        'completed', 'submitReport', 'join'
      ]
    })
  ]
})
