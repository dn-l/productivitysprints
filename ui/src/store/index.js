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
    darkTheme: true,
    joined: false,
    todos: [ ],
    usersCounters: {
      joined: undefined,
      idle: undefined
    },
    currentState: undefined,
    feedMuted: false,
    feed: [ ]
  },

  getters,

  mutations,

  actions,

  plugins: [
    createPersistedState({ paths: ['darkTheme', 'todos'] }),
    createSocketPlugin('/', {
      events: [
        'usersCounters', 'currentState', 'completed'
      ],
      emits: [
        'completed', 'submitProductivity', 'join'
      ]
    })
  ]
})
