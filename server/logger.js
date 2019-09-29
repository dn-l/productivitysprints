const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: []
})

if (process.env.NODE_ENV !== 'production') {
  logger.level = 'silly'
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
    format: winston.format.simple()
  }))
}

module.exports = logger
