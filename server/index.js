const path = require('path')
const logger = require('./logger')
const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()
const http = require('http')
const socketio = require('socket.io')
const compression = require('compression')
const geoip = require('geoip-lite')
const Timer = require('./Timer')
const Users = require('./Users')
const server = http.Server(app)
const io = socketio(server)
const users = new Users()
const timer = new Timer()
const PORT = process.env.PORT || 3000
const STATIC_ROOT = path.resolve(__dirname, '..', 'ui', 'dist')

app.use(compression())
const staticFileMiddleware = express.static(STATIC_ROOT)
app.use(staticFileMiddleware)
app.use(history({ disableDotRule: true }))
app.use(staticFileMiddleware)

timer.subscribe(newState => {
  if (newState.name === 'break') {
    users.idleAll()
    emitConnectedUsers()
  }
  io.sockets.emit('currentState', {
    ...newState,
    sprintId: timer.sprintId,
    timeLeft: newState.duration
  })
})

const emitConnectedUsers = () => {
  io.sockets.emit('connectedUsers', {
    joined: users.getJoinedLl(),
    idle: users.getIdleLl()
  })
}

const emitStats = () => {
  if (timer.currentState.name === 'break') {
    const stats = users.collectStats()
    io.sockets.emit('stats', stats)
  }
}

io.on('connection', socket => {
  let [address] = socket.handshake.headers['x-forwarded-for'].split(',')
  const user = users.add(socket.id)
  if (process.env.NODE_ENV !== 'production') {
    address = '79.182.55.3'
  }
  const geo = geoip.lookup(address)
  user.setGeo(geo)
  logger.verbose('New user connected', { address, geo })
  emitConnectedUsers()
  emitStats()
  socket.emit('currentState', {
    ...timer.currentState,
    sprintId: timer.sprintId
  })

  socket.on('completed', todo => {
    logger.verbose('feedUpdated', todo)
    io.sockets.emit('feedUpdated', todo)
  })

  socket.on('join', () => {
    user.join()
    emitConnectedUsers()
  })

  socket.on('submitReport', report => {
    user.setReport(report)
    emitStats()
  })

  socket.on('disconnect', () => {
    user.disconnect()
    emitConnectedUsers()
  })
})

timer.start().then(() => {
  logger.info(`Server is running at port ${PORT}`)
  server.listen(PORT)
})
