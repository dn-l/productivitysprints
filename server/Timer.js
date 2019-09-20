const TimerStateMachine = require('@denlb/timer-state-machine')
const logger = require('./logger')

const MINUTE = 60 * 1000

class Timer extends TimerStateMachine {
  constructor (store) {
    super([
      {
        name: 'sprint',
        duration: 52 * MINUTE
      },
      {
        name: 'break',
        duration: 17 * MINUTE
      }
    ])
    this.store = store
    this.subscribe(newState => {
      logger.info('Timer#newState', { newState })
      store.set('state', {
        ...newState,
        startedAt: Date.now()
      })
    })
  }

  async start () {
    const state = await this._resolveInitialState()
    logger.info('Timer#start', state)
    super.start(state)
  }

  async _resolveInitialState () {
    const state = await this.store.get('state')
    if (!state) {
      return undefined
    }
    state.duration = state.duration - Date.now() + state.startedAt
    if (state.duration <= 0) {
      return undefined
    }
    return state
  }
}

module.exports = Timer
