const winston = require('winston')
const level = process.env.LOG_LEVEL || 'info'

const logger = winston.createLogger({ level })

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf((info) => {
        const {
          timestamp, level, message, ...args
        } = info

        const ts = timestamp.slice(0, 19).replace('T', ' ')
        const data = Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
        return `${ts} [${level}]: ${message} ${data}`
      })
    )
  }))
} else {
  logger.add(new winston.transports.Console({
    format: winston.format.json()
  }))
}

logger.info(`Logger uses ${level} level`)

module.exports = logger
