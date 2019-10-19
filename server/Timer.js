const TimerStateMachine = require('@denlb/timer-state-machine')
const logger = require('./logger')

const MINUTE = 60 * 1000

class Timer extends TimerStateMachine {
  constructor () {
    super([
      {
        name: 'sprint',
        duration: (process.env.SPRINT_DURATION || 52) * MINUTE
      },
      {
        name: 'break',
        duration: (process.env.BREAK_DURATION || 17) * MINUTE
      }
    ])

    this.subscribe(newState => {
      logger.info('Timer#newState', { newState })
      if (newState.name === 'sprint') {
        this.sprintId = Date.now()
      }
    })
  }

  async start () {
    logger.info('Timer#start')
    super.start()
  }
}

module.exports = Timer
