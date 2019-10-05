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
  }
  io.sockets.emit('currentState', { ...newState, timeLeft: newState.duration })
})

users.onCountChange(() => {
  io.sockets.emit('usersCounters', {
    joined: users.joinedCount,
    idle: users.idleCount
  })
})

io.on('connection', socket => {
  const { address } = socket.handshake
  const geo = geoip.lookup(address)
  users.add(socket.id, geo)
  socket.emit('currentState', timer.currentState)

  socket.on('completed', todo => {
    logger.silly('completed', todo)
    socket.broadcast.emit('completed', todo)
  })

  socket.on('join', () => {
    users.join(socket.id)
  })

  socket.on('submitProductivity', productivity => {
    const { country } = geo
    socket.broadcast.emit('productivity', { country, productivity })
  })

  socket.on('disconnect', () => {
    users.remove(socket.id)
  })
})

timer.start().then(() => {
  logger.info(`Server is running at port ${PORT}`)
  server.listen(PORT)
})
